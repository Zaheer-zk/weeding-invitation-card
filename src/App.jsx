import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Scene from './components/Scene'
import Petals from './components/Petals'
import WelcomeOverlay from './components/WelcomeOverlay'
import InvitationCard from './components/InvitationCard'
import { startAmbient, stopAmbient } from './lib/ambientAudio'

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [cardVisible, setCardVisible] = useState(false)
  const [audioOn, setAudioOn] = useState(false)
  const audioRef = useRef(null)
  const usingFileRef = useRef(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowWelcome(false), 4400)
    const t2 = setTimeout(() => setCardVisible(true), 4900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  // Try to play soft ambience on first interaction (browsers block autoplay)
  useEffect(() => {
    const start = async () => {
      // Try the optional MP3 file first
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

  return (
    <div className="app">
      <div className="canvas-wrap">
        <Scene />
      </div>

      <Petals />

      <InvitationCard visible={cardVisible} />

      <WelcomeOverlay show={showWelcome} />

      <AnimatePresence>
        {cardVisible && (
          <>
            <motion.div
              className="hint"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.2, duration: 1.2 }}
            >
              <span className="pulse" />
              click or drag the card to open
            </motion.div>

            <motion.button
              type="button"
              className="audio-toggle"
              onClick={toggleAudio}
              aria-label={audioOn ? 'Mute ambience' : 'Play ambience'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.0, duration: 0.9 }}
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
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <audio ref={audioRef} loop preload="none" src="/audio/ambient.mp3" />
    </div>
  )
}
