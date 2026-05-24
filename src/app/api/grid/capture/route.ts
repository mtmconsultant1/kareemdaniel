import { NextResponse } from 'next/server';

const DEFAULT_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzqDroJVnAdTEVWF22sa11sVWx35mkuArHx5N2CTLrYYA0CW8FXrKPHQ_B5DYcZjcRQ/exec';
const WEBAPP_URL = process.env.I3C2_WEBAPP_URL || DEFAULT_WEBAPP_URL;
const AUTH_KEY = process.env.I3C2_AUTH_KEY || 'MTM2026';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { visitorId, email, source, nodeInterest, firstName } = body;

    const res = await fetch(`${WEBAPP_URL}?action=captureEmail&secret=${encodeURIComponent(AUTH_KEY)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitorId,
        email,
        source,
        nodeInterest,
        firstName: firstName || '',
      }),
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, message: 'Email capture bridge failed', status: res.status },
        { status: 502 }
      );
    }

    const data = await res.json();
    if (data?.status !== 'ok') {
      return NextResponse.json(
        { ok: false, message: 'Email capture bridge failed', data },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, message: 'Email captured', data });
  } catch (err) {
    console.error('Capture error:', err);
    return NextResponse.json(
      { ok: false, message: 'Email capture bridge failed', error: String(err) },
      { status: 500 }
    );
  }
}
