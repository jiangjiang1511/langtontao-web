'use client'

import { useEffect, useState } from 'react'
import { langtontaoSectionNav } from '@/lib/content/langtontao-page'
import {
  scrollToSectionAnchor,
  useSectionScrollSpy,
} from '@/hooks/use-section-scroll-spy'
import { cn } from '@/lib/utils'

const HERO_ANCHOR_ID = 'langtontao-hero'
const SECTION_IDS = langtontaoSectionNav.map((item) => item.id)

export function LangtontaoSectionNav() {
  const [visible, setVisible] = useState(false)
  const activeId = useSectionScrollSpy({
    sectionIds: SECTION_IDS,
    enabled: visible,
  })

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
    return () => heroObserver.disconnect()
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
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'coffee2-life-events-sticky-nav__link',
                  isActive && 'coffee2-life-events-sticky-nav__link--active'
                )}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSectionAnchor(item.id)
                }}
              >
                <span className="coffee2-life-events-sticky-nav__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="coffee2-life-events-sticky-nav__title">
                  {item.label}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
