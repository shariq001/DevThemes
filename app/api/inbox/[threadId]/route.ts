import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const thread = await prisma.thread.findUnique({
      where: { id: params.threadId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!thread) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // Ensure the user actually owns this thread or is the admin
    const isAdmin = userId === process.env.ADMIN_CLERK_ID;
    if (thread.userId !== userId && !isAdmin) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    return NextResponse.json(thread);
  } catch (error) {
    console.error('Error fetching thread messages:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
