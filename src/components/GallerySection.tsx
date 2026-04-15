import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import ScrollReveal, { TextReveal } from "./ScrollReveal";

const images = [
  {
    src: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80&auto=format&fit=crop",
    alt: "Elegant dining room",
    label: "Dining",
    height: "aspect-[3/4]",
    parallax: 0.1
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop",
    alt: "Artisanal home textiles",
    label: "Textiles",
    height: "aspect-[4/5]",
    parallax: -0.15
  },
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&auto=format&fit=crop",
    alt: "Modern home office",
    label: "Workspace",
    height: "aspect-[3/4]",
    parallax: 0.2
  },
  {
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop",
    alt: "Luxury bathroom details",
    label: "Bath",
    height: "aspect-[4/5]",
    parallax: -0.05
  },
];

function TiltCard({
  img,
  index,
}: {
  img: (typeof images)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, img.parallax * 200]);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(xPos * 15);
    rotateX.set(-yPos * 15);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`relative ${index % 2 === 1 ? "mt-12 lg:mt-24" : ""}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 1.2,
          delay: index * 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          className="group relative overflow-hidden cursor-none rounded-sm bg-muted"
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
          onMouseMove={handleMouse}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            resetTilt();
            setHovered(false);
          }}
        >
          <div className={`${img.height} overflow-hidden`}>
            <motion.img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
              animate={{ 
                scale: hovered ? 1.15 : 1.05,
                filter: hovered ? "grayscale(0)" : "grayscale(0.4)"
              }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              loading="lazy"
            />
          </div>

          {/* Luxury overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/80 via-transparent to-transparent opacity-60" />
            
            <div className="relative z-10 overflow-hidden">
              <motion.p 
                className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2"
                animate={{ y: hovered ? 0 : 20 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                Category
              </motion.p>
              <motion.h4 
                className="text-2xl text-white font-light font-display"
                animate={{ y: hovered ? 0 : 40 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {img.label}
              </motion.h4>
            </div>
          </motion.div>

          {/* Border highlight */}
          <motion.div
            className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-700 pointer-events-none"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <section ref={sectionRef} id="gallery" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[300px] font-display leading-none uppercase">Art</h2>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <ScrollReveal>
              <p className="label-text mb-4 italic">The Lookbook</p>
            </ScrollReveal>
            <div className="relative">
              <TextReveal className="heading-lg text-foreground">
                A Glimpse Into
              </TextReveal>
              <TextReveal className="heading-lg text-foreground italic" delay={0.1}>
                Our Universe
              </TextReveal>
            </div>
          </div>
          
          <ScrollReveal direction="left" delay={0.3} className="md:max-w-xs">
            <p className="body-md text-muted-foreground text-sm leading-relaxed">
              Explore our curated selection of spaces that embody our vision 
              of intentional living and aesthetic harmony.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {images.map((img, i) => (
            <TiltCard key={img.label} img={img} index={i} />
          ))}
        </div>
        
        <div className="mt-32 flex justify-center">
          <ScrollReveal scale={0.9} duration={1.2}>
            <button className="group relative flex flex-col items-center gap-4 cursor-none">
              <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground group-hover:text-gold transition-colors duration-500">
                View All Collections
              </span>
              <div className="w-16 h-px bg-border group-hover:w-32 group-hover:bg-gold transition-all duration-700" />
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
