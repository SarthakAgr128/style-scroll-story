import ScrollReveal from "./ScrollReveal";
import aboutImage from "@/assets/about-interior.jpg";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Image */}
          <ScrollReveal direction="left" className="order-2 lg:order-1">
            <div className="relative overflow-hidden">
              <img
                src={aboutImage}
                alt="Elegant bedroom interior"
                className="w-full object-cover aspect-[4/5]"
                loading="lazy"
                width={960}
                height={1200}
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(30,25,18,0.15), transparent)" }} />
            </div>
          </ScrollReveal>

          {/* Content */}
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
                Vishesh Livings was founded on a singular belief — that the spaces we
                inhabit shape the lives we lead. Every texture, every hue, every
                carefully chosen piece tells a story of intention and artistry.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <p className="body-md text-muted-foreground mb-8">
                We are not just a home decor brand. We are curators of atmosphere,
                architects of comfort, and believers in the quiet luxury of
                thoughtful design. Our journey begins with you — and the home
                you've always envisioned.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-3xl md:text-4xl font-light text-gold" style={{ fontFamily: "var(--font-display)" }}>100+</span>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">Curated Designs</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <span className="text-3xl md:text-4xl font-light text-gold" style={{ fontFamily: "var(--font-display)" }}>∞</span>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">Possibilities</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
