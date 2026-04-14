import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true); // default visible for SSR
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setVisible(false); // hide after hydration to animate in

    const el = ref.current;
    if (!el) return;

    // Small delay to ensure the hidden state is painted first
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(el);
          }
        },
        { threshold: 0.1, rootMargin: "-40px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  const dirs: Record<string, string> = {
    up: "translateY(50px)",
    down: "translateY(-50px)",
    left: "translateX(50px)",
    right: "translateX(-50px)",
    none: "translateY(0)",
  };

  const style = hydrated
    ? {
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0, 0)" : dirs[direction] || dirs.up,
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform" as const,
      }
    : {};

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
