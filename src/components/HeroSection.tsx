import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-living.jpg";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const tagline = "Live Special";

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 transition-transform duration-[2000ms]"
        style={{ transform: mounted ? "scale(1)" : "scale(1.15)", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <img
          src="/style-scroll-story/assets/hero-living.jpg"
          alt="Luxurious living room by Vishesh Livings"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(30,25,18,0.55) 0%, rgba(30,25,18,0.3) 50%, rgba(30,25,18,0.7) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Tagline */}
        <div
          className="mb-8 flex items-center gap-1 transition-all duration-1000"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transitionDelay: "0.4s" }}
        >
          <span
            className="inline-block h-px w-8 mr-3 transition-transform duration-800"
            style={{ backgroundColor: "var(--gold)", transformOrigin: "left", transform: mounted ? "scaleX(1)" : "scaleX(0)", transitionDelay: "0.3s" }}
          />
          <span
            className="text-sm md:text-base uppercase tracking-[0.35em] font-medium"
            style={{ color: "var(--gold-light)" }}
          >
            {tagline}
          </span>
          <span
            className="inline-block h-px w-8 ml-3 transition-transform duration-800"
            style={{ backgroundColor: "var(--gold)", transformOrigin: "right", transform: mounted ? "scaleX(1)" : "scaleX(0)", transitionDelay: "1s" }}
          />
        </div>

        <h1
          className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] transition-all duration-1000"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--warm-cream)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(40px)",
            transitionDelay: "0.9s",
          }}
        >
          Where Your Home
          <br />
          <em className="font-normal italic">Finds Its Soul</em>
        </h1>

        <p
          className="mt-6 max-w-lg text-base md:text-lg leading-relaxed transition-all duration-1000"
          style={{ color: "rgba(245,242,235,0.8)", opacity: mounted ? 1 : 0, transitionDelay: "1.3s" }}
        >
          Curated furnishings and bespoke decor designed to transform
          everyday spaces into enduring sanctuaries of warmth and beauty.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-800"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transitionDelay: "1.6s" }}
        >
          <button onClick={() => scrollTo("offerings")} className="btn-primary">
            Explore Our World
          </button>
          <button onClick={() => scrollTo("contact")} className="btn-outline" style={{ borderColor: "var(--warm-cream)", color: "var(--warm-cream)" }}>
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-1000"
        style={{ opacity: mounted ? 1 : 0, transitionDelay: "2.2s" }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--gold-light)" }}>
          Scroll
        </span>
        <div className="h-10 w-px animate-pulse" style={{ backgroundColor: "var(--gold-light)" }} />
      </div>
    </section>
  );
}
