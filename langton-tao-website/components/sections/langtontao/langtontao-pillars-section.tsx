'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Coffee2AnnotatedCopyBlock } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import {
  langtontaoPillarCards,
  langtontaoPillarsMeta,
  type LangtontaoPillarScatterLayout,
  type LangtontaoPillarStackLayout,
} from '@/lib/content/langtontao-pillars'

function stackVars(layout: LangtontaoPillarStackLayout): CSSProperties {
  return {
    '--lt-pillar-stack-x': layout.x,
    '--lt-pillar-stack-y': layout.y,
    '--lt-pillar-stack-rotate': `${layout.rotate}deg`,
    '--lt-pillar-stack-scale': String(layout.scale),
    '--lt-pillar-stack-z': String(layout.zIndex),
    '--lt-pillar-stack-width': layout.width,
  } as CSSProperties
}

function scatterVars(layout: LangtontaoPillarScatterLayout): CSSProperties {
  return {
    '--lt-pillar-scatter-left': layout.left,
    '--lt-pillar-scatter-top': layout.top,
    '--lt-pillar-scatter-rotate': `${layout.rotate}deg`,
    '--lt-pillar-scatter-scale': String(layout.scale),
    '--lt-pillar-scatter-z': String(layout.zIndex),
    '--lt-pillar-scatter-width': layout.width,
  } as CSSProperties
}

export function LangtontaoPillarsSection() {
  const stageRef = useRef<HTMLUListElement | null>(null)
  const [isExploded, setIsExploded] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setIsExploded(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          setIsExploded(true)
          observer.disconnect()
        }
      },
      {
        threshold: [0, 0.25, 0.4, 0.6, 0.75, 1],
        rootMargin: '-18% 0px -18% 0px',
      }
    )

    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="langtontao-pillars"
      className="langtontao-pillars scroll-mt-28 border-b border-zinc-200 py-14 md:py-20 lg:py-24"
      aria-label={langtontaoPillarsMeta.ariaLabel}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lt-scatter-stage-wrap">
          <ul
            ref={stageRef}
            className="langtontao-pillars__stage w-full"
            data-exploded={isExploded ? 'true' : 'false'}
          >
          {langtontaoPillarCards.map((card, index) => (
            <li
              key={card.id}
              className="langtontao-pillars__card"
              style={
                {
                  ...stackVars(card.stack),
                  ...scatterVars(card.scatter),
                  '--lt-pillar-stagger': `${index * 70}ms`,
                } as CSSProperties
              }
            >
              <Link
                href={card.href}
                className="coffee2-pillar-card group block h-full"
                style={{ '--pillar-accent': card.accent } as CSSProperties}
              >
                <div
                  className="coffee2-pillar-card__content"
                  style={
                    {
                      '--pillar-bg-image': card.backgroundImage,
                    } as CSSProperties
                  }
                >
                  <span className="coffee2-pillar-card__number">{card.number}</span>
                  <h3 className="coffee2-pillar-card__title">{card.title}</h3>
                  <Coffee2AnnotatedCopyBlock
                    block={card.description}
                    className="coffee2-pillar-card__description"
                    as="span"
                  />
                  <span className="coffee2-pillar-card__cta" aria-hidden>
                    探索
                  </span>
                </div>
              </Link>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
