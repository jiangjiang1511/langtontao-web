'use client'

import { forwardRef, type CSSProperties } from 'react'
import type { FamilyOsListItem } from '@/components/sections/langtontao/langtontao-beautiful-familyos-rail'
import { cn } from '@/lib/utils'

const BRANCH_ACCENTS: Record<string, string> = {
  财富养成计划: 'var(--jarsy-violet)',
  超级英雄之旅: '#fafafa',
}

type LangtontaoBeautifulFamilyosCardProps = {
  item: FamilyOsListItem
  index: number
  selected: boolean
  onSelect: () => void
  className?: string
}

export const LangtontaoBeautifulFamilyosCard = forwardRef<
  HTMLButtonElement,
  LangtontaoBeautifulFamilyosCardProps
>(function LangtontaoBeautifulFamilyosCard(
  { item, index, selected, onSelect, className },
  ref
) {
  const number = String(index + 1).padStart(2, '0')
  const accent = BRANCH_ACCENTS[item.branchTitle] ?? 'var(--jarsy-violet)'

  return (
    <button
      ref={ref}
      type="button"
      id={`beautiful-familyos-card-${item.id}`}
      className={cn(
        'lt-beautiful-familyos-hub__card coffee2-pillar-card group block h-full w-full text-left',
        selected && 'lt-beautiful-familyos-hub__card--selected is-active',
        className
      )}
      style={{ '--pillar-accent': accent } as CSSProperties}
      aria-pressed={selected}
      aria-label={`选择业务：${item.title}`}
      data-selected={selected ? 'true' : 'false'}
      onClick={onSelect}
    >
      <div
        className="coffee2-pillar-card__content lt-beautiful-familyos-hub__card-content"
        style={{ '--pillar-bg-image': item.backgroundImage } as CSSProperties}
      >
        <span className="coffee2-pillar-card__number">{number}</span>
        <p className="lt-beautiful-familyos-hub__card-branch">{item.branchTitle}</p>
        <h4 className="coffee2-pillar-card__title lt-beautiful-familyos-hub__card-title">
          {item.title}
        </h4>
        <span className="coffee2-pillar-card__description lt-beautiful-familyos-hub__card-description">
          {item.philosophy}
        </span>
        <span className="coffee2-pillar-card__cta" aria-hidden>
          探索
        </span>
      </div>
    </button>
  )
})
