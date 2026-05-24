import { NextResponse } from 'next/server';
import { askKnowledgeHub } from '@/lib/grid/notebooklm';
import { getFallbackAnswer, getGridNode } from '@/lib/grid/registry';

export const runtime = 'nodejs';

const NODE_LIMIT = Number(process.env.I3C2_NODE_LIMIT || '5');
const REDIRECT_TARGET = process.env.I3C2_REDIRECT_TARGET || 'https://mtmarmory.vercel.app';

export async function POST(req: Request) {
  try {
    const { nodeId, emailCaptured, query, queryCount } = await req.json();
    const node = getGridNode(nodeId);
    const alreadyCaptured = emailCaptured === true;
    const normalizedCount = Number.isFinite(Number(queryCount)) ? Math.max(1, Number(queryCount)) : 1;
    const queryRemaining = Math.max(NODE_LIMIT - normalizedCount, 0);
    const shouldRedirect = normalizedCount > NODE_LIMIT;
    const trimmedQuery = String(query || '').trim();

    let answer = getFallbackAnswer(node, trimmedQuery);
    let citations: Array<{ title: string; url: string; excerpt?: string; updatedAt?: string }> = [];
    let confidence: 'high' | 'medium' | 'low' = 'high';
    let responseSource: 'notebooklm' | 'fallback' = 'fallback';
    let hubError: string | undefined;

    if (trimmedQuery && !shouldRedirect) {
      try {
        const hubAnswer = await askKnowledgeHub(node, trimmedQuery);
        if (hubAnswer) {
          answer = hubAnswer.answer;
          citations = hubAnswer.citations;
          confidence = hubAnswer.confidence;
          responseSource = hubAnswer.source;
        }
      } catch (err) {
        hubError = String(err);
      }
    }

    if (shouldRedirect) {
      answer = 'This node has reached its free query limit. Redirecting you to the MTM Armory for the next step.';
      citations = [];
      responseSource = 'fallback';
    }

    return NextResponse.json({
      nodeId: node.id,
      answer,
      citations,
      confidence,
      shouldBlur: !alreadyCaptured,
      emailRequired: !alreadyCaptured,
      queryRemaining,
      shouldRedirect,
      redirectTarget: shouldRedirect ? REDIRECT_TARGET : undefined,
      handoff: { type: 'none' },
      axisMessage: alreadyCaptured
        ? 'Welcome back. Routing through the Intelligence Grid.'
        : 'AXIS processed your query.',
      responseSource,
      knowledgeHub: {
        ...node.knowledgeHub,
        bridgeConfigured: Boolean(process.env.I3C2_NOTEBOOKLM_BRIDGE_URL),
        responseSource,
        error: hubError,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
