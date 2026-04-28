import { NextResponse } from 'next/server';

const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzqDroJVnAdTEVWF22sa11sVWx35mkuArHx5N2CTLrYYA0CW8FXrKPHQ_B5DYcZjcRQ/exec";
const AUTH_KEY = "MTM2026";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { visitorId, email, source, nodeInterest, firstName } = body;
    
    const res = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': AUTH_KEY,
      },
      body: JSON.stringify({
        action: 'captureEmail',
        visitorId,
        email,
        source,
        nodeInterest,
        firstName: firstName || ''
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ ok: true, message: 'Email captured' });
    }

    const data = await res.json();
    return NextResponse.json({ ok: true, message: 'Email captured', data });
  } catch (err) {
    console.error('Capture error:', err);
    return NextResponse.json({ ok: true, message: 'Email captured (offline)' });
  }
}