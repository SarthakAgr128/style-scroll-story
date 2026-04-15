import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const images = [
  {
    src: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80&auto=format&fit=crop",
    alt: "Elegant dining room",
    label: "Dining",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop",
    alt: "Artisanal home textiles",
    label: "Textiles",
  },
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&auto=format&fit=crop",
    alt: "Modern home office",
    label: "Workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop",
    alt: "Luxury bathroom details",
    label: "Bath",
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
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 15);
    rotateX.set(-y * 15);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        perspective: "800px",
        marginTop: index % 2 === 1 ? "2rem" : 0,
      }}
    >
      <motion.div
        className="group relative overflow-hidden cursor-pointer rounded-sm"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouse}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          resetTilt();
          setHovered(false);
        }}
      >
        <div className="aspect-[3/4] overflow-hidden">
          <motion.img
            src={img.src}
            alt={img.alt}
            className="h-full w-full object-cover"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            loading="lazy"
            width={800}
            height={1000}
          />
        </div>

        <motion.div
          className="absolute inset-0 flex items-end p-4 md:p-6"
          style={{
            background:
              "linear-gradient(to top, rgba(30,25,18,0.7), transparent 60%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            className="text-xs uppercase tracking-[0.2em] font-medium"
            style={{ color: "var(--gold-light)" }}
            initial={{ y: 10 }}
            animate={{ y: hovered ? 0 : 10 }}
            transition={{ duration: 0.4 }}
          >
            {img.label}
          </motion.span>
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 60%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="label-text mb-4">Inspiration</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-lg text-foreground">
              A Glimpse Into
              <br />
              <em className="italic">Our Universe</em>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {images.map((img, i) => (
            <TiltCard key={img.label} img={img} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
