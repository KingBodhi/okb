import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSession } from '@/lib/admin';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('okb_admin_session')?.value;

  if (!token || !getSession(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const type = request.nextUrl.searchParams.get('type') || 'contact';
  const db = getDb();

  let table = 'okb_contact_submissions';
  if (type === 'scheduling') table = 'okb_scheduling_requests';
  if (type === 'press') table = 'okb_press_requests';

  const submissions = db.prepare(`SELECT * FROM ${table} ORDER BY created_at DESC`).all();

  return NextResponse.json({ submissions });
}
