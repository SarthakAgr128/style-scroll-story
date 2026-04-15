import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { TextReveal } from "./ScrollReveal";

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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-16 py-12 border-t cursor-none relative overflow-hidden"
      style={{ borderColor: "rgba(245,242,235,0.08)" }}
    >
      <motion.div
        className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
      
      {/* Animated line on hover */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-gold"
        initial={{ width: 0 }}
        animate={{ width: hovered ? "100%" : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="flex items-center gap-8 md:min-w-[400px] shrink-0 relative z-10">
        <motion.span
          className="text-xs font-semibold tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-gold transition-all duration-500"
          animate={{ y: hovered ? -5 : 0 }}
        >
          {item.number}
        </motion.span>
        
        <motion.h3
          className="text-2xl md:text-4xl font-light tracking-tight"
          animate={{ x: hovered ? 15 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--warm-cream)",
          }}
        >
          {item.title}
        </motion.h3>
      </div>

      <motion.p
        className="text-sm md:text-lg leading-relaxed max-w-lg relative z-10 font-light"
        style={{ color: "rgba(245,242,235,0.5)" }}
        animate={{ opacity: hovered ? 0.9 : 0.5, x: hovered ? 10 : 0 }}
      >
        {item.description}
      </motion.p>

      <motion.div
        className="hidden md:flex ml-auto items-center justify-center w-12 h-12 rounded-full border border-gold/30 relative z-10 group-hover:bg-gold group-hover:border-gold transition-all duration-500"
        animate={{ 
          rotate: hovered ? 45 : 0,
          scale: hovered ? 1.1 : 1
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="group-hover:text-warm-dark transition-colors duration-500"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function OfferingsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <section
      ref={sectionRef}
      id="offerings"
      className="section-padding relative overflow-hidden min-h-screen flex flex-col justify-center"
      style={{ backgroundColor: "var(--warm-dark)" }}
    >
      {/* Ambient background animations */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, opacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
      </motion.div>

      <div className="mx-auto max-w-7xl relative z-10 w-full">
        <div className="mb-24">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="label-text mb-6 inline-block"
          >
            What We Offer
          </motion.p>
          
          <div className="relative">
            <TextReveal className="heading-lg text-warm-cream leading-tight">
              Crafting Every Layer
            </TextReveal>
            <TextReveal className="heading-lg text-warm-cream leading-tight italic" delay={0.1}>
              of Home
            </TextReveal>
            
            <motion.div 
              className="absolute -left-12 top-0 bottom-0 w-px bg-gold/30"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        <div className="space-y-0">
          {offerings.map((item, i) => (
            <OfferingRow key={item.number} item={item} index={i} />
          ))}
        </div>
      </div>
      
      {/* Decorative vertical text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
        <span className="text-[100px] font-display font-light text-white/[0.02] rotate-90 block origin-center whitespace-nowrap uppercase tracking-[0.2em]">
          Collections MMXXIV
        </span>
      </div>
    </section>
  );
}
