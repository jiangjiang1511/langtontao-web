'use client'

import type { CSSProperties } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import type { WealthNarrativeNode } from '@/lib/content/coffee-wealth-narrative'
import {
  canOpenWealthTopicModal,
  getWealthTopicTeaser,
  getWealthTopicVisualStyle,
} from '@/lib/content/wealth-topic-utils'
import { topicCardHash } from '@/lib/topic-share/build-share-url'
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
  const visualStyle = getWealthTopicVisualStyle(index, node.coverSrc)
  const displayIndex = String(index + 1).padStart(2, '0')

  const content = (
    <>
      <div
        className={cn(
          'invest-wealth-topic-card__visual',
          node.coverSrc && 'invest-wealth-topic-card__visual--cover'
        )}
        style={visualStyle as CSSProperties}
        aria-hidden
      >
        {!node.coverSrc ? (
          <span className="invest-wealth-topic-card__visual-index">{displayIndex}</span>
        ) : null}
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
        <article id={topicCardHash(node.id)} className="invest-wealth-topic-card invest-wealth-topic-card--static">
          {content}
        </article>
      ) : (
        <article id={topicCardHash(node.id)} className="invest-wealth-topic-card">
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
