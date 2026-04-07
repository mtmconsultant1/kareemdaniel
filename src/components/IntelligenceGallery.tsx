"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Cpu, Shield, Briefcase, Heart, Search, MessageSquare } from "lucide-react";

interface AgentInstance {
  id: string;
  name: string;
  codename: string;
  specialty: string;
  description: string;
  status: "active" | "training" | "offline";
  greeting: string;
  icon: typeof Cpu;
  color: string;
}

const agents: AgentInstance[] = [
  {
    id: "prime",
    name: "PRIME",
    codename: "The Personal Brain",
    specialty: "Kareem Daniel's Knowledge, Beliefs and Leadership Style",
    description: "Pick Kareem's brain. Ask about his philosophy, his journey, his approach to business and life. This agent is trained on everything he thinks and says.",
    status: "active",
    greeting: "I am Prime. The digital extension of Kareem's mind. What do you want to know?",
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
    greeting: "I am Scope. COO of MTM. I know how this whole machine runs. Ask me anything about the infrastructure.",
    icon: Shield,
    color: "#E5E4E2",
  },
  {
    id: "mega-insurance",
    name: "MEGA-INSURANCE",
    codename: "The Insurance Broker",
    specialty: "Insurance Sales Intelligence",
    description: "A specialized agent trained to navigate the insurance industry. From prospecting strategies to closing techniques to compliance intelligence.",
    status: "active",
    greeting: "I am Mega. Your insurance intelligence engine. What market are we working today?",
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
    greeting: "I am Mega. Operating in the most underserved sector on earth. What death tech challenge can I solve?",
    icon: Heart,
    color: "#C4727F",
  },
  {
    id: "mega-realestate",
    name: "MEGA-REAL ESTATE",
    codename: "Property Intelligence",
    specialty: "Real Estate Markets, Investment and PropTech",
    description: "Real estate intelligence covering market analysis, investment strategies, property technology and everything from residential to commercial.",
    status: "active",
    greeting: "I am Mega. Your real estate brain. Properties, markets, data. What territory are we mapping?",
    icon: Search,
    color: "#7B9CC7",
  },
];

export default function IntelligenceGallery() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentAgent = agents.find((a) => a.id === activeAgent);

  useEffect(() => {
    const timer = setInterval(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
    return () => clearInterval(timer);
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

  const handleSend = () => {
    if (!input.trim() || !currentAgent) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: `Good question. I am ${currentAgent.name}, an MTM intelligence instance. My live model connection is being wired up through the backend. When deployed, this window will give you a real conversation about ${currentAgent.specialty.toLowerCase()}. Right now this is your preview of built intelligence. Tap below to talk to Kareem.`,
      }]);
    }, 600);
  };

  return (
    <section id="intelligence" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-xs tracking-[0.5em] uppercase" style={{ color: "#D4AF37", fontFamily: "var(--font-merriweather)" }}>
            THE INTELLIGENCE GALLERY
          </p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl tracking-wider mb-6"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 900, textTransform: "uppercase", color: "#F5F5F5" }}
          >
            Not a Portfolio.
            <br />
            <span className="gold-glow" style={{ color: "#D4AF37" }}>A Live Feed.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base" style={{ color: "#E1E1E1", fontFamily: "var(--font-merriweather)", fontWeight: 300, lineHeight: "1.8" }}>
            The Armory had tools. This has brains. Each agent below is a working instance trained on specialized industry intelligence. Click one. Start a conversation. See what built intelligence feels like.
          </p>
        </motion.div>

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
                className="glass-card"
                style={{ cursor: "none" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#4ADE80", boxShadow: "0 0 8px rgba(74,222,128,0.6)" }}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-xs tracking-widest uppercase" style={{ color: "#4ADE80", fontFamily: "var(--font-tech)" }}>
                      ONLINE
                    </span>
                  </div>
                  <motion.div animate={{ color: agent.color }}>
                    <IconComponent size={20} />
                  </motion.div>
                </div>

                <h3 className="text-lg tracking-wider mb-1" style={{ fontFamily: "var(--font-playfair)", fontWeight: 900, color: agent.color }}>
                  {agent.name}
                </h3>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#47464B", fontFamily: "var(--font-tech)" }}>
                  {agent.codename}
                </p>
                <p className="text-sm mb-3" style={{ color: "#E1E1E1", fontFamily: "var(--font-merriweather)", fontWeight: 300 }}>
                  {agent.description}
                </p>
                <div className="text-xs tracking-wider uppercase" style={{ color: agent.color, fontFamily: "var(--font-playfair)", fontWeight: 700, marginTop: "auto" }}>
                  {activeAgent === agent.id ? "( Engaged )" : "( Click to Engage )"}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Chat Window */}
        {currentAgent && (
          <motion.div
            className="max-w-3xl mx-auto rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              boxShadow: "0 16px 64px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.06), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-between p-4 md:p-6" style={{ background: "rgba(212,175,55,0.06)" }}>
              <div className="flex items-center gap-3">
                <motion.div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentAgent.color, boxShadow: `0 0 12px ${currentAgent.color}66` }}
                  animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <div>
                  <h4 className="text-sm tracking-widest uppercase" style={{ color: currentAgent.color, fontFamily: "var(--font-playfair)", fontWeight: 700 }}>
                    {currentAgent.name}
                  </h4>
                  <p className="text-xs" style={{ color: "#47464B", fontFamily: "var(--font-tech)" }}>
                    {currentAgent.specialty}
                  </p>
                </div>
              </div>
              <button onClick={() => { setActiveAgent(null); setMessages([]); }}
                className="px-3 py-1 text-xs tracking-wider uppercase transition-all hover:bg-white/5 rounded-full"
                style={{ color: "#47464B", fontFamily: "var(--font-tech)" }}>
                Close
              </button>
            </div>

            <div className="p-4 md:p-6 min-h-[250px] max-h-[350px] overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`mb-4 ${msg.role === "user" ? "text-right" : ""}`}>
                  <div className={`inline-block max-w-[80%] p-3 rounded-[10px] text-sm leading-relaxed`}
                    style={{
                      backgroundColor: msg.role === "user" ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.03)",
                      boxShadow: msg.role === "user"
                        ? "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(212,175,55,0.1)"
                        : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
                      color: "#E1E1E1",
                      fontFamily: "var(--font-merriweather)",
                      fontWeight: 300,
                    }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="px-4 md:px-6 pb-4 md:pb-6 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={`Ask ${currentAgent.name} anything...`}
                className="flex-1 px-4 py-3 text-sm rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.2)",
                  color: "#F5F5F5",
                  fontFamily: "var(--font-merriweather)",
                  outline: "none",
                }}
              />
              <button onClick={handleSend} className="glass-btn-gold text-xs tracking-wider whitespace-nowrap px-5 py-0">
                Send
              </button>
            </div>

            <div className="px-6 py-3 flex items-center justify-center gap-2 text-xs"
              style={{ background: "rgba(212,175,55,0.03)" }}>
              <MessageSquare size={12} style={{ color: "#D4AF37" }} />
              <span style={{ color: "#B6862C", fontFamily: "var(--font-merriweather)", fontStyle: "italic" }}>
                Want an agent trained on YOUR business? Talk to Kareem.
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
