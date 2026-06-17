'use client'

import { Coffee2PreservationInsurerMarqueeCard } from '@/components/sections/coffee2/coffee2-preservation-insurer-marquee-card'
import { DraggableMarquee } from '@/components/shared/draggable-marquee'
import type { CoffeePreservationInsurer } from '@/lib/content/coffee-preservation-insurers'
import { cn } from '@/lib/utils'

type Coffee2PreservationInsurersMarqueeProps = {
  insurers: readonly CoffeePreservationInsurer[]
  selectedId: string
  onSelect: (insurer: CoffeePreservationInsurer) => void
  className?: string
}

export function Coffee2PreservationInsurersMarquee({
  insurers,
  selectedId,
  onSelect,
  className,
}: Coffee2PreservationInsurersMarqueeProps) {
  const cards = insurers.map((insurer, index) => (
    <Coffee2PreservationInsurerMarqueeCard
      key={insurer.id}
      insurer={insurer}
      index={index}
      selected={insurer.id === selectedId}
      onSelect={onSelect}
    />
  ))

  return (
    <DraggableMarquee
      className={cn('coffee2-preservation-insurers-marquee', className)}
      trackClassName="coffee2-preservation-insurers-marquee__track"
      durationSeconds={50}
    >
      {cards}
    </DraggableMarquee>
  )
}
