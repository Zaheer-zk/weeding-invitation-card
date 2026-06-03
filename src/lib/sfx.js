// Tiny UI sound effects built with the Web Audio API (no audio files).
// Currently: a soft paper "page turn" riffle used when flipping the card.

let ctx = null
let enabled = true

// Sync with the app's ambience toggle so a muted user gets no UI sounds either.
export function setSfxEnabled(v) {
  enabled = !!v
}

function getCtx() {
  if (ctx) return ctx
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return null
  ctx = new Ctx()
  return ctx
}

// Short burst of decaying noise pushed through a downward filter sweep —
// approximates the rustle of a turning page.
export function playPageTurn() {
  if (!enabled) return
  try {
    const ac = getCtx()
    if (!ac) return
    if (ac.state === 'suspended') ac.resume()

    const now = ac.currentTime
    const dur = 0.36

    const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      const t = i / data.length
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 1.6) // decaying noise
    }

    const src = ac.createBufferSource()
    src.buffer = buffer

    const hp = ac.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 520

    const bp = ac.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.setValueAtTime(2700, now)
    bp.frequency.exponentialRampToValueAtTime(720, now + dur)
    bp.Q.value = 0.8

    const g = ac.createGain()
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.15, now + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur)

    src.connect(hp)
    hp.connect(bp)
    bp.connect(g)
    g.connect(ac.destination)
    src.start(now)
    src.stop(now + dur)
  } catch {
    /* no audio support or gesture not granted yet */
  }
}

// Subtle haptic tap on supporting mobile devices.
export function playHaptic(ms = 9) {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms)
  } catch {
    /* not supported */
  }
}
