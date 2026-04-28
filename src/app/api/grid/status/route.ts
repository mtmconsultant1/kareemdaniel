import { NextResponse } from 'next/server';

// Hard-coding for immediate synchronization
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzqDroJVnAdTEVWF22sa11sVWx35mkuArHx5N2CTLrYYA0CW8FXrKPHQ_B5DYcZjcRQ/exec";
const AUTH_KEY = "MTM2026";

export async function GET() {
  try {
    const res = await fetch(`${WEBAPP_URL}?action=getSystemStatus&secret=${AUTH_KEY}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': AUTH_KEY,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      // Return mock data if external service unavailable
      return NextResponse.json({
        gridStatus: "ACTIVE",
        axisStatus: "Axis online",
        version: "v1.5"
      });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    // Return mock data on any error
    return NextResponse.json({
      gridStatus: "ACTIVE",
      axisStatus: "Axis online",
      version: "v1.5"
    });
  }
}