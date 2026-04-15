import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

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

  const imgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <ScrollReveal direction="left" className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-sm">
              <motion.div style={{ y: imgY, scale: imgScale }}>
                <img
                  src={aboutImage}
                  alt="Elegant bedroom interior"
                  className="w-full object-cover aspect-[4/5]"
                  loading="lazy"
                  width={960}
                  height={1200}
                />
              </motion.div>
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3"
                style={{
                  background:
                    "linear-gradient(to top, rgba(30,25,18,0.15), transparent)",
                }}
              />
              <motion.div
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 origin-right"
                style={{ backgroundColor: "var(--background)" }}
              />
            </div>
          </ScrollReveal>

          <div className="order-1 lg:order-2">
            <ScrollReveal>
              <p className="label-text mb-4">Our Story</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="gold-line mb-8" />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h2 className="heading-lg text-foreground mb-6">
                Born from a Love
                <br />
                <em className="italic">for Beautiful Spaces</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="body-md text-muted-foreground mb-6">
                Vishesh Livings was founded on a singular belief — that the
                spaces we inhabit shape the lives we lead. Every texture, every
                hue, every carefully chosen piece tells a story of intention and
                artistry.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <p className="body-md text-muted-foreground mb-8">
                We are not just a home decor brand. We are curators of
                atmosphere, architects of comfort, and believers in the quiet
                luxury of thoughtful design. Our journey begins with you — and
                the home you've always envisioned.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex items-center gap-6">
                <div>
                  <span
                    className="text-3xl md:text-4xl font-light text-gold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <AnimatedCounter target={100} suffix="+" />
                  </span>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">
                    Curated Designs
                  </p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <span
                    className="text-3xl md:text-4xl font-light text-gold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    ∞
                  </span>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">
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
