import { NextResponse } from 'next/server';
import { saveContactSubmission } from '@/lib/forms';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    if (!email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    saveContactSubmission({
      first_name: firstName ?? '',
      last_name: lastName ?? '',
      email,
      subject,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact submission error', error);
    return NextResponse.json({ error: 'Unable to submit form' }, { status: 500 });
  }
}
