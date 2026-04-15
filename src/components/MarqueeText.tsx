import type { CSSProperties } from "react";

interface MarqueeTextProps {
  items: string[];
  separator?: string;
  className?: string;
  style?: CSSProperties;
}

export default function MarqueeText({
  items,
  separator = "✦",
  className = "",
  style,
}: MarqueeTextProps) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`overflow-hidden py-8 md:py-12 ${className}`}
      style={style}
      aria-hidden
    >
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span
              className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight whitespace-nowrap px-6 md:px-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item}
            </span>
            <span
              className="text-sm md:text-base shrink-0"
              style={{ color: "var(--gold)" }}
            >
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
