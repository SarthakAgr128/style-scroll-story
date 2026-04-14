import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="section-padding bg-card">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <ScrollReveal>
              <p className="label-text mb-4">Get in Touch</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="gold-line mb-8" />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h2 className="heading-lg text-foreground mb-6">
                Let's Begin
                <br />
                <em className="italic">Your Story</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="body-md text-muted-foreground mb-8">
                Whether you're reimagining a single room or an entire home,
                we'd love to hear from you. Share your vision and we'll be
                in touch to explore what's possible together.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="text-gold">✦</span>
                  <span>hello@visheshlivings.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gold">✦</span>
                  <span>Instagram: @visheshlivings</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Form */}
          <ScrollReveal delay={0.2} direction="right">
            {submitted ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <span className="text-4xl text-gold block mb-4">✦</span>
                  <h3 className="heading-md text-foreground mb-2">Thank You</h3>
                  <p className="text-muted-foreground">We'll be in touch soon.</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-6"
              >
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border-b bg-transparent py-3 text-foreground outline-none transition-colors duration-300 focus:border-gold placeholder:text-muted-foreground/40"
                    style={{ borderColor: "var(--border)" }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border-b bg-transparent py-3 text-foreground outline-none transition-colors duration-300 focus:border-gold placeholder:text-muted-foreground/40"
                    style={{ borderColor: "var(--border)" }}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">
                    Tell Us About Your Space
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border-b bg-transparent py-3 text-foreground outline-none transition-colors duration-300 focus:border-gold placeholder:text-muted-foreground/40 resize-none"
                    style={{ borderColor: "var(--border)" }}
                    placeholder="Describe your vision..."
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full justify-center mt-4 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
