'use client'

import type { CSSProperties } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import type { WealthNarrativeNode } from '@/lib/content/coffee-wealth-narrative'
import {
  canOpenWealthTopicModal,
  getWealthTopicTeaser,
  getWealthTopicVisualTheme,
} from '@/lib/content/wealth-topic-utils'
import { cn } from '@/lib/utils'

type WealthTopicCardProps = {
  node: WealthNarrativeNode
  index: number
  revealDelay: number
  onSelect: (node: WealthNarrativeNode) => void
}

export function WealthTopicCard({
  node,
  index,
  revealDelay,
  onSelect,
}: WealthTopicCardProps) {
  const interactive = canOpenWealthTopicModal(node)
  const teaser = getWealthTopicTeaser(node)
  const theme = getWealthTopicVisualTheme(index)
  const displayIndex = String(index + 1).padStart(2, '0')

  const visualStyle = {
    '--wealth-topic-visual-bg': theme.background,
    '--wealth-topic-visual-glyph': theme.glyph,
  } as CSSProperties

  const content = (
    <>
      <div
        className="invest-wealth-topic-card__visual"
        style={visualStyle}
        aria-hidden
      >
        <span className="invest-wealth-topic-card__visual-index">{displayIndex}</span>
      </div>
      <div className="invest-wealth-topic-card__copy">
        <h5 className="invest-wealth-topic-card__title">{node.title}</h5>
        {teaser ? (
          <Coffee2AnnotatedText
            text={teaser}
            className="invest-wealth-topic-card__desc"
            as="span"
          />
        ) : null}
      </div>
    </>
  )

  return (
    <Coffee2Reveal delay={revealDelay} className="invest-wealth-reveal invest-wealth-topic-card-reveal">
      {!interactive ? (
        <article className="invest-wealth-topic-card invest-wealth-topic-card--static">
          {content}
        </article>
      ) : (
        <article className="invest-wealth-topic-card">
          <button
            type="button"
            className={cn('invest-wealth-topic-card__button')}
            onClick={() => onSelect(node)}
            aria-haspopup="dialog"
          >
            {content}
          </button>
        </article>
      )}
    </Coffee2Reveal>
  )
}
