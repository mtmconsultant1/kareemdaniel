"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="mb-4 text-xs tracking-[0.5em] uppercase"
            style={{ color: "#D4AF37", fontFamily: "var(--font-merriweather)" }}
          >
            THE OPEN CHANNEL
          </p>
          <h2
            className="text-3xl md:text-5xl tracking-wider mb-6"
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 900,
              textTransform: "uppercase",
              color: "#F5F5F5",
            }}
          >
            Let&apos;s Build
            <br />
            <span style={{ color: "#D4AF37" }}>Something Real</span>
          </h2>
          <p
            className="max-w-xl mx-auto text-sm mb-10"
            style={{
              color: "#E1E1E1",
              fontFamily: "var(--font-merriweather)",
              fontWeight: 300,
              lineHeight: "1.8",
            }}
          >
            You saw the tools. You met the intelligence. Now meet the builder.
            Whether you want an AI agent for your business, need a collaborator
            who understands both the grind and the algorithm, or just want to
            talk through an idea. The line is open.
          </p>

          {/* Contact methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <motion.a
              href="mailto:kareem@mtmediaai.com"
              className="agent-card flex items-center gap-4 justify-center"
              whileHover={{ y: -4 }}
            >
              <Mail size={20} style={{ color: "#D4AF37" }} />
              <div>
                <p
                  className="text-sm tracking-wider uppercase"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                    color: "#F5F5F5",
                  }}
                >
                  Email
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: "#47464B",
                    fontFamily: "var(--font-tech)",
                  }}
                >
                  kareem@mtmediaai.com
                </p>
              </div>
            </motion.a>

            <motion.a
              href="https://mtmarmory.vercel.app"
              target="_blank"
              className="agent-card flex items-center gap-4 justify-center"
              whileHover={{ y: -4 }}
            >
              <ArrowUpRight size={20} style={{ color: "#D4AF37" }} />
              <div>
                <p
                  className="text-sm tracking-wider uppercase"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                    color: "#F5F5F5",
                  }}
                >
                  The Armory
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: "#47464B",
                    fontFamily: "var(--font-tech)",
                  }}
                >
                  mtmarmory.vercel.app
                </p>
              </div>
            </motion.a>
          </div>

          <a
            href="mailto:kareem@mtmediaai.com?subject=From%20the%20Chronicles"
            className="btn-gold inline-block"
          >
            Start a Conversation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
