'use client'

import { useEffect, useState } from 'react'
import { Coffee2TenetMarqueeCard } from '@/components/sections/coffee2/coffee2-tenet-marquee-card'
import { HorizontalScroll } from '@/components/shared/horizontal-scroll'
import { Marquee } from '@/components/shared/marquee'
import type { Coffee2Tenet } from '@/lib/content/coffee-manifesto'
import { cn } from '@/lib/utils'

type Coffee2TenetsMarqueeProps = {
  tenets: readonly Coffee2Tenet[]
  onSelect: (tenet: Coffee2Tenet) => void
  className?: string
}

export function Coffee2TenetsMarquee({
  tenets,
  onSelect,
  className,
}: Coffee2TenetsMarqueeProps) {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const cards = tenets.map((tenet) => (
    <Coffee2TenetMarqueeCard
      key={tenet.number}
      tenet={tenet}
      onSelect={onSelect}
      className="shrink-0"
    />
  ))

  if (reduceMotion) {
    return (
      <HorizontalScroll className={cn('coffee2-tenets-marquee', className)}>
        {cards}
      </HorizontalScroll>
    )
  }

  return (
    <div className={cn('coffee2-tenets-marquee', className)}>
      <Marquee className="coffee2-tenets-marquee__track">{cards}</Marquee>
    </div>
  )
}
