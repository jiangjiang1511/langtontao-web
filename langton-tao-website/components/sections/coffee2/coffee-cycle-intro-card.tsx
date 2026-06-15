'use client'

import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { HomeJarsyCenterMotionItem } from '@/components/sections/home-jarsy/home-jarsy-center-motion-item'
import type { CoffeeCycleWave } from '@/lib/content/coffee-cycles-timeline'
import { cn } from '@/lib/utils'

type CoffeeCycleIntroCardProps = {
  cycle: CoffeeCycleWave
  visible: boolean
  index: number
  total: number
}

function useCanHover() {
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return canHover
}

export function CoffeeCycleIntroCard({
  cycle,
  visible,
  index,
  total,
}: CoffeeCycleIntroCardProps) {
  const canHover = useCanHover()
  const [expanded, setExpanded] = useState(false)

  const handleClick = useCallback(() => {
    if (canHover) return
    setExpanded((value) => !value)
  }, [canHover])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (canHover) return
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setExpanded((value) => !value)
      }
    },
    [canHover]
  )

  return (
    <HomeJarsyCenterMotionItem
      visible={visible}
      index={index}
      total={total}
      className={cn(
        'coffee-cycle-intro-card rounded-xl border p-5 md:p-6',
        !canHover && expanded && 'coffee-cycle-intro-card--expanded'
      )}
      style={
        {
          '--cycle-accent': cycle.color,
          '--c2-reveal-delay': `${index * 240}ms`,
          '--c2-exit-delay': `${(total - 1 - index) * 240}ms`,
        } as CSSProperties
      }
    >
      <div
        className={cn(
          'coffee-cycle-intro-card__surface',
          !canHover && 'coffee-cycle-intro-card__surface--touch'
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={canHover ? undefined : 'button'}
        tabIndex={canHover ? undefined : 0}
        aria-expanded={canHover ? undefined : expanded}
        aria-label={
          canHover
            ? undefined
            : expanded
              ? `${cycle.label}，${cycle.periodLabel}，收起说明`
              : `${cycle.label}，${cycle.periodLabel}，展开说明`
        }
      >
        <div className="coffee-cycle-intro-card__title-view">
          <p className="coffee-cycle-intro-card__label">{cycle.label}</p>
          <p className="coffee-cycle-intro-card__period">{cycle.periodLabel}</p>
        </div>
        <div className="coffee-cycle-intro-card__intro-view">
          <p className="coffee-cycle-intro-card__intro-label">{cycle.label}</p>
          <p className="coffee-cycle-intro-card__intro-text">{cycle.intro}</p>
        </div>
      </div>
    </HomeJarsyCenterMotionItem>
  )
}
