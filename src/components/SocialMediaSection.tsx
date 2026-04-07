"use client";

import { motion } from "framer-motion";

interface SocialPlatform {
  name: string;
  url: string;
  glowColor: string;
  renderIcon: () => React.ReactNode;
  idle: Record<string, number | number[]>;
  hover: Record<string, number | number[]>;
}

const platforms: SocialPlatform[] = [
  {
    name: "X",
    url: "https://x.com/mtmediaai",
    glowColor: "rgba(229,228,226,0.15)",
    idle: { rotate: [0, 8, -3, 5, 0], scale: [1, 1.05, 0.97, 1.03, 1] },
    hover: { rotate: 12, scale: 1.2 },
    renderIcon: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" fill="url(#twitterGrad)" />
          <defs><linearGradient id="twitterGrad" x1="3" y1="3" x2="23" y2="24"><stop offset="0%" stopColor="#E5E4E2"/><stop offset="50%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#B6862C"/></linearGradient></defs>
        </svg>
        <span style={{ color: "#47464B", fontSize: "14px", fontFamily: "var(--font-playfair)" }}>/</span>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="url(#xGrad)" />
          <defs><linearGradient id="xGrad" x1="1.25" y1="2.25" x2="21.55" y2="21.75"><stop offset="0%" stopColor="#E5E4E2"/><stop offset="50%" stopColor="#F5F5F5"/><stop offset="100%" stopColor="#D4AF37"/></linearGradient></defs>
        </svg>
      </div>
    ),
  },
  {
    name: "Instagram",
    url: "https://instagram.com/mtmediaai",
    glowColor: "rgba(212,175,55,0.2)",
    idle: { rotate: [0, 10, 0, -10, 0], scale: [1, 1.02, 1] },
    hover: { rotate: 20, scale: 1.2 },
    renderIcon: () => (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
        <defs><linearGradient id="igGrad" x1="2" y1="2" x2="22" y2="22"><stop offset="0%" stopColor="#E5E4E2"/><stop offset="30%" stopColor="#F5F5F5"/><stop offset="60%" stopColor="#D4AF37"/><stop offset="100%" stopColor="#B6862C"/></linearGradient><filter id="igGlow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#igGrad)" strokeWidth="2" filter="url(#igGlow)"/>
        <circle cx="12" cy="12" r="5" stroke="url(#igGrad)" strokeWidth="2" filter="url(#igGlow)"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="url(#igGrad)"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://facebook.com/mtmediaai",
    glowColor: "rgba(168,192,232,0.15)",
    idle: { x: [0, 3, 0, -3, 0], scale: [1, 1.02, 1] },
    hover: { rotate: 15, y: -5 },
    renderIcon: () => (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
        <defs><linearGradient id="fbGrad" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#E5E4E2"/><stop offset="50%" stopColor="#E1E1E1"/><stop offset="100%" stopColor="#A8C0E8"/></linearGradient><filter id="fbGlow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="url(#fbGrad)" filter="url(#fbGlow)"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/mtmediaai",
    glowColor: "rgba(136,184,232,0.15)",
    idle: { y: [0, -3, 0, -1, 0], scale: [1, 1.02, 1] },
    hover: { scale: 1.15, rotate: 5 },
    renderIcon: () => (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
        <defs><linearGradient id="liGrad" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#E5E4E2"/><stop offset="50%" stopColor="#C0C0C0"/><stop offset="100%" stopColor="#88B8E8"/></linearGradient><filter id="liGlow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <rect x="2" y="2" width="20" height="20" rx="3" fill="url(#liGrad)" filter="url(#liGlow)"/>
        <path d="M8 11v5" stroke="#050510" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 7.5v.5" stroke="#050510" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 16v-3.5c0-1.1.9-2 2-2s2 .9 2 2V16" stroke="#050510" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@mtmediaai",
    glowColor: "rgba(212,175,55,0.12)",
    idle: { rotate: [0, 8, -4, 0], scale: [1, 1.03, 0.98, 1] },
    hover: { rotate: 15, scale: 1.15 },
    renderIcon: () => (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
        <defs><linearGradient id="ttGrad" x1="12" y1="2" x2="12" y2="22"><stop offset="0%" stopColor="#E5E4E2"/><stop offset="50%" stopColor="#F5F5F5"/><stop offset="100%" stopColor="#D4AF37"/></linearGradient><filter id="ttGlow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <path d="M19.59 6H12a5.5 5.5 0 010-1V2h4.59l.41 2C17.73 6 19.59 6 19.59 6z" fill="url(#ttGrad)" opacity="0.5"/>
        <path d="M16.5 9H15a3 3 0 01-6 0V4" stroke="url(#ttGrad)" strokeWidth="2.5" strokeLinecap="round" filter="url(#ttGlow)"/>
        <path d="M7.5 11.5C7.5 15 10.33 18 13.8 18c2.98 0 5.7-1.8 7.2-4.2" stroke="url(#ttGrad)" strokeWidth="2.5" strokeLinecap="round" filter="url(#ttGlow)"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@mtmediaai",
    glowColor: "rgba(212,175,55,0.15)",
    idle: { y: [0, -2, 0, -1, 0] },
    hover: { scale: 1.15, y: -3 },
    renderIcon: () => (
      <svg viewBox="0 0 24 24" width="36" height="26" fill="none">
        <defs><linearGradient id="ytGrad" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#E5E4E2"/><stop offset="30%" stopColor="#F5F5F5"/><stop offset="70%" stopColor="#D4AF37"/><stop offset="100%" stopColor="#B6862C"/></linearGradient><filter id="ytGlow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <rect x="2" y="7" width="20" height="10" rx="5" stroke="url(#ytGrad)" strokeWidth="2" filter="url(#ytGlow)"/>
        <polygon points="10,10 16,12 10,14" fill="url(#ytGrad)"/>
      </svg>
    ),
  },
];

export default function SocialMediaSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          className="mb-16 text-xs tracking-[0.5em] uppercase"
          style={{ color: "#47464B", fontFamily: "var(--font-merriweather)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          @mtmediaai
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {platforms.map((platform, index) => {
            const Icon = platform.renderIcon;
            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center p-4"
                style={{ display: "inline-flex" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={platform.idle}
                whileHover={platform.hover}
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: index * 0.8,
                }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${platform.glowColor} 0%, transparent 70%)`,
                    filter: "blur(15px)",
                  }}
                />

                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "radial-gradient(circle at 30% 20%, rgba(229,228,226,0.15), transparent 70%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 20px rgba(0,0,0,0.3)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <Icon />
                </div>

                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bottom-0"
                  style={{
                    background: platform.glowColor,
                    filter: "blur(6px)",
                  }}
                  animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}