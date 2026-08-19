/**
 * Veyora wordmark + rising-arrow / connected-nodes mark.
 * size controls the mark height in px.
 */
export default function Logo({ size = 34, showText = true }) {
  return (
    <span className="logo" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="veyoraGrad" x1="6" y1="38" x2="38" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E3A8A" />
            <stop offset="0.55" stopColor="#2563EB" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        {/* rising arrow forming a V / checkmark */}
        <path
          d="M9 15 L20 33 L37 8"
          stroke="url(#veyoraGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* arrow head */}
        <path
          d="M31 8 L38 7 L37 14"
          stroke="url(#veyoraGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* connected nodes (team) */}
        <circle cx="14" cy="12" r="3" fill="#3B82F6" />
        <circle cx="22" cy="16" r="3" fill="#2563EB" />
        <line x1="14" y1="12" x2="22" y2="16" stroke="#2563EB" strokeWidth="2" />
      </svg>
      {showText && <span className="logo__text">Veyora</span>}
    </span>
  );
}
