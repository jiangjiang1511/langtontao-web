'use client'

import { useEffect, useState } from 'react'
import {
  coffee2LifeEvents,
  type Coffee2LifeEventId,
} from '@/lib/content/coffee-manifesto'
import {
  scrollToSectionAnchor,
  useSectionScrollSpy,
} from '@/hooks/use-section-scroll-spy'
import { cn } from '@/lib/utils'

const NAV_GRID_ID = 'coffee-life-events-nav-grid'
const COFFEE_STICKY_NAV_TOP = {
  id: 'coffee-top',
  href: '#pillars',
  title: '一杯咖啡',
} as const
const EVENT_IDS = coffee2LifeEvents.map((event) => event.id)

export function Coffee2LifeEventsStickyNav() {
  const [visible, setVisible] = useState(false)
  const activeId = useSectionScrollSpy({
    sectionIds: EVENT_IDS,
    enabled: visible,
  }) as Coffee2LifeEventId

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
    return () => gridObserver.disconnect()
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
          <a
            href={COFFEE_STICKY_NAV_TOP.href}
            className="coffee2-life-events-sticky-nav__link coffee2-life-events-sticky-nav__link--top"
            onClick={(event) => {
              event.preventDefault()
              scrollToSectionAnchor('pillars')
            }}
          >
            <span className="coffee2-life-events-sticky-nav__title">
              {COFFEE_STICKY_NAV_TOP.title}
            </span>
          </a>

          <span
            className="coffee2-life-events-sticky-nav__divider"
            aria-hidden
          />

          {coffee2LifeEvents.map((event) => {
            const isActive = activeId === event.id

            return (
              <a
                key={event.id}
                href={`#${event.id}`}
                className={cn(
                  'coffee2-life-events-sticky-nav__link',
                  isActive && 'coffee2-life-events-sticky-nav__link--active'
                )}
                aria-current={isActive ? 'location' : undefined}
                onClick={(eventClick) => {
                  eventClick.preventDefault()
                  scrollToSectionAnchor(event.id)
                }}
              >
                <span className="coffee2-life-events-sticky-nav__number">
                  {event.number}
                </span>
                <span className="coffee2-life-events-sticky-nav__title">
                  {event.title}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
