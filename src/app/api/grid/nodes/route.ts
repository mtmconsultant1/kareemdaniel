import { NextResponse } from 'next/server';
import { getPublicGridNodes } from '@/lib/grid/registry';

const DEFAULT_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzqDroJVnAdTEVWF22sa11sVWx35mkuArHx5N2CTLrYYA0CW8FXrKPHQ_B5DYcZjcRQ/exec';
const APPS_SCRIPT_URL = process.env.I3C2_WEBAPP_URL || DEFAULT_WEBAPP_URL;
const AUTH_KEY = process.env.I3C2_AUTH_KEY || 'MTM2026';

export async function GET() {
  const registryNodes = getPublicGridNodes();

  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?action=getNodes&secret=${encodeURIComponent(AUTH_KEY)}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ nodes: registryNodes, source: 'registry' });
    }

    const data = await res.json();
    const scriptNodes = Array.isArray(data?.nodes) ? data.nodes : [];
    const nodes = registryNodes.map((node) => {
      const scriptNode = scriptNodes.find((item: { id?: string }) => item.id === node.id);
      return { ...scriptNode, ...node };
    });

    return NextResponse.json({ nodes, source: 'registry+apps-script' });
  } catch {
    return NextResponse.json({ nodes: registryNodes, source: 'registry' });
  }
}
