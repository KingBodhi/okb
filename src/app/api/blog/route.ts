import { NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/blog';

export async function GET() {
  return NextResponse.json(getPublishedPosts());
}
