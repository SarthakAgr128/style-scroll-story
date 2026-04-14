import { motion } from "framer-motion";
import heroImage from "@/assets/hero-living.jpg";

const taglineLetters = "Live Special".split("");

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background image with parallax-like zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
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
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Tagline — letter-by-letter reveal */}
        <motion.div
          className="mb-8 flex items-center gap-1 overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } } }}
        >
          <motion.span
            className="inline-block h-px w-8 mr-3"
            style={{ backgroundColor: "var(--gold)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ backgroundColor: "var(--gold)", transformOrigin: "left" }}
          />
          {taglineLetters.map((letter, i) => (
            <motion.span
              key={`${letter}-${i}`}
              className="text-sm md:text-base uppercase tracking-[0.35em] font-medium"
              style={{ color: "var(--gold-light)" }}
              variants={{
                hidden: { opacity: 0, y: 20, rotateX: 90 },
                visible: { opacity: 1, y: 0, rotateX: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
          <motion.span
            className="inline-block h-px w-8 ml-3"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ backgroundColor: "var(--gold)", transformOrigin: "right" }}
          />
        </motion.div>

        <motion.h1
          className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05]"
          style={{ fontFamily: "var(--font-display)", color: "var(--warm-cream)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Where Your Home
          <br />
          <em className="font-normal italic">Finds Its Soul</em>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-lg text-base md:text-lg leading-relaxed"
          style={{ color: "rgba(245,242,235,0.8)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          Curated furnishings and bespoke decor designed to transform
          everyday spaces into enduring sanctuaries of warmth and beauty.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <button onClick={() => scrollTo("offerings")} className="btn-primary">
            Explore Our World
          </button>
          <button onClick={() => scrollTo("contact")} className="btn-outline" style={{ borderColor: "var(--warm-cream)", color: "var(--warm-cream)" }}>
            Get in Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--gold-light)" }}>
          Scroll
        </span>
        <motion.div
          className="h-10 w-px"
          style={{ backgroundColor: "var(--gold-light)", transformOrigin: "top" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
