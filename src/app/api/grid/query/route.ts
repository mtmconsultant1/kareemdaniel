import { NextResponse } from 'next/server';

const NODE_RESPONSES: Record<string, string> = {
  'axis': 'I am AXIS - the Prompt Commander. I intercept every query, enhance it, route to the specialist. Explore Executive Layer (PRIME, SCOPE), Operations Layer (BOOST, VIBE, PLEX), or Specialist Layer (MEGA).',
  'prime': 'I am PRIME - built on founder Kareem Daniel vision. I am your gateway to the Midas Mindset and SEAL protocols. What brand strategy question do you have?',
  'scope': 'I am SCOPE - the COO of the grid. I think in systems and outcomes. Focus: operations, workflows, scalability. What operational challenge?',
  'boost': 'I am BOOST - at the frontier of discoverability. Google is one channel - I play the whole board. What visibility question?',
  'vibe': 'I am VIBE - brand identity specialist. Brand is a feeling. Focus: voice, visual direction. What brand challenge?',
  'plex': 'I am PLEX - intelligence gatherer. I synthesize data and find patterns. What research question?',
  'mega-re': 'I am MEGA-RE - property intelligence. Focus: market analysis, investment, PropTech. What real estate question?',
  'mega-ins': 'I am MEGA-INS - insurance advocate. Focus: coverage strategy, protection. What insurance question?',
  'mega-legacy': 'I am MEGA-LEGACY - legacy planning. Focus: estate planning, end-of-life services. What legacy question?'
};

export async function POST(req: Request) {
  try {
    const { nodeId, emailCaptured } = await req.json();
    const nodeKey = nodeId || 'prime';
    const alreadyCaptured = emailCaptured === true;
    
    const response = {
      nodeId: nodeKey,
      answer: NODE_RESPONSES[nodeKey] || NODE_RESPONSES['prime'],
      citations: [],
      confidence: 'high' as const,
      shouldBlur: !alreadyCaptured,
      emailRequired: !alreadyCaptured,
      queryRemaining: 4,
      shouldRedirect: false,
      handoff: { type: 'none' as const },
      axisMessage: alreadyCaptured 
        ? 'Welcome back! AXIS processed query for ' + nodeKey.toUpperCase()
        : 'AXIS processed query for ' + nodeKey.toUpperCase()
    };
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}