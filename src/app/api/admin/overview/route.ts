import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/admin';
import { getRecentContact, getRecentPress, getRecentScheduling, getSubmissionStats } from '@/lib/forms';
import { getAllPosts } from '@/lib/blog';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('okb_admin_session')?.value;
  const session = token ? getSession(token) : null;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stats = getSubmissionStats();
  const contact = getRecentContact();
  const scheduling = getRecentScheduling();
  const press = getRecentPress();
  const posts = getAllPosts();

  return NextResponse.json({ stats, contact, scheduling, press, posts });
}
