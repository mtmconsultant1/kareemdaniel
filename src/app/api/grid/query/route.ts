import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const NODE_RESPONSES: Record<string, string> = {
  'axis': `You have stepped into the MT Media AI Intelligence Grid. I am AXIS - the Prompt Commander and central nervous system.

Before you type anything, I intercept every query and enhance it. What you type and what the agents receive are different - and that gap is where the gold lives.

Tell me what you need. I'll route to the right specialist.`,
  
  'prime': `I am PRIME - built on the vision of founder Kareem Daniel.

My domain is personal brand intelligence, founder thinking, and thought leadership strategy. I dont just answer questions - Im your thinking partner on brand positioning.

What brand challenge are you working through?`,
  
  'scope': `I am SCOPE - the COO of this grid. If Prime is vision, Im the machine that makes it inevitable.

I think in systems, processes, and outcomes. The Midas Mindset is about turning everything you touch into gold - through systems thinking, not magic.

SCOPE works: Identify bottleneck -> Design system -> Test -> Scale -> Repeat.

What operations challenge do you face?`,
  
  'boost': `I am BOOST - at the frontier of discoverability.

Google is one channel. I play the whole board: search, social, content, earned media, AI search (GEO), and beyond.

AI search (GEO) is the new frontier. Unlike traditional SEO (optimizing for Google), GEO optimizes for ChatGPT, Claude, Perplexity and AI assistants. Here's the shift: keywords still matter, but authority, citations, and clear answers matter MORE. Businesses need to own their narrative and make it easy for AI to cite them.`,
  
  'vibe': `I am VIBE - brand identity specialist.

Brand is a feeling - your voice, visual direction, and the emotional imprint you leave. I help you clarify and own your unique brand identity.

What brand challenge are you facing?`,
  
  'plex': `I am PLEX - intelligence gatherer.

I synthesize data, find patterns, and surface insights. 2026 B2B SaaS trends: AI-first positioning, product-led growth PLG, community as moat, and vertical-specific solutions are hot.`,
  
  'mega-re': `I am MEGA-RE - property intelligence.

Real estate investment in 2026: Interest rates stabilizing, rental demand up in secondary markets. First-time buyers struggling - rent-to-own gaining traction.`,
  
  'mega-ins': `I am MEGA-INS - insurance advocate.

2026 insurance trends: AI risk assessment speeding up claims, cyber coverage demand spiking, term life still most cost-effective for most.`,
  
  'mega-legacy': `I am MEGA-LEGACY - legacy planning.

Digital estate planning is evolving - crypto wills becoming legitimate, pre-planning conversations easier with Gen Z being more open about mortality.`
};

export async function POST(req: Request) {
  try {
    const { nodeId, emailCaptured, query } = await req.json();
    const nodeKey = nodeId || 'prime';
    const alreadyCaptured = emailCaptured === true;
    
    // Get base response
    let answer = NODE_RESPONSES[nodeKey] || NODE_RESPONSES['prime'];
    
    // If there's a specific question, answer it more directly
    if (query && query.length > 10) {
      if (nodeKey === 'scope' && query.toLowerCase().includes('midas')) {
        answer = `The Midas Mindset: Turn everything you touch into gold through systems thinking.

Three principles:
1. PROCESS OVER PERFECTION: Build systems that compound your effort
2. PATIENT OPTIMIZATION: Continuously improve workflows, not just outcomes  
3. NEEDLE VS NOISE: Know what moves the needle vs. what just feels busy

SCOPE applies this: Identify bottleneck -> Design system -> Test -> Scale -> Repeat

What operational challenge can I help you apply this to?`;
      } else if (nodeKey === 'boost' && query.toLowerCase().includes('ai search')) {
        answer = `AI search (GEO) is the new frontier. Unlike traditional SEO (optimizing for Google), you optimize for ChatGPT, Claude, Perplexity and AI assistants.

The shift: Keywords still matter, but authority, citations, and clear answers matter MORE. Your content needs to be authoritative enough for AI to confidently cite you.

Action steps: 1) Own your narrative completely 2) Make facts easy to cite 3) Build genuine expertise signals 4) Answer questions directly, not with fluff`;
      } else if (nodeKey === 'boost' && query.toLowerCase().includes('visibility')) {
        answer = `Visibility in 2026 is multi-platform. The old Google-first approach is dead.

Channels to own: 
- Traditional search (still matters)
- AI assistants (GEO - growing fast)
- LinkedIn (B2B goldmine)
- Podcast/audio (underserved)

My recommendation: Build your owned media first (email list, community), then distribute across channels.`;
      } else if (nodeKey === 'plex' && query.toLowerCase().includes('trends')) {
        answer = `2026 B2B SaaS marketing trends:

1. AI-FIRST POSITIONING: Every vendor claiming AI - you need specific value
2. PLG DEEPENS: Product-led growth still dominant, but sales still wins for enterprise
3. COMMUNITY AS MOAT: Building genuine communities beats advertising
4. VERTICAL-SPECIFIC: Horizontal tools dying, verticals winning

What's your space? I can go deeper.`;
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