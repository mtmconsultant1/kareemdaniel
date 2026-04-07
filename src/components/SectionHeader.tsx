"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  title,
  subtitle,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* ECHO: Smoke-Gray Containment Field */}
      <div
        className="inline-block rounded-2xl px-6 py-4 mb-8"
        style={{
          background: "linear-gradient(135deg, rgba(138,138,142,0.06) 0%, rgba(138,138,142,0.02) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.08) inset, 0 4px 16px rgba(0,0,0,0.2), 0 0 30px rgba(138,138,142,0.04)",
        }}
      >
        {/* NINA: Ultra-Bright HID Glow Title */}
        <h2
          className="text-3xl md:text-5xl lg:text-6xl tracking-wider"
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "#FFFFFF",
            textShadow: `
              0 0 10px rgba(255, 255, 255, 0.9),
              0 0 20px rgba(255, 255, 255, 0.7),
              0 0 40px rgba(255, 255, 255, 0.5),
              0 0 80px rgba(255, 255, 255, 0.3),
              0 0 120px rgba(255, 255, 255, 0.15)
            `,
          }}
        >
          {title}
        </h2>
      </div>

      {/* GOLDIE: Explanatory Gold Subtitle */}
      <p
        className="text-xs md:text-sm tracking-[0.4em] uppercase"
        style={{
          color: "#B6862C",
          fontFamily: "var(--font-merriweather)",
          fontWeight: 400,
          maxWidth: "680px",
          margin: `${align === "center" ? "0 auto" : "0"}`,
          textAlign: align,
          textShadow: "0 0 20px rgba(212,175,55,0.15), 0 0 40px rgba(212,175,55,0.06)",
          lineHeight: "1.8",
          paddingLeft: align === "center" ? 0 : "1rem",
          paddingRight: align === "center" ? 0 : "1rem",
        }}
      >
        {subtitle}
      </p>
    </motion.div>
  );
}
