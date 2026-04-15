import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [percentage, setPercentage] = useState(0);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setPercentage(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[100]"
        aria-hidden
      >
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))",
            boxShadow: "0 0 10px var(--gold)",
          }}
        />
      </motion.div>

      {/* Floating progress indicator */}
      <motion.div 
        className="fixed bottom-10 right-10 z-[40] hidden lg:flex items-center gap-4 mix-blend-difference"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-1">
            Progress
          </span>
          <div className="text-xl font-light text-white font-display flex items-baseline gap-1">
            <span className="w-10 text-right">{percentage}</span>
            <span className="text-[10px] opacity-40">%</span>
          </div>
        </div>
        
        <div className="relative w-[1px] h-12 bg-white/20">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-white"
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>
      </motion.div>
    </>
  );
}
