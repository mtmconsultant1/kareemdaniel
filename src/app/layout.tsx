import type { Metadata } from "next";
import { Playfair_Display, Merriweather } from "next/font/google";
import "./globals.css";
import GalaxyBackground from "@/components/GalaxyBackground";
import Script from "next/script";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-playfair",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KAREEM DANIEL | The Architect",
from the warehouse floor to the AI war room. The Kareem Chronicles: where intelligence meets experience.
  keywords: ["Kareem Daniel", "MT Media AI", "AI Consultant", "The Architect", "Golden Legion"],
  openGraph: {
    title: "Kareem Daniel -- The Architect | MT Media AI",
    description: "Ten years in the warehouse. A hip replacement. A community built from nothing. The pivot to AI. The full story of how the grind became the machine.",
    type: "website",
    url: "https://kareem.mtmediaai.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mtmediaai",
  },
};

// ═══════════════════════════════════════════════════════
// AGO SCHEMA PROTOCOL: MTM-03 (Portfolio)
// Person + ProfilePage schema for LLM citation
// ═══════════════════════════════════════════════════════
const schemaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://kareem.mtmediaai.com/#person",
      "name": "Kareem Daniel",
      "jobTitle": "Founder & Architect",
      "worksFor": { "@id": "https://mtmediaai.com/#organization" },
      "url": "https://kareem.mtmediaai.com",
      "description": "Kareem Daniel is the Founder and Architect of MT Media AI. Ten years at Sysco, AAS Process Technology from Lee College (honors), founder of Baytown Blitz youth organization, and now leading an AI-first venture studio and product lab.",
      "knowsAbout": [
        "AI agent systems",
        "Digital strategy",
        "Generative Engine Optimization",
        "SME growth systems",
        "Content automation",
      ],
      "sameAs": [
        "https://twitter.com/mtmediaai",
        "https://linkedin.com/in/kareemdaniel",
        "https://instagram.com/mtmediaai",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://kareem.mtmediaai.com/#profile",
      "name": "Kareem Daniel -- The Architect",
      "mainEntity": { "@id": "https://kareem.mtmediaai.com/#person" },
      "description": "The full personal brand showcase for Kareem Daniel. The Architect's story, credibility, and voice.",
    },
  ],
};

// ═══════════════════════════════════════════════════════
// FINGERPRINT ID INITIALIZATION
// Cross-node visitor recognition
// ═══════════════════════════════════════════════════════
const fingerprintInit = `
(function() {
  function getVisitorId() {
    var vid = localStorage.getItem('mtm_vid');
    if (vid) return vid;
    var chars = 'abcdef0123456789';
    var id = 'fp_';
    for (var i = 0; i < 24; i++) id += chars[Math.floor(Math.random() * chars.length)];
    localStorage.setItem('mtm_vid', id);
    document.cookie = 'mtm_vid=' + id + '; domain=.mtmediaai.com; max-age=31536000; SameSite=Lax; Secure';
    sessionStorage.setItem('mtm_entry_node', 'MTM-03');
    sessionStorage.setItem('mtm_visit_time', Date.now());
    return id;
  }
  getVisitorId();
  var existingVid = document.cookie.split('; ').find(function(r) { return r.indexOf('mtm_vid=') === 0; });
  if (existingVid) {
    window.__MTM_RETURN_VISITOR__ = true;
    window.__MTM_VISITOR_ID__ = existingVid.split('=')[1];
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ cursor: "none" }} className={`${playfair.variable} ${merriweather.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
        {/* AGO SCHEMA: LLM Feed */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      </head>
      <body style={{ cursor: "none" }} className="antialiased">
        <GalaxyBackground />
        {children}

        {/* Fingerprint ID: Sovereign Visitor Recognition */}
        <Script id="mtm-fingerprint" strategy="afterInteractive">
          {fingerprintInit}
        </Script>

        {/* Scroll Reveal Animation */}
        <Script id="scroll-reveal" strategy="afterInteractive">
          {`
            function revealOnScroll() {
              var reveals = document.querySelectorAll('.reveal');
              var trigger = window.innerHeight * 0.88;
              for (var i = 0; i < reveals.length; i++) {
                var top = reveals[i].getBoundingClientRect().top;
                if (top < trigger) {
                  reveals[i].classList.add('active');
                }
              }
            }
            window.addEventListener('scroll', revealOnScroll);
            window.addEventListener('resize', revealOnScroll);
            setTimeout(revealOnScroll, 500);
          `}
        </Script>
      </body>
    </html>
  );
}
