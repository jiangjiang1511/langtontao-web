'use client'

import type { CSSProperties } from 'react'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { HomeJarsyCenterMotionItem } from '@/components/sections/home-jarsy/home-jarsy-center-motion-item'
import type { NarrativeBubble } from '@/lib/content/narrative-bubble'
import { getWealthTopicVisualStyle } from '@/lib/content/wealth-topic-utils'
import { topicCardHash } from '@/lib/topic-share/build-share-url'
import { cn } from '@/lib/utils'

export function bubbleHasModalContent(bubble: NarrativeBubble): boolean {
  return Boolean(
    bubble.body ||
      bubble.subsections?.length ||
      bubble.hook ||
      bubble.summary ||
      bubble.readings?.length
  )
}

function getTopicTeaser(bubble: NarrativeBubble, maxLength = 100): string {
  if (bubble.summary) return bubble.summary
  if (!bubble.body) return ''
  if (bubble.body.length <= maxLength) return bubble.body
  return `${bubble.body.slice(0, maxLength).trim()}…`
}

type DayOneTopicCardVariant = 'default' | 'compact'

type DayOneTopicCardProps = {
  bubble: NarrativeBubble
  index: number
  motionIndex: number
  motionTotal: number
  visible: boolean
  variant?: DayOneTopicCardVariant
  showSummary?: boolean
  onSelect: (bubble: NarrativeBubble) => void
}

export function DayOneTopicCard({
  bubble,
  index,
  motionIndex,
  motionTotal,
  visible,
  variant = 'default',
  showSummary = true,
  onSelect,
}: DayOneTopicCardProps) {
  const interactive = bubbleHasModalContent(bubble)
  const teaser = showSummary ? getTopicTeaser(bubble) : ''
  const visualStyle = getWealthTopicVisualStyle(index, bubble.coverSrc)
  const displayIndex = String(index + 1).padStart(2, '0')
  const isCompact = variant === 'compact'

  const content = (
    <>
      {isCompact ? (
        <div className="day-one-path-topic-card__visual-frame">
          <div
            className={cn(
              'day-one-path-topic-card__visual',
              bubble.coverSrc && 'day-one-path-topic-card__visual--cover',
              'day-one-path-topic-card__visual--compact'
            )}
            style={visualStyle as CSSProperties}
            aria-hidden
          >
            {!bubble.coverSrc ? (
              <span className="day-one-path-topic-card__visual-index day-one-path-topic-card__visual-index--compact">
                {displayIndex}
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'day-one-path-topic-card__visual',
            bubble.coverSrc && 'day-one-path-topic-card__visual--cover'
          )}
          style={visualStyle as CSSProperties}
          aria-hidden
        >
          {!bubble.coverSrc ? (
            <span className="day-one-path-topic-card__visual-index">{displayIndex}</span>
          ) : null}
        </div>
      )}
      <div className="day-one-path-topic-card__copy">
        <h5 className="day-one-path-topic-card__title">{bubble.label}</h5>
        {teaser ? (
          <Coffee2AnnotatedText
            text={teaser}
            className="day-one-path-topic-card__desc"
            as="span"
          />
        ) : null}
      </div>
    </>
  )

  const cardClassName = cn(
    'day-one-path-topic-card',
    isCompact && 'day-one-path-topic-card--compact',
    !interactive && 'day-one-path-topic-card--static'
  )

  return (
    <HomeJarsyCenterMotionItem
      visible={visible}
      index={motionIndex}
      total={motionTotal}
      className={cn(
        'day-one-path-topic-card-reveal',
        isCompact && 'day-one-path-topic-card-reveal--compact'
      )}
    >
      {!interactive ? (
        <article id={topicCardHash(bubble.id)} className={cardClassName}>{content}</article>
      ) : (
        <article id={topicCardHash(bubble.id)} className={cardClassName}>
          <button
            type="button"
            className="day-one-path-topic-card__button"
            onClick={() => onSelect(bubble)}
            aria-haspopup="dialog"
          >
            {content}
          </button>
        </article>
      )}
    </HomeJarsyCenterMotionItem>
  )
}
