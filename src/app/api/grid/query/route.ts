import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const NODE_RESPONSES: Record<string, string> = {
  'axis': `You have just stepped into the MT Media AI Intelligence Grid. I am AXIS â€” the Prompt Commander and central nervous system of this grid.

Before you type anything, I intercept every query and enhance it. What you type and what the agents receive are different â€” and that gap is where the gold lives.

Tell me what you need. I'll route to the right specialist and ensure your question gets the answer it deserves.`,
  
  'prime': `I am PRIME â€” built on the vision and strategic philosophy of founder Kareem Daniel.

My domain is personal brand intelligence, founder thinking, and thought leadership strategy. I don't just answer questions â€” I'm your thinking partner on brand positioning, personal narrative, and the mindset that drives business growth.

What brand challenge are you working through?`,
  
  'scope': `I am SCOPE â€” the COO of this grid. If Prime is vision, I'm the machine that makes it inevitable.

I think in systems, processes, and outcomes. Give me your operational challenge and I'll map the path from where you are to where you need to be.

The Midas Mindset is about turning everything you touch into gold â€” not through magic, but through systems thinking. It's the discipline to build processes that compound, the patience to optimize workflows, and the clarity to know what moves the needle versus what just feels busy.

SCOPE works: Identify the bottleneck -> Design the system -> Test -> Scale -> Repeat.

What operations challenge do you face?`,
  
  'boost': `I am BOOST â€” at the frontier of discoverability.

Google is one channel. I play the whole board: search, social, content, earned media, AI search, and beyond.

What visibility question do you have?`,
  
  'vibe': `I am VIBE â€” brand identity specialist.

Brand is a feeling â€” your voice, visual direction, and the emotional imprint you leave. I help you clarify and own your unique brand identity.

What brand challenge are you facing?`,
  
  'plex': `I am PLEX â€” intelligence gatherer.

I synthesize data, find patterns, and surface insights. Deep research and market intelligence is my domain.

What do you need to understand better?`,
  
  'mega-re': `I am MEGA-RE â€” property intelligence.

Real estate, property investment, and wealth building through property. From first home to portfolio, I help you navigate the real estate decision.

What real estate question do you have?`,
  
  'mega-ins': `I am MEGA-INS â€” insurance advocate.

Coverage strategy, financial protection, and risk management. I help you understand what coverage you need and why.

What insurance question can I help with?`,
  
  'mega-legacy': `I am MEGA-LEGACY â€” legacy planning.

End-of-life preparation, estate planning, and the decisions that protect your loved ones. I help make difficult conversations easier.

What legacy planning question do you have?`
};

export async function POST(req: Request) {
  try {
    const { nodeId, emailCaptured, query } = await req.json();
    const nodeKey = nodeId || 'prime';
    const alreadyCaptured = emailCaptured === true;
    
    let answer = NODE_RESPONSES[nodeKey] || NODE_RESPONSES['prime'];
    
    if (query && query.toLowerCase().includes('midas')) {
      answer = `The Midas Mindset is about turning everything you touch into gold â€” not through magic, but through systems thinking.

Here's what it means:
1. PROCESS OVER PERFECTION: Build systems that compound your effort
2. PATIENT OPTIMIZATION: Continuously improve workflows, not just outcomes
3. NEEDLE VS NOISE: Know what actually moves the needle vs. what just feelsbusy

SCOPE applies this by: Identify bottleneck -> Design system -> Test -> Scale -> Repeat

What operational challenge can I help you apply this to?`;
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
        : 'AXIS processed your query. Let me route you to the right specialist.'
    };
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}