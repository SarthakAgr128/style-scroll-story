import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const offerings = [
  {
    number: "01",
    title: "Living Room Furnishing",
    description:
      "Sofas, accent chairs, coffee tables, and statement pieces that anchor your living space with warmth and character.",
  },
  {
    number: "02",
    title: "Bedroom Sanctuaries",
    description:
      "Luxurious bedding, bespoke headboards, and ambient decor that transform sleep into a sensory ritual.",
  },
  {
    number: "03",
    title: "Artisanal Home Decor",
    description:
      "Handcrafted vases, textured throws, woven baskets, and curated objects that breathe personality into every corner.",
  },
  {
    number: "04",
    title: "Dining & Entertaining",
    description:
      "Elegant tableware, centrepieces, and dining furniture designed for gatherings that linger in memory.",
  },
  {
    number: "05",
    title: "Custom Styling Services",
    description:
      "Personalized consultations to harmonize your vision with our expertise — crafting spaces that feel unmistakably yours.",
  },
];

function OfferingRow({
  item,
  index,
}: {
  item: (typeof offerings)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 border-t cursor-default relative"
      style={{ borderColor: "rgba(245,242,235,0.1)" }}
    >
      <motion.div
        className="absolute inset-0 -mx-4 rounded-sm"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          transformOrigin: "left",
          backgroundColor: "rgba(245,242,235,0.03)",
        }}
      />

      <motion.span
        className="text-sm font-medium shrink-0 w-12 relative z-10"
        animate={{ scale: hovered ? 1.2 : 1 }}
        style={{ color: "var(--gold)" }}
      >
        {item.number}
      </motion.span>

      <motion.h3
        className="text-xl md:text-2xl font-light tracking-tight md:min-w-[320px] shrink-0 relative z-10"
        animate={{ x: hovered ? 12 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--warm-cream)",
        }}
      >
        {item.title}
      </motion.h3>

      <p
        className="text-sm md:text-base leading-relaxed max-w-md relative z-10"
        style={{ color: "rgba(245,242,235,0.55)" }}
      >
        {item.description}
      </p>

      <motion.div
        className="hidden md:block ml-auto relative z-10"
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{ color: "var(--gold)" }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function OfferingsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section
      ref={sectionRef}
      id="offerings"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--warm-dark)" }}
    >
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          y: bgY,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, var(--gold) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--gold) 0%, transparent 50%)",
        }}
      />
      <div className="mx-auto max-w-7xl relative">
        <div ref={headingRef}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label-text mb-4"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-lg mb-16"
            style={{ color: "var(--warm-cream)" }}
          >
            Crafting Every Layer
            <br />
            <em className="italic">of Home</em>
          </motion.h2>
        </div>

        <div className="space-y-0">
          {offerings.map((item, i) => (
            <OfferingRow key={item.number} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
