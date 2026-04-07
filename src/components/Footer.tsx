"use client";

export default function Footer() {
  return (
    <footer className="py-12 px-6" style={{ background: "rgba(0,0,0,0.2)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-sm tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-playfair)", fontWeight: 900, color: "#D4AF37" }}>
              KAREEM DANIEL
            </h3>
            <p className="text-xs" style={{ color: "#47464B", fontFamily: "var(--font-merriweather)", fontWeight: 300 }}>
              The Architect. Founder of MT Media AI.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#47464B", fontFamily: "var(--font-tech)" }}>
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {[["chronicles", "#chronicles"], ["intelligence", "#intelligence"], ["contact", "#contact"]].map(([label, href]) => (
                <a key={label} href={href} className="text-sm transition-colors hover:text-[#D4AF37]" style={{ color: "#47464B", fontFamily: "var(--font-merriweather)", fontWeight: 300, textTransform: "capitalize" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#47464B", fontFamily: "var(--font-tech)" }}>
              The MTM Ecosystem
            </h4>
            <div className="flex flex-col gap-2">
              <a href="https://mtmarmory.vercel.app" target="_blank" className="text-sm transition-colors hover:text-[#D4AF37]" style={{ color: "#47464B", fontFamily: "var(--font-merriweather)", fontWeight: 300 }}>
                The Armory (Tools)
              </a>
              <span className="text-sm" style={{ color: "#47464B", fontFamily: "var(--font-merriweather)", fontWeight: 300 }}>
                The Forge (Personas)
              </span>
              <span className="text-sm" style={{ color: "#47464B", fontFamily: "var(--font-merriweather)", fontWeight: 300 }}>
                Golden Legion (Squad)
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-2" style={{ paddingTop: "1.5rem" }}>
          <p className="text-xs tracking-wider" style={{ color: "#47464B", fontFamily: "var(--font-tech)", fontSize: "0.65rem" }}>
            Built in the grind. Wired in the quiet. Ever evolving.
          </p>
          <p className="text-xs tracking-wider" style={{ color: "#47464B", fontFamily: "var(--font-tech)", fontSize: "0.65rem" }}>
            MT MEDIA AI | MODERN TOUCH MEDIA
          </p>
        </div>
      </div>
    </footer>
  );
}
