import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ScrollReveal, { TextReveal } from "./ScrollReveal";

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
      className="text-2xl text-gold mt-1 shrink-0 inline-block font-light"
      animate={{
        y: [-6, 6, -6],
        rotate: [-8, 8, -8],
        scale: [0.95, 1.05, 0.95]
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
  
  const leftX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const rotateSlight = useTransform(scrollYProgress, [0, 1], [-1, 1]);

  return (
    <section ref={sectionRef} id="philosophy" className="section-padding bg-card overflow-hidden relative">
      {/* Background decorative texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <motion.div 
          style={{ rotate: rotateSlight }}
          className="text-[400px] font-display absolute -right-40 -top-20 leading-none"
        >
          SOUL
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          <motion.div style={{ x: leftX }}>
            <ScrollReveal>
              <p className="label-text mb-6 italic">Design Philosophy</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="gold-line mb-10 w-20" />
            </ScrollReveal>
            
            <div className="mb-10">
              <TextReveal className="heading-lg text-foreground leading-tight">
                We Don't Decorate.
              </TextReveal>
              <TextReveal className="heading-lg text-foreground leading-tight italic" delay={0.1}>
                We Compose.
              </TextReveal>
            </div>

            <ScrollReveal delay={0.3}>
              <p className="body-md text-muted-foreground mb-8 font-light leading-relaxed">
                At Vishesh Livings, we believe a home should feel like a poem —
                every element in quiet conversation with another. We draw from
                nature's palette, artisan traditions, and modern sensibility to
                create spaces that breathe.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="body-md text-muted-foreground font-light leading-relaxed">
                Our philosophy is simple: strip away the noise, honour the
                material, and let beauty emerge from balance. This is furnishing
                as an art form.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.6} className="mt-12">
              <button className="group flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-semibold text-foreground overflow-hidden">
                <span className="relative">
                  Learn more about our ethos
                  <motion.span 
                    className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-gold origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </span>
                <span className="group-hover:translate-x-2 transition-transform duration-500 text-gold">→</span>
              </button>
            </ScrollReveal>
          </motion.div>

          <motion.div className="flex flex-col gap-8 lg:pt-16" style={{ x: rightX }}>
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="group flex gap-8 p-10 rounded-sm bg-background/40 backdrop-blur-sm border border-border/50 transition-all duration-700 hover:bg-background hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5"
        whileHover={{ y: -5 }}
      >
        <FloatingIcon icon={pillar.icon} delay={index * 0.7} />
        <div>
          <h3
            className="text-xl md:text-2xl font-light tracking-tight text-foreground mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {pillar.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
            {pillar.text}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
