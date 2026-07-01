'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { langtontaoSectionNav } from '@/lib/content/langtontao-page'
import { cn } from '@/lib/utils'

const HERO_ANCHOR_ID = 'langtontao-hero'

export function LangtontaoSectionNav() {
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState<string>(
    langtontaoSectionNav[0]?.id ?? 'home-roots'
  )

  useEffect(() => {
    const hero = document.getElementById(HERO_ANCHOR_ID)
    if (!hero) return

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false)
          return
        }

        setVisible(entry.boundingClientRect.top < 0)
      },
      { threshold: 0 }
    )

    heroObserver.observe(hero)

    const sectionRatios = new Map<string, number>()

    const sectionObservers = langtontaoSectionNav.map((item) => {
      const section = document.getElementById(item.id)
      if (!section) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            sectionRatios.set(item.id, entry.intersectionRatio)
          } else {
            sectionRatios.delete(item.id)
          }

          let nextActive: string | null = null
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
      heroObserver.disconnect()
      sectionObservers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <nav
      aria-label="朗敦道业务板块导航"
      aria-hidden={!visible}
      data-visible={visible ? 'true' : 'false'}
      className={cn(
        'coffee2-life-events-sticky-nav pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4 sm:px-6',
        visible && 'coffee2-life-events-sticky-nav--visible pointer-events-auto'
      )}
    >
      <div className="coffee2-life-events-sticky-nav__shell max-w-[calc(100vw-2rem)]">
        <div className="coffee2-life-events-sticky-nav__track">
          {langtontaoSectionNav.map((item, index) => {
            const isActive = activeId === item.id

            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'coffee2-life-events-sticky-nav__link',
                  isActive && 'coffee2-life-events-sticky-nav__link--active'
                )}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className="coffee2-life-events-sticky-nav__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="coffee2-life-events-sticky-nav__title">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
