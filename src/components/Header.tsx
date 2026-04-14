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

  const textColor = scrolled ? "#2a2218" : "#f5f2eb";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 transition-all duration-500"
        style={{
          zIndex: 50,
          backgroundColor: scrolled ? "rgba(245, 242, 235, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          <button onClick={() => scrollTo("hero")}>
            <span
              className="text-xl md:text-2xl font-medium tracking-[0.08em]"
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
                className="text-xs uppercase font-medium transition-opacity duration-300 hover:opacity-70"
                style={{ letterSpacing: "0.18em", color: textColor }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col"
            style={{ gap: "6px", zIndex: 60 }}
            aria-label="Toggle menu"
          >
            <span className="block h-px w-6" style={{ backgroundColor: textColor, transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none", transition: "all 0.3s" }} />
            <span className="block h-px w-6" style={{ backgroundColor: textColor, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
            <span className="block h-px w-6" style={{ backgroundColor: textColor, transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none", transition: "all 0.3s" }} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 flex flex-col items-center justify-center" style={{ zIndex: 55, backgroundColor: "#f5f2eb", gap: "2rem" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-2xl font-light tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "#2a2218" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
