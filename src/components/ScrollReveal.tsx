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
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // During SSR or before hydration, render children normally (visible)
  if (!isBrowser) {
    return <div className={className}>{children}</div>;
  }

  const getTransform = () => {
    if (visible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up": return "translate3d(0, 40px, 0)";
      case "down": return "translate3d(0, -40px, 0)";
      case "left": return "translate3d(40px, 0, 0)";
      case "right": return "translate3d(-40px, 0, 0)";
      default: return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
