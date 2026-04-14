import ScrollReveal from "./ScrollReveal";

const images = [
  { src: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80&auto=format&fit=crop", alt: "Elegant dining room", label: "Dining" },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop", alt: "Artisanal home textiles", label: "Textiles" },
  { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&auto=format&fit=crop", alt: "Modern home office", label: "Workspace" },
  { src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop", alt: "Luxury bathroom details", label: "Bath" },
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
              <div className="group relative overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
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
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
