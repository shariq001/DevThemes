import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
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

    const isAdmin = userId === process.env.ADMIN_CLERK_ID;
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

    // TODO: Trigger Email Notifications (Resend) here

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error posting message:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
