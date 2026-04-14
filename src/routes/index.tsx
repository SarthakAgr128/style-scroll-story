import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import OfferingsSection from "@/components/OfferingsSection";
import PhilosophySection from "@/components/PhilosophySection";
import GallerySection from "@/components/GallerySection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vishesh Livings — Where Your Home Finds Its Soul" },
      { name: "description", content: "Curated furnishings and bespoke home decor designed to transform everyday spaces into enduring sanctuaries of warmth and beauty." },
      { property: "og:title", content: "Vishesh Livings — Where Your Home Finds Its Soul" },
      { property: "og:description", content: "Curated furnishings and bespoke home decor designed to transform everyday spaces into enduring sanctuaries of warmth and beauty." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <OfferingsSection />
      <PhilosophySection />
      <GallerySection />
      <WhyUsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
