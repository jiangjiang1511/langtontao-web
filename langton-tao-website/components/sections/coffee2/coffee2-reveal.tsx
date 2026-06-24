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

type Coffee2RevealProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  delay?: number
  eager?: boolean
  once?: boolean
  threshold?: number
  /** Fire when the element's vertical center enters the viewport */
  center?: boolean
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className' | 'style'>

function isElementCenterInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const centerY = rect.top + rect.height / 2
  return centerY >= 0 && centerY <= window.innerHeight
}

export function Coffee2Reveal({
  children,
  className,
  as: Component = 'div',
  delay = 0,
  eager = false,
  once = true,
  threshold = 0.12,
  center = false,
  ...props
}: Coffee2RevealProps) {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (eager) {
      const frame = requestAnimationFrame(() => {
        setVisible(true)
      })
      return () => cancelAnimationFrame(frame)
    }

    if (!element) return

    if (center) {
      let disposed = false

      const update = () => {
        if (disposed) return

        if (isElementCenterInViewport(element)) {
          setVisible(true)
          if (once) {
            disposed = true
            observer.disconnect()
            window.removeEventListener('scroll', update)
            window.removeEventListener('resize', update)
          }
        } else if (!once) {
          setVisible(false)
        }
      }

      const observer = new IntersectionObserver(update, {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      })

      observer.observe(element)
      window.addEventListener('scroll', update, { passive: true })
      window.addEventListener('resize', update, { passive: true })
      update()

      return () => {
        disposed = true
        observer.disconnect()
        window.removeEventListener('scroll', update)
        window.removeEventListener('resize', update)
      }
    }

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
  }, [center, eager, once, threshold, element])

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
