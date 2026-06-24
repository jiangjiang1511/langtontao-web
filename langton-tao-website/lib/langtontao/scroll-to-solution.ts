export function scrollToLangtontaoSolution(
  anchorId: string,
  options?: { highlight?: boolean; challenge?: string }
) {
  const el = document.getElementById(anchorId)
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY - 100
  window.scrollTo({ top, behavior: 'smooth' })

  if (options?.highlight !== false) {
    el.classList.add('lt-solution-highlight')
    window.setTimeout(() => {
      el.classList.remove('lt-solution-highlight')
    }, 2200)
  }

  if (options?.challenge) {
    const url = new URL(window.location.href)
    url.searchParams.set('challenge', options.challenge)
    url.hash = anchorId
    window.history.replaceState(null, '', url.toString())
  }
}

export function readChallengeFromUrl(): string | null {
  if (typeof window === 'undefined') return null
  return new URLSearchParams(window.location.search).get('challenge')
}
