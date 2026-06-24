'use client'

'use client'

import { Coffee2DisplayTypewriter } from '@/components/sections/coffee2/coffee2-display-typewriter'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  DebtContent,
  InvestContent,
  LegacyContent,
  PreservationContent,
} from '@/components/sections/coffee2/coffee2-topic-content'
import {
  coffee2TopicMeta,
  getCoffee2TopicById,
  type Coffee2TopicId,
} from '@/lib/content/coffee2-page'

type Coffee2TopicSubsectionProps = {
  topicId: Coffee2TopicId
}

export function Coffee2TopicSubsection({ topicId }: Coffee2TopicSubsectionProps) {
  const topic = getCoffee2TopicById(topicId)
  if (!topic) return null

  const meta = coffee2TopicMeta[topicId]

  return (
    <div
      id={topicId}
      className="coffee2-living-topic scroll-mt-28 border-t border-zinc-200 pt-10 md:pt-12"
      aria-labelledby={`coffee-subsection-${topicId}`}
    >
      <Coffee2Reveal className="coffee2-living-topic__header">
        <p className="coffee2-living-topic__eyebrow">
          <span>{meta.number}</span>
          <span aria-hidden>·</span>
          <span>活着</span>
        </p>
        <h3
          id={`coffee-subsection-${topicId}`}
          className="coffee2-living-topic__title"
        >
          <span className="coffee2-living-topic__title-mark">
            <Coffee2DisplayTypewriter text={topic.title} charStagger={90} />
          </span>
        </h3>
        <Coffee2AnnotatedText
          text={meta.summary}
          className="coffee2-living-topic__lead"
        />
      </Coffee2Reveal>

      {topicId === 'invest' ? <InvestContent blocks={topic.blocks} /> : null}
      {topicId === 'preservation' ? (
        <PreservationContent blocks={topic.blocks} />
      ) : null}
      {topicId === 'debt' ? <DebtContent /> : null}
      {topicId === 'legacy' ? <LegacyContent blocks={topic.blocks} /> : null}
    </div>
  )
}
