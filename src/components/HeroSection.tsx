"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Survivor.", "Builder.", "Founder.", "Architect."];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #0A0A0A 100%)",
          }}
        />
      </div>

      {/* Particle stars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              backgroundColor: `rgba(${Math.random() > 0.7 ? "212,175,55" : "245,245,245"}, ${Math.random() * 0.5 + 0.1})`,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `pulse-gold ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + "s",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          className="mb-6 text-sm tracking-[0.4em] uppercase"
          style={{
            color: "#D4AF37",
            fontFamily: "var(--font-merriweather)",
            fontWeight: 300,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          MT MEDIA AI PRESENTS
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-8xl mb-8 tracking-wider"
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "#F5F5F5",
            textShadow:
              "0 0 10px rgba(255,255,255,0.3), 0 0 40px rgba(212,175,55,0.1)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          KAREEM DANIEL
        </motion.h1>

        <div className="h-16 flex items-center justify-center mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="absolute text-xl md:text-3xl font-light tracking-widest"
              style={{
                fontFamily: "var(--font-merriweather)",
                fontStyle: "italic",
                color: currentWord === i ? "#D4AF37" : "transparent",
              }}
              initial={false}
              animate={{
                opacity: currentWord === i ? 1 : 0,
                y: currentWord === i ? 0 : 10,
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{
            fontFamily: "var(--font-merriweather)",
            fontWeight: 300,
            color: "#E1E1E1",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Ten years on the warehouse floor. A body that broke but a mind that
          wouldn&apos;t. This is the story of how the grind became the machine
          that now builds intelligence.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <button
            className="btn-gold"
            onClick={() =>
              document
                .getElementById("chronicles")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Walk the Path
          </button>
          <button
            className="btn-outline"
            onClick={() =>
              document
                .getElementById("intelligence")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Meet the Intelligence
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-5 h-8 rounded-full border border-[rgba(212,175,55,0.3)] flex items-start justify-center p-1"
          style={{ borderColor: "rgba(212,175,55,0.3)" }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ backgroundColor: "#D4AF37" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
