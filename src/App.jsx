import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hero, Families, Invitation, CountdownSection, Venue, Closing } from './components/Sections'
import { startAmbient, stopAmbient } from './lib/ambientAudio'

function Intro({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <div className="intro-inner">
            <motion.div
              className="intro-line"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.7 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.p
              className="intro-bismillah"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.35 }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </motion.p>
            <motion.p
              className="intro-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
            >
              You are cordially invited
            </motion.p>
          </div>
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
    const t = setTimeout(() => setShowIntro(false), 3200)
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

      <Intro show={showIntro} />

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
