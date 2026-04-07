import HeroSection from "@/components/HeroSection";
import ChroniclesSection from "@/components/ChroniclesSection";
import IntelligenceGallery from "@/components/IntelligenceGallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main
      className="relative"
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
      }}
    >
      {/* Top ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <HeroSection />

      <div className="thin-divider mx-auto max-w-md" />

      <ChroniclesSection />

      <div className="thin-divider mx-auto max-w-md" />

      <IntelligenceGallery />

      <div className="thin-divider mx-auto max-w-md" />

      <ContactSection />

      <Footer />
    </main>
  );
}
