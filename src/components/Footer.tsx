import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer className="px-6 py-16 md:px-12" style={{ backgroundColor: "var(--warm-dark)" }}>
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <span
              className="text-lg tracking-[0.1em]"
              style={{ fontFamily: "var(--font-display)", color: "var(--warm-cream)" }}
            >
              VISHESH LIVINGS
            </span>
            <p className="text-xs tracking-[0.1em]" style={{ color: "rgba(245,242,235,0.4)" }}>
              © {new Date().getFullYear()} Vishesh Livings. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Instagram", "Pinterest", "Email"].map((item) => (
                <span
                  key={item}
                  className="text-xs uppercase tracking-[0.15em] cursor-pointer transition-colors duration-300 hover:opacity-70"
                  style={{ color: "rgba(245,242,235,0.6)" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
