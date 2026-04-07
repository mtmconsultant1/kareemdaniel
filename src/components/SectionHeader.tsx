"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* ECHO: Containment Field — subtle glass pill, no borders */}
      <div
        className="inline-block px-5 py-3 rounded-full mb-6"
        style={{
          background: "rgba(138,138,142,0.06)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* NINA: Ultra-Bright HID Glow */}
        <h2
          className="text-3xl md:text-5xl lg:text-6xl tracking-wider"
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "#FFFFFF",
            textShadow: "0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 40px rgba(255,255,255,0.5)",
          }}
        >
          {title}
        </h2>
      </div>

      {/* GOLDIE: Explanatory Gold Subtitle */}
      <p
        className="text-xs md:text-sm tracking-[0.35em] uppercase"
        style={{
          color: "#D4AF37",
          fontFamily: "var(--font-merriweather)",
          fontWeight: 300,
          textShadow: "0 0 20px rgba(212,175,55,0.15)",
        }}
      >
        {subtitle}
      </p>

      {/* ROMAN: The Spacing System */}
      <div style={{ height: "2rem" }} />
    </motion.div>
  );
}
