import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  coffee2PillarCards,
} from '@/lib/content/coffee2-pillars'

export function Coffee2PillarsSection() {
  return (
    <section
      id="pillars"
      className="coffee2-pillars scroll-mt-28 py-16 md:py-24"
      aria-label="社群 · 读书 · 活动"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {coffee2PillarCards.map((card, index) => (
            <Coffee2Reveal key={card.id} as="li" delay={80 + index * 90}>
              <Link
                href={card.href}
                className="coffee2-pillar-card group block h-full"
                style={{ '--pillar-accent': card.accent } as CSSProperties}
              >
                <div
                  className="coffee2-pillar-card__content"
                  style={
                    {
                      '--pillar-bg-image': `url(${card.backgroundSrc})`,
                    } as CSSProperties
                  }
                >
                  <span className="coffee2-pillar-card__number">{card.number}</span>
                  <h3 className="coffee2-pillar-card__title">{card.title}</h3>
                  <p className="coffee2-pillar-card__description">
                    {card.description}
                  </p>
                  <span className="coffee2-pillar-card__cta" aria-hidden>
                    探索
                  </span>
                </div>
              </Link>
            </Coffee2Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
