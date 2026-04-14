import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const offerings = [
  {
    number: "01",
    title: "Living Room Furnishing",
    description: "Sofas, accent chairs, coffee tables, and statement pieces that anchor your living space with warmth and character.",
  },
  {
    number: "02",
    title: "Bedroom Sanctuaries",
    description: "Luxurious bedding, bespoke headboards, and ambient decor that transform sleep into a sensory ritual.",
  },
  {
    number: "03",
    title: "Artisanal Home Decor",
    description: "Handcrafted vases, textured throws, woven baskets, and curated objects that breathe personality into every corner.",
  },
  {
    number: "04",
    title: "Dining & Entertaining",
    description: "Elegant tableware, centrepieces, and dining furniture designed for gatherings that linger in memory.",
  },
  {
    number: "05",
    title: "Custom Styling Services",
    description: "Personalized consultations to harmonize your vision with our expertise — crafting spaces that feel unmistakably yours.",
  },
];

export default function OfferingsSection() {
  return (
    <section id="offerings" className="section-padding" style={{ backgroundColor: "var(--warm-dark)" }}>
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <p className="label-text mb-4">What We Offer</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg mb-16" style={{ color: "var(--warm-cream)" }}>
            Crafting Every Layer
            <br />
            <em className="italic">of Home</em>
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {offerings.map((item, i) => (
            <ScrollReveal key={item.number} delay={i * 0.08}>
              <motion.div
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 border-t cursor-default"
                style={{ borderColor: "rgba(245,242,235,0.1)" }}
                whileHover={{ x: 12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-sm font-medium" style={{ color: "var(--gold)", minWidth: "3rem" }}>
                  {item.number}
                </span>
                <h3
                  className="text-xl md:text-2xl font-light tracking-tight md:min-w-[320px] transition-colors duration-500"
                  style={{ fontFamily: "var(--font-display)", color: "var(--warm-cream)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed max-w-md" style={{ color: "rgba(245,242,235,0.55)" }}>
                  {item.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
