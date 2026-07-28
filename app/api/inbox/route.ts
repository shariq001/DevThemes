import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if the user is the admin (you should set this in your environment variables)
    const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_CLERK_ID;

    // Fetch threads. If admin, fetch all. If user, fetch only theirs.
    const threads = await prisma.thread.findMany({
      where: isAdmin ? {} : { userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: { messages: true }
        }
      }
    });

    return NextResponse.json(threads);
  } catch (error) {
    console.error('Error fetching threads:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { subject, budget, initialMessage } = await req.json();

    if (!subject || !initialMessage) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Create the thread and the first message in one transaction
    const thread = await prisma.thread.create({
      data: {
        userId,
        subject,
        budget,
        messages: {
          create: {
            senderId: userId,
            content: initialMessage,
          }
        }
      }
    });

    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'DevThemes Notifications <noreply@devthemes.com>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Project Request: ${subject}`,
        text: `You have a new project request from a user.\n\nSubject: ${subject}\nBudget: ${budget || 'Not specified'}\nMessage: "${initialMessage}"\n\nLog in to your dashboard to reply.`
      });
    }

    return NextResponse.json(thread);
  } catch (error) {
    console.error('Error creating thread:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
