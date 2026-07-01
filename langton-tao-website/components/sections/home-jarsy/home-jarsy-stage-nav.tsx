'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fiftyYearStages } from '@/lib/content/fifty-year-narrative'
import { cn } from '@/lib/utils'

export function HomeJarsyStageNav() {
  const [activeId, setActiveId] = useState(fiftyYearStages[0]?.id ?? 'day-1')
  const [navVisible, setNavVisible] = useState(false)

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

  useEffect(() => {
    if (!navVisible) return

    const sections = fiftyYearStages
      .map((stage) => document.getElementById(stage.id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.55],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [navVisible])

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
              <Link
                key={stage.id}
                href={`#${stage.id}`}
                role="listitem"
                data-active={isActive ? 'true' : 'false'}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'home-jarsy-stage-nav__link',
                  isActive && 'home-jarsy-stage-nav__link--active'
                )}
              >
                <span className="home-jarsy-stage-nav__number" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="home-jarsy-stage-nav__title">
                  {stage.periodLabel}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
