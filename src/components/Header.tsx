import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(245, 242, 235, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          <button onClick={() => scrollTo("hero")} className="z-10">
            <span
              className="text-xl md:text-2xl font-medium tracking-[0.08em]"
              style={{ fontFamily: "var(--font-display)", color: scrolled ? "var(--warm-dark)" : "var(--warm-cream)" }}
            >
              VISHESH LIVINGS
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-300 hover:opacity-70"
                style={{ color: scrolled ? "var(--warm-dark)" : "var(--warm-cream)" }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden z-10 flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{
                backgroundColor: menuOpen ? "var(--warm-dark)" : scrolled ? "var(--warm-dark)" : "var(--warm-cream)",
                transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none",
              }}
            />
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{
                backgroundColor: menuOpen ? "var(--warm-dark)" : scrolled ? "var(--warm-dark)" : "var(--warm-cream)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{
                backgroundColor: menuOpen ? "var(--warm-dark)" : scrolled ? "var(--warm-dark)" : "var(--warm-cream)",
                transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8" style={{ backgroundColor: "var(--warm-cream)" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="heading-md text-foreground"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
