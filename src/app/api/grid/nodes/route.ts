import { NextResponse } from 'next/server';

const APPS_SCRIPT_URL = process.env.I3C2_WEBAPP_URL!;

export async function GET() {
  try {
    const res = await fetch(APPS_SCRIPT_URL + "?action=getNodes&secret=MTM2026", {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Nodes unavailable' }, { status: 503 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}