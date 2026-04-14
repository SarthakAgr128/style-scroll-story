import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

const getVariants = (direction: string, distance = 60): Variants => {
  const dirs: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };
  const d = dirs[direction] || {};
  return {
    hidden: { opacity: 0, ...d },
    visible: { opacity: 1, x: 0, y: 0 },
  };
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      variants={getVariants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
