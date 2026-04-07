import HeroSection from "@/components/HeroSection";
import ChroniclesSection from "@/components/ChroniclesSection";
import IntelligenceGallery from "@/components/IntelligenceGallery";
import ContactSection from "@/components/ContactSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main
      className="relative"
      style={{
        background: "#050510",
        minHeight: "100vh",
      }}
    >
      <HeroSection />

      <ChroniclesSection />

      <IntelligenceGallery />

      <ContactSection />

      <SocialMediaSection />

      <Footer />
    </main>
  );
}
