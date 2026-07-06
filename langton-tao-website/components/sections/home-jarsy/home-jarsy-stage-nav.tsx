'use client'

import { useEffect, useState } from 'react'
import { fiftyYearStages } from '@/lib/content/fifty-year-narrative'
import {
  scrollToSectionAnchor,
  useSectionScrollSpy,
} from '@/hooks/use-section-scroll-spy'
import { cn } from '@/lib/utils'

const STAGE_IDS = fiftyYearStages.map((stage) => stage.id)

export function HomeJarsyStageNav() {
  const [navVisible, setNavVisible] = useState(false)
  const activeId = useSectionScrollSpy({
    sectionIds: STAGE_IDS,
    rootMargin: '-20% 0px -55% 0px',
    threshold: [0, 0.15, 0.35, 0.55],
    enabled: navVisible,
  })

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setNavVisible(!entry.isIntersecting)
      },
      {
        rootMargin: '-8% 0px -35% 0px',
        threshold: [0, 0.08, 0.2],
      }
    )

    heroObserver.observe(hero)
    return () => heroObserver.disconnect()
  }, [])

  return (
    <nav
      aria-label="TAO 定律阶段导航"
      aria-hidden={navVisible ? undefined : true}
      data-visible={navVisible ? 'true' : 'false'}
      className={cn(
        'home-jarsy-stage-nav pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4 sm:px-6',
        navVisible && 'home-jarsy-stage-nav--visible pointer-events-auto'
      )}
    >
      <div className="home-jarsy-stage-nav__shell max-w-[calc(100vw-2rem)]">
        <div
          id="home-jarsy-stage-nav-list"
          className="home-jarsy-stage-nav__track"
          role="list"
        >
          {fiftyYearStages.map((stage, index) => {
            const isActive = activeId === stage.id

            return (
              <a
                key={stage.id}
                href={`#${stage.id}`}
                role="listitem"
                data-active={isActive ? 'true' : 'false'}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'home-jarsy-stage-nav__link',
                  isActive && 'home-jarsy-stage-nav__link--active'
                )}
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSectionAnchor(stage.id)
                }}
              >
                <span className="home-jarsy-stage-nav__number" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="home-jarsy-stage-nav__title">
                  {stage.periodLabel}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
