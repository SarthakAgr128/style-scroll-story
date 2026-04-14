import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const images = [
  { src: gallery1, alt: "Elegant dining room", label: "Dining" },
  { src: gallery2, alt: "Artisanal home textiles", label: "Textiles" },
  { src: gallery3, alt: "Modern home office", label: "Workspace" },
  { src: gallery4, alt: "Luxury bathroom details", label: "Bath" },
];

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
            <ScrollReveal key={img.label} delay={i * 0.1}>
              <motion.div
                className="group relative overflow-hidden cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width={800}
                    height={1000}
                  />
                </div>
                <div
                  className="absolute inset-0 flex items-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(to top, rgba(30,25,18,0.7), transparent 60%)" }}
                >
                  <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: "var(--gold-light)" }}>
                    {img.label}
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
