import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import fs from 'fs';
import path from 'path';

// Mock mapping of Product IDs to ZIP files for testing
const PRODUCT_FILES: Record<string, string> = {
  'prod_001': 'saas-landing.zip',
  'prod_002': 'ecommerce-store.zip',
  'prod_004': 'portfolio-blog.zip',
};

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('id');

    if (!productId) {
      return new NextResponse('Invalid product ID', { status: 400 });
    }

    let purchases: string[] = [];
    if (userId) {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      purchases = (user.publicMetadata.purchases as string[]) || [];
    } else {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!purchases.includes(productId)) {
      return new NextResponse('Forbidden: You do not own this product', { status: 403 });
    }

    const saasId = process.env.NEXT_PUBLIC_LS_VARIANT_SAAS || "123456";
    const ecomId = process.env.NEXT_PUBLIC_LS_VARIANT_ECOM || "123457";
    const portId = process.env.NEXT_PUBLIC_LS_VARIANT_PORTFOLIO || "123459";

    const PRODUCT_BLOBS: Record<string, string> = {
      'prod_001': process.env.BLOB_URL_SAAS || 'https://placeholder.blob.vercel-storage.com/saas.zip',
      [saasId]: process.env.BLOB_URL_SAAS || 'https://placeholder.blob.vercel-storage.com/saas.zip',
      'prod_002': process.env.BLOB_URL_ECOM || 'https://placeholder.blob.vercel-storage.com/ecom.zip',
      [ecomId]: process.env.BLOB_URL_ECOM || 'https://placeholder.blob.vercel-storage.com/ecom.zip',
      'prod_004': process.env.BLOB_URL_PORT || 'https://placeholder.blob.vercel-storage.com/port.zip',
      [portId]: process.env.BLOB_URL_PORT || 'https://placeholder.blob.vercel-storage.com/port.zip',
    };

    const blobUrl = PRODUCT_BLOBS[productId];
    
    if (!blobUrl || blobUrl.includes('placeholder')) {
      console.error("Vercel Blob URLs are not configured yet.");
      return new NextResponse('File storage not configured', { status: 500 });
    }

    // Since these are Public Blobs, the safest and most scalable way to deliver them
    // on Vercel Production (without hitting the 10-second Serverless Function Timeout)
    // is to instantly redirect the buyer's browser to the ultra-fast Vercel CDN URL.
    return NextResponse.redirect(blobUrl);
  } catch (error) {
    console.error('Download API error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
