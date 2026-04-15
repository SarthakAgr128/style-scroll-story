import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

const heroImage =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80&auto=format&fit=crop";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 4,
}));

const wordVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
};

const charVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -80 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.45, 0.8]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const line1 = "Where Your Home".split("");
  const line2 = "Finds Its Soul".split("");

  return (
    <section ref={ref} id="hero" className="relative h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
        <img
          src={heroImage}
          alt="Luxurious living room by Vishesh Livings"
          className="h-full w-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-300/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 flex items-center gap-3"
        >
          <motion.span
            className="inline-block h-px bg-amber-400"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <span className="text-sm md:text-base uppercase tracking-[0.35em] font-medium text-amber-300">
            Live Special
          </span>
          <motion.span
            className="inline-block h-px bg-amber-400"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.h1
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] text-white"
          style={{ fontFamily: "var(--font-display)", perspective: "600px" }}
        >
          <span className="block" style={{ perspective: "600px" }}>
            {line1.map((char, i) => (
              <motion.span
                key={`l1-${i}`}
                variants={charVariants}
                className="inline-block"
                style={{ transformOrigin: "bottom" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
          <em className="font-normal italic block" style={{ perspective: "600px" }}>
            {line2.map((char, i) => (
              <motion.span
                key={`l2-${i}`}
                variants={charVariants}
                className="inline-block"
                style={{ transformOrigin: "bottom" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-white/80"
        >
          Curated furnishings and bespoke decor designed to transform everyday
          spaces into enduring sanctuaries of warmth and beauty.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <MagneticButton
            onClick={() => scrollTo("offerings")}
            className="btn-primary"
          >
            <span>Explore Our World</span>
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm uppercase tracking-[0.15em] font-medium border border-white text-white transition-all duration-500 hover:bg-white hover:text-black"
          >
            <span>Get in Touch</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-amber-300/60"
        />
      </motion.div>
    </section>
  );
}
