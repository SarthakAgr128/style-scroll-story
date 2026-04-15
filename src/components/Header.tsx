import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", "about", "offerings", "philosophy", "gallery", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Offerings", id: "offerings" },
    { label: "Philosophy", id: "philosophy" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  const textColor = scrolled ? "#2a2218" : "#f5f2eb";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 transition-all duration-500"
        style={{
          zIndex: 50,
          backgroundColor: scrolled
            ? "rgba(245, 242, 235, 0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          <button onClick={() => scrollTo("hero")} className="group">
            <span
              className="text-xl md:text-2xl font-medium tracking-[0.08em] transition-opacity duration-300 group-hover:opacity-80"
              style={{ fontFamily: "var(--font-display)", color: textColor }}
            >
              VISHESH LIVINGS
            </span>
          </button>

          <nav className="hidden md:flex items-center" style={{ gap: "2rem" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative text-xs uppercase font-medium py-1 transition-opacity duration-300 hover:opacity-70"
                style={{ letterSpacing: "0.18em", color: textColor }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ backgroundColor: "var(--gold)" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col relative"
            style={{ gap: "6px", zIndex: 60 }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 4 : 0,
              }}
              className="block h-px w-6 origin-center"
              style={{ backgroundColor: menuOpen ? "#2a2218" : textColor }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              className="block h-px w-6"
              style={{ backgroundColor: menuOpen ? "#2a2218" : textColor }}
            />
            <motion.span
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -4 : 0,
              }}
              className="block h-px w-6 origin-center"
              style={{ backgroundColor: menuOpen ? "#2a2218" : textColor }}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{ zIndex: 55, backgroundColor: "#f5f2eb" }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => scrollTo(item.id)}
                className="text-3xl font-light tracking-tight mb-6 hover:text-gold transition-colors duration-300"
                style={{ fontFamily: "var(--font-display)", color: "#2a2218" }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
