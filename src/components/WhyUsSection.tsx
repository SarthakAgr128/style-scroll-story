import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const reasons = [
  { title: "Curated, Not Mass-Produced", text: "Every item in our collection is hand-selected for quality, craftsmanship, and enduring beauty." },
  { title: "Design-Led Approach", text: "We think like designers, not retailers. Cohesion, proportion, and emotion guide our curation." },
  { title: "Personalized Experience", text: "Your home is unique. Our styling guidance ensures every piece belongs to your story." },
  { title: "Rooted in Craftsmanship", text: "We champion artisans, natural materials, and honest making — beauty you can feel." },
];

export default function WhyUsSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: "var(--warm-dark)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="label-text mb-4">Why Vishesh Livings</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-lg" style={{ color: "var(--warm-cream)" }}>
              Because Your Home
              <br />
              <em className="italic">Deserves Devotion</em>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.1}>
              <motion.div
                className="p-6 md:p-8 border rounded-sm transition-all duration-500"
                style={{ borderColor: "rgba(245,242,235,0.1)" }}
                whileHover={{ borderColor: "var(--gold)", y: -4 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-xs font-medium mb-4 block" style={{ color: "var(--gold)" }}>
                  0{i + 1}
                </span>
                <h3
                  className="text-lg font-light mb-3 tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: "var(--warm-cream)" }}
                >
                  {r.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,242,235,0.55)" }}>
                  {r.text}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
