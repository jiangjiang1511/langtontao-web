'use client'

import {
  useEffect,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

const REVEAL_FALLBACK_MS = 1500

function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight

  return rect.height > 0 && rect.top < viewportHeight && rect.bottom > 0
}

function getRevealRootMargin() {
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return '0px'
  }

  return '-8% 0px -10% 0px'
}

type Community2RevealProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  delay?: number
  eager?: boolean
  once?: boolean
  threshold?: number
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className' | 'style'>

export function Community2Reveal({
  children,
  className,
  as: Component = 'div',
  delay = 0,
  eager = false,
  once = true,
  threshold = 0.12,
  ...props
}: Community2RevealProps) {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [visible, setVisible] = useState(eager)

  useEffect(() => {
    if (eager) {
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }

    if (!element) return

    let cancelled = false
    let revealed = false

    const markVisible = () => {
      if (cancelled || revealed) return
      revealed = true
      setVisible(true)
      if (once) observer.disconnect()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markVisible()
        } else if (!once) {
          revealed = false
          setVisible(false)
        }
      },
      {
        rootMargin: getRevealRootMargin(),
        threshold,
      }
    )

    observer.observe(element)

    if (isInViewport(element)) {
      markVisible()
    }

    const frame = requestAnimationFrame(() => {
      if (!cancelled && isInViewport(element)) {
        markVisible()
      }
    })

    const fallback = setTimeout(() => {
      markVisible()
    }, REVEAL_FALLBACK_MS)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      clearTimeout(fallback)
      observer.disconnect()
    }
  }, [eager, once, threshold, element])

  const style = {
    '--c2-reveal-delay': `${delay}ms`,
  } as CSSProperties

  return (
    <Component
      ref={setElement as never}
      data-visible={visible ? 'true' : 'false'}
      className={cn('c2-reveal', className)}
      style={style}
      {...props}
    >
      {children}
    </Component>
  )
}
