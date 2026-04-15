import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import type { CSSProperties } from "react";

interface MarqueeTextProps {
  items: string[];
  separator?: string;
  className?: string;
  style?: CSSProperties;
  baseVelocity?: number;
}

// Helper function for wrapping values
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function MarqueeText({
  items,
  separator = "✦",
  className = "",
  style,
  baseVelocity = 2,
}: MarqueeTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic number to determine how much of the track to wrap around.
   * It depends on the number of items and their width.
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const repeated = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <div
      className={`overflow-hidden py-8 md:py-12 flex whitespace-nowrap flex-nowrap ${className}`}
      style={style}
      aria-hidden
    >
      <motion.div className="flex whitespace-nowrap flex-nowrap gap-4 md:gap-8" style={{ x }}>
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span
              className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight whitespace-nowrap px-4 md:px-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item}
            </span>
            <span
              className="text-sm md:text-base shrink-0 opacity-50"
              style={{ color: "var(--gold)" }}
            >
              {separator}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
