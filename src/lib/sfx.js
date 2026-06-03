// Subtle haptic feedback on supporting mobile devices (used on page change).
export function playHaptic(ms = 9) {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms)
  } catch {
    /* not supported */
  }
}
