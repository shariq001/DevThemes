import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js';
import { setupLemonSqueezy } from '@/lib/lemonsqueezy';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

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

    // Initialize Lemon Squeezy API client
    setupLemonSqueezy();

    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
    if (!storeId) {
      throw new Error('LEMON_SQUEEZY_STORE_ID is not configured');
    }

    // Create a new checkout
    const { error, data } = await createCheckout(storeId, variantId, {
      checkoutOptions: {
        embed: true,
        media: false,
        logo: true,
      },
      checkoutData: {
        custom: {
          user_id: userId,
        },
      },
    });

    if (error) {
      console.error('Error creating Lemon Squeezy checkout:', error);
      return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl: data?.data?.attributes?.url });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
