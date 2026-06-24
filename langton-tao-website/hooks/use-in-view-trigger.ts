'use client'

import { useEffect, useRef, useState } from 'react'

type UseInViewTriggerOptions = {
  enabled?: boolean
  threshold?: number
  rootMargin?: string
}

export function useInViewTrigger({
  enabled = true,
  threshold = 0.12,
  rootMargin = '-8% 0px -10% 0px',
}: UseInViewTriggerOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)
  const [enterCount, setEnterCount] = useState(0)
  const wasInViewRef = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setInView(visible)

        if (visible && !wasInViewRef.current) {
          setEnterCount((count) => count + 1)
        }

        wasInViewRef.current = visible
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [enabled, threshold, rootMargin])

  return { ref, inView, enterCount }
}
