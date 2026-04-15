import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const pillars = [
  {
    icon: "◯",
    title: "Intentional Design",
    text: "Every piece is chosen with purpose — no filler, no excess, only what elevates.",
  },
  {
    icon: "◇",
    title: "Timeless Over Trendy",
    text: "We curate for decades, not seasons. Our aesthetics age with grace.",
  },
  {
    icon: "△",
    title: "Warmth in Detail",
    text: "From stitch to finish, texture to tone — warmth lives in the details.",
  },
];

function FloatingIcon({
  icon,
  delay,
}: {
  icon: string;
  delay: number;
}) {
  return (
    <motion.span
      className="text-2xl text-gold mt-1 shrink-0 inline-block"
      animate={{
        y: [-4, 4, -4],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {icon}
    </motion.span>
  );
}

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const leftX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section ref={sectionRef} id="philosophy" className="section-padding bg-card overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div style={{ x: leftX }}>
            <ScrollReveal>
              <p className="label-text mb-4">Design Philosophy</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="gold-line mb-8" />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h2 className="heading-lg text-foreground mb-8">
                We Don't Decorate.
                <br />
                <em className="italic">We Compose.</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="body-md text-muted-foreground mb-6">
                At Vishesh Livings, we believe a home should feel like a poem —
                every element in quiet conversation with another. We draw from
                nature's palette, artisan traditions, and modern sensibility to
                create spaces that breathe.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <p className="body-md text-muted-foreground">
                Our philosophy is simple: strip away the noise, honour the
                material, and let beauty emerge from balance. This is furnishing
                as an art form.
              </p>
            </ScrollReveal>
          </motion.div>

          <motion.div className="flex flex-col gap-10 lg:pt-20" style={{ x: rightX }}>
            {pillars.map((p, i) => (
              <PillarCard key={p.title} pillar={p} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="group flex gap-6 p-6 rounded-sm transition-colors duration-500 hover:bg-accent"
        whileHover={{ x: 8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <FloatingIcon icon={pillar.icon} delay={index * 0.5} />
        <div>
          <h3
            className="text-lg md:text-xl font-light tracking-tight text-foreground mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {pillar.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {pillar.text}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
