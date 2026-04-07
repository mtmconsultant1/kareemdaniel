"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Bot, Cpu, Shield, Briefcase, Heart, Search, MessageSquare, ExternalLink } from "lucide-react";

interface AgentInstance {
  id: string;
  name: string;
  codename: string;
  specialty: string;
  description: string;
  status: "active" | "training" | "offline";
  greeting: string;
  icon: typeof Bot;
  color: string;
  apiEndpoint?: string;
}

const agents: AgentInstance[] = [
  {
    id: "prime",
    name: "PRIME",
    codename: "The Personal Brain",
    specialty: "Kareem Daniel's Knowledge, Beliefs and Leadership Style",
    description: "Pick Kareem's brain. Ask about his philosophy, his journey, his approach to business and life. This agent is trained on everything he thinks and says.",
    status: "active",
    greeting: "I'm Prime — the digital extension of Kareem's mind. What do you want to know?",
    icon: Cpu,
    color: "#D4AF37",
  },
  {
    id: "scope",
    name: "SCOPE",
    codename: "The COO",
    specialty: "MTM Operations, Systems and Infrastructure",
    description: "The operational brain of MT Media AI. Ask about processes, how the meta-organism runs, or what systems power the whole ecosystem.",
    status: "active",
    greeting: "I'm Scope — COO of MTM. I know how this whole machine runs. Ask me anything about the infrastructure.",
    icon: Shield,
    color: "#E5E4E2",
  },
  {
    id: "mega-insurance",
    name: "MEGA-INSURANCE",
    codename: "The Insurance Broker",
    specialty: "Insurance Sales Intelligence",
    description: "A specialized agent trained to navigate the insurance industry — from prospecting strategies to closing techniques to compliance.",
    status: "active",
    greeting: "I'm Mega — your insurance intelligence engine. What market are we working today?",
    icon: Briefcase,
    color: "#B6862C",
  },
  {
    id: "mega-deathtech",
    name: "MEGA-DEATHTECH",
    codename: "Death Care Intelligence",
    specialty: "Death Tech Innovation and End-of-Life Services",
    description: "The taboo industry specialist. Deep knowledge of death care technology, funeral industry innovation, and end-of-life service modernization.",
    status: "active",
    greeting: "I'm Mega — operating in the most underserved sector on earth. What death tech challenge can I solve?",
    icon: Heart,
    color: "#8B0000",
  },
  {
    id: "mega-realestate",
    name: "MEGA-REAL ESTATE",
    codename: "Property Intelligence",
    specialty: "Real Estate Markets, Investment and PropTech",
    description: "Real estate intelligence covering market analysis, investment strategies, property technology and everything from residential to commercial.",
    status: "active",
    greeting: "I'm Mega — your real estate brain. Properties, markets, data. What territory are we mapping?",
    icon: Search,
    color: "#2E5090",
  },
];

export default function IntelligenceGallery() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentAgent = agents.find((a) => a.id === activeAgent);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAgentClick = (agentId: string) => {
    if (activeAgent === agentId) {
      setActiveAgent(null);
      setMessages([]);
      return;
    }
    const agent = agents.find((a) => a.id === agentId);
    if (agent) {
      setActiveAgent(agentId);
      setMessages([{ role: "assistant", content: agent.greeting }]);
      setInput("");
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !currentAgent) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    setMessages((prev) => [...prev, {
      role: "assistant",
      content: `Great question. I'm ${currentAgent.name} — an MTM intelligence instance. My live model connection is being wired up. When deployed, I'll give you a real answer about ${currentAgent.specialty.toLowerCase()}. For now, this is your preview of the intelligence.`,
    }]);
  };

  return (
    <section id="intelligence" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="mb-4 text-xs tracking-[0.5em] uppercase"
            style={{ color: "#D4AF37", fontFamily: "var(--font-merriweather)" }}
          >
            THE INTELLIGENCE GALLERY
          </p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl tracking-wider mb-6"
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 900,
              textTransform: "uppercase",
              color: "#F5F5F5",
            }}
          >
            Not a Portfolio.
            <br />
            <span
              className="gold-text-glow"
              style={{ color: "#D4AF37" }}
            >
              A Live Feed.
            </span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-sm md:text-base"
            style={{
              color: "#E1E1E1",
              fontFamily: "var(--font-merriweather)",
              fontWeight: 300,
              lineHeight: "1.8",
            }}
          >
            The Armory had tools. This has brains. Each agent below is a working
            instance trained on specialized industry intelligence. Click one.
            Start a conversation. See what built intelligence feels like.
          </p>
          <div className="thin-divider mx-auto max-w-xs mt-8" />
        </motion.div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => handleAgentClick(agent.id)}
                className="agent-card"
              >
                {/* Status indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: agent.status === "active" ? "#4ADE80" : "#EF4444",
                        boxShadow: agent.status === "active"
                          ? "0 0 8px rgba(74,222,128,0.6)"
                          : "none",
                      }}
                    />
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{
                        color: agent.status === "active" ? "#4ADE80" : "#EF4444",
                        fontFamily: "var(--font-tech)",
                      }}
                    >
                      {agent.status === "active" ? "ONLINE" : "OFFLINE"}
                    </span>
                  </div>
                  <motion.div
                    animate={{
                      color: currentAgent?.id === agent.id ? agent.color : "#47464B",
                    }}
                  >
                    <IconComponent size={20} />
                  </motion.div>
                </div>

                {/* Name and codename */}
                <h3
                  className="text-lg tracking-wider mb-1"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 900,
                    color: agent.color,
                  }}
                >
                  {agent.name}
                </h3>
                <p
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{
                    color: "#47464B",
                    fontFamily: "var(--font-tech)",
                  }}
                >
                  {agent.codename}
                </p>

                {/* Specialty */}
                <p
                  className="text-sm mb-3"
                  style={{
                    color: "#E1E1E1",
                    fontFamily: "var(--font-merriweather)",
                    fontWeight: 300,
                  }}
                >
                  {agent.description}
                </p>

                {/* CTA */}
                <div
                  className="text-xs tracking-wider uppercase"
                  style={{
                    color: agent.color,
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                    marginTop: "auto",
                  }}
                >
                  {currentAgent?.id === agent.id ? "[ Chatting ]" : "[ Click to Engage ]"}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Chat Window */}
        {currentAgent && (
          <motion.div
            layoutId={`chat-${currentAgent.id}`}
            className="agent-chat-window max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div className="agent-chat-header flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: currentAgent.color,
                    boxShadow: `0 0 12px ${currentAgent.color}66`,
                  }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div>
                  <h4
                    className="text-sm tracking-widest uppercase"
                    style={{
                      color: currentAgent.color,
                      fontFamily: "var(--font-playfair)",
                      fontWeight: 700,
                    }}
                  >
                    {currentAgent.name}
                  </h4>
                  <p
                    className="text-xs"
                    style={{
                      color: "#47464B",
                      fontFamily: "var(--font-tech)",
                    }}
                  >
                    {currentAgent.specialty}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveAgent(null);
                  setMessages([]);
                }}
                className="px-3 py-1 text-xs tracking-wider uppercase transition-all hover:bg-white/5 rounded"
                style={{
                  color: "#47464B",
                  fontFamily: "var(--font-tech)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                Close
              </button>
            </div>

            {/* Chat Body */}
            <div className="agent-chat-body">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-4 ${msg.role === "user" ? "text-right" : ""}`}
                >
                  <div
                    className={`inline-block max-w-[80%] p-3 rounded text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-right"
                        : ""
                    }`}
                    style={{
                      backgroundColor:
                        msg.role === "user"
                          ? "rgba(212,175,55,0.12)"
                          : "rgba(255,255,255,0.04)",
                      border: `1px solid ${
                        msg.role === "user"
                          ? "rgba(212,175,55,0.2)"
                          : "rgba(255,255,255,0.06)"
                      }`,
                      color: "#E1E1E1",
                      fontFamily: "var(--font-merriweather)",
                      fontWeight: 300,
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="agent-chat-input-area flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={`Ask ${currentAgent.name} anything...`}
                className="flex-1 px-4 py-3 text-sm"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#F5F5F5",
                  fontFamily: "var(--font-merriweather)",
                  borderRadius: "2px",
                  outline: "none",
                }}
              />
              <button
                onClick={handleSend}
                className="px-6 btn-gold text-xs tracking-wider whitespace-nowrap"
              >
                Send
              </button>
            </div>

            {/* CTA Footer */}
            <div
              className="px-6 py-3 flex items-center justify-center gap-2 text-xs"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.04)",
                backgroundColor: "rgba(212,175,55,0.03)",
              }}
            >
              <MessageSquare size={12} style={{ color: "#D4AF37" }} />
              <span
                style={{
                  color: "#B6862C",
                  fontFamily: "var(--font-merriweather)",
                  fontStyle: "italic",
                }}
              >
                Want an agent like this trained on YOUR business? Talk to Kareem.
              </span>
              <ExternalLink size={10} style={{ color: "#47464B" }} />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
