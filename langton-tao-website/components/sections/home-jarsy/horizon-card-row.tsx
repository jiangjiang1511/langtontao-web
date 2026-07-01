'use client'

import Link from 'next/link'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import type { HorizonCard } from '@/lib/content/century-horizons'
import { cn } from '@/lib/utils'

type HorizonCardRowProps = {
  cards: HorizonCard[]
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function HorizonCardRow({ cards, columns = 3, className }: HorizonCardRowProps) {
  return (
    <div
      className={cn(
        'horizon-card-row',
        columns === 1 && 'horizon-card-row--cols-1',
        columns === 2 && 'horizon-card-row--cols-2',
        columns === 3 && 'horizon-card-row--cols-3',
        columns === 4 && 'horizon-card-row--cols-4',
        className
      )}
    >
      {cards.map((card) => {
        const showCta = Boolean(card.href) || card.cta

        const content = (
          <>
            <h4
              className="horizon-card-row__title"
              style={card.accent ? { color: card.accent } : undefined}
            >
              {card.title}
            </h4>
            <p className="horizon-card-row__body">
              <Coffee2AnnotatedText text={card.body} as="span" />
            </p>
            {showCta ? <span className="horizon-card-row__cta">了解更多 →</span> : null}
          </>
        )

        if (card.href) {
          return (
            <Link
              key={card.title}
              href={card.href}
              className="horizon-card-row__card horizon-card-row__card--link"
            >
              {content}
            </Link>
          )
        }

        return (
          <article
            key={card.title}
            className={cn(
              'horizon-card-row__card',
              showCta && 'horizon-card-row__card--link'
            )}
          >
            {content}
          </article>
        )
      })}
    </div>
  )
}
