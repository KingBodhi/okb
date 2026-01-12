import { NextResponse } from 'next/server';
import { savePressRequest } from '@/lib/forms';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, organization, details, email } = body;

    if (!firstName || !lastName || !organization || !details || !email) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    savePressRequest({
      first_name: firstName,
      last_name: lastName,
      organization,
      details,
      email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Press request error', error);
    return NextResponse.json({ error: 'Unable to submit press request' }, { status: 500 });
  }
}
