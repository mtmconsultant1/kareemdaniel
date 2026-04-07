import HeroSection from "@/components/HeroSection";
import SectionHeader from "@/components/SectionHeader";
import ChroniclesSection from "@/components/ChroniclesSection";
import IntelligenceGallery from "@/components/IntelligenceGallery";
import ContactSection from "@/components/ContactSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative" style={{ background: "#050510", minHeight: "100vh" }}>
      <HeroSection />

      <section className="py-16 md:py-24" />

      <div className="px-6">
        <SectionHeader
          tag="THE KAREEM CHRONICLES"
          titleLine1="From the Warehouse Floor"
          titleLine2="to the AI War Room"
          subtitle="Ten years on the concrete. A hip replacement. A community built from nothing. A discovery that changed everything. Five acts, one arc."
        />
      </div>

      <ChroniclesSection />

      <section className="py-16 md:py-24" />

      <div className="px-6">
        <SectionHeader
          tag="THE INTELLIGENCE GALLERY"
          titleLine1="Not a Portfolio."
          titleLine2="A Live Feed."
          subtitle="The Armory had tools. This has brains. Five active instances, each trained on a different domain. Click one. Start a conversation."
        />
      </div>

      <IntelligenceGallery />

      <section className="py-16 md:py-24" />

      <div className="px-6">
        <SectionHeader
          tag="THE OPEN CHANNEL"
          titleLine1="You Saw the Tools."
          titleLine2="Meet the Builder"
          subtitle="Whether you want an AI agent for your business, a collaborator who understands the grind and the algorithm, or just want to talk. The line is open."
        />
      </div>

      <ContactSection />

      <SocialMediaSection />

      <Footer />
    </main>
  );
}
