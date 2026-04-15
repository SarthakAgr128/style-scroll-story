import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

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
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="p-6 md:p-8 border rounded-sm relative overflow-hidden group"
        style={{ borderColor: "rgba(245,242,235,0.1)" }}
        whileHover={{ y: -8, borderColor: "rgba(245,242,235,0.25)" }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(var(--gold), 0.06), transparent 70%)",
          }}
        />

        <motion.span
          className="text-lg mb-4 block"
          style={{ color: "var(--gold)" }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, delay: index * 0.5, repeat: Infinity }}
        >
          {reason.icon}
        </motion.span>

        <span
          className="text-xs font-medium mb-4 block"
          style={{ color: "var(--gold)" }}
        >
          0{index + 1}
        </span>

        <h3
          className="text-lg font-light mb-3 tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--warm-cream)",
          }}
        >
          {reason.title}
        </h3>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(245,242,235,0.55)" }}
        >
          {reason.text}
        </p>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ backgroundColor: "var(--gold)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--warm-dark)" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          scale: bgScale,
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(180,160,120,0.06), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl relative">
        <div className="text-center mb-16" ref={headingRef}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label-text mb-4"
          >
            Why Vishesh Livings
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-lg"
            style={{ color: "var(--warm-cream)" }}
          >
            Because Your Home
            <br />
            <em className="italic">Deserves Devotion</em>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <GlowCard key={r.title} reason={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
