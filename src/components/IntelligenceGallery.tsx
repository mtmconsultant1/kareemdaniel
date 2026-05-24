"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Shield,
  Zap,
  Target,
  Eye,
  Search,
  Home,
  Lock,
  Heart,
  Send,
  Loader2,
  X,
  Mail,
  ExternalLink,
} from "lucide-react";

type Agent = {
  id: string;
  name: string;
  layer: string;
  icon: React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>;
  desc: string;
  color: string;
};

type Citation = {
  title: string;
  url: string;
  excerpt?: string;
  updatedAt?: string;
};

type GridResponse = {
  nodeId: string;
  answer: string;
  citations: Citation[];
  confidence: "high" | "medium" | "low";
  shouldBlur: boolean;
  emailRequired: boolean;
  queryRemaining: number;
  shouldRedirect: boolean;
  redirectTarget?: string;
  handoff: {
    type: "none" | "email" | "telegram" | "social" | "human";
    target?: string;
    reason?: string;
  };
  axisMessage: string;
};

const AGENTS: Agent[] = [
  { id: "axis", name: "AXIS", layer: "Executive", icon: Zap, desc: "Prompt Commander & Central Nervous System (CNS)", color: "#FFD700" },
  { id: "prime", name: "PRIME", layer: "Executive", icon: Cpu, desc: "Personal Brand & My 2nd Brain — See How I Would Answer", color: "#E5E4E2" },
  { id: "scope", name: "SCOPE", layer: "Executive", icon: Shield, desc: "Chief Operating Intelligence & Everyday Operations", color: "#C0C0C0" },
  { id: "boost", name: "BOOST", layer: "Operations", icon: Target, desc: "SEO 2.0 & Visibility", color: "#00D4FF" },
  { id: "vibe", name: "VIBE", layer: "Operations", icon: Eye, desc: "Brand Identity & Discoverability", color: "#FF007F" },
  { id: "plex", name: "PLEX", layer: "Operations", icon: Search, desc: "Market Intelligence & Research", color: "#FFFFFF" },
  { id: "mega-re", name: "MEGA-RE", layer: "Specialist", icon: Home, desc: "Real Estate (Example: Establish)", color: "#4CAF50" },
  { id: "mega-ins", name: "MEGA-INS", layer: "Specialist", icon: Lock, desc: "Life Insurance (Example: Protect)", color: "#2196F3" },
  { id: "mega-legacy", name: "MEGA-LEGACY", layer: "Specialist", icon: Heart, desc: "End-of-Life Planning (Example: Prepare)", color: "#9C27B0" },
];
const NODE_LIMIT = 5;

function normalizeId(value: string) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/_/g, "-");
}

function getVisitorId() {
  if (typeof window === "undefined") return "";

  const existing = localStorage.getItem("mtm_visitor_id");
  if (existing) return existing;

  const id = crypto.randomUUID();
  localStorage.setItem("mtm_visitor_id", id);
  return id;
}

function getNodeUsageKey(visitorId: string, nodeId: string) {
  return `mtm_grid_queries:${visitorId}:${normalizeId(nodeId)}`;
}

function getNodeQueryCount(visitorId: string, nodeId: string) {
  if (typeof window === "undefined" || !visitorId || !nodeId) return 0;

  const raw = localStorage.getItem(getNodeUsageKey(visitorId, nodeId));
  const count = Number(raw || "0");
  return Number.isFinite(count) ? Math.max(0, count) : 0;
}

function setNodeQueryCount(visitorId: string, nodeId: string, count: number) {
  if (typeof window === "undefined" || !visitorId || !nodeId) return;
  localStorage.setItem(getNodeUsageKey(visitorId, nodeId), String(Math.max(0, count)));
}

export default function IntelligenceGallery() {
  const [systemStatus, setSystemStatus] = useState<unknown>(null);
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [response, setResponse] = useState<GridResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);

  const [visitorId, setVisitorId] = useState("");
  const [redirectTarget, setRedirectTarget] = useState<string | null>(null);

  const selectedAgentColor = useMemo(() => {
    return AGENTS.find((a) => a.id === activeAgent?.id)?.color || "#FFD700";
  }, [activeAgent]);

  useEffect(() => {
    const id = getVisitorId();
    setVisitorId(id);

    const savedEmail = localStorage.getItem("mtm_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setEmailCaptured(true);
    }

    const fetchStatus = async () => {
      try {
        const response = await fetch("/api/grid/status");
        if (!response.ok) throw new Error("Bridge unreachable");
        const data = await response.json();
        setSystemStatus(data);
      } catch {
        setSystemStatus(null);
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    if (!redirectTarget) return;

    const t = window.setTimeout(() => {
      window.location.href = redirectTarget;
    }, 1400);

    return () => window.clearTimeout(t);
  }, [redirectTarget]);

  const handleEngage = async (agent: Agent) => {
    setError(null);
    setActiveAgent(agent);
    setQuery("");
    const usedQueries = getNodeQueryCount(visitorId, agent.id);

    setResponse({
      nodeId: agent.id,
      answer: "Ready. Type your question above, then click a node to engage.",
      citations: [],
      confidence: "low",
      shouldBlur: false,
      emailRequired: false,
      queryRemaining: Math.max(NODE_LIMIT - usedQueries, 0),
      shouldRedirect: false,
      handoff: { type: "none" },
      axisMessage: "Axis is routing your query to " + agent.name,
    });
  };

  const handleEmailCapture = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !visitorId || !activeAgent) return;

    setEmailSubmitting(true);

    try {
      const res = await fetch("/api/grid/capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitorId,
          email: email.trim(),
          source: "kareem-chronicles-grid",
          nodeInterest: activeAgent.id,
          firstName: "",
        }),
      });

      if (!res.ok) {
        throw new Error(`Capture failed: ${res.status}`);
      }

      localStorage.setItem("mtm_email", email.trim());
      localStorage.setItem("mtm_email_captured", "true");

      setEmailCaptured(true);
      setShowEmailGate(false);
      setResponse((prev) =>
        prev
          ? {
              ...prev,
              shouldBlur: false,
              emailRequired: false,
            }
          : prev
      );
    } catch {
      setError("Email capture bridge failed. Please try again.");
    } finally {
      setEmailSubmitting(false);
    }
  };

  const closeResponse = () => {
    setResponse(null);
    setShowEmailGate(false);
    setActiveAgent(null);
    setError(null);
  };

  return (
    <section className="bg-black text-white py-20 px-4 font-['Merriweather']">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-['Playfair_Display_SC'] font-black mb-4 tracking-tighter"
            style={{
              color: "#FFFFFF",
              textShadow: "0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 40px rgba(255,255,255,0.5)",
            }}>
            INTELLIGENCE GRID
          </h2>

          <p className="text-zinc-400 text-sm mb-6 max-w-xl mx-auto leading-relaxed">
            Choose a node below that matches your needs. Ask questions freely. You get 5 free queries per node. 
            Enter your email once to unlock full responses, then explore the other nodes. Or visit{" "}
            <a href="https://mtmarmory.vercel.app" target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:underline">mtmarmory.vercel.app</a>{" "}
            for free tools.
          </p>

          <div className="max-w-2xl mx-auto relative mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-4 px-6 focus:outline-none focus:border-white transition-all text-sm pr-12 text-white"
              onKeyDown={(e) => e.key === "Enter" && activeAgent && handleEngage(activeAgent)}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2">
              {isProcessing ? (
                <Loader2 size={18} className="animate-spin text-[#FFD700]" />
              ) : (
                <Send size={18} className="text-zinc-600" />
              )}
            </div>
          </div>

          {error && (
            <div className="max-w-2xl mx-auto mb-8 bg-red-950/40 border border-red-900 text-red-200 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

<AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                className="fixed inset-4 z-50 max-w-4xl mx-auto"
              >
                <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-xl shadow-2xl h-full flex flex-col">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
                    <div>
                      <p
                        className="text-[10px] uppercase tracking-[0.35em] font-bold"
                        style={{ color: selectedAgentColor }}
                      >
                        {activeAgent?.name.toUpperCase()} · INTERACTING
                      </p>
                      <p className="text-zinc-500 text-xs mt-1">
                        {response.queryRemaining} queries remaining
                      </p>
                    </div>

                    <button
                      onClick={closeResponse}
                      className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                      aria-label="Close response"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-auto p-6 md:p-8">
                    <div className="space-y-6">
                      <p className="text-zinc-400 text-xs uppercase tracking-[0.28em]">
                        Ask {activeAgent?.name}
                      </p>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Type your question..."
                          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-all text-sm text-white"
                          disabled={isProcessing}
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            if (!query.trim() || !activeAgent) return;
                            setIsProcessing(true);
                            try {
                              const nextQueryCount = getNodeQueryCount(visitorId, activeAgent.id) + 1;
                              const res = await fetch('/api/grid/query', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  nodeId: activeAgent.id,
                                  query: query.trim(),
                                  emailCaptured,
                                  queryCount: nextQueryCount,
                                })
                              });
                              if (!res.ok) {
                                throw new Error(`Query failed: ${res.status}`);
                              }
                              const data = await res.json();
                              setNodeQueryCount(visitorId, activeAgent.id, nextQueryCount);
                              setResponse(data);
                              if (data.shouldRedirect && data.redirectTarget) {
                                setRedirectTarget(data.redirectTarget);
                              }
                              // Only show email gate if not already captured
                              if (data.emailRequired && !emailCaptured) {
                                setShowEmailGate(true);
                              }
                            } catch {
                              setError('Query failed. Please try again.');
                            } finally {
                              setIsProcessing(false);
                            }
                          }}
                          disabled={!query.trim() || isProcessing}
                          className="px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                        >
                          {isProcessing ? "..." : "Ask"}
                        </button>
                      </div>

                      {isProcessing && (
                        <div className="flex flex-col items-center justify-center py-12">
                          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B6862C] animate-pulse flex items-center justify-center">
                            <span className="text-4xl">🧠</span>
                          </div>
                          <p className="text-zinc-500 text-xs uppercase tracking-widest mt-4">
                            Axis is enhancing your query...
                          </p>
                        </div>
                      )}
                    </div>

                    {response && response.answer && !isProcessing && (
                      <>
                        <p className="text-zinc-400 text-xs uppercase tracking-[0.28em] mb-4">
                          {response.axisMessage}
                        </p>

                        <div className="relative">
                          <motion.div
                            animate={{
                              filter: response.shouldBlur ? "blur(9px)" : "blur(0px)",
                              opacity: response.shouldBlur ? 0.25 : 1,
                            }}
                            transition={{ duration: 0.25 }}
                            className="text-zinc-100 text-sm md:text-base leading-7 whitespace-pre-wrap"
                          >
                            {response.answer}
                          </motion.div>

                          {response.shouldBlur && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-4 text-center shadow-lg">
                                <p className="text-sm text-white font-medium">Answer ready.</p>
                                <p className="text-xs text-zinc-300 mt-1">
                                  Enter your email to reveal the full response.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {response.citations?.length > 0 && (
                          <div className="mt-8">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-3">
                              Sources
                            </p>
                            <div className="space-y-2">
                              {response.citations.map((c, idx) => (
                                <a
                                  key={`${c.url}-${idx}`}
                                  href={c.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 hover:border-zinc-600 transition-all"
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <p className="text-sm font-semibold text-zinc-200">{c.title}</p>
                                      {c.excerpt && (
                                        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                                          {c.excerpt}
                                        </p>
                                      )}
                                    </div>
                                    <ExternalLink size={14} className="text-zinc-500 mt-1 shrink-0" />
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {response.handoff?.type !== "none" && (
                          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">
                              Human in the loop
                            </p>
                            <p className="text-sm text-zinc-300">
                              {response.handoff.reason || "This request needs human follow-up."}
                            </p>
                            {response.handoff.target && (
                              <a
                                href={`mailto:${response.handoff.target}`}
                                className="inline-flex items-center gap-2 mt-3 text-xs uppercase tracking-widest text-[#FFD700] hover:underline"
                              >
                                <Mail size={14} />
                                {response.handoff.target}
                              </a>
                            )}
                          </div>
                        )}

                        {response.shouldRedirect && response.redirectTarget && (
                          <div className="mt-6 rounded-xl border border-amber-700/40 bg-amber-950/20 p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-amber-300 mb-2">
                              Quota reached
                            </p>
                            <p className="text-sm text-zinc-300">
                              This node has reached its limit. You&apos;ll be softly redirected.
                            </p>
                            <a
                              href={response.redirectTarget}
                              className="inline-flex items-center gap-2 mt-3 text-xs uppercase tracking-widest text-amber-300 hover:underline"
                            >
                              Continue <ExternalLink size={14} />
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-12">
          <div>
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "#D4AF37", textShadow: "0 0 10px #D4AF37, 0 0 20px rgba(212,175,55,0.5)" }}>Executive Layer</p>
              <p className="text-xs text-zinc-500">Strategic leadership & company vision.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AGENTS.filter(a => a.layer === "Executive").map((agent) => (
                <motion.div
                  key={agent.id}
                  whileHover={{ scale: 1.02, borderColor: agent.color }}
                  className="relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <agent.icon size={28} style={{ color: agent.color }} />
                    <div
                      className={`w-2 h-2 rounded-full ${
                        systemStatus ? "bg-green-500 animate-pulse" : "bg-zinc-700"
                      }`}
                    />
                  </div>

                  <h3
                    className="text-xl font-bold mb-2 uppercase"
                    style={{ color: agent.color }}
                  >
                    {agent.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6">{agent.desc}</p>

                  <button
                    type="button"
                    onClick={() => handleEngage(agent)}
                    disabled={isProcessing}
                    className="w-full py-2 text-xs border border-zinc-700 rounded-md hover:bg-white hover:text-black transition-all uppercase font-bold disabled:opacity-50"
                  >
                    {isProcessing && activeAgent?.id === agent.id ? "Processing..." : "Engage"}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "#C0C0C0", textShadow: "0 0 6px rgba(192,192,192,0.4)" }}>Operations Layer</p>
              <p className="text-xs text-zinc-500">Day-to-day execution & deliverable production.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AGENTS.filter(a => a.layer === "Operations").map((agent) => (
                <motion.div
                  key={agent.id}
                  whileHover={{ scale: 1.02, borderColor: agent.color }}
                  className="relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <agent.icon size={28} style={{ color: agent.color }} />
                    <div
                      className={`w-2 h-2 rounded-full ${
                        systemStatus ? "bg-green-500 animate-pulse" : "bg-zinc-700"
                      }`}
                    />
                  </div>

                  <h3
                    className="text-xl font-bold mb-2 uppercase"
                    style={{ color: agent.color }}
                  >
                    {agent.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6">{agent.desc}</p>

                  <button
                    type="button"
                    onClick={() => handleEngage(agent)}
                    disabled={isProcessing}
                    className="w-full py-2 text-xs border border-zinc-700 rounded-md hover:bg-white hover:text-black transition-all uppercase font-bold disabled:opacity-50"
                  >
                    {isProcessing && activeAgent?.id === agent.id ? "Processing..." : "Engage"}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "#FFFFFF", textShadow: "0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 40px rgba(255,255,255,0.5)" }}>Specialist Layer</p>
              <p className="text-xs text-zinc-500">MEGA = Chief Client Architect (CCA). Handles client pain points end-to-end across any industry.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AGENTS.filter(a => a.layer === "Specialist").map((agent) => (
                <motion.div
                  key={agent.id}
                  whileHover={{ scale: 1.02, borderColor: agent.color }}
                  className="relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <agent.icon size={28} style={{ color: agent.color }} />
                    <div
                      className={`w-2 h-2 rounded-full ${
                        systemStatus ? "bg-green-500 animate-pulse" : "bg-zinc-700"
                      }`}
                    />
                  </div>

                  <h3
                    className="text-xl font-bold mb-2 uppercase"
                    style={{ color: agent.color }}
                  >
                    {agent.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6">{agent.desc}</p>

                  <button
                    type="button"
                    onClick={() => handleEngage(agent)}
                    disabled={isProcessing}
                    className="w-full py-2 text-xs border border-zinc-700 rounded-md hover:bg-white hover:text-black transition-all uppercase font-bold disabled:opacity-50"
                  >
                    {isProcessing && activeAgent?.id === agent.id ? "Processing..." : "Engage"}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showEmailGate && response && activeAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
          >
            <motion.div
              initial={{ scale: 0.96, y: 14, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 14, opacity: 0 }}
              className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.35em] font-bold"
                    style={{ color: selectedAgentColor }}
                  >
                    {activeAgent.name} · Reveal Gate
                  </p>
                  <p className="text-zinc-500 text-xs mt-1">
                    Email unlock required to reveal the full response.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowEmailGate(false)}
                  className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                  aria-label="Close email gate"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <p className="text-zinc-300 text-sm leading-6">
                    {response.shouldBlur
                      ? "The answer is already here. Enter your email to unlock it."
                      : "Your response is ready."}
                  </p>
                </div>

                <form onSubmit={handleEmailCapture} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={emailSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFD700] px-4 py-3 text-black font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all disabled:opacity-60"
                  >
                    {emailSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Unlocking
                      </>
                    ) : (
                      <>
                        <Mail size={16} />
                        Reveal Answer
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
