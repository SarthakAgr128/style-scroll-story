import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ScrollReveal, { TextReveal } from "./ScrollReveal";

const reasons = [
  {
    title: "Curated, Not Mass-Produced",
    text: "Every item in our collection is hand-selected for quality, craftsmanship, and enduring beauty.",
    icon: "✦",
  },
  {
    title: "Design-Led Approach",
    text: "We think like designers, not retailers. Cohesion, proportion, and emotion guide our curation.",
    icon: "◆",
  },
  {
    title: "Personalized Experience",
    text: "Your home is unique. Our styling guidance ensures every piece belongs to your story.",
    icon: "●",
  },
  {
    title: "Rooted in Craftsmanship",
    text: "We champion artisans, natural materials, and honest making — beauty you can feel.",
    icon: "▲",
  },
];

function GlowCard({
  reason,
  index,
}: {
  reason: (typeof reasons)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="h-full p-10 md:p-12 border rounded-sm relative overflow-hidden group bg-background/5"
        style={{ borderColor: "rgba(245,242,235,0.08)" }}
        whileHover={{ y: -12, borderColor: "rgba(245,242,235,0.2)" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(180,160,120,0.1), transparent 70%)",
          }}
        />

        <motion.span
          className="text-2xl mb-8 block font-light"
          style={{ color: "var(--gold)" }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 4, delay: index * 0.5, repeat: Infinity, ease: "linear" }}
        >
          {reason.icon}
        </motion.span>

        <span
          className="text-[10px] font-bold mb-6 block tracking-[0.4em] opacity-40 group-hover:text-gold group-hover:opacity-100 transition-all duration-500"
        >
          STEP 0{index + 1}
        </span>

        <h3
          className="text-xl md:text-2xl font-light mb-4 tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--warm-cream)",
          }}
        >
          {reason.title}
        </h3>

        <p
          className="text-sm md:text-base leading-relaxed font-light"
          style={{ color: "rgba(245,242,235,0.45)" }}
        >
          {reason.text}
        </p>

        {/* Animated corner accent */}
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute top-[-1px] right-[-1px] w-[1px] h-full bg-gold/40"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
          />
          <motion.div 
            className="absolute top-[-1px] right-[-1px] h-[1px] w-full bg-gold/40"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
          />
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ backgroundColor: "var(--gold)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 + index * 0.15 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden min-h-screen flex flex-col justify-center"
      style={{ backgroundColor: "var(--warm-dark)" }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          scale: bgScale,
          y: yParallax,
          backgroundImage:
            "radial-gradient(ellipse at 50% 10%, rgba(180,160,120,0.08), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl relative z-10 w-full">
        <div className="text-center mb-24">
          <ScrollReveal>
            <p className="label-text mb-6 italic">The Difference</p>
          </ScrollReveal>
          
          <div className="flex flex-col items-center">
            <TextReveal className="heading-lg text-warm-cream leading-tight">
              Because Your Home
            </TextReveal>
            <TextReveal className="heading-lg text-warm-cream leading-tight italic" delay={0.1}>
              Deserves Devotion
            </TextReveal>
            
            <motion.div 
              className="w-px h-20 bg-gold/30 mt-8"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {reasons.map((r, i) => (
            <GlowCard key={r.title} reason={r} index={i} />
          ))}
        </div>
      </div>
      
      {/* Background large numbers decoration */}
      <div className="absolute left-10 bottom-20 opacity-[0.015] pointer-events-none hidden lg:block select-none">
        <span className="text-[250px] font-display font-light text-white leading-none">04</span>
      </div>
    </section>
  );
}
