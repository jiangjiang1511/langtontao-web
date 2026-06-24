'use client'

import { Coffee2NavGridCard } from '@/components/sections/coffee2/coffee2-nav-grid-card'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import type { CoffeeInsuranceIntroItem } from '@/lib/content/coffee'

const preservationIntroVariants = [
  'life-living',
  'life-alliance',
  'life-education',
] as const

type Coffee2PreservationIntroGridProps = {
  items: readonly CoffeeInsuranceIntroItem[]
}

export function Coffee2PreservationIntroGrid({
  items,
}: Coffee2PreservationIntroGridProps) {
  if (items.length === 0) return null

  return (
    <div className="coffee2-life-events-nav__grid">
      <div className="coffee2-life-events-nav__row coffee2-life-events-nav__row--3">
        {items.map((item, index) => (
          <Coffee2Reveal
            key={item.id}
            delay={index * 90}
            className="coffee2-life-events-nav__cell"
          >
            <Coffee2NavGridCard
              item={{
                number: String(index + 1).padStart(2, '0'),
                id: item.id,
                title: item.title,
                summary: item.summary,
              }}
              tag="保险认知"
              variantId={preservationIntroVariants[index] ?? 'life-living'}
            />
          </Coffee2Reveal>
        ))}
      </div>
    </div>
  )
}
