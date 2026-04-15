import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <section id="contact" className="section-padding bg-card">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
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
                Whether you're reimagining a single room or an entire home, we'd
                love to hear from you. Share your vision and we'll be in touch to
                explore what's possible together.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <div className="space-y-4 text-sm text-muted-foreground">
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.span
                    className="text-gold"
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    ✦
                  </motion.span>
                  <span>hello@visheshlivings.com</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.span
                    className="text-gold"
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{
                      duration: 8,
                      delay: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    ✦
                  </motion.span>
                  <span>Instagram: @visheshlivings</span>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2} direction="right">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="text-center">
                    <motion.span
                      className="text-5xl text-gold block mb-6"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      ✦
                    </motion.span>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="heading-md text-foreground mb-2"
                    >
                      Thank You
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-muted-foreground"
                    >
                      We'll be in touch soon.
                    </motion.p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-8"
                >
                  {[
                    {
                      name: "name",
                      label: "Full Name",
                      type: "text",
                      placeholder: "Your name",
                    },
                    {
                      name: "email",
                      label: "Email",
                      type: "email",
                      placeholder: "your@email.com",
                    },
                  ].map((field) => (
                    <div key={field.name} className="relative">
                      <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        className="w-full border-b bg-transparent py-3 text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground/40"
                        style={{ borderColor: "var(--border)" }}
                        placeholder={field.placeholder}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px origin-left"
                        style={{ backgroundColor: "var(--gold)" }}
                        animate={{
                          scaleX: focusedField === field.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  ))}

                  <div className="relative">
                    <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">
                      Tell Us About Your Space
                    </label>
                    <textarea
                      rows={4}
                      className="w-full border-b bg-transparent py-3 text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground/40 resize-none"
                      style={{ borderColor: "var(--border)" }}
                      placeholder="Describe your vision..."
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px origin-left"
                      style={{ backgroundColor: "var(--gold)" }}
                      animate={{
                        scaleX: focusedField === "message" ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    className="btn-primary w-full justify-center mt-4"
                    strength={0.15}
                  >
                    <span>Send Enquiry</span>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
