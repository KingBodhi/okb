import { NextRequest, NextResponse } from 'next/server';
import { destroySession } from '@/lib/admin';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('okb_admin_session')?.value;
    if (token) {
      destroySession(token);
    }
    const response = NextResponse.json({ success: true });
    response.cookies.set('okb_admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
    return response;
  } catch (error) {
    console.error('Logout error', error);
    return NextResponse.json({ error: 'Unable to logout' }, { status: 500 });
  }
}
