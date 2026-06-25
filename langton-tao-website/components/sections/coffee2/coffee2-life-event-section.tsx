import { EducationSection } from '@/components/sections/coffee2/education-section'
import { AllianceSurveySection } from '@/components/sections/coffee2/alliance-survey-section'
import { RetirementSection } from '@/components/sections/coffee2/retirement-section'
import {
  Coffee2AnnotatedParagraph,
  Coffee2AnnotatedText,
} from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2DisplayTypewriter } from '@/components/sections/coffee2/coffee2-display-typewriter'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2LifeEventJoinCta } from '@/components/sections/coffee2/coffee2-life-event-join-cta'
import { Coffee2TopicSubsection } from '@/components/sections/coffee2/coffee2-topic-subsection'
import { AssetClassesVennSection } from '@/components/sections/coffee2/asset-classes-venn-section'
import { LegacySection } from '@/components/sections/coffee2/legacy-section'
import type { Coffee2LifeEvent } from '@/lib/content/coffee-manifesto'
import {
  isAnnotatedSectionCopyBlock,
  type Coffee2SectionCopyBlock,
} from '@/lib/content/coffee-glossary'
import {
  coffee2LifeEventJoinCtas,
  coffee2LifeEventTopicIds,
} from '@/lib/content/coffee2-page'
import { cn } from '@/lib/utils'

type Coffee2LifeEventSectionProps = {
  event: Coffee2LifeEvent
  index: number
}

function getSectionIntro(event: Coffee2LifeEvent) {
  if ('sectionCopy' in event && event.sectionCopy) {
    const [first, ...rest] = event.sectionCopy

    return {
      subtitle: typeof first === 'string' ? first : null,
      body: rest as Coffee2SectionCopyBlock[],
    }
  }

  return {
    subtitle: null as string | null,
    body: [event.summary] as Coffee2SectionCopyBlock[],
  }
}

function getBodyBlockKey(block: Coffee2SectionCopyBlock, index: number) {
  if (typeof block === 'string') {
    return block.slice(0, 16)
  }

  return `annotated-${index}`
}

const LIFE_EVENT_SUBTITLE_DELAY = 140
const LIFE_EVENT_BODY_BASE_DELAY = 300
const LIFE_EVENT_BODY_STAGGER = 180

export function Coffee2LifeEventSection({
  event,
  index,
}: Coffee2LifeEventSectionProps) {
  const nestedTopicIds = coffee2LifeEventTopicIds[event.id] ?? []
  const joinCta = coffee2LifeEventJoinCtas[event.id]
  const { subtitle, body } = getSectionIntro(event)

  return (
    <section
      id={event.id}
      className={cn(
        'coffee2-life-event-section scroll-mt-28 border-t border-zinc-200 py-16 md:py-24',
        index % 2 === 1 ? 'bg-zinc-50/80' : 'bg-white'
      )}
      aria-labelledby={`coffee-life-event-${event.id}-title`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="coffee2-life-event-section__header mx-auto max-w-3xl text-center">
          <h2
            id={`coffee-life-event-${event.id}-title`}
            className="coffee2-life-event-section__title c2-display text-zinc-950"
          >
            <span className="coffee2-life-event-section__title-mark">
              <Coffee2DisplayTypewriter text={event.title} charStagger={120} />
            </span>
          </h2>

          {subtitle ? (
            <Coffee2Reveal delay={LIFE_EVENT_SUBTITLE_DELAY}>
              <p className="coffee2-life-event-section__subtitle">{subtitle}</p>
            </Coffee2Reveal>
          ) : null}

          <div className="coffee2-life-event-section__body">
            {body.map((block, paragraphIndex) => (
              <Coffee2Reveal
                key={getBodyBlockKey(block, paragraphIndex)}
                delay={
                  LIFE_EVENT_BODY_BASE_DELAY +
                  paragraphIndex * LIFE_EVENT_BODY_STAGGER
                }
              >
                {isAnnotatedSectionCopyBlock(block) ? (
                  <Coffee2AnnotatedParagraph segments={block.segments} />
                ) : (
                  <Coffee2AnnotatedText text={block} as="p" />
                )}
              </Coffee2Reveal>
            ))}
          </div>
        </div>

        {event.id === 'life-living' ? (
          <div className="mt-16 md:mt-24 lg:mt-32">
            <AssetClassesVennSection />
          </div>
        ) : null}

        {event.id === 'life-living' ? (
          <div className="coffee2-living-topics mt-16 md:mt-24 lg:mt-32">
            {nestedTopicIds.map((topicId) => (
              <Coffee2TopicSubsection key={topicId} topicId={topicId} />
            ))}
          </div>
        ) : null}

        {event.id === 'life-legacy' ? <LegacySection /> : null}

        {event.id === 'life-alliance' ? (
          <AllianceSurveySection />
        ) : null}

        {event.id === 'life-retirement' ? (
          <RetirementSection />
        ) : null}

        {event.id === 'life-education' ? <EducationSection /> : null}

        {event.id !== 'life-living' &&
        event.id !== 'life-legacy' &&
        event.id !== 'life-alliance' &&
        event.id !== 'life-retirement' &&
        event.id !== 'life-education' ? (
          <Coffee2Reveal delay={80} className="mt-10">
            <div className="c2-debt-empty mx-auto max-w-2xl px-8 py-16 text-center md:py-20">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                Coming Soon
              </p>
              <p className="mt-4 text-lg font-medium text-zinc-600">内容待补充</p>
            </div>
          </Coffee2Reveal>
        ) : null}

        {joinCta ? <Coffee2LifeEventJoinCta content={joinCta} /> : null}
      </div>
    </section>
  )
}
