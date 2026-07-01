'use client'

import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import type { NarrativePathStep } from '@/lib/content/narrative-bubble'
import {
  getPathHubStageLead,
  getPathHubTabBubbleLabel,
  type PathHubVariant,
} from '@/lib/content/path-hub-matrix'
import { cn } from '@/lib/utils'

export function getDayOnePathStepShortTitle(title: string): string {
  const match = title.match(/第.+?步[：:]\s*(.+)/)
  return match?.[1]?.trim() ?? title
}

/** @deprecated use getPathHubStageLead */
export function getDayOnePathStepTabSummary(step: NarrativePathStep): string {
  const first = step.bubbles[0]
  return first?.hook ?? first?.summary ?? ''
}

type DayOnePathStepTabProps = {
  step: NarrativePathStep
  index: number
  selected: boolean
  onSelect: (index: number) => void
  hubVariant?: PathHubVariant
  className?: string
}

export function DayOnePathStepTab({
  step,
  index,
  selected,
  onSelect,
  hubVariant = 'default',
  className,
}: DayOnePathStepTabProps) {
  const number = String(index + 1).padStart(2, '0')
  const isSubsectionMatrix = hubVariant === 'subsection-matrix'
  const tabTitle = isSubsectionMatrix
    ? step.title
    : getDayOnePathStepShortTitle(step.title)
  const bubbleLabel = isSubsectionMatrix ? getPathHubTabBubbleLabel(step) : null
  const summary = isSubsectionMatrix
    ? getPathHubStageLead(step, hubVariant)
    : getDayOnePathStepTabSummary(step)

  return (
    <button
      type="button"
      role="tab"
      id={`day-one-path-tab-${step.id}`}
      aria-selected={selected}
      aria-controls={`day-one-path-panel-${step.id}`}
      data-selected={selected ? 'true' : 'false'}
      className={cn('day-one-path-hub__tab', className)}
      onClick={() => onSelect(index)}
    >
      <div className="day-one-path-hub__tab-head">
        <div className="day-one-path-hub__tab-lead">
          <span className="day-one-path-hub__tab-number">{number}</span>
          <p className="day-one-path-hub__tab-title">{tabTitle}</p>
          {bubbleLabel ? (
            <p className="day-one-path-hub__tab-bubble-label">{bubbleLabel}</p>
          ) : null}
        </div>
      </div>
      {summary ? (
        <Coffee2AnnotatedText
          text={summary}
          className="day-one-path-hub__tab-summary"
          as="span"
        />
      ) : null}
    </button>
  )
}
