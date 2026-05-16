type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
};

/**
 * Brand lockup: circular emerald badge with the white multi-peak tent
 * silhouette, optionally followed by the "Ақ Шатыр" wordmark and bilingual
 * tagline. SVG-only — scales crisply at any size.
 */
export default function Logo({
  size = 44,
  showWordmark = true,
  className,
}: LogoProps) {
  return (
    <span className={["brand", className].filter(Boolean).join(" ")}>
      <span
        className="brand-badge"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bg-rg" cx="40%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#1e6e3f" />
              <stop offset="60%" stopColor="#0f4a25" />
              <stop offset="100%" stopColor="#072b15" />
            </radialGradient>
          </defs>

          {/* Outer white ring */}
          <circle cx="50" cy="50" r="49" fill="#ffffff" />
          {/* Inner emerald disc */}
          <circle cx="50" cy="50" r="46" fill="url(#bg-rg)" />
          {/* Soft grain — subtle */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
          />

          {/* Stylized multi-peak tent silhouette */}
          <path
            d="
              M 14 64
              C 22 62, 30 60, 36 54
              L 42 42
              C 43 40, 45 40, 46 42
              L 49 48
              L 50 36
              L 51 48
              L 54 42
              C 55 40, 57 40, 58 42
              L 64 54
              C 70 60, 78 62, 86 64
              L 86 67
              C 70 70, 30 70, 14 67
              Z
            "
            fill="#ffffff"
          />
        </svg>
      </span>

      {showWordmark && (
        <span className="brand-text">
          <span className="brand-name">
            Ақ&nbsp;Шатыр
          </span>
          <span className="brand-tagline">демалыс орталығы</span>
        </span>
      )}
    </span>
  );
}
