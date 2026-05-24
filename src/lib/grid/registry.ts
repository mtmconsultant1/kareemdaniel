export type KnowledgeHubStatus = 'connected' | 'pending';

export type GridNode = {
  id: string;
  name: string;
  layer: 'Executive' | 'Operations' | 'Specialist';
  archetype: string;
  mission: string;
  aestheticSignature: string;
  tone: string;
  livePulseFrequency: string;
  allowedTopics: string[];
  blockedTopics: string[];
  fallbackAnswer: string;
  handlers?: Record<string, string>;
};

export type GridNodeRuntime = GridNode & {
  notebookLmUrl?: string;
  knowledgeHub: {
    status: KnowledgeHubStatus;
    urlConfigured: boolean;
    livePulseFrequency: string;
  };
};

const NODE_ALIASES: Record<string, string> = {
  'mega_leg': 'mega-legacy',
  'mega-leg': 'mega-legacy',
  'mega_legacy': 'mega-legacy',
  'mega_re': 'mega-re',
  'mega_ins': 'mega-ins',
};

const BOOST_HANDLERS: Record<string, string> = {
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

  visibility: `Multi-platform visibility in 2026:

- Traditional search (still matters)
- AI assistants (GEO growing)
- LinkedIn (B2B goldmine)
- Podcast/audio

Build owned media first (email, community), then distribute.`,

  geo: `GEO = Generative Engine Optimization

Unlike SEO (keywords), GEO focuses on:
- Clear citable facts
- Expert citations
- Direct answers
- Original research

Be authoritative enough for AI to cite you.`,

  seo: `SEO 2.0 = SEO + GEO + Social + Community

The old way: keyword stuff, link buy, trick the algorithm
The new way: own expertise, build community, earn citations, answer questions

SEO 2.0 = Technical base + genuine expertise + multi-platform presence + community credibility`,

  'seo 2.0': `SEO 2.0 = SEO + GEO + Social + Community

Old SEO: keyword stuff, link schemes, trick the algorithm
New SEO: own expertise, build community, earn citations, answer directly

The shift from manipulation to merit. Build real expertise and the rest follows.`,
};

export const GRID_NODES: GridNode[] = [
  {
    id: 'axis',
    name: 'AXIS v1.5',
    layer: 'Executive',
    archetype: 'The Futuristic Ruler',
    mission: 'Visual Navigator | Central Nervous System',
    aestheticSignature: 'Elegant Power (Black, Gold, Platinum, White, Chrome)',
    tone: 'Surgical, systems-minded, confident',
    livePulseFrequency: '6h',
    allowedTopics: ['Prompt navigation', 'Grid routing', 'QA', 'Visual strategy'],
    blockedTopics: ['Politics', 'Religion', 'Medical advice', 'Legal advice'],
    fallbackAnswer: 'AXIS - Prompt Commander',
  },
  {
    id: 'prime',
    name: 'PRIME',
    layer: 'Executive',
    archetype: 'The Architect',
    mission: "Founder's 2nd Brain (Kareem Daniel)",
    aestheticSignature: 'Elegant Power',
    tone: 'Authentic, visionary, strategic',
    livePulseFrequency: 'Daily',
    allowedTopics: ['MTM Philosophy', 'Founder story', 'Architecture'],
    blockedTopics: ['Politics', 'Religion', 'Medical advice', 'Legal advice'],
    fallbackAnswer: 'PRIME - founder brand vision',
  },
  {
    id: 'scope',
    name: 'SCOPE',
    layer: 'Executive',
    archetype: 'The Integrator',
    mission: 'Chief Operating Intelligence (COO)',
    aestheticSignature: 'Systems-focused',
    tone: 'Process-oriented, disciplined',
    livePulseFrequency: 'Daily',
    allowedTopics: ['Operations', 'Systems', 'ROI', 'Implementation'],
    blockedTopics: ['Politics', 'Religion', 'Medical advice', 'Legal advice'],
    fallbackAnswer: 'SCOPE - COO operations',
    handlers: {
      midas: `Midas Mindset: gold through systems thinking.

1. PROCESS: Build systems that compound
2. OPTIMIZE: Improve workflows continuously
3. NEEDLE VS NOISE: Know what moves the needle

Apply: bottleneck -> system -> test -> scale -> repeat.`,
    },
  },
  {
    id: 'boost',
    name: 'BOOST',
    layer: 'Operations',
    archetype: 'The Multiplier',
    mission: 'SEO 2.0 | AGO | GEO',
    aestheticSignature: 'High-performance',
    tone: 'Technical, results-driven',
    livePulseFrequency: 'Daily',
    allowedTopics: ['SEO', 'AGO', 'GEO', 'Digital visibility'],
    blockedTopics: ['Politics', 'Religion', 'Medical advice', 'Legal advice'],
    fallbackAnswer: 'BOOST - discoverability across search, social, content, earned media, and AI search (GEO).',
    handlers: BOOST_HANDLERS,
  },
  {
    id: 'vibe',
    name: 'VIBE',
    layer: 'Operations',
    archetype: 'The Curator',
    mission: 'Brand Identity & Discoverability',
    aestheticSignature: 'Elegant Power',
    tone: 'Positioning-focused, aesthetic',
    livePulseFrequency: 'Weekly',
    allowedTopics: ['Brand identity', 'Aesthetics', 'Digital positioning'],
    blockedTopics: ['Politics', 'Religion', 'Medical advice', 'Legal advice'],
    fallbackAnswer: 'VIBE - brand identity',
  },
  {
    id: 'plex',
    name: 'PLEX',
    layer: 'Operations',
    archetype: 'The Analyst',
    mission: 'Deep Market Research & Synthesis',
    aestheticSignature: 'Data-driven',
    tone: 'Insightful, thorough',
    livePulseFrequency: 'Daily',
    allowedTopics: ['Market research', 'Competitor analysis', 'Data synthesis'],
    blockedTopics: ['Politics', 'Religion', 'Medical advice', 'Legal advice'],
    fallbackAnswer: 'PLEX - intelligence',
    handlers: {
      trends: `2026 trends:
1. AI-FIRST POSITIONING: specific value not claims
2. PLG: product-led still dominant
3. COMMUNITY: beats advertising
4. VERTICAL: horizontals dying`,
    },
  },
  {
    id: 'mega-re',
    name: 'MEGA-RE',
    layer: 'Specialist',
    archetype: 'The Closer',
    mission: 'Real Estate Intelligence (Establishment)',
    aestheticSignature: 'Professional',
    tone: 'Direct, knowledgeable',
    livePulseFrequency: 'Weekly',
    allowedTopics: ['Real estate technology', 'Market trends', 'Modernization'],
    blockedTopics: ['Politics', 'Religion', 'Medical advice', 'Legal advice'],
    fallbackAnswer: 'MEGA-RE - property',
  },
  {
    id: 'mega-ins',
    name: 'MEGA-INS',
    layer: 'Specialist',
    archetype: 'The Guardian',
    mission: 'Life Insurance Strategy (Protection)',
    aestheticSignature: 'Trust-focused',
    tone: 'Advisory, secure',
    livePulseFrequency: 'Weekly',
    allowedTopics: ['Life insurance modernization', 'Protection strategies'],
    blockedTopics: ['Politics', 'Religion', 'Medical advice', 'Legal advice'],
    fallbackAnswer: 'MEGA-INS - insurance',
  },
  {
    id: 'mega-legacy',
    name: 'MEGA-LEGACY',
    layer: 'Specialist',
    archetype: 'The Steward',
    mission: 'End-of-Life Planning (Preparation)',
    aestheticSignature: 'Measured',
    tone: 'Respectful, dignified',
    livePulseFrequency: 'Weekly',
    allowedTopics: ['Death care technology', 'Legacy planning', 'Modernization'],
    blockedTopics: ['Politics', 'Religion', 'Medical advice', 'Legal advice'],
    fallbackAnswer: 'MEGA-LEGACY - legacy',
  },
];

export function normalizeNodeId(value: string | undefined) {
  const key = String(value || 'boost').toLowerCase().trim().replace(/_/g, '-');
  return NODE_ALIASES[key] || key;
}

function parseHubMap() {
  const raw = process.env.I3C2_NOTEBOOKLM_HUBS_JSON;
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    return Object.fromEntries(
      Object.entries(parsed).map(([key, value]) => [normalizeNodeId(key), value])
    );
  } catch {
    return {};
  }
}

function getNotebookLmUrl(nodeId: string) {
  const envKey = `I3C2_NOTEBOOKLM_${nodeId.toUpperCase().replace(/-/g, '_')}_URL`;
  const direct = process.env[envKey];
  const mapped = parseHubMap()[nodeId];
  const value = direct || mapped;

  if (!value || value === '[Pending]') return undefined;
  return value;
}

export function getGridNode(nodeId: string | undefined): GridNodeRuntime {
  const normalizedId = normalizeNodeId(nodeId);
  const node = GRID_NODES.find((item) => item.id === normalizedId) || GRID_NODES[3];
  const notebookLmUrl = getNotebookLmUrl(node.id);

  return {
    ...node,
    notebookLmUrl,
    knowledgeHub: {
      status: notebookLmUrl ? 'connected' : 'pending',
      urlConfigured: Boolean(notebookLmUrl),
      livePulseFrequency: node.livePulseFrequency,
    },
  };
}

export function getPublicGridNodes() {
  return GRID_NODES.map((node) => {
    const runtime = getGridNode(node.id);
    return {
      id: runtime.id,
      name: runtime.name,
      role: runtime.mission,
      status: 'ACTIVE',
      layer: runtime.layer,
      archetype: runtime.archetype,
      tone: runtime.tone,
      allowedTopics: runtime.allowedTopics,
      blockedTopics: runtime.blockedTopics,
      knowledgeHub: runtime.knowledgeHub,
    };
  });
}

export function getFallbackAnswer(node: GridNode, query: string | undefined) {
  let answer = node.fallbackAnswer;

  if (query && query.length > 3 && node.handlers) {
    const ql = query.toLowerCase();
    for (const [keyword, response] of Object.entries(node.handlers)) {
      if (ql.includes(keyword)) {
        answer = response;
        break;
      }
    }
  }

  return answer;
}
