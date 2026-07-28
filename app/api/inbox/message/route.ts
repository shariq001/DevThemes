import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { threadId, content } = await req.json();

    if (!threadId || !content) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    // Verify ownership
    const thread = await prisma.thread.findUnique({
      where: { id: threadId }
    });

    if (!thread) {
      return new NextResponse('Thread not found', { status: 404 });
    }

    const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_CLERK_ID;
    if (thread.userId !== userId && !isAdmin) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        threadId,
        senderId: userId,
        content
      }
    });

    // Update the thread's updatedAt timestamp and change status if needed
    await prisma.thread.update({
      where: { id: threadId },
      data: {
        updatedAt: new Date(),
        status: isAdmin ? 'AWAITING_REPLY' : 'OPEN'
      }
    });

    // Send Email Notification
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      if (isAdmin) {
        // Admin replied, notify the user
        const client = await clerkClient();
        const user = await client.users.getUser(thread.userId);
        const userEmail = user.emailAddresses[0]?.emailAddress;

        if (userEmail) {
          await resend.emails.send({
            from: 'DevThemes <noreply@devthemes.com>', // Replace with your verified domain
            to: userEmail,
            subject: `New Reply: ${thread.subject}`,
            text: `You have a new reply from DevThemes in your inbox:\n\n"${content}"\n\nLog in to your dashboard to view the full thread.`
          });
        }
      } else {
        // User replied, notify the admin
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail) {
          await resend.emails.send({
            from: 'DevThemes Notifications <noreply@devthemes.com>',
            to: adminEmail,
            subject: `New Message on: ${thread.subject}`,
            text: `A user has replied to the thread "${thread.subject}":\n\n"${content}"\n\nLog in to your dashboard to reply.`
          });
        }
      }
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error posting message:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
