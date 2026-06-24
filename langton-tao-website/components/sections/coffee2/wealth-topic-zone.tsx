'use client'

import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { WealthTopicCard } from '@/components/sections/coffee2/wealth-topic-card'
import type { WealthNarrativeNode } from '@/lib/content/coffee-wealth-narrative'

type WealthTopicZoneProps = {
  zone: WealthNarrativeNode
  headerDelay: number
  cardDelays: Record<string, number>
  onTopicClick: (node: WealthNarrativeNode) => void
}

export function WealthTopicZone({
  zone,
  headerDelay,
  cardDelays,
  onTopicClick,
}: WealthTopicZoneProps) {
  const topics = zone.children ?? []

  return (
    <section className="invest-wealth-zone" aria-labelledby={`wealth-zone-${zone.id}`}>
      <Coffee2Reveal delay={headerDelay} className="invest-wealth-reveal">
        <header className="invest-wealth-zone__header">
          <h4 id={`wealth-zone-${zone.id}`} className="invest-wealth-zone__title">
            {zone.title}
          </h4>
          {zone.summary ? (
            <Coffee2AnnotatedText
              text={zone.summary}
              className="invest-wealth-zone__summary"
            />
          ) : null}
        </header>
      </Coffee2Reveal>

      <div className="invest-wealth-topic-grid">
        {topics.map((topic, index) => (
          <WealthTopicCard
            key={topic.id}
            node={topic}
            index={index}
            revealDelay={cardDelays[topic.id] ?? 0}
            onSelect={onTopicClick}
          />
        ))}
      </div>
    </section>
  )
}
