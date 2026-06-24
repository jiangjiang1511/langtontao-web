'use client'

import { useMarqueeDragGuard } from '@/components/shared/draggable-marquee'
import type { CoffeePreservationInsurer } from '@/lib/content/coffee-preservation-insurers'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { cn } from '@/lib/utils'

type Coffee2PreservationInsurerMarqueeCardProps = {
  insurer: CoffeePreservationInsurer
  index: number
  selected: boolean
  onSelect: (insurer: CoffeePreservationInsurer) => void
  className?: string
}

export function Coffee2PreservationInsurerMarqueeCard({
  insurer,
  index,
  selected,
  onSelect,
  className,
}: Coffee2PreservationInsurerMarqueeCardProps) {
  const { suppressClick } = useMarqueeDragGuard()
  const number = String(index + 1).padStart(2, '0')
  const summary = insurer.buyerTag

  return (
    <button
      type="button"
      data-selected={selected ? 'true' : 'false'}
      className={cn('coffee2-preservation-insurer-card shrink-0', className)}
      onClick={() => {
        if (suppressClick) return
        onSelect(insurer)
      }}
      aria-pressed={selected}
      aria-label={`${number} ${insurer.name}，查看保全介绍与文章`}
    >
      <div className="coffee2-preservation-insurer-card__head">
        <div className="coffee2-preservation-insurer-card__lead">
          <span className="coffee2-preservation-insurer-card__number">{number}</span>
          <p className="coffee2-preservation-insurer-card__title">{insurer.name}</p>
        </div>
        <span className="coffee2-preservation-insurer-card__tag">合作保司</span>
      </div>
      <Coffee2AnnotatedText
        text={summary}
        className="coffee2-preservation-insurer-card__summary"
        as="span"
      />
    </button>
  )
}
