import heroImage from "@/assets/hero-living.jpg";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 animate-[hero-zoom_2s_cubic-bezier(0.16,1,0.3,1)_forwards]">
        <img
          src={heroImage}
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
        <div className="mb-8 flex items-center gap-1 animate-fade-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <span
            className="inline-block h-px w-8 mr-3"
            style={{ backgroundColor: "var(--gold)" }}
          />
          <span
            className="text-sm md:text-base uppercase tracking-[0.35em] font-medium"
            style={{ color: "var(--gold-light)" }}
          >
            Live Special
          </span>
          <span
            className="inline-block h-px w-8 ml-3"
            style={{ backgroundColor: "var(--gold)" }}
          />
        </div>

        <h1
          className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] animate-fade-up"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--warm-cream)",
            animationDelay: "0.9s",
            opacity: 0,
          }}
        >
          Where Your Home
          <br />
          <em className="font-normal italic">Finds Its Soul</em>
        </h1>

        <p
          className="mt-6 max-w-lg text-base md:text-lg leading-relaxed animate-fade-in"
          style={{ color: "rgba(245,242,235,0.8)", animationDelay: "1.3s", opacity: 0 }}
        >
          Curated furnishings and bespoke decor designed to transform
          everyday spaces into enduring sanctuaries of warmth and beauty.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up"
          style={{ animationDelay: "1.6s", opacity: 0 }}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in"
        style={{ animationDelay: "2.2s", opacity: 0 }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--gold-light)" }}>
          Scroll
        </span>
        <div className="h-10 w-px animate-pulse" style={{ backgroundColor: "var(--gold-light)" }} />
      </div>
    </section>
  );
}
