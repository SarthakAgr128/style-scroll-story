import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import MagneticButton from "./MagneticButton";

const heroImage =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80&auto=format&fit=crop";

const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 4,
}));

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 40);
      mouseY.set((clientY / innerHeight - 0.5) * 40);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.75]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const line1 = "Where Your Home".split("");
  const line2 = "Finds Its Soul".split("");

  return (
    <section ref={ref} id="hero" className="relative h-[110vh] w-full overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ 
          scale: imgScale, 
          y: imgY,
          x: springX,
          rotate: useTransform(springX, [-20, 20], [-1, 1])
        }}
      >
        <img
          src={heroImage}
          alt="Luxurious living room by Vishesh Livings"
          className="h-full w-full object-cover brightness-[0.9]"
        />
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-200/40 z-10"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            opacity: [0, 0.6, 0],
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
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-10 flex items-center gap-4"
        >
          <motion.span
            className="inline-block h-px bg-amber-400"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          />
          <span className="text-xs md:text-sm uppercase tracking-[0.5em] font-semibold text-amber-200 drop-shadow-sm">
            Live Special
          </span>
          <motion.span
            className="inline-block h-px bg-amber-400"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          />
        </motion.div>

        <h1
          className="max-w-5xl text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter leading-[0.9] text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <div className="overflow-hidden pb-2">
            <motion.span 
              className="block italic font-light"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              Where Your Home
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span 
              className="block font-normal"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            >
              Finds Its Soul
            </motion.span>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-white/70 font-light"
        >
          Elevating everyday moments into extraordinary experiences through 
          masterfully crafted furnishings and soulful design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-6"
        >
          <MagneticButton
            onClick={() => scrollTo("offerings")}
            className="btn-primary"
          >
            <span className="relative z-10">Explore Our World</span>
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("about")}
            className="group inline-flex items-center gap-3 px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium border border-white/30 text-white backdrop-blur-sm transition-all duration-500 hover:bg-white hover:text-black hover:border-white"
          >
            <span>Our Journey</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 cursor-pointer"
        onClick={() => scrollTo("about")}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-amber-300/80 font-medium">
          Discover More
        </span>
        <div className="relative w-px h-16 bg-white/10 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full bg-amber-400"
          />
        </div>
      </motion.div>

      {/* Decorative element */}
      <motion.div
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: -90 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 whitespace-nowrap">
          Est. MMXXIV — Vishesh Livings
        </span>
      </motion.div>
    </section>
  );
}
