import React from 'react'

/* ===== Small diamond divider — gold line, line + diamond + line ===== */
export function DiamondDivider({ className = '' }) {
  return (
    <svg className={`deco-divider ${className}`} width="220" height="20" viewBox="0 0 220 20" fill="none" aria-hidden="true">
      <line x1="20" y1="10" x2="92" y2="10" stroke="currentColor" strokeWidth="1" />
      <line x1="128" y1="10" x2="200" y2="10" stroke="currentColor" strokeWidth="1" />
      <path d="M110 3 L117 10 L110 17 L103 10 Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M96 10 q3 -3 7 0 q-3 3 -7 0Z" fill="currentColor" opacity="0.85" />
      <path d="M124 10 q-3 -3 -7 0 q3 3 7 0Z" fill="currentColor" opacity="0.85" />
    </svg>
  )
}

/* ===== Tilde flourish divider (used in maroon sections) ===== */
export function TildeDivider({ className = '' }) {
  return (
    <svg className={`deco-divider ${className}`} width="200" height="18" viewBox="0 0 200 18" fill="none" aria-hidden="true">
      <line x1="30" y1="9" x2="82" y2="9" stroke="currentColor" strokeWidth="1" />
      <line x1="118" y1="9" x2="170" y2="9" stroke="currentColor" strokeWidth="1" />
      <path d="M88 9 q4 -7 8 0 q4 7 8 0" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

/* ===== Calendar (countdown) ===== */
export function CalendarDecor() {
  return (
    <svg className="decor-art" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="26" y="30" width="68" height="76" rx="6" />
        <rect x="34" y="38" width="68" height="76" rx="6" opacity="0.45" />
        <path d="M44 30 v-8 M76 30 v-8" />
        <circle cx="44" cy="20" r="3.4" />
        <circle cx="76" cy="20" r="3.4" />
        <path d="M52 92 q8 6 16 0" opacity="0.7" />
        <path d="M60 84 v14 M60 84 q-6 4 -14 2 M60 84 q6 4 14 2" opacity="0.7" />
      </g>
    </svg>
  )
}

/* ===== Twin candles ===== */
export function CandlesDecor() {
  return (
    <svg className="decor-art" width="120" height="170" viewBox="0 0 120 170" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* flames */}
        <path d="M44 22 q6 9 0 18 q-6 -9 0 -18Z" />
        <path d="M76 14 q6 10 0 20 q-6 -10 0 -20Z" />
        {/* candle bodies */}
        <path d="M40 42 h8 v74 h-8 Z" />
        <path d="M72 36 h8 v80 h-8 Z" />
        {/* holders */}
        <path d="M30 116 h28 l-5 18 h-18 Z" />
        <path d="M62 116 h28 l-5 18 h-18 Z" />
        <path d="M34 134 h20 M66 134 h20" />
        <path d="M38 134 v14 q6 6 12 0 v-14 M70 134 v14 q6 6 12 0 v-14" />
      </g>
    </svg>
  )
}

/* ===== Rose bouquet ===== */
export function BouquetDecor() {
  return (
    <svg className="decor-art" width="120" height="170" viewBox="0 0 120 170" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* radiating sprays */}
        <path d="M60 64 L34 18 M60 64 L60 14 M60 64 L86 18 M60 64 L20 40 M60 64 L100 40" opacity="0.55" />
        {/* roses */}
        <g>
          <circle cx="60" cy="58" r="13" />
          <path d="M60 50 q6 4 0 16 q-6 -4 0 -16Z M52 58 q4 6 16 0 q-4 -6 -16 0Z" opacity="0.8" />
        </g>
        <circle cx="40" cy="50" r="10" />
        <path d="M40 44 q4 3 0 12 q-4 -3 0 -12Z" opacity="0.8" />
        <circle cx="80" cy="50" r="10" />
        <path d="M80 44 q4 3 0 12 q-4 -3 0 -12Z" opacity="0.8" />
        <circle cx="48" cy="36" r="8" opacity="0.85" />
        <circle cx="72" cy="36" r="8" opacity="0.85" />
        {/* stems + wrap */}
        <path d="M50 70 L58 116 M70 70 L62 116 M60 68 L60 118" />
        <path d="M44 100 q16 8 32 0 l-6 30 q-10 5 -20 0 Z" />
        <path d="M48 112 h24 M50 122 h20" opacity="0.7" />
      </g>
    </svg>
  )
}

/* ===== Wedding rings ===== */
export function RingsDecor() {
  return (
    <svg className="decor-art" width="150" height="130" viewBox="0 0 150 130" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="58" cy="78" r="34" />
        <circle cx="92" cy="78" r="34" />
        {/* solitaire on the right ring */}
        <path d="M92 30 l-9 12 h18 Z" />
        <path d="M83 42 l9 12 l9 -12 M92 30 v24 M86 36 h12" opacity="0.85" />
      </g>
    </svg>
  )
}

/* ===== Venue — grand arch / hall ===== */
export function VenueDecor() {
  return (
    <svg className="decor-venue" viewBox="0 0 320 320" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="venueGold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#caa253" />
          <stop offset="1" stopColor="#8a6321" />
        </linearGradient>
      </defs>
      <g stroke="url(#venueGold)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* frame */}
        <rect x="14" y="14" width="292" height="292" rx="8" />
        <rect x="26" y="26" width="268" height="268" rx="6" opacity="0.5" />
        {/* corner flourishes */}
        <path d="M30 64 q0 -34 34 -34 M256 30 q34 0 34 34 M290 256 q0 34 -34 34 M64 290 q-34 0 -34 -34" opacity="0.7" />
        {/* columns */}
        <path d="M70 96 v150 M250 96 v150" />
        <path d="M60 96 h20 M240 96 h20 M60 246 h26 M234 246 h26" />
        {/* arch / doorway */}
        <path d="M120 250 v-92 a40 40 0 0 1 80 0 v92" />
        {/* chandelier */}
        <path d="M160 70 v22" />
        <path d="M140 100 q20 14 40 0" />
        <path d="M144 100 v10 M152 104 v10 M160 106 v12 M168 104 v10 M176 100 v10" />
        {/* staircase */}
        <path d="M112 300 v-14 h96 v14 M120 286 v-12 h80 v12 M130 274 v-12 h60 v12 M140 262 v-10 h40 v10" />
        {/* drapes */}
        <path d="M96 96 q14 60 0 150 M224 96 q-14 60 0 150" opacity="0.6" />
      </g>
    </svg>
  )
}

/* ===== Envelope (invitation header) ===== */
export function EnvelopeDecor() {
  return (
    <svg className="decor-art small" width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="20" y="28" width="56" height="44" rx="4" />
        <path d="M20 32 L48 52 L76 32" />
        <circle cx="48" cy="54" r="7" opacity="0.7" />
        <path d="M45 54 q3 -4 6 0 q-3 4 -6 0Z" opacity="0.7" />
      </g>
    </svg>
  )
}

/* ===== Monogram ring (oval frame around initials) ===== */
export function MonogramRing({ initials }) {
  return (
    <div className="monogram-ring" aria-hidden="true">
      <svg viewBox="0 0 120 150" fill="none" preserveAspectRatio="none">
        <ellipse cx="60" cy="75" rx="50" ry="68" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" />
        <ellipse cx="60" cy="75" rx="44" ry="62" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.4" />
      </svg>
      <span className="monogram-ring-text">{initials}</span>
    </div>
  )
}
