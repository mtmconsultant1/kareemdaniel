import type { GridNodeRuntime } from './registry';

export type KnowledgeHubAnswer = {
  answer: string;
  citations: Array<{
    title: string;
    url: string;
    excerpt?: string;
    updatedAt?: string;
  }>;
  confidence: 'high' | 'medium' | 'low';
  source: 'notebooklm';
};

type BridgePayload = {
  answer?: string;
  citations?: KnowledgeHubAnswer['citations'];
  confidence?: KnowledgeHubAnswer['confidence'];
};

const BRIDGE_URL = process.env.I3C2_NOTEBOOKLM_BRIDGE_URL;
const BRIDGE_KEY = process.env.I3C2_NOTEBOOKLM_BRIDGE_KEY;

export async function askKnowledgeHub(node: GridNodeRuntime, query: string) {
  if (!BRIDGE_URL || !node.notebookLmUrl) {
    return null;
  }

  const res = await fetch(`${BRIDGE_URL.replace(/\/$/, '')}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(BRIDGE_KEY ? { 'X-I3C2-Bridge-Key': BRIDGE_KEY } : {}),
    },
    body: JSON.stringify({
      nodeId: node.id,
      nodeName: node.name,
      notebookLmUrl: node.notebookLmUrl,
      query,
      persona: {
        archetype: node.archetype,
        mission: node.mission,
        tone: node.tone,
        allowedTopics: node.allowedTopics,
        blockedTopics: node.blockedTopics,
      },
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`NotebookLM bridge failed: ${res.status}`);
  }

  const data = (await res.json()) as BridgePayload;
  if (!data.answer) {
    throw new Error('NotebookLM bridge returned no answer');
  }

  return {
    answer: data.answer,
    citations: data.citations || [],
    confidence: data.confidence || 'medium',
    source: 'notebooklm',
  } satisfies KnowledgeHubAnswer;
}
