import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WelcomeOverlay({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <div className="welcome-inner">
            <motion.div
              className="welcome-line"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.7 }}
              transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="welcome-bismillah"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.4 }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </motion.div>
            <motion.h1
              className="welcome-text"
              initial={{ letterSpacing: '0.15em', opacity: 0 }}
              animate={{ letterSpacing: '0.5em', opacity: 1 }}
              transition={{ duration: 1.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              Welcome
            </motion.h1>
            <motion.div
              className="welcome-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.6 }}
            >
              You are cordially invited
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
