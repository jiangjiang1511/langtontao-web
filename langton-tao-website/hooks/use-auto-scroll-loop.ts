'use client'

import { useEffect, useRef, type RefObject } from 'react'

type UseAutoScrollLoopOptions = {
  enabled?: boolean
  axis: 'x' | 'y'
  speed?: number
  pauseAfterSelectMs?: number
  /** When true, expects duplicated content and loops at 50% scroll extent */
  loop?: boolean
}

export function useAutoScrollLoop(
  scrollRef: RefObject<HTMLElement | null>,
  {
    enabled = true,
    axis,
    speed = 0.3,
    pauseAfterSelectMs = 2500,
    loop = false,
  }: UseAutoScrollLoopOptions
) {
  const pausedRef = useRef(false)
  const rafRef = useRef(0)
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!enabled) return

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) return

    const shell = scrollRef.current?.parentElement
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    const canScroll = () => {
      if (axis === 'y') {
        return scrollEl.scrollHeight > scrollEl.clientHeight + 1
      }
      return scrollEl.scrollWidth > scrollEl.clientWidth + 1
    }

    const tick = () => {
      if (!pausedRef.current && canScroll()) {
        if (axis === 'y') {
          scrollEl.scrollTop += speed
          if (loop) {
            const half = scrollEl.scrollHeight / 2
            if (half > 1 && scrollEl.scrollTop >= half) {
              scrollEl.scrollTop -= half
            }
          } else if (
            scrollEl.scrollTop + scrollEl.clientHeight >=
            scrollEl.scrollHeight - 1
          ) {
            scrollEl.scrollTop = 0
          }
        } else {
          scrollEl.scrollLeft += speed
          if (loop) {
            const half = scrollEl.scrollWidth / 2
            if (half > 1 && scrollEl.scrollLeft >= half) {
              scrollEl.scrollLeft -= half
            }
          } else if (
            scrollEl.scrollLeft + scrollEl.clientWidth >=
            scrollEl.scrollWidth - 1
          ) {
            scrollEl.scrollLeft = 0
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const pause = () => {
      pausedRef.current = true
    }

    const resume = () => {
      pausedRef.current = false
    }

    shell?.addEventListener('mouseenter', pause)
    shell?.addEventListener('mouseleave', resume)
    shell?.addEventListener('focusin', pause)
    shell?.addEventListener('focusout', resume)

    const handleSelectPause = () => {
      pausedRef.current = true
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
      pauseTimerRef.current = setTimeout(() => {
        pausedRef.current = false
      }, pauseAfterSelectMs)
    }

    scrollEl.addEventListener('click', handleSelectPause)

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
      shell?.removeEventListener('mouseenter', pause)
      shell?.removeEventListener('mouseleave', resume)
      shell?.removeEventListener('focusin', pause)
      shell?.removeEventListener('focusout', resume)
      scrollEl.removeEventListener('click', handleSelectPause)
    }
  }, [enabled, axis, speed, pauseAfterSelectMs, loop, scrollRef])
}
