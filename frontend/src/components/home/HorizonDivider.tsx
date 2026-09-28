export function HorizonDivider() {
  return (
    <svg
      className="horizon-divider"
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      role="img"
      focusable="false"
    >
      <defs>
        <radialGradient id="horizonGlow" cx="50%" cy="0%" r="60%" fx="50%" fy="0%">
          <stop offset="0%" stopColor="#FF3333" stopOpacity={0.6} />
          <stop offset="60%" stopColor="#FF3333" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#FF3333" stopOpacity={0} />
        </radialGradient>
        <filter id="glowBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base dark arc */}
      <path
        d="M0,58 Q600,12 1200,58"
        stroke="#0D0D0D"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Neon glow centered on the curve apex */}
      <ellipse
        cx="600"
        cy="12"
        rx="300"
        ry="30"
        fill="url(#horizonGlow)"
        filter="url(#glowBlur)"
        opacity="0.85"
      />
    </svg>
  );
}