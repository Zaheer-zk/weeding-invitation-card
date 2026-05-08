// Soft ambient drone built with the Web Audio API.
// Used as a fallback when /audio/ambient.mp3 is not present, so the experience
// always has gentle ambience without shipping a music file.

let ctx = null
let master = null
let voices = []
let lfo = null
let lfoGain = null
let started = false

const FREQS = [110, 164.81, 220, 246.94] // A2, E3, A3, B3 — calm minor pad

export function startAmbient(targetVolume = 0.12) {
  if (started) {
    if (master) master.gain.cancelScheduledValues(ctx.currentTime)
    if (master) master.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + 1.2)
    return
  }
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    ctx = new Ctx()
    master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    // Soft lowpass for warmth
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 900
    lp.Q.value = 0.7
    lp.connect(master)

    // Subtle slow LFO on the filter for living warmth
    lfo = ctx.createOscillator()
    lfo.frequency.value = 0.07
    lfoGain = ctx.createGain()
    lfoGain.gain.value = 180
    lfo.connect(lfoGain)
    lfoGain.connect(lp.frequency)
    lfo.start()

    voices = FREQS.map((f, i) => {
      const o = ctx.createOscillator()
      o.type = i === 0 ? 'sine' : 'triangle'
      o.frequency.value = f
      const g = ctx.createGain()
      g.gain.value = 0
      o.connect(g)
      g.connect(lp)
      // Gentle detune drift
      o.detune.value = (Math.random() - 0.5) * 6
      o.start()
      // Slow swell-in
      g.gain.linearRampToValueAtTime(0.18 / FREQS.length, ctx.currentTime + 4 + i * 0.6)
      return { o, g }
    })

    master.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + 2.4)
    started = true
  } catch {
    /* user gesture not granted yet, or no audio support */
  }
}

export function stopAmbient() {
  if (!ctx || !master) return
  master.gain.cancelScheduledValues(ctx.currentTime)
  master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
  setTimeout(() => {
    try {
      voices.forEach(({ o }) => o.stop())
      lfo && lfo.stop()
      ctx.close()
    } catch {
      /* ignore */
    }
    ctx = null
    master = null
    voices = []
    lfo = null
    lfoGain = null
    started = false
  }, 800)
}

export function setAmbientVolume(v) {
  if (!ctx || !master) return
  master.gain.cancelScheduledValues(ctx.currentTime)
  master.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, v)), ctx.currentTime + 0.6)
}

export function isAmbientPlaying() {
  return started
}
