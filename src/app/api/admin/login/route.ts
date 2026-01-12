import { NextRequest, NextResponse } from 'next/server';
import { ensureDefaultAdmin, verifyAdminCredentials, createSession } from '@/lib/admin';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    await ensureDefaultAdmin();
    const admin = await verifyAdminCredentials(username, password);
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const session = createSession(admin.id);
    const response = NextResponse.json({ success: true, admin });
    response.cookies.set('okb_admin_session', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Admin login error', error);
    return NextResponse.json({ error: 'Unable to login' }, { status: 500 });
  }
}
