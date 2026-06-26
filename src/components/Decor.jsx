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
      <g stroke="url(#venueGold)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* ===== ornate double frame ===== */}
        <g strokeWidth="1.3">
          <rect x="12" y="12" width="296" height="296" rx="10" />
          <rect x="22" y="22" width="276" height="276" rx="7" opacity="0.55" />
        </g>
        {/* corner flourishes */}
        <g strokeWidth="1" opacity="0.8">
          <path d="M30 58 q0 -28 28 -28 M30 50 q6 -6 14 -6 M52 30 q-6 0 -10 4" />
          <path d="M290 58 q0 -28 -28 -28 M290 50 q-6 -6 -14 -6 M268 30 q6 0 10 4" />
          <path d="M30 262 q0 28 28 28 M52 290 q-6 0 -10 -4" />
          <path d="M290 262 q0 28 -28 28 M268 290 q6 0 10 -4" />
        </g>

        {/* ===== ceiling cornice & chandelier ===== */}
        <path d="M70 64 q90 -20 180 0" strokeWidth="0.9" opacity="0.7" />
        <path d="M160 60 v20" strokeWidth="1" />
        {/* canopy + tiers of crystals */}
        <path d="M138 86 q22 -10 44 0 q-22 16 -44 0Z" strokeWidth="1.1" />
        <path d="M146 92 q14 12 28 0" strokeWidth="0.9" opacity="0.85" />
        <g strokeWidth="0.8" opacity="0.9">
          <path d="M142 88 v14 M150 94 v16 M160 96 v20 M170 94 v16 M178 88 v14" />
          <path d="M138 102 q6 6 8 0 M150 110 q6 6 8 0 M162 116 q6 7 8 0 M174 110 q6 6 8 0" />
        </g>
        <circle cx="160" cy="80" r="2.4" strokeWidth="0.8" />

        {/* ===== flanking columns with capitals & bases ===== */}
        <g strokeWidth="1.1">
          {/* left column */}
          <path d="M64 250 v-128" />
          <path d="M74 250 v-128" />
          <path d="M58 122 h22 M58 118 q11 -8 22 0" />        {/* capital */}
          <path d="M56 250 h28 M60 258 h20" />                 {/* base/plinth */}
          <path d="M66 240 v-108 M72 240 v-108" strokeWidth="0.5" opacity="0.5" /> {/* fluting */}
          {/* right column */}
          <path d="M246 250 v-128" />
          <path d="M256 250 v-128" />
          <path d="M240 122 h22 M240 118 q11 -8 22 0" />
          <path d="M236 250 h28 M240 258 h20" />
          <path d="M248 240 v-108 M254 240 v-108" strokeWidth="0.5" opacity="0.5" />
        </g>

        {/* ===== draped curtains tied to the sides ===== */}
        <g strokeWidth="1" opacity="0.85">
          <path d="M92 104 q-16 70 -4 150 q12 -10 22 -6 q-14 -64 0 -132 q-10 -8 -18 -12Z" />
          <path d="M97 120 q-8 50 -2 110 M104 116 q-6 54 -1 116" strokeWidth="0.5" opacity="0.6" />
          <path d="M228 104 q16 70 4 150 q-12 -10 -22 -6 q14 -64 0 -132 q10 -8 18 -12Z" />
          <path d="M223 120 q8 50 2 110 M216 116 q6 54 1 116" strokeWidth="0.5" opacity="0.6" />
        </g>

        {/* ===== grand arched doorway with light ===== */}
        <g strokeWidth="1.2">
          <path d="M120 250 v-78 a40 40 0 0 1 80 0 v78" />
          <path d="M128 250 v-74 a32 32 0 0 1 64 0 v74" strokeWidth="0.7" opacity="0.6" />
          <path d="M160 174 v76" strokeWidth="0.5" opacity="0.4" />
          <path d="M138 250 v-66 M182 250 v-66" strokeWidth="0.5" opacity="0.4" />
        </g>

        {/* ===== balustraded grand staircase ===== */}
        <g strokeWidth="1">
          <path d="M108 304 v-12 h104 v12" />
          <path d="M118 292 v-11 h84 v11" />
          <path d="M128 281 v-10 h64 v10" />
          <path d="M138 271 v-9 h44 v9" />
          {/* balusters on the bottom step */}
          <path d="M112 292 v8 M120 292 v8 M200 292 v8 M208 292 v8" strokeWidth="0.6" opacity="0.7" />
          {/* hand-rails sweeping down */}
          <path d="M120 262 q-10 22 -14 42 M200 262 q10 22 14 42" strokeWidth="0.9" />
        </g>

        {/* ===== floral urns at the base of each column ===== */}
        <g strokeWidth="0.9" opacity="0.9">
          {/* left urn */}
          <path d="M52 268 q12 -8 24 0 l-4 16 q-8 4 -16 0Z" />
          <path d="M58 268 q6 -14 12 0" />
          <circle cx="58" cy="258" r="4" /><circle cx="68" cy="256" r="4" /><circle cx="64" cy="250" r="3.5" />
          {/* right urn */}
          <path d="M244 268 q12 -8 24 0 l-4 16 q-8 4 -16 0Z" />
          <path d="M250 268 q6 -14 12 0" />
          <circle cx="250" cy="258" r="4" /><circle cx="260" cy="256" r="4" /><circle cx="256" cy="250" r="3.5" />
        </g>
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
export function MonogramRing({ left, right }) {
  return (
    <div className="monogram-ring" aria-hidden="true">
      <svg viewBox="0 0 120 150" fill="none" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="60" cy="75" rx="48" ry="66" stroke="currentColor" strokeWidth="1.1" fill="none" opacity="0.75" />
        <ellipse cx="60" cy="75" rx="42" ry="60" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.4" />
      </svg>
      <span className="monogram-ring-text">
        <span className="mr-letter">{left}</span>
        <span className="mr-amp">&amp;</span>
        <span className="mr-letter">{right}</span>
      </span>
    </div>
  )
}
