import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const NODE_RESPONSES: Record<string, string> = {
  'axis': `You have stepped into the MT Media AI Intelligence Grid. I am AXIS - the Prompt Commander.`,
  
  'prime': `I am PRIME - built on founder Kareem Daniel's vision. Your brand strategy partner.`,
  
  'scope': `I am SCOPE - the COO. Systems, processes, outcomes. The Midas Mindset is about gold through systems thinking.`,
  
  'boost': `I am BOOST - discoverability across search, social, content, earned media, and AI search (GEO).`,
  
  'vibe': `I am VIBE - brand identity specialist. Brand is a feeling.`,
  
  'plex': `I am PLEX - intelligence gatherer and research specialist.`,
  
  'mega-re': `I am MEGA-RE - property intelligence expert.`,
  
  'mega-ins': `I am MEGA-INS - insurance and risk protection advocate.`,
  
  'mega-legacy': `I am MEGA-LEGACY - legacy and estate planning specialist.`
};

// Query-specific responses
const QUERY_HANDLERS: Record<string, Record<string, string>> = {
  'boost': {
    'ai search': `AI search (GEO) is the new frontier. Unlike traditional SEO (optimizing for Google), you optimize for ChatGPT, Claude, Perplexity and AI assistants.

The shift: Keywords still matter, but authority, citations, and clear answers matter MORE. 

Action steps: 
1) Own your narrative completely 
2) Make facts easy to cite 
3) Build genuine expertise signals 
4) Answer questions directly, not with fluff`,
    
    'e-e-a-t': `E-E-A-T = Experience, Expertise, Authoritativeness, Trustworthiness

In 2026, Google evaluates content like a hiring manager:
- EXPERIENCE: Have you actually done what you're talking about?
- EXPERTISE: Do you have real credentials?
- AUTHORITATIVENESS: Do others cite you as an authority?
- TRUSTWORTHINESS: Is your site secure, transparent, accurate?

For AI search: citations and clear attribution matter MORE than traditional SEO signals. Build your expertise paper trail.`,
    
    'visibility': `Visibility in 2026 is multi-platform. The old Google-first approach is dead.

Channels to own: 
- Traditional search (still matters)
- AI assistants (GEO - growing fast)
- LinkedIn (B2B goldmine)
- Podcast/audio

Build owned media first (email list, community), then distribute.`,
    
    'geo': `GEO (Generative Engine Optimization) = optimizing for AI assistants

Unlike SEO (keyword density), GEO focuses on:
- Clear, citable facts
- Expert citations
- Direct answers to questions
- Original research/data

Your content must be authoritative enough for AI to confidently cite you as a source.`
  },
  
  'scope': {
    'midas': `The Midas Mindset: Turn everything you touch into gold through systems thinking.

Three principles:
1. PROCESS OVER PERFECTION: Build systems that compound your effort
2. PATIENT OPTIMIZATION: Continuously improve workflows 
3. NEEDLE VS NOISE: Know what moves the needle

SCOPE applies: Identify bottleneck -> Design system -> Test -> Scale -> Repeat

What operational challenge can I help you apply this to?`
  },
  
  'plex': {
    'trends': `2026 B2B SaaS marketing trends:

1. AI-FIRST POSITIONING: Every vendor claiming AI - you need specific value
2. PLG DEEPENS: Product-led growth still dominant
3. COMMUNITY AS MOAT: Building genuine communities beats advertising
4. VERTICAL-SPECIFIC: Horizontal tools dying, verticals winning

What's your space? I can go deeper.`
  }
};

export async function POST(req: Request) {
  try {
    const { nodeId, emailCaptured, query } = await req.json();
    const nodeKey = nodeId || 'prime';
    const alreadyCaptured = emailCaptured === true;
    
    let answer = NODE_RESPONSES[nodeKey] || NODE_RESPONSES['boost'];
    
    // Try to find a specific answer
    if (query && query.length > 5) {
      const queryLower = query.toLowerCase();
      const handlers = QUERY_HANDLERS[nodeKey];
      
      if (handlers) {
        for (const [keyword, response] of Object.entries(handlers)) {
          if (queryLower.includes(keyword)) {
            answer = response;
            break;
          }
        }
      }
    }
    
    const response = {
      nodeId: nodeKey,
      answer: answer,
      citations: [],
      confidence: 'high' as const,
      shouldBlur: !alreadyCaptured,
      emailRequired: !alreadyCaptured,
      queryRemaining: 4,
      shouldRedirect: false,
      handoff: { type: 'none' as const },
      axisMessage: alreadyCaptured 
        ? 'Welcome back! Let me connect you with insights.'
        : 'AXIS processed your query.'
    };
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}