ï»¿import { NextResponse } from 'next/server';

const APPS_SCRIPT_URL = process.env.I3C2_WEBAPP_URL!;

export async function GET() {
  try {
    // Constructing URL string manually without template literals
    const url = APPS_SCRIPT_URL + '?action=nodes';
    
    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Bridge error:', res.status, errorText); // Added detailed logging
      return NextResponse.json(
        { ok: false, error: 'Bridge returned ' + res.status + ': ' + errorText },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Route error:', err); // Added detailed logging
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
