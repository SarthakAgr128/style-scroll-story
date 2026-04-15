import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { TextReveal } from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <section id="contact" className="section-padding bg-card relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[300px] font-display leading-none uppercase">Join</h2>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          <div>
            <ScrollReveal>
              <p className="label-text mb-6 italic">Get in Touch</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="gold-line mb-10 w-20" />
            </ScrollReveal>
            
            <div className="mb-10">
              <TextReveal className="heading-lg text-foreground leading-tight">
                Let's Begin
              </TextReveal>
              <TextReveal className="heading-lg text-foreground leading-tight italic" delay={0.1}>
                Your Story
              </TextReveal>
            </div>

            <ScrollReveal delay={0.3}>
              <p className="body-md text-muted-foreground mb-12 font-light leading-relaxed max-w-md">
                Whether you're reimagining a single room or an entire home, we'd
                love to hear from you. Share your vision and we'll be in touch to
                explore what's possible together.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="space-y-6">
                {[
                  { label: "Email", value: "hello@visheshlivings.com" },
                  { label: "Instagram", value: "@visheshlivings" },
                  { label: "Studio", value: "New Delhi, India" }
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="group flex flex-col gap-1 cursor-default"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-semibold transition-colors group-hover:text-gold">
                      {item.label}
                    </span>
                    <span className="text-lg md:text-xl font-light text-foreground group-hover:text-gold transition-colors duration-500">
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="relative">
            <ScrollReveal delay={0.4} direction="left">
              <div className="p-8 md:p-12 bg-background/50 backdrop-blur-md border border-border/40 rounded-sm relative shadow-2xl shadow-black/5">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full border border-gold flex items-center justify-center mb-8"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, delay: 0.2 }}
                      >
                        <motion.span
                          className="text-3xl text-gold"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ✦
                        </motion.span>
                      </motion.div>
                      <h3 className="heading-md text-foreground mb-4">Message Sent</h3>
                      <p className="text-muted-foreground font-light max-w-xs mx-auto">
                        We've received your vision. One of our curators will reach out to you within 24 hours.
                      </p>
                      <button 
                        onClick={() => setSubmitted(false)}
                        className="mt-8 text-xs uppercase tracking-[0.2em] text-gold hover:text-foreground transition-colors"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="space-y-10"
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
                          label: "Email Address",
                          type: "email",
                          placeholder: "your@email.com",
                        },
                      ].map((field) => (
                        <div key={field.name} className="relative group">
                          <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-1 font-semibold group-focus-within:text-gold transition-colors">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            required
                            className="w-full border-b bg-transparent py-4 text-foreground outline-none transition-all duration-500 placeholder:text-muted-foreground/20 focus:placeholder:text-muted-foreground/10"
                            style={{ borderColor: "rgba(0,0,0,0.1)" }}
                            placeholder={field.placeholder}
                            onFocus={() => setFocusedField(field.name)}
                            onBlur={() => setFocusedField(null)}
                          />
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left"
                            style={{ backgroundColor: "var(--gold)" }}
                            animate={{
                              scaleX: focusedField === field.name ? 1 : 0,
                            }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      ))}

                      <div className="relative group">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-1 font-semibold group-focus-within:text-gold transition-colors">
                          Your Vision
                        </label>
                        <textarea
                          rows={3}
                          className="w-full border-b bg-transparent py-4 text-foreground outline-none transition-all duration-500 placeholder:text-muted-foreground/20 focus:placeholder:text-muted-foreground/10 resize-none"
                          style={{ borderColor: "rgba(0,0,0,0.1)" }}
                          placeholder="Tell us about the space you want to create..."
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left"
                          style={{ backgroundColor: "var(--gold)" }}
                          animate={{
                            scaleX: focusedField === "message" ? 1 : 0,
                          }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>

                      <MagneticButton
                        type="submit"
                        className="btn-primary w-full justify-center mt-6"
                        strength={0.1}
                      >
                        <span className="relative z-10 py-2">Submit Enquiry</span>
                      </MagneticButton>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
