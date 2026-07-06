'use client'

import {
  useEffect,
  useState,
  type HTMLAttributes,
} from 'react'
import { cn } from '@/lib/utils'

type Coffee2TypewriterRevealProps = {
  text: string
  className?: string
  baseDelay?: number
  charStagger?: number
  eager?: boolean
  showCursor?: boolean
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'className' | 'style'>

export function Coffee2TypewriterReveal({
  text,
  className,
  baseDelay = 0,
  charStagger = 140,
  eager = false,
  showCursor = true,
  ...props
}: Coffee2TypewriterRevealProps) {
  const [element, setElement] = useState<HTMLSpanElement | null>(null)
  const [active, setActive] = useState(false)
  const [revealedCount, setRevealedCount] = useState(0)
  const chars = [...text]

  useEffect(() => {
    if (eager) {
      const frame = requestAnimationFrame(() => {
        setActive(true)
      })
      return () => cancelAnimationFrame(frame)
    }

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '-8% 0px -10% 0px',
        threshold: 0.12,
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [eager, element])

  useEffect(() => {
    if (!active) {
      setRevealedCount(0)
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealedCount(chars.length)
      return
    }

    const start = performance.now()
    const totalDuration = baseDelay + Math.max(chars.length - 1, 0) * charStagger
    let rafId = 0

    const tick = (now: number) => {
      const elapsed = now - start
      if (elapsed < baseDelay) {
        setRevealedCount(0)
      } else {
        const nextCount = Math.min(
          chars.length,
          Math.floor((elapsed - baseDelay) / charStagger) + 1
        )
        setRevealedCount(nextCount)
      }

      if (elapsed < totalDuration) {
        rafId = requestAnimationFrame(tick)
      } else {
        setRevealedCount(chars.length)
      }
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [active, baseDelay, charStagger, chars.length])

  const cursorVisible = showCursor && revealedCount >= chars.length

  return (
    <span
      ref={setElement}
      data-visible={active ? 'true' : 'false'}
      data-revealed={revealedCount}
      className={cn('coffee2-hero__title-typewriter', className)}
      aria-label={text}
      {...props}
    >
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={cn(
            'coffee2-hero__title-typewriter-char',
            index < revealedCount && 'coffee2-hero__title-typewriter-char--visible'
          )}
          aria-hidden={index < revealedCount ? undefined : true}
        >
          {char}
        </span>
      ))}
      {showCursor ? (
        <span
          className={cn(
            'coffee2-hero__title-typewriter-cursor',
            cursorVisible && 'coffee2-hero__title-typewriter-cursor--visible'
          )}
          aria-hidden
        />
      ) : null}
    </span>
  )
}
