import { NextResponse } from 'next/server';
import { saveSchedulingRequest } from '@/lib/forms';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const required = ['firstName', 'lastName', 'organization', 'website', 'eventDescription', 'eventDate', 'country', 'addressLine1', 'postcode', 'city', 'hostEmail'];
    const missing = required.filter((field) => !body[field]);

    if (missing.length) {
      return NextResponse.json({ error: `Missing fields: ${missing.join(', ')}` }, { status: 400 });
    }

    saveSchedulingRequest({
      first_name: body.firstName,
      last_name: body.lastName,
      organization: body.organization,
      website: body.website,
      event_description: body.eventDescription,
      event_date: body.eventDate,
      country: body.country,
      address_line1: body.addressLine1,
      address_line2: body.addressLine2 ?? '',
      postcode: body.postcode,
      city: body.city,
      media_present: body.mediaPresent ?? '',
      audience: body.audience ?? '',
      host_email: body.hostEmail,
      host_phone: body.hostPhone ?? '',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Scheduling request error', error);
    return NextResponse.json({ error: 'Unable to submit scheduling request' }, { status: 500 });
  }
}
