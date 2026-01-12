import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/admin';
import { createPost, getAllPosts } from '@/lib/blog';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('okb_admin_session')?.value;
  const session = token ? getSession(token) : null;
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(getAllPosts());
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('okb_admin_session')?.value;
    const session = token ? getSession(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { title, slug, date, subtitle, image, content, status = 'draft' } = body;

    if (!title || !slug || !date) {
      return NextResponse.json({ error: 'Title, slug, and date are required' }, { status: 400 });
    }

    const id = createPost({ title, slug, date, subtitle, image, content, status });
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Create post error', error);
    return NextResponse.json({ error: 'Unable to create post' }, { status: 500 });
  }
}
