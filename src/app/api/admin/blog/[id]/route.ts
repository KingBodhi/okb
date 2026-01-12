import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/admin';
import { deletePost, updatePost } from '@/lib/blog';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = request.cookies.get('okb_admin_session')?.value;
  const session = token ? getSession(token) : null;
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  const db = getDb();
  const post = db.prepare('SELECT * FROM okb_blog_posts WHERE id = ?').get(id);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = request.cookies.get('okb_admin_session')?.value;
  const session = token ? getSession(token) : null;
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  const body = await request.json();
  updatePost(id, body);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = request.cookies.get('okb_admin_session')?.value;
  const session = token ? getSession(token) : null;
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  deletePost(id);
  return NextResponse.json({ success: true });
}
