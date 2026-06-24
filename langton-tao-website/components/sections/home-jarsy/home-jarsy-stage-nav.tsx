'use client'

import Link from 'next/link'
import { History, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { fiftyYearStages } from '@/lib/content/fifty-year-narrative'
import { cn } from '@/lib/utils'

const MOBILE_NAV_QUERY = '(max-width: 767px)'

export function HomeJarsyStageNav() {
  const [activeId, setActiveId] = useState(fiftyYearStages[0]?.id ?? 'day-1')
  const [navVisible, setNavVisible] = useState(false)
  const isMobile = useMediaQuery(MOBILE_NAV_QUERY)
  const [expanded, setExpanded] = useState(false)

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
    if (!navVisible) {
      setExpanded(false)
    }
  }, [navVisible])

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

  useEffect(() => {
    if (!isMobile || !expanded) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpanded(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMobile, expanded])

  const showMobilePanel = isMobile && expanded
  const showMobileFab = isMobile && navVisible && !expanded

  return (
    <>
      {showMobilePanel ? (
        <button
          type="button"
          className="home-jarsy-stage-nav__backdrop"
          aria-label="关闭阶段导航"
          onClick={() => setExpanded(false)}
        />
      ) : null}

      <nav
        aria-label="TAO 定律阶段导航"
        aria-hidden={navVisible ? undefined : true}
        data-visible={navVisible ? 'true' : 'false'}
        data-mobile={isMobile ? 'true' : 'false'}
        data-expanded={expanded ? 'true' : 'false'}
        className={cn(
          'home-jarsy-stage-nav',
          navVisible && 'home-jarsy-stage-nav--visible',
          isMobile && 'home-jarsy-stage-nav--mobile',
          showMobileFab && 'home-jarsy-stage-nav--collapsed',
          showMobilePanel && 'home-jarsy-stage-nav--expanded'
        )}
      >
        {isMobile ? (
          <button
            type="button"
            className="home-jarsy-stage-nav__toggle"
            aria-expanded={expanded}
            aria-controls="home-jarsy-stage-nav-list"
            onClick={() => setExpanded((open) => !open)}
          >
            <span className="sr-only">
              {expanded ? '关闭阶段导航' : '打开阶段导航'}
            </span>
            {expanded ? (
              <X className="h-4 w-4" aria-hidden />
            ) : (
              <History className="h-4 w-4" aria-hidden />
            )}
          </button>
        ) : null}

        <div className="home-jarsy-stage-nav__panel">
          <div className="home-jarsy-stage-nav__panel-inner">
            <ol id="home-jarsy-stage-nav-list" className="home-jarsy-stage-nav__list">
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
                      onClick={() => {
                        if (isMobile) setExpanded(false)
                      }}
                    >
                      {stage.periodLabel}
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </nav>
    </>
  )
}
