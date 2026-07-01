'use client'

import { DayOneTopicCard } from '@/components/sections/home-jarsy/day-one-topic-card'
import { HomeJarsyCenterMotionItem } from '@/components/sections/home-jarsy/home-jarsy-center-motion-item'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import type { NarrativeBubble, NarrativePathStep } from '@/lib/content/narrative-bubble'
import { cn } from '@/lib/utils'

type DayOnePathLayout = 'stack' | 'serpentine'
type DayOnePathAlign = 'start' | 'end'

type DayOnePathZonePart = 'full' | 'header' | 'topics'

type DayOnePathStepZoneProps = {
  step: NarrativePathStep
  stepIndex: number
  layout?: DayOnePathLayout
  align?: DayOnePathAlign
  zonePart?: DayOnePathZonePart
  visible?: boolean
  onTopicSelect: (bubble: NarrativeBubble) => void
}

export function DayOnePathStepZone({
  step,
  stepIndex,
  layout = 'serpentine',
  align = 'start',
  zonePart = 'full',
  visible: visibleProp,
  onTopicSelect,
}: DayOnePathStepZoneProps) {
  const { ref, visible: internalVisible } = useCenterZoneVisible<HTMLElement>()
  const visible = visibleProp ?? internalVisible
  const motionTotal = step.bubbles.length + 1
  const isSerpentine = layout === 'serpentine'
  const stepBadge = String(stepIndex + 1).padStart(2, '0')
  const titleId = `day-one-path-step-${step.id}`

  const header = (
    <HomeJarsyCenterMotionItem
      visible={visible}
      index={0}
      total={motionTotal}
      className={cn(
        'day-one-path-step__header',
        isSerpentine && 'day-one-path-step__header--compact',
        isSerpentine &&
          (align === 'start'
            ? 'day-one-path-step__header--align-start'
            : 'day-one-path-step__header--align-end')
      )}
    >
      {isSerpentine ? (
        <div className="day-one-path-step__heading-row">
          <span className="day-one-path-step__badge" aria-hidden>
            {stepBadge}
          </span>
          <h4 id={titleId} className="day-one-path-step__title">
            {step.title}
          </h4>
        </div>
      ) : (
        <h4 id={titleId} className="day-one-path-step__title">
          {step.title}
        </h4>
      )}
    </HomeJarsyCenterMotionItem>
  )

  const topics = (
    <div
      className={cn(
        'day-one-path-topic-grid',
        isSerpentine && 'day-one-path-topic-grid--compact',
        isSerpentine &&
          (align === 'start'
            ? 'day-one-path-topic-grid--align-start'
            : 'day-one-path-topic-grid--align-end')
      )}
    >
      {step.bubbles.map((bubble, index) => (
        <DayOneTopicCard
          key={bubble.id}
          bubble={bubble}
          index={stepIndex * 10 + index}
          motionIndex={index + 1}
          motionTotal={motionTotal}
          visible={visible}
          variant={isSerpentine ? 'compact' : 'default'}
          showSummary={!isSerpentine}
          onSelect={onTopicSelect}
        />
      ))}
    </div>
  )

  if (zonePart === 'header') return header
  if (zonePart === 'topics') return topics

  return (
    <section
      ref={ref}
      className={cn('day-one-path-step', isSerpentine && 'day-one-path-step--compact')}
      aria-labelledby={titleId}
    >
      {header}
      {topics}
    </section>
  )
}
