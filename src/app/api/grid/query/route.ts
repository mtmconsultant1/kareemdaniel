import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const NODE_RESPONSES: Record<string, string> = {
  'axis': `AXIS - Prompt Commander`,
  'prime': `PRIME - founder brand vision`,
  'scope': `SCOPE - COO operations`,
  'boost': `BOOST - discoverability across search, social, content, earned media, and AI search (GEO).`,
  'vibe': `VIBE - brand identity`,
  'plex': `PLEX - intelligence`,
  'mega-re': `MEGA-RE - property`,
  'mega-ins': `MEGA-INS - insurance`,
  'mega-legacy': `MEGA-LEGACY - legacy`
};

const QUERY_HANDLERS: Record<string, Record<string, string>> = {
  'boost': {
    'ai search': `AI search (GEO) is the new frontier. Optimize for ChatGPT, Claude, Perplexity not just Google.

Shift: Keywords matter, but authority/citations matter MORE.

Action: 1) Own narrative 2) Make facts citable 3) Build expertise signals 4) Answer directly`,
    
    'e-e-a-t': `E-E-A-T = Experience, Expertise, Authoritativeness, Trustworthiness

2026 Google = hiring manager:
- EXPERIENCE: Done what you talk about?
- EXPERTISE: Real credentials?
- AUTHORITATIVENESS: Others cite you?
- TRUSTWORTHINESS: Site secure/accurate?

AI search cares about citations more than SEO signals.`,
    
    'visibility': `Multi-platform visibility in 2026:

- Traditional search (still matters)
- AI assistants (GEO growing)
- LinkedIn (B2B goldmine)
- Podcast/audio

Build owned media first (email, community), then distribute.`,
    
    'geo': `GEO = Generative Engine Optimization

Unlike SEO (keywords), GEO focuses on:
- Clear citable facts
- Expert citations  
- Direct answers
- Original research

Be authoritative enough for AI to cite you.`,
    
    'seo': `SEO 2.0 = SEO + GEO + Social + Community

The old way: keyword stuff, link buy, trick the algorithm
The new way: own expertise, build community, earn citations, answer questions

SEO 2.0 = Technical base + genuine expertise + multi-platform presence + community credibility`,
    
    'seo 2.0': `SEO 2.0 = SEO + GEO + Social + Community

Old SEO: keyword stuff, link schemes, trick the algorithm
New SEO: own expertise, build community, earn citations, answer directly

The shift from manipulation to merit. Build real expertise and the rest follows.`
  },
  
  'scope': {
    'midas': `Midas Mindset: gold through systems thinking.

1. PROCESS: Build systems that compound
2. OPTIMIZE: Improve workflows continuously
3. NEEDLE VS NOISE: Know what moves the needle

Apply: bottleneck -> system -> test -> scale -> repeat.`
  },
  
  'plex': {
    'trends': `2026 trends:
1. AI-FIRST POSITIONING: specific value not claims
2. PLG: product-led still dominant
3. COMMUNITY: beats advertising
4. VERTICAL: horizontals dying`
  }
};

export async function POST(req: Request) {
  try {
    const { nodeId, emailCaptured, query } = await req.json();
    const nodeKey = nodeId || 'boost';
    const alreadyCaptured = emailCaptured === true;
    
    let answer = NODE_RESPONSES[nodeKey];
    
    if (query && query.length > 3) {
      const ql = query.toLowerCase();
      const handlers = QUERY_HANDLERS[nodeKey] || QUERY_HANDLERS['boost'];
      
      for (const [kw, resp] of Object.entries(handlers)) {
        if (ql.includes(kw)) {
          answer = resp;
          break;
        }
      }
    }
    
    const response = {
      nodeId: nodeKey,
      answer: answer,
      citations: [],
      confidence: 'high',
      shouldBlur: !alreadyCaptured,
      emailRequired: !alreadyCaptured,
      queryRemaining: 4,
      shouldRedirect: false,
      handoff: { type: 'none' },
      axisMessage: alreadyCaptured 
        ? 'Welcome back! Let me connect you with insights.'
        : 'AXIS processed your query.'
    };
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}