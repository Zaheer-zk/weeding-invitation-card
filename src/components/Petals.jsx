import React, { useMemo } from 'react'

const PETAL_COUNT = 16

// Pseudo-random but stable per-mount petal field. Each petal gets its own
// fall speed, drift, sway, spin and tint so the motion never looks looped.
function makePetals() {
  return Array.from({ length: PETAL_COUNT }, (_, i) => {
    const fall = 12 + Math.random() * 13
    return {
      i,
      left: Math.random() * 100,
      size: 13 + Math.random() * 16,
      fall,
      delay: -Math.random() * fall, // negative → already mid-fall on load
      drift: (Math.random() * 2 - 1) * 70,
      sway: 3.5 + Math.random() * 3.5,
      rot: 4 + Math.random() * 5,
      tint: Math.random() < 0.45 ? 'gold' : 'rose',
      op: 0.32 + Math.random() * 0.4,
    }
  })
}

export default function Petals() {
  const petals = useMemo(makePetals, [])

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.i}
          className="petal"
          style={{ left: `${p.left}%`, '--fall': `${p.fall}s`, '--delay': `${p.delay}s` }}
        >
          <span className="petal-sway" style={{ '--sway': `${p.sway}s`, '--drift': `${p.drift}px`, '--delay': `${p.delay}s` }}>
            <svg
              className={`petal-svg petal-${p.tint}`}
              viewBox="0 0 24 32"
              style={{ '--size': `${p.size}px`, '--rot': `${p.rot}s`, '--op': p.op, '--delay': `${p.delay}s` }}
            >
              <defs>
                <linearGradient id={`pg-${p.i}`} x1="0" y1="0" x2="1" y2="1">
                  {p.tint === 'gold' ? (
                    <>
                      <stop offset="0" stopColor="#f6e3a8" />
                      <stop offset="1" stopColor="#c79a44" />
                    </>
                  ) : (
                    <>
                      <stop offset="0" stopColor="#f0c2bd" />
                      <stop offset="1" stopColor="#bf6f74" />
                    </>
                  )}
                </linearGradient>
              </defs>
              <path
                d="M12 0.5C19 8 22 19 12 31.5C2 19 5 8 12 0.5Z"
                fill={`url(#pg-${p.i})`}
              />
              <path d="M12 3C13 12 13 22 12 30" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" fill="none" />
            </svg>
          </span>
        </span>
      ))}
    </div>
  )
}
