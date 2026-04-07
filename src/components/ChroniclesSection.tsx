"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const acts = [
  {
    act: "I",
    title: "The Forge",
    subtitle: "Sysco Warehouse | 10 Years",
    description:
      "Ten years of carrying the weight. Literally. The Sysco warehouse floor doesn't care about your dreams. It cares about the next pallet, the next box, the next shift. You show up. You lift. You survive. That discipline becomes the foundation everything else gets built on. Then the body says no. Hip replacement. The machine breaks but the operator doesn't.",
    tag: "THE GRIND",
  },
  {
    act: "II",
    title: "The Pivot",
    subtitle: "Lee College | AAS Process Technology | Honors Graduate",
    description:
      "Back to school with purpose. Studied process technology, graduated with honors, proved the mind was always the strongest muscle. But the doors didn't open. No connections. No network. The degree existed but the access didn't. The system said you needed someone to know someone. So Kareem decided to become someone people know.",
    tag: "THE EDUCATION",
  },
  {
    act: "III",
    title: "The Builder",
    subtitle: "Youth Basketball Organization | Community Leader",
    description:
      "If the front door won't open, build your own building. Self-funded a youth basketball organization. Pulled kids off the streets and put them in a gym. Built something real, something that mattered, something with heart. And then the pandemic took it all away. But you can't unbuild a leader once they've led.",
    tag: "THE COMMUNITY",
  },
  {
    act: "IV",
    title: "The Awakening",
    subtitle: "AI Discovery | PPM to MTM",
    description:
      "In the quiet after the pandemic, Kareem discovered AI. Not as a tool. As a partner. PPM was born first, then evolved into MTM Media AI. The same instinct that built the gym now built something digital. The same leadership that guided kids now leads an AI squad. The pivot wasn't a career change. It was a homecoming.",
    tag: "THE SPARK",
  },
  {
    act: "V",
    title: "The Meta-Organism",
    subtitle: "Golden Legion | The Forge | Ever-Evolving",
    description:
      "What started as curiosity is now an ecosystem. The Golden Legion AI squad powers everything. The Forge gives intelligence a voice. Multiple sites, multiple agents, multiple industries. Ever-evolving, always building. The Architect doesn't rest. The Architect scales.",
    tag: "THE EMPIRE",
  },
];

export default function ChroniclesSection() {
  const [expandedAct, setExpandedAct] = useState<number | null>(null);

  return (
    <section id="chronicles" className="relative py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
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
            <span style={{ color: "#D4AF37" }}>to the Future</span>
          </h2>
          <div className="thin-divider mx-auto max-w-xs" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)",
              transform: "translateX(-50%)",
            }}
          />

          {/* Acts */}
          {acts.map((act, index) => (
            <motion.div
              key={index}
              className={`relative mb-8 md:mb-16 md:w-5/12 ${
                index % 2 === 0 ? "md:ml-auto md:pl-16" : "md:mr-auto md:pr-16"
              } md:pl-0`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Timeline dot (desktop) */}
              <div
                className="hidden md:block absolute top-6 w-3 h-3 rounded-full z-10"
                style={{
                  backgroundColor: "#D4AF37",
                  boxShadow: "0 0 20px rgba(212,175,55,0.4)",
                  left: index % 2 === 0 ? "-38px" : "auto",
                  right: index % 2 !== 0 ? "-38px" : "auto",
                }}
              />

              <div
                className={`act-card ${
                  expandedAct === index
                    ? "border-[rgba(212,175,55,0.3)] bg-[rgba(255,255,255,0.06)]"
                    : ""
                }`}
                onClick={() =>
                  setExpandedAct(expandedAct === index ? null : index)
                }
              >
                {/* Act tag */}
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ color: "#D4AF37", fontFamily: "var(--font-ui)" }}
                >
                  Act {act.act} — {act.tag}
                </p>

                {/* Title */}
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

                {/* Subtitle */}
                <p
                  className="text-sm mb-4"
                  style={{
                    color: "#B6862C",
                    fontFamily: "var(--font-ui)",
                    fontStyle: "italic",
                  }}
                >
                  {act.subtitle}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "#E1E1E1",
                    fontFamily: "var(--font-merriweather)",
                    fontWeight: 300,
                    lineHeight: "1.8",
                  }}
                >
                  {expandedAct === index
                    ? act.description
                    : act.description.slice(0, 100) + "..."}
                </p>

                {/* Expand hint */}
                <p
                  className="text-xs mt-3"
                  style={{
                    color: "#47464B",
                    fontFamily: "var(--font-tech)",
                  }}
                >
                  {expandedAct === index ? "[ Click to collapse ]" : "[ Click to expand ]"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
