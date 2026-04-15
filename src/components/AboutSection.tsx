import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import ScrollReveal, { TextReveal } from "./ScrollReveal";

const aboutImage =
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80&auto=format&fit=crop";

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.1, 1.2]);
  const rotateImage = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-background relative z-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal direction="left" duration={1.2}>
              <div className="relative overflow-hidden rounded-sm group">
                <motion.div style={{ y: imgY, scale: imgScale, rotate: rotateImage }} className="will-change-transform">
                  <img
                    src={aboutImage}
                    alt="Elegant bedroom interior"
                    className="w-full object-cover aspect-[4/5] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                    loading="lazy"
                    width={960}
                    height={1200}
                  />
                </motion.div>
                
                {/* Overlay reveal effect */}
                <motion.div
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 origin-bottom bg-amber-50"
                  style={{ zIndex: 2 }}
                />
                
                <div
                  className="absolute inset-0 z-10 pointer-events-none border-[1px] border-white/20 m-4"
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="order-1 lg:order-2">
            <ScrollReveal>
              <p className="label-text mb-4">Our Story</p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="gold-line mb-8 w-24" />
            </ScrollReveal>
            
            <div className="mb-8">
              <TextReveal className="heading-lg text-foreground leading-[1.1]" delay={0.2}>
                Born from a Love
              </TextReveal>
              <TextReveal className="heading-lg text-foreground leading-[1.1] italic" delay={0.3}>
                for Beautiful Spaces
              </TextReveal>
            </div>

            <ScrollReveal delay={0.4}>
              <p className="body-md text-muted-foreground mb-6 font-light">
                Vishesh Livings was founded on a singular belief — that the
                spaces we inhabit shape the lives we lead. Every texture, every
                hue, every carefully chosen piece tells a story of intention and
                artistry.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.5}>
              <p className="body-md text-muted-foreground mb-10 font-light">
                We are not just a home decor brand. We are curators of
                atmosphere, architects of comfort, and believers in the quiet
                luxury of thoughtful design. Our journey begins with you — and
                the home you've always envisioned.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="flex items-center gap-10">
                <div className="group cursor-default">
                  <span
                    className="text-4xl md:text-5xl font-light text-gold transition-colors duration-500 group-hover:text-foreground"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <AnimatedCounter target={100} suffix="+" />
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2 font-semibold">
                    Curated Designs
                  </p>
                </div>
                <div className="h-12 w-px bg-border/60" />
                <div className="group cursor-default">
                  <span
                    className="text-4xl md:text-5xl font-light text-gold transition-colors duration-500 group-hover:text-foreground"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    ∞
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2 font-semibold">
                    Possibilities
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
