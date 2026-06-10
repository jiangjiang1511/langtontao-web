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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      {
        rootMargin: '-8% 0px -10% 0px',
        threshold,
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
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
