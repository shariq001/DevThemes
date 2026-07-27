import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { variantId } = body;
    
    if (!variantId) {
      return NextResponse.json({ error: 'Variant ID is required' }, { status: 400 });
    }
    
    // Use Clerk to simulate a successful purchase
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const existingPurchases = (user.publicMetadata.purchases as string[]) || [];
    
    if (!existingPurchases.includes(variantId)) {
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          purchases: [...existingPurchases, variantId]
        }
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mock Checkout API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
