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
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('id');

    if (!productId || !PRODUCT_FILES[productId]) {
      return new NextResponse('Invalid product ID', { status: 400 });
    }

    // Verify ownership
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const purchases = (user.publicMetadata.purchases as string[]) || [];

    if (!purchases.includes(productId)) {
      return new NextResponse('Forbidden: You do not own this product', { status: 403 });
    }

    // Vercel Blob URLs - Replace these with your actual uploaded Blob URLs
    const PRODUCT_BLOBS: Record<string, string> = {
      'prod_001': process.env.BLOB_URL_SAAS || 'https://placeholder.blob.vercel-storage.com/saas.zip',
      'prod_002': process.env.BLOB_URL_ECOM || 'https://placeholder.blob.vercel-storage.com/ecom.zip',
      'prod_004': process.env.BLOB_URL_PORT || 'https://placeholder.blob.vercel-storage.com/port.zip',
    };

    const blobUrl = PRODUCT_BLOBS[productId];
    
    if (!blobUrl || blobUrl.includes('placeholder')) {
      console.error("Vercel Blob URLs are not configured yet.");
      return new NextResponse('File storage not configured', { status: 500 });
    }

    // Securely fetch the public file from Vercel Blob server-side so the URL is never exposed to the client
    const fileResponse = await fetch(blobUrl);
    
    if (!fileResponse.ok) {
      console.error("Failed to fetch file from Blob storage. Status:", fileResponse.status);
      return new NextResponse('File not found in storage', { status: 404 });
    }

    // Stream the file back to the user as a downloadable attachment
    return new NextResponse(fileResponse.body, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="${PRODUCT_FILES[productId]}"`,
        'Content-Type': 'application/zip',
        'Content-Length': fileResponse.headers.get('content-length') || '',
      },
    });
  } catch (error) {
    console.error('Download API error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
