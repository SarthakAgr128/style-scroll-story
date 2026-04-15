import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <footer
      ref={ref}
      className="px-6 py-20 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: "var(--warm-dark)" }}
    >
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 100%, var(--gold), transparent 50%)",
        }}
      />

      <div className="mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-4">
            <motion.div
              className="h-px flex-1 max-w-24"
              style={{ backgroundColor: "rgba(245,242,235,0.12)" }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <motion.span
              className="text-lg md:text-2xl italic tracking-wide"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--gold)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Live Special
            </motion.span>
            <motion.div
              className="h-px flex-1 max-w-24"
              style={{ backgroundColor: "rgba(245,242,235,0.12)" }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <span
            className="text-lg tracking-[0.1em]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--warm-cream)",
            }}
          >
            VISHESH LIVINGS
          </span>
          <p
            className="text-xs tracking-[0.1em]"
            style={{ color: "rgba(245,242,235,0.4)" }}
          >
            &copy; {new Date().getFullYear()} Vishesh Livings. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Pinterest", "Email"].map((item, i) => (
              <motion.span
                key={item}
                className="text-xs uppercase tracking-[0.15em] cursor-pointer transition-colors duration-300"
                style={{ color: "rgba(245,242,235,0.6)" }}
                whileHover={{
                  color: "rgba(245,242,235,1)",
                  y: -2,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
