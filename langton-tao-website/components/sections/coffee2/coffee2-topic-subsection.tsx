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
      className="scroll-mt-28 border-t border-zinc-200 pt-10 md:pt-12"
      aria-labelledby={`coffee-subsection-${topicId}`}
    >
      <Coffee2Reveal className="grid gap-4 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-10">
        <div>
          <p className="c2-topic-number text-sm">{meta.number}</p>
          <h3
            id={`coffee-subsection-${topicId}`}
            className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl"
          >
            {topic.title}
          </h3>
        </div>
        <p className="self-end text-sm leading-relaxed text-zinc-600 md:text-base">
          {meta.summary}
        </p>
      </Coffee2Reveal>

      {topicId === 'invest' ? <InvestContent blocks={topic.blocks} /> : null}
      {topicId === 'preservation' ? (
        <PreservationContent blocks={topic.blocks} />
      ) : null}
      {topicId === 'debt' ? <DebtContent blocks={topic.blocks} /> : null}
      {topicId === 'legacy' ? <LegacyContent blocks={topic.blocks} /> : null}
    </div>
  )
}
