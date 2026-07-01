'use client'

import { useEffect, useRef } from 'react'
import { DayOnePathStepTab } from '@/components/sections/home-jarsy/day-one-path-step-tab'
import type { NarrativePathStep } from '@/lib/content/narrative-bubble'
import type { PathHubVariant } from '@/lib/content/path-hub-matrix'
import { cn } from '@/lib/utils'

const MOBILE_RAIL_MQ = '(max-width: 767px)'

function scrollTabIntoRailCenter(
  track: HTMLElement,
  tab: HTMLElement,
  behavior: ScrollBehavior
) {
  const trackRect = track.getBoundingClientRect()
  const tabRect = tab.getBoundingClientRect()
  const tabCenter =
    tabRect.left - trackRect.left + track.scrollLeft + tabRect.width / 2
  const maxScroll = track.scrollWidth - track.clientWidth
  const scrollLeft = Math.max(
    0,
    Math.min(tabCenter - track.clientWidth / 2, maxScroll)
  )

  track.scrollTo({ left: scrollLeft, behavior })
}

type DayOnePathStepRailProps = {
  steps: NarrativePathStep[]
  activeIndex: number
  onSelect: (index: number) => void
  tablistLabel: string
  hubVariant?: PathHubVariant
  className?: string
}

export function DayOnePathStepRail({
  steps,
  activeIndex,
  onSelect,
  tablistLabel,
  hubVariant = 'default',
  className,
}: DayOnePathStepRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || !window.matchMedia(MOBILE_RAIL_MQ).matches) return

    const tab = track.children[activeIndex] as HTMLElement | undefined
    if (!tab) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scrollTabIntoRailCenter(
      track,
      tab,
      prefersReducedMotion ? 'auto' : 'smooth'
    )
  }, [activeIndex])

  return (
    <aside className={cn('day-one-path-hub__rail', className)}>
      <div
        ref={trackRef}
        className="day-one-path-hub__rail-track"
        role="tablist"
        aria-label={tablistLabel}
      >
        {steps.map((step, index) => (
          <DayOnePathStepTab
            key={step.id}
            step={step}
            index={index}
            selected={index === activeIndex}
            onSelect={onSelect}
            hubVariant={hubVariant}
          />
        ))}
      </div>
    </aside>
  )
}
