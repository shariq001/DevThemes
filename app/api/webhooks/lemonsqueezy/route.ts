import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature');
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

    if (!secret || !signature) {
      return NextResponse.json({ error: 'Missing secret or signature' }, { status: 400 });
    }

    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const data = JSON.parse(rawBody);

    const eventName = data.meta.event_name;
    const customData = data.meta.custom_data;
    const userId = customData?.user_id;

    if (eventName === 'order_created') {
      const orderData = data.data.attributes;
      const variantId = orderData.first_order_item?.variant_id;
      
      if (userId && variantId) {
        const { clerkClient } = await import('@clerk/nextjs/server');
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const existingPurchases = (user.publicMetadata.purchases as number[]) || [];
        
        if (!existingPurchases.includes(variantId)) {
          await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              purchases: [...existingPurchases, variantId]
            }
          });
          console.log(`Granted user ${userId} access to variant ${variantId}`);
        }
      }
      
      console.log(`Order processed successfully for user ${userId}:`, orderData.identifier);
    }

    return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
