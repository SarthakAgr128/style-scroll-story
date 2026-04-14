import heroImage from "@/assets/hero-living.jpg";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxurious living room by Vishesh Livings"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center" style={{ position: "relative", zIndex: 10 }}>
        <div className="mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-amber-400" />
          <span className="text-sm md:text-base uppercase tracking-[0.35em] font-medium text-amber-300">
            Live Special
          </span>
          <span className="inline-block h-px w-8 bg-amber-400" />
        </div>

        <h1
          className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Where Your Home
          <br />
          <em className="font-normal italic">Finds Its Soul</em>
        </h1>

        <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-white/80">
          Curated furnishings and bespoke decor designed to transform
          everyday spaces into enduring sanctuaries of warmth and beauty.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button onClick={() => scrollTo("offerings")} className="btn-primary">
            Explore Our World
          </button>
          <button onClick={() => scrollTo("contact")} className="inline-flex items-center gap-2 px-8 py-4 text-sm uppercase tracking-[0.15em] font-medium border border-white text-white transition-all duration-500 hover:bg-white hover:text-black">
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ position: "absolute", zIndex: 10 }}>
        <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300">Scroll</span>
        <div className="h-10 w-px bg-amber-300 animate-pulse" />
      </div>
    </section>
  );
}
