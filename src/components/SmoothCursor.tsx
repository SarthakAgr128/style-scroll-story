import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function SmoothCursor() {
  const [visible, setVisible] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, restDelta: 0.001 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  const ringX = useSpring(mouseX, { damping: 35, stiffness: 150 });
  const ringY = useSpring(mouseY, { damping: 35, stiffness: 150 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const interactive = target.closest("a, button, [role='button'], .cursor-none, .btn-primary, .btn-outline");
      if (interactive) {
        setHoveredElement("interactive");
        return;
      }

      const textElement = target.closest("h1, h2, h3, .heading-lg, .heading-xl");
      if (textElement) {
        setHoveredElement("text");
        return;
      }

      setHoveredElement(null);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference"
        aria-hidden
      >
        <motion.div
          animate={{
            scale: hoveredElement === "interactive" ? 2.5 : hoveredElement === "text" ? 4 : 1,
            opacity: hoveredElement === "text" ? 0.3 : 1,
            borderWidth: hoveredElement === "interactive" ? "1px" : "1.5px",
          }}
          className="rounded-full border border-white"
          style={{ 
            width: 24, 
            height: 24,
            transform: "translate(-50%, -50%)" 
          }}
        />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[10001] mix-blend-difference"
        aria-hidden
      >
        <motion.div
          animate={{
            scale: hoveredElement ? 0 : 1,
            backgroundColor: "#ffffff",
          }}
          className="rounded-full"
          style={{ 
            width: 6, 
            height: 6,
            transform: "translate(-50%, -50%)" 
          }}
        />
      </motion.div>
      
      {/* View text for gallery */}
      <AnimatePresence>
        {hoveredElement === "interactive" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{ x: ringX, y: ringY }}
            className="pointer-events-none fixed top-0 left-0 z-[10002] flex items-center justify-center"
          >
            <div className="text-[6px] uppercase tracking-[0.2em] font-bold text-white mix-blend-difference" style={{ transform: "translate(-50%, -50%)" }}>
              Explore
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
