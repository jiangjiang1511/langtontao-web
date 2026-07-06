/** Orbit/video decor loads after hero text paints. */
export const HERO_DECOR_MS = 300

/** Below-hero idle DeferredMount sections wait for hero critical path. */
export const BELOW_HERO_IDLE_MS = 500

/** Cross-page hero chunk warming runs last to avoid bandwidth contention. */
export const PREFETCH_HERO_MS = 900

/** @deprecated Use HERO_DECOR_MS, BELOW_HERO_IDLE_MS, or PREFETCH_HERO_MS. */
export const HERO_GATE_MS = BELOW_HERO_IDLE_MS

function scheduleAfterPaint(delayMs: number, callback: () => void): () => void {
  let cancelled = false
  let timeoutId: number | undefined

  const run = () => {
    if (!cancelled) callback()
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (cancelled) return
      timeoutId = window.setTimeout(run, delayMs)
    })
  })

  return () => {
    cancelled = true
    if (timeoutId !== undefined) window.clearTimeout(timeoutId)
  }
}

export function onHeroDecorReady(callback: () => void): () => void {
  return scheduleAfterPaint(HERO_DECOR_MS, callback)
}

export function onBelowHeroIdleReady(callback: () => void): () => void {
  return scheduleAfterPaint(BELOW_HERO_IDLE_MS, callback)
}

export function onPrefetchHeroReady(callback: () => void): () => void {
  return scheduleAfterPaint(PREFETCH_HERO_MS, callback)
}

/** @deprecated Use onHeroDecorReady, onBelowHeroIdleReady, or onPrefetchHeroReady. */
export function onCurrentHeroReady(callback: () => void): () => void {
  return onBelowHeroIdleReady(callback)
}
