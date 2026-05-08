import React from 'react'

export function CornerOrnament({ className = '' }) {
  return (
    <svg className={`corner ${className}`} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="goldCorner" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#caa253" />
          <stop offset="1" stopColor="#7a5a1f" />
        </linearGradient>
      </defs>
      <g stroke="url(#goldCorner)" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M4 30 Q4 4 30 4" />
        <path d="M10 24 Q10 10 24 10" opacity="0.6" />
        <path d="M14 18 Q14 14 18 14" opacity="0.45" />
        <path d="M4 30 L4 22 M30 4 L22 4" opacity="0.4" />
        <circle cx="6" cy="6" r="1.4" fill="url(#goldCorner)" stroke="none" />
        <path
          d="M18 6 Q22 6 22 10 Q22 14 26 14"
          opacity="0.5"
        />
      </g>
    </svg>
  )
}

export function Crescent({ size = 56 }) {
  return (
    <svg
      className="crescent"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
    >
      <defs>
        <linearGradient id="goldCrescent" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#e8c87a" />
          <stop offset="0.5" stopColor="#caa253" />
          <stop offset="1" stopColor="#7a5a1f" />
        </linearGradient>
      </defs>
      <path
        d="M40 32a14 14 0 1 1-10.5-13.6A11 11 0 1 0 40 32z"
        fill="url(#goldCrescent)"
        opacity="0.95"
      />
      <circle cx="44" cy="20" r="1.8" fill="url(#goldCrescent)" />
      <circle cx="50" cy="28" r="1.2" fill="url(#goldCrescent)" opacity="0.7" />
    </svg>
  )
}

export function PeacockFeather({ size = 64, mirror = false, className = '' }) {
  return (
    <svg
      className={`feather ${className}`}
      width={size}
      height={size * 2.6}
      viewBox="0 0 80 200"
      fill="none"
      style={{ transform: mirror ? 'scaleX(-1)' : 'none' }}
    >
      <defs>
        <linearGradient id={`featherGold${mirror ? 'M' : ''}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f0d597" />
          <stop offset="0.5" stopColor="#caa253" />
          <stop offset="1" stopColor="#7a5a1f" />
        </linearGradient>
        <radialGradient id={`featherEye${mirror ? 'M' : ''}`} cx="0.5" cy="0.5" r="0.55">
          <stop offset="0" stopColor="#1a3d34" />
          <stop offset="0.45" stopColor="#0f3b2e" />
          <stop offset="0.7" stopColor="#caa253" />
          <stop offset="1" stopColor="#7a5a1f" />
        </radialGradient>
      </defs>

      {/* Stem */}
      <path
        d="M40 198 Q42 130 38 70 Q35 35 40 6"
        stroke={`url(#featherGold${mirror ? 'M' : ''})`}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Side filaments — left */}
      <g stroke={`url(#featherGold${mirror ? 'M' : ''})`} strokeWidth="0.7" strokeLinecap="round" opacity="0.85">
        <path d="M40 60 Q22 56 12 46" />
        <path d="M40 70 Q20 70 8 64" />
        <path d="M40 80 Q18 84 6 84" />
        <path d="M40 90 Q20 96 10 102" />
        <path d="M40 100 Q22 108 14 118" />
        <path d="M40 110 Q26 120 22 132" />
        <path d="M40 120 Q30 132 30 144" />
        <path d="M40 132 Q34 144 36 156" />
      </g>
      {/* Side filaments — right */}
      <g stroke={`url(#featherGold${mirror ? 'M' : ''})`} strokeWidth="0.7" strokeLinecap="round" opacity="0.85">
        <path d="M40 60 Q58 56 68 46" />
        <path d="M40 70 Q60 70 72 64" />
        <path d="M40 80 Q62 84 74 84" />
        <path d="M40 90 Q60 96 70 102" />
        <path d="M40 100 Q58 108 66 118" />
        <path d="M40 110 Q54 120 58 132" />
        <path d="M40 120 Q50 132 50 144" />
        <path d="M40 132 Q46 144 44 156" />
      </g>

      {/* Eye of the feather */}
      <g transform="translate(40, 40)">
        <ellipse cx="0" cy="0" rx="22" ry="28"
                 fill={`url(#featherEye${mirror ? 'M' : ''})`}
                 stroke={`url(#featherGold${mirror ? 'M' : ''})`}
                 strokeWidth="0.8" opacity="0.95" />
        <ellipse cx="0" cy="-2" rx="11" ry="15" fill="#0f3b2e" opacity="0.92" />
        <ellipse cx="-2" cy="-6" rx="3" ry="4" fill="#1c1a0f" />
        <ellipse cx="-3" cy="-7" rx="1" ry="1.4" fill="#f0d597" />
        {/* Outer rays */}
        <g stroke={`url(#featherGold${mirror ? 'M' : ''})`} strokeWidth="0.5" opacity="0.65" fill="none">
          <path d="M0 -28 L0 -36" />
          <path d="M0 28 L0 36" />
          <path d="M-22 0 L-32 0" />
          <path d="M22 0 L32 0" />
        </g>
      </g>

      {/* Tip plume */}
      <g stroke={`url(#featherGold${mirror ? 'M' : ''})`} strokeWidth="0.7" strokeLinecap="round" opacity="0.8" fill="none">
        <path d="M40 12 Q33 6 30 0" />
        <path d="M40 12 Q47 6 50 0" />
        <path d="M40 16 Q36 10 32 6" />
        <path d="M40 16 Q44 10 48 6" />
      </g>
    </svg>
  )
}

/* Photographic-style curved feather: rachis curves from lower-left calamus
   to upper-right tip, with hundreds of swept barbs and wispy down at the base.
   Designed to match a real-photo reference. */
export function FeatherCoverOrnament() {
  // Cubic Bezier rachis: start (calamus) → cp1 → cp2 → end (tip)
  const A = { x: 50, y: 130 }
  const B = { x: 130, y: 90 }
  const C = { x: 260, y: 28 }
  const D = { x: 372, y: 18 }

  const bezier = (t) => {
    const mt = 1 - t
    return {
      x: mt * mt * mt * A.x + 3 * mt * mt * t * B.x + 3 * mt * t * t * C.x + t * t * t * D.x,
      y: mt * mt * mt * A.y + 3 * mt * mt * t * B.y + 3 * mt * t * t * C.y + t * t * t * D.y
    }
  }
  const tangent = (t) => {
    const mt = 1 - t
    const tx = 3 * mt * mt * (B.x - A.x) + 6 * mt * t * (C.x - B.x) + 3 * t * t * (D.x - C.x)
    const ty = 3 * mt * mt * (B.y - A.y) + 6 * mt * t * (C.y - B.y) + 3 * t * t * (D.y - C.y)
    const L = Math.hypot(tx, ty) || 1
    return { tx: tx / L, ty: ty / L }
  }

  const NB = 140
  const barbsTop = []
  const barbsBot = []
  for (let i = 0; i < NB; i++) {
    const t = 0.04 + (i / NB) * 0.94
    const p = bezier(t)
    const T = tangent(t)
    // Normal — perpendicular to the rachis tangent, pointing "up" away from the curve
    const nx = -T.ty
    const ny = T.tx
    // Vane lengths peak in the middle of the feather
    const lenTop = 18 + 42 * Math.sin(Math.PI * Math.min(1, t * 1.02))
    const lenBot = (12 + 22 * Math.sin(Math.PI * t)) * 0.62
    // Sweep: barbs trail the rachis direction by some amount (toward the tip)
    const sweep = 0.55
    // Top side
    const dxT = nx + T.tx * sweep
    const dyT = ny + T.ty * sweep
    const Lt = Math.hypot(dxT, dyT) || 1
    const tipTx = p.x + (dxT / Lt) * lenTop
    const tipTy = p.y + (dyT / Lt) * lenTop
    const ctrlTx = p.x + (dxT / Lt) * lenTop * 0.45
    const ctrlTy = p.y + (dyT / Lt) * lenTop * 0.45
    barbsTop.push(
      <path
        key={`t${i}`}
        d={`M${p.x.toFixed(1)} ${p.y.toFixed(1)} Q${ctrlTx.toFixed(1)} ${ctrlTy.toFixed(1)} ${tipTx.toFixed(1)} ${tipTy.toFixed(1)}`}
      />
    )
    // Bottom side (opposite normal)
    const dxB = -nx + T.tx * sweep * 0.5
    const dyB = -ny + T.ty * sweep * 0.5
    const Lb = Math.hypot(dxB, dyB) || 1
    const tipBx = p.x + (dxB / Lb) * lenBot
    const tipBy = p.y + (dyB / Lb) * lenBot
    const ctrlBx = p.x + (dxB / Lb) * lenBot * 0.45
    const ctrlBy = p.y + (dyB / Lb) * lenBot * 0.45
    barbsBot.push(
      <path
        key={`b${i}`}
        d={`M${p.x.toFixed(1)} ${p.y.toFixed(1)} Q${ctrlBx.toFixed(1)} ${ctrlBy.toFixed(1)} ${tipBx.toFixed(1)} ${tipBy.toFixed(1)}`}
      />
    )
  }

  // Wispy down at the calamus (base)
  const downs = []
  for (let i = 0; i < 26; i++) {
    const sx = 38 + Math.cos(i * 1.7) * 4 + i * 0.4
    const sy = 128 + Math.sin(i * 1.3) * 4
    const angle = Math.PI + (Math.sin(i * 0.9) - 0.2) * 0.6
    const len = 20 + Math.abs(Math.sin(i * 1.1)) * 16
    const cx = sx + Math.cos(angle) * len * 0.5 + Math.sin(i * 0.7) * 6
    const cy = sy + Math.sin(angle) * len * 0.5 + Math.cos(i * 0.7) * 8
    const ex = sx + Math.cos(angle) * len + Math.sin(i * 1.4) * 4
    const ey = sy + Math.sin(angle) * len + 6 + Math.cos(i * 0.6) * 8
    downs.push(
      <path
        key={`d${i}`}
        d={`M${sx.toFixed(1)} ${sy.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`}
      />
    )
  }

  // Rachis path string (used for both stroke and overlay)
  const rachisD = `M${A.x} ${A.y} C${B.x} ${B.y}, ${C.x} ${C.y}, ${D.x} ${D.y}`

  return (
    <div className="feather3d">
      <svg
        width="400"
        height="160"
        viewBox="0 0 400 160"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="ftrRachisR" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#3d2a0a" />
            <stop offset="0.4" stopColor="#5a3f12" />
            <stop offset="0.85" stopColor="#caa253" />
            <stop offset="1" stopColor="#fff8de" />
          </linearGradient>
        </defs>

        {/* Wispy down at calamus base — drawn first so it sits behind everything */}
        <g
          stroke="#ffffff"
          strokeWidth="0.6"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        >
          {downs}
        </g>
        <g
          stroke="#ffffff"
          strokeWidth="0.35"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        >
          {downs.map((d, i) =>
            React.cloneElement(d, { key: `d2-${i}`, transform: 'translate(-2,2)' })
          )}
        </g>

        {/* Bottom-side barbs (shorter, denser) */}
        <g
          stroke="#ffffff"
          strokeWidth="0.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        >
          {barbsBot}
        </g>

        {/* Top-side barbs — three layered passes for depth */}
        <g
          stroke="#ffffff"
          strokeWidth="0.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        >
          {barbsTop.map((b, i) =>
            React.cloneElement(b, { key: `t-back-${i}`, transform: 'translate(-1,1.2)' })
          )}
        </g>
        <g
          stroke="#f5f1e6"
          strokeWidth="0.55"
          strokeLinecap="round"
          fill="none"
          opacity="0.95"
        >
          {barbsTop}
        </g>
        <g
          stroke="#ffffff"
          strokeWidth="0.32"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        >
          {barbsTop.map((b, i) =>
            React.cloneElement(b, { key: `t-fr-${i}`, transform: 'translate(0.4,-0.6)' })
          )}
        </g>

        {/* Rachis (the dark central quill) — visible through the barbs */}
        <path
          d={rachisD}
          stroke="url(#ftrRachisR)"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.92"
        />
        {/* Highlight along the rachis */}
        <path
          d={rachisD}
          stroke="#ffffff"
          strokeWidth="0.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />

        {/* Calamus stub at the very base — a tiny stick */}
        <path
          d="M30 134 L50 130"
          stroke="#3d2a0a"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export function HeaderOrnament() {
  return (
    <svg className="header-ornament" width="220" height="34" viewBox="0 0 220 34" fill="none">
      <defs>
        <linearGradient id="hdrGold" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#caa253" stopOpacity="0" />
          <stop offset="0.5" stopColor="#caa253" stopOpacity="1" />
          <stop offset="1" stopColor="#caa253" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="17" x2="80" y2="17" stroke="url(#hdrGold)" strokeWidth="0.8" />
      <line x1="140" y1="17" x2="220" y2="17" stroke="url(#hdrGold)" strokeWidth="0.8" />
      <g transform="translate(110,17)">
        <path d="M-22 0 Q-15 -8 0 -8 Q15 -8 22 0 Q15 8 0 8 Q-15 8 -22 0z"
              fill="none" stroke="#8a6321" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="2.4" fill="#caa253" />
        <circle cx="-13" cy="0" r="1.2" fill="#8a6321" />
        <circle cx="13" cy="0" r="1.2" fill="#8a6321" />
      </g>
    </svg>
  )
}

export function ArabesqueDivider() {
  return (
    <div className="divider">
      <span className="line" />
      <svg width="42" height="14" viewBox="0 0 42 14" fill="none">
        <path
          d="M1 7 H14 M28 7 H41"
          stroke="#8a6321"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M14 7 Q18 1 21 7 Q24 13 28 7"
          stroke="#8a6321"
          strokeWidth="0.9"
          fill="none"
        />
        <circle cx="21" cy="7" r="1.3" fill="#caa253" />
      </svg>
      <span className="line" />
    </div>
  )
}
