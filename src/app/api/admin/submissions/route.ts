import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSession } from '@/lib/admin';
import { deleteSubmission } from '@/lib/forms';
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

export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('okb_admin_session')?.value;

  if (!token || !getSession(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const type = request.nextUrl.searchParams.get('type') as 'contact' | 'scheduling' | 'press';
  const id = Number(request.nextUrl.searchParams.get('id'));

  if (!type || !['contact', 'scheduling', 'press'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  if (!id || Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const deleted = deleteSubmission(type, id);

  if (deleted === 0) {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
