import React, { useEffect, useState } from 'react'

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hrs' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
]

function diff(target) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now())
  const total = Math.floor(ms / 1000)
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: ms === 0,
  }
}

export default function Countdown({ target }) {
  const [t, setT] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (t.done) {
    return <div className="countdown-blessed">The blessed day is here — Alhamdulillah</div>
  }

  return (
    <div className="countdown" role="timer" aria-label="Time remaining until the Nikkah">
      <div className="countdown-caption">Counting the days, Insha’Allah</div>
      <div className="countdown-row">
        {UNITS.map((u, i) => (
          <React.Fragment key={u.key}>
            {i > 0 && <span className="countdown-colon">:</span>}
            <div className="countdown-cell">
              <span className="countdown-num">{String(t[u.key]).padStart(2, '0')}</span>
              <span className="countdown-unit">{u.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
