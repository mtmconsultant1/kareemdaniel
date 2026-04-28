import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Grid Capture Received (Simulated):', body);
    
    const mockResponse = {
      ok: true,
      message: 'Email captured successfully'
    };

    return NextResponse.json(mockResponse);
  } catch (err) {
    console.error('Route error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}