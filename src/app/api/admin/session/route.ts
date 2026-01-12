import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/admin';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('okb_admin_session')?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const session = getSession(token);
  if (!session) {
    const response = NextResponse.json({ authenticated: false }, { status: 401 });
    response.cookies.set('okb_admin_session', '', { path: '/', maxAge: 0 });
    return response;
  }

  return NextResponse.json({ authenticated: true, admin: session.admin });
}
