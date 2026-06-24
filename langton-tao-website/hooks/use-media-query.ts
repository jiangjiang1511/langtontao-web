'use client'

import { useEffect, useState } from 'react'

/**
 * Subscribes to a CSS media query with both `change` and `resize` listeners.
 * The resize fallback helps Electron / embedded webviews (e.g. Cursor Browser)
 * where matchMedia change events may not fire when the panel is resized.
 */
export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState(defaultValue)

  useEffect(() => {
    const media = window.matchMedia(query)

    const sync = () => {
      setMatches(media.matches)
    }

    sync()
    media.addEventListener('change', sync)
    window.addEventListener('resize', sync)

    return () => {
      media.removeEventListener('change', sync)
      window.removeEventListener('resize', sync)
    }
  }, [query])

  return matches
}
