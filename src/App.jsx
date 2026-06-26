import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hero, Families, Invitation, CountdownSection, Venue, Closing } from './components/Sections'
import { invitation } from './data/invitation'
import { startAmbient, stopAmbient } from './lib/ambientAudio'

function UploadPhoto() {
  const url = invitation.photoUploadUrl
  return (
    <a
      className={'upload-fab' + (url ? '' : ' is-disabled')}
      href={url || undefined}
      target={url ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-disabled={url ? undefined : 'true'}
      onClick={(e) => {
        if (!url) e.preventDefault()
      }}
    >
      <span className="upload-fab-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 15V4M8 8l4-4 4 4" />
          <path d="M5 15v3a2 2 0 002 2h10a2 2 0 002-2v-3" />
        </svg>
      </span>
      <span className="upload-fab-label">
        <strong>Upload Wedding Photo</strong>
        <em>{url ? 'Share your snaps with us' : 'Opening soon'}</em>
      </span>
    </a>
  )
}

function Curtains({ show }) {
  // Timeline: text fades in → curtains gently part → stage clears.
  const OPEN_DELAY = 1.9
  const OPEN_DUR = 2.6
  // Soft, weighty ease — eases in slowly (the heavy drapes start to move),
  // glides, then settles, like real stage curtains being drawn open.
  const ease = [0.65, 0, 0.18, 1]
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="curtain-stage"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <motion.div
            className="curtain-valance"
            aria-hidden="true"
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ delay: OPEN_DELAY + 0.15, duration: OPEN_DUR - 0.2, ease }}
          />

          {/* As the panels travel out they also gather (scaleX shrinks toward the
              outer edge) so the velvet bunches at the sides instead of sliding flat. */}
          <motion.div
            className="curtain-panel left"
            initial={{ x: 0, scaleX: 1 }}
            animate={{ x: '-100.5%', scaleX: 0.78 }}
            transition={{ delay: OPEN_DELAY, duration: OPEN_DUR, ease }}
          />
          <motion.div
            className="curtain-panel right"
            initial={{ x: 0, scaleX: 1 }}
            animate={{ x: '100.5%', scaleX: 0.78 }}
            transition={{ delay: OPEN_DELAY, duration: OPEN_DUR, ease }}
          />

          <motion.div
            className="curtain-content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -6] }}
            transition={{ duration: OPEN_DELAY + 0.6, times: [0, 0.28, 0.72, 1], ease: 'easeInOut' }}
          >
            <div className="intro-line" />
            <p className="intro-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p className="intro-sub">You are cordially invited</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [audioOn, setAudioOn] = useState(false)
  const audioRef = useRef(null)
  const usingFileRef = useRef(false)
  const familiesRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 4700)
    return () => clearTimeout(t)
  }, [])

  // Soft ambience on first interaction (browsers block autoplay).
  useEffect(() => {
    const start = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.3
          await audioRef.current.play()
          usingFileRef.current = true
          setAudioOn(true)
          window.removeEventListener('pointerdown', start)
          return
        } catch {
          /* file missing/blocked → fall through to synth */
        }
      }
      startAmbient(0.12)
      setAudioOn(true)
      window.removeEventListener('pointerdown', start)
    }
    window.addEventListener('pointerdown', start, { once: true })
    return () => window.removeEventListener('pointerdown', start)
  }, [])

  const toggleAudio = async () => {
    const next = !audioOn
    setAudioOn(next)
    if (next) {
      if (audioRef.current && !usingFileRef.current) {
        try {
          audioRef.current.volume = 0.3
          await audioRef.current.play()
          usingFileRef.current = true
          return
        } catch {
          /* file unavailable, use synth */
        }
      }
      if (usingFileRef.current && audioRef.current) {
        audioRef.current.play().catch(() => {})
      } else {
        startAmbient(0.12)
      }
    } else {
      if (usingFileRef.current && audioRef.current) {
        audioRef.current.pause()
      } else {
        stopAmbient()
      }
    }
  }

  const scrollToFamilies = () => {
    familiesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="page">
      <Hero onOpen={scrollToFamilies} />
      <div ref={familiesRef}>
        <Families />
      </div>
      <Invitation />
      <CountdownSection />
      <Venue />
      <Closing />

      <UploadPhoto />

      <Curtains show={showIntro} />

      <button
        type="button"
        className="audio-toggle"
        onClick={toggleAudio}
        aria-label={audioOn ? 'Mute ambience' : 'Play ambience'}
      >
        {audioOn ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H3v6h3l5 4V5z" />
            <path d="M15 9a3 3 0 010 6" />
            <path d="M18 6a7 7 0 010 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H3v6h3l5 4V5z" />
            <path d="M22 9l-6 6M16 9l6 6" />
          </svg>
        )}
      </button>

      <audio ref={audioRef} loop preload="none" src="/audio/ambient.mp3" />
    </div>
  )
}
