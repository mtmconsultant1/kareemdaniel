"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const acts = [
  {
    act: "I",
    title: "The Forge",
    subtitle: "Sysco Warehouse -- 10 Years",
    description:
      "Ten years on the Sysco warehouse floor. Fortune 500 scale. Operations and safety specialist who reduced incidents by 10 percent and pushed department efficiency up 5 percent. Not from a desk -- from the concrete floor where it actually matters. You show up. You lift. You survive. That discipline becomes the foundation everything else gets built on. Then the body says no. Hip replacement. The machine breaks but the operator does not.",
    tag: "THE GRIND",
  },
  {
    act: "II",
    title: "The Pivot",
    subtitle: "Lee College -- AAS Process Technology -- Honors Graduate",
    description:
      "Back to school with purpose. Studied process technology, graduated with honors, proved the mind was always the strongest muscle. But the doors didnt open. No connections. No network. The degree existed but the access didnt. The system said you needed someone to know someone. So Kareem decided to become someone people know.",
    tag: "THE EDUCATION",
  },
  {
    act: "III",
    title: "The Builder",
    subtitle: "Youth Basketball Organization -- Community Leader",
    description:
      "If the front door wont open, build your own building. Self-funded a youth basketball organization -- Baytown Blitz. Grew it to 200 plus athletes enrolled. Ninety five percent participant satisfaction. Thirty percent growth in player participation. Exceeded fundraising goals fifteen percent above target every year. Pulled kids off the streets and put them in a gym. Built something real, something that mattered, something with heart. And then the pandemic took it all away. But you cant unbuild a leader once they have led.",
    tag: "THE COMMUNITY",
  },
  {
    act: "IV",
    title: "The Awakening",
    subtitle: "AI Discovery -- PPM to MTM",
    description:
      "In the quiet after the pandemic, Kareem discovered AI. Not as a tool. As a partner. PPM was born first, then evolved into MTM Media AI. From day one, the results spoke. Twenty eight percent increase in client engagement across managed accounts. Thirty five percent improvement in brand sentiment. Sixty percent reduction in project turnaround times by deploying AI agent workflows. Built custom automation systems using Airtable, Wordware, and Google Cloud Platform. Orchestrated teams of AI agents and human collaborators on concurrent client projects. The same instinct that built the gym now built something digital. The same leadership that guided two hundred kids now leads a Golden Legion. The pivot was not a career change. It was a homecoming.",
    tag: "THE SPARK",
  },
  {
    act: "V",
    title: "The Meta-Organism",
    subtitle: "Golden Legion -- The Forge -- Ever-Evolving",
    description:
      "What started as curiosity is now an ecosystem. The Golden Legion AI squad powers everything. The Forge gives intelligence a voice. Multiple sites, multiple agents, multiple industries. Ever-evolving, always building. The Architect doesnt rest. The Architect scales.",
    tag: "THE EMPIRE",
  },
];

export default function ChroniclesSection() {
  const [expandedAct, setExpandedAct] = useState<number | null>(null);

  return (
    <section id="chronicles" className="relative py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
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
            THE KAREEM CHRONICLES
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
            From the Floor
            <br />
            <span style={{ color: "#D4AF37" }} className="gold-glow">to the Future</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {acts.map((act, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className={`glass-card` + (expandedAct === index ? "" : "")}
                onClick={() => setExpandedAct(expandedAct === index ? null : index)}
                style={{ cursor: "none" }}
              >
                <div className="flex items-start gap-4">
                  {/* Act number */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: "radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%)",
                      color: "#D4AF37",
                      fontFamily: "var(--font-playfair)",
                      fontSize: "0.85rem",
                    }}
                  >
                    {act.act}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs tracking-[0.3em] uppercase mb-1"
                      style={{ color: "#47464B", fontFamily: "var(--font-tech)" }}
                    >
                      Act {act.act} -- {act.tag}
                    </p>
                    <h3
                      className="text-xl md:text-2xl mb-1 tracking-wider"
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontWeight: 700,
                        color: "#F5F5F5",
                      }}
                    >
                      {act.title}
                    </h3>
                    <p
                      className="text-sm mb-3"
                      style={{
                        color: "#B6862C",
                        fontFamily: "var(--font-ui)",
                        fontStyle: "italic",
                      }}
                    >
                      {act.subtitle}
                    </p>
                    <motion.p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "#E1E1E1",
                        fontFamily: "var(--font-merriweather)",
                        fontWeight: 300,
                        lineHeight: "1.8",
                      }}
                      animate={{
                        height: expandedAct === index ? "auto" : "4.8em",
                      }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {act.description}
                    </motion.p>
                    <p
                      className="text-xs mt-3"
                      style={{ color: "#47464B", fontFamily: "var(--font-tech)" }}
                    >
                      {expandedAct === index ? "( Tap to collapse )" : "( Tap to expand )"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
