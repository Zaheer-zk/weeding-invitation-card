import React, { useEffect, useRef, useState } from 'react'
import { CoverFace, InsideLeftFace, InsideRightFace } from './Faces'

const OPEN_ANGLE = -180
const CLOSED_ANGLE = 0

const MOBILE_PAGES = [
  { key: 'cover', label: 'Cover' },
  { key: 'couple', label: 'Couple' },
  { key: 'events', label: 'Events' }
]

export default function InvitationCard({ visible }) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobilePage, setMobilePage] = useState(0)

  const cardRef = useRef(null)
  const coverRef = useRef(null)
  const frontRef = useRef(null)
  const leftBackRef = useRef(null)
  const isMobileRef = useRef(false)

  const target = useRef({ tx: 0, ty: 0, enter: 0, scaleFit: 1, coverAngle: 0 })
  const current = useRef({ tx: 0, ty: 0, enter: 0, scaleFit: 1, coverAngle: 0 })
  const drag = useRef({ active: false, startX: 0, startY: 0, startAngle: 0, moved: 0 })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px), (max-aspect-ratio: 7/8)')
    const sync = () => {
      const m = mq.matches
      setIsMobile(m)
      isMobileRef.current = m
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const updateFit = () => {
      target.current.scaleFit = isMobileRef.current
        ? 1
        : Math.min(window.innerWidth / 1180, window.innerHeight / 820, 1)

      // On mobile the whole face is rendered at its native 520px design width
      // and scaled to fit the card; derive that scale from the card's layout
      // width so the interior never clips. (offsetWidth ignores the rAF
      // entrance/breathing transform, which we want applied on top.)
      if (cardRef.current) {
        if (isMobileRef.current) {
          const w = cardRef.current.offsetWidth
          if (w) cardRef.current.style.setProperty('--face-scale', (w / 520).toFixed(4))
        } else {
          cardRef.current.style.removeProperty('--face-scale')
        }
      }
    }
    updateFit()
    // Re-measure on the next frame too: on the first mobile render the
    // mobile-mode width may not be committed yet when this effect runs.
    const raf = requestAnimationFrame(updateFit)
    window.addEventListener('resize', updateFit)
    window.addEventListener('orientationchange', updateFit)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', updateFit)
      window.removeEventListener('orientationchange', updateFit)
    }
  }, [isMobile])

  useEffect(() => {
    target.current.enter = visible ? 1 : 0
  }, [visible])

  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / window.innerWidth
      const dy = (e.clientY - cy) / window.innerHeight
      const factor = isMobileRef.current ? 4 : 9
      target.current.tx = -dy * factor
      target.current.ty = dx * (factor + 5)
    }
    const onLeave = () => {
      target.current.tx = 0
      target.current.ty = 0
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    let raf
    const step = () => {
      const c = current.current
      const t = target.current

      c.tx += (t.tx - c.tx) * 0.10
      c.ty += (t.ty - c.ty) * 0.10
      c.enter += (t.enter - c.enter) * 0.045
      c.scaleFit += (t.scaleFit - c.scaleFit) * 0.15

      if (drag.current.active) {
        c.coverAngle += (t.coverAngle - c.coverAngle) * 0.4
      } else {
        const diff = t.coverAngle - c.coverAngle
        const absDiff = Math.abs(diff)
        const progress = 1 - absDiff / 180
        const easeFactor = 0.5 - 0.45 * Math.cos(Math.PI * Math.min(1, Math.max(0, progress)))
        const k = 0.025 + 0.06 * easeFactor
        c.coverAngle += diff * k
      }

      const e = c.enter
      const eased = 1 - Math.pow(1 - Math.min(1, e), 3)
      const breathe = Math.sin(performance.now() / 1800) * 0.4
      const s = c.scaleFit * (0.92 + 0.08 * eased)

      if (cardRef.current) {
        cardRef.current.style.transform =
          `translate(-50%, -50%) ` +
          `scale(${s}) ` +
          `translateZ(${(-220) * (1 - eased)}px) ` +
          `rotateX(${(c.tx + breathe * 0.3).toFixed(3)}deg) ` +
          `rotateY(${(c.ty + breathe).toFixed(3)}deg)`
        cardRef.current.style.opacity = String(eased)
      }

      if (!isMobileRef.current && coverRef.current) {
        const a = c.coverAngle
        const tz = 4 * (1 - Math.abs(a) / 180)
        coverRef.current.style.transform =
          `translateZ(${tz.toFixed(2)}px) rotateY(${a.toFixed(2)}deg)`
      }
      if (!isMobileRef.current) {
        if (frontRef.current) frontRef.current.style.opacity = c.coverAngle > -90 ? '1' : '0'
        if (leftBackRef.current) leftBackRef.current.style.opacity = c.coverAngle < -90 ? '1' : '0'
      } else {
        if (frontRef.current && frontRef.current.style.opacity) frontRef.current.style.opacity = ''
        if (leftBackRef.current && leftBackRef.current.style.opacity) leftBackRef.current.style.opacity = ''
        if (coverRef.current && coverRef.current.style.transform) coverRef.current.style.transform = ''
      }

      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleDown = (e) => {
    if (!visible) return
    drag.current.active = true
    drag.current.startX = e.clientX
    drag.current.startY = e.clientY
    drag.current.startAngle = target.current.coverAngle
    drag.current.moved = 0
    e.target.setPointerCapture?.(e.pointerId)
  }

  const handleDrag = (e) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX
    const dy = e.clientY - drag.current.startY
    drag.current.moved = Math.max(drag.current.moved, Math.hypot(dx, dy))
    if (isMobileRef.current) return
    target.current.coverAngle = Math.max(
      OPEN_ANGLE,
      Math.min(CLOSED_ANGLE, drag.current.startAngle - dx * 0.45)
    )
  }

  const handleUp = (e) => {
    if (!drag.current.active) return
    drag.current.active = false
    e.target.releasePointerCapture?.(e.pointerId)

    const wasClick = drag.current.moved < 8

    if (isMobileRef.current) {
      const dx = e.clientX - drag.current.startX
      const dy = e.clientY - drag.current.startY
      if (wasClick) {
        setMobilePage((p) => Math.min(MOBILE_PAGES.length - 1, p + 1))
        return
      }
      // Vertical swipe: up = next page, down = previous page
      if (Math.abs(dy) > 40 && Math.abs(dy) > Math.abs(dx)) {
        if (dy < 0) setMobilePage((p) => Math.min(MOBILE_PAGES.length - 1, p + 1))
        else setMobilePage((p) => Math.max(0, p - 1))
      } else if (Math.abs(dx) > 40) {
        if (dx < 0) setMobilePage((p) => Math.min(MOBILE_PAGES.length - 1, p + 1))
        else setMobilePage((p) => Math.max(0, p - 1))
      }
      return
    }

    if (wasClick) {
      const next = !open
      setOpen(next)
      target.current.coverAngle = next ? OPEN_ANGLE : CLOSED_ANGLE
    } else {
      const a = target.current.coverAngle
      const isOpen = a < OPEN_ANGLE / 2
      setOpen(isOpen)
      target.current.coverAngle = isOpen ? OPEN_ANGLE : CLOSED_ANGLE
    }
  }

  const stageClass = 'card-area' + (isMobile ? ' mobile-mode' : '')
  const positionClass = (idx) => {
    if (!isMobile) return ''
    if (idx === mobilePage) return 'is-active'
    if (idx < mobilePage) return 'is-above'
    return 'is-below'
  }

  return (
    <>
      <div className="card-stage">
        <div
          className={stageClass}
          ref={cardRef}
          onPointerDown={handleDown}
          onPointerMove={handleDrag}
          onPointerUp={handleUp}
          onPointerCancel={handleUp}
        >
          <div className={`panel cover ${positionClass(0)}`} ref={coverRef}>
            <div className="panel-side panel-front" ref={frontRef}>
              <CoverFace />
            </div>
          </div>

          <div className={`panel left-back ${positionClass(1)}`} ref={leftBackRef}>
            <div className="panel-side panel-front">
              <InsideLeftFace />
            </div>
          </div>

          <div className={`panel right ${positionClass(2)}`}>
            <div className="panel-side panel-front">
              <InsideRightFace />
            </div>
          </div>

          <div className="spine" />
        </div>
      </div>

      {isMobile && (
        <nav className="page-index" aria-label="Pages">
          {MOBILE_PAGES.map((p, i) => (
            <button
              key={p.key}
              type="button"
              className={'page-index-item' + (mobilePage === i ? ' is-active' : '')}
              onClick={() => setMobilePage(i)}
              aria-current={mobilePage === i ? 'page' : undefined}
            >
              <span className="page-index-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="page-index-dot" />
              <span className="page-index-label">{p.label}</span>
            </button>
          ))}
        </nav>
      )}
    </>
  )
}
