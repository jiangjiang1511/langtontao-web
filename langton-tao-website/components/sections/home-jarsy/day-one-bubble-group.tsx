'use client'

import { NarrativeBubbleGroup } from '@/components/sections/home-jarsy/narrative-bubble-group'
import { dayOneAccentMap, type DayOneBubble } from '@/lib/content/day-one-narrative'

type DayOneBubbleGroupProps = {
  bubbles: DayOneBubble[]
  layout?: 'wrap' | 'grid-2' | 'concept-grid'
  className?: string
}

export function DayOneBubbleGroup({
  bubbles,
  layout = 'wrap',
  className,
}: DayOneBubbleGroupProps) {
  return (
    <NarrativeBubbleGroup
      bubbles={bubbles}
      layout={layout}
      className={className}
      accentMap={dayOneAccentMap}
      tablistLabel={layout === 'concept-grid' ? '什么是第一天' : '第一天主题'}
    />
  )
}
