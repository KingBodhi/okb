import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/admin';
import { getAllSettings, updateSettings, SiteSettings } from '@/lib/settings';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('okb_admin_session')?.value;

  if (!token || !getSession(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settings = getAllSettings();
  return NextResponse.json(settings);
}

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('okb_admin_session')?.value;

  if (!token || !getSession(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json() as Partial<SiteSettings>;
    updateSettings(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
