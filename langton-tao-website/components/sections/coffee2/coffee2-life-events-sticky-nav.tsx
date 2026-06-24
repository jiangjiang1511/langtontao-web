'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  coffee2LifeEvents,
  type Coffee2LifeEventId,
} from '@/lib/content/coffee-manifesto'
import { cn } from '@/lib/utils'

const NAV_GRID_ID = 'coffee-life-events-nav-grid'
const COFFEE_STICKY_NAV_TOP = {
  id: 'coffee-top',
  href: '#coffee2-hero',
  title: '一杯咖啡',
} as const

export function Coffee2LifeEventsStickyNav() {
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState<Coffee2LifeEventId>('life-living')

  useEffect(() => {
    const grid = document.getElementById(NAV_GRID_ID)
    if (!grid) return

    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false)
          return
        }

        setVisible(entry.boundingClientRect.top < 0)
      },
      { threshold: 0 }
    )

    gridObserver.observe(grid)

    const sectionRatios = new Map<Coffee2LifeEventId, number>()

    const sectionObservers = coffee2LifeEvents.map((event) => {
      const section = document.getElementById(event.id)
      if (!section) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            sectionRatios.set(event.id, entry.intersectionRatio)
          } else {
            sectionRatios.delete(event.id)
          }

          let nextActive: Coffee2LifeEventId | null = null
          let highestRatio = 0

          sectionRatios.forEach((ratio, id) => {
            if (ratio >= highestRatio) {
              highestRatio = ratio
              nextActive = id
            }
          })

          if (nextActive) {
            setActiveId(nextActive)
          }
        },
        {
          rootMargin: '-32% 0px -52% 0px',
          threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
        }
      )

      observer.observe(section)
      return observer
    })

    return () => {
      gridObserver.disconnect()
      sectionObservers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <nav
      aria-label="人生大事快速导航"
      aria-hidden={!visible}
      data-visible={visible ? 'true' : 'false'}
      className={cn(
        'coffee2-life-events-sticky-nav pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4 sm:px-6',
        visible && 'coffee2-life-events-sticky-nav--visible pointer-events-auto'
      )}
    >
      <div className="coffee2-life-events-sticky-nav__shell max-w-[calc(100vw-2rem)]">
        <div className="coffee2-life-events-sticky-nav__track">
          <Link
            href={COFFEE_STICKY_NAV_TOP.href}
            className="coffee2-life-events-sticky-nav__link coffee2-life-events-sticky-nav__link--top"
          >
            <span className="coffee2-life-events-sticky-nav__title">
              {COFFEE_STICKY_NAV_TOP.title}
            </span>
          </Link>

          <span
            className="coffee2-life-events-sticky-nav__divider"
            aria-hidden
          />

          {coffee2LifeEvents.map((event) => {
            const isActive = activeId === event.id

            return (
              <Link
                key={event.id}
                href={`#${event.id}`}
                className={cn(
                  'coffee2-life-events-sticky-nav__link',
                  isActive && 'coffee2-life-events-sticky-nav__link--active'
                )}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className="coffee2-life-events-sticky-nav__number">
                  {event.number}
                </span>
                <span className="coffee2-life-events-sticky-nav__title">
                  {event.title}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
