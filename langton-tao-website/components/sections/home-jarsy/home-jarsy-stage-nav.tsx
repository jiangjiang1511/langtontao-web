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
        'home-jarsy-stage-nav',
        navVisible && 'home-jarsy-stage-nav--visible'
      )}
    >
      <ol className="home-jarsy-stage-nav__list">
        {fiftyYearStages.map((stage) => {
          const isActive = activeId === stage.id

          return (
            <li key={stage.id} className="home-jarsy-stage-nav__item">
              <span
                className={cn(
                  'home-jarsy-stage-nav__dot',
                  isActive && 'home-jarsy-stage-nav__dot--active'
                )}
                aria-hidden
              />
              <Link
                href={`#${stage.id}`}
                data-active={isActive ? 'true' : 'false'}
                className="home-jarsy-stage-nav__link"
              >
                {stage.periodLabel}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
