import React, { useEffect, useRef, useState } from 'react'
import { CoverFace, InsideLeftFace, InsideRightFace } from './Faces'

const OPEN_ANGLE = -180
const CLOSED_ANGLE = 0

export default function InvitationCard({ visible }) {
  const [open, setOpen] = useState(false)

  const cardRef = useRef(null)
  const coverRef = useRef(null)
  const frontRef = useRef(null)
  const leftBackRef = useRef(null)

  const target = useRef({ tx: 0, ty: 0, enter: 0, scaleFit: 1, coverAngle: 0 })
  const current = useRef({ tx: 0, ty: 0, enter: 0, scaleFit: 1, coverAngle: 0 })
  const drag = useRef({ active: false, startX: 0, startAngle: 0, moved: 0 })

  useEffect(() => {
    const updateFit = () => {
      target.current.scaleFit = Math.min(
        window.innerWidth / 1180,
        window.innerHeight / 820,
        1
      )
    }
    updateFit()
    window.addEventListener('resize', updateFit)
    return () => window.removeEventListener('resize', updateFit)
  }, [])

  useEffect(() => {
    target.current.enter = visible ? 1 : 0
  }, [visible])

  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / window.innerWidth
      const dy = (e.clientY - cy) / window.innerHeight
      target.current.tx = -dy * 9
      target.current.ty = dx * 14
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
        // While dragging: chase the user's pointer with light smoothing for buttery feel
        c.coverAngle += (t.coverAngle - c.coverAngle) * 0.4
      } else {
        // After release: slow ease-in-out for a luxurious page flip (~1.6s end-to-end)
        const diff = t.coverAngle - c.coverAngle
        const absDiff = Math.abs(diff)
        // Symmetric easing — slow start, faster mid, slow finish
        const progress = 1 - absDiff / 180  // 0 at start, ~1 near target
        const easeFactor = 0.5 - 0.45 * Math.cos(Math.PI * Math.min(1, Math.max(0, progress)))
        // Base speed scaled by easing; gives ~80 frames (1.3s @ 60fps) for full open/close
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

      if (coverRef.current) {
        const a = c.coverAngle
        const tz = 4 * (1 - Math.abs(a) / 180)
        coverRef.current.style.transform =
          `translateZ(${tz.toFixed(2)}px) rotateY(${a.toFixed(2)}deg)`
      }
      if (frontRef.current) {
        frontRef.current.style.opacity = c.coverAngle > -90 ? '1' : '0'
      }
      if (leftBackRef.current) {
        leftBackRef.current.style.opacity = c.coverAngle < -90 ? '1' : '0'
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
    drag.current.startAngle = target.current.coverAngle
    drag.current.moved = 0
    e.target.setPointerCapture?.(e.pointerId)
  }

  const handleDrag = (e) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx))
    target.current.coverAngle = Math.max(
      OPEN_ANGLE,
      Math.min(CLOSED_ANGLE, drag.current.startAngle - dx * 0.45)
    )
  }

  const handleUp = (e) => {
    if (!drag.current.active) return
    drag.current.active = false
    e.target.releasePointerCapture?.(e.pointerId)

    if (drag.current.moved < 6) {
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

  return (
    <div className="card-stage">
      <div
        className="card-area"
        ref={cardRef}
        onPointerDown={handleDown}
        onPointerMove={handleDrag}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
      >
        {/* Right (inside-right) — always present */}
        <div className="panel right">
          <div className="panel-side panel-front">
            <InsideRightFace />
          </div>
        </div>

        {/* Left-back (inside-left) — fades in once cover passes 90° */}
        <div className="panel left-back" ref={leftBackRef}>
          <div className="panel-side panel-front">
            <InsideLeftFace />
          </div>
        </div>

        {/* Cover (page 1) — rotates around its left edge to open */}
        <div className="panel cover" ref={coverRef}>
          <div className="panel-side panel-front" ref={frontRef}>
            <CoverFace />
          </div>
        </div>

        <div className="spine" />
      </div>
    </div>
  )
}
