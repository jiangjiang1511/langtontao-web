/** Delay before below-hero idle mounts and cross-page hero prefetch. */
export const HERO_GATE_MS = 500

export function onCurrentHeroReady(callback: () => void): () => void {
  let cancelled = false
  let timeoutId: number | undefined

  const run = () => {
    if (!cancelled) callback()
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (cancelled) return
      timeoutId = window.setTimeout(run, HERO_GATE_MS)
    })
  })

  return () => {
    cancelled = true
    if (timeoutId !== undefined) window.clearTimeout(timeoutId)
  }
}
