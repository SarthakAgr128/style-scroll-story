import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const pillars = [
  { icon: "◯", title: "Intentional Design", text: "Every piece is chosen with purpose — no filler, no excess, only what elevates." },
  { icon: "◇", title: "Timeless Over Trendy", text: "We curate for decades, not seasons. Our aesthetics age with grace." },
  { icon: "△", title: "Warmth in Detail", text: "From stitch to finish, texture to tone — warmth lives in the details." },
];

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="section-padding bg-card">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Statement */}
          <div>
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
                Our philosophy is simple: strip away the noise, honour the material,
                and let beauty emerge from balance. This is furnishing as an art form.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: Pillars */}
          <div className="flex flex-col gap-10 lg:pt-20">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.12} direction="right">
                <motion.div
                  className="group flex gap-6 p-6 rounded-sm transition-colors duration-500 hover:bg-accent"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-2xl text-gold mt-1 shrink-0">{p.icon}</span>
                  <div>
                    <h3 className="heading-md text-foreground mb-2 text-lg md:text-xl">{p.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{p.text}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
