'use client'

import {
  Coffee2AnnotatedParagraph,
  Coffee2AnnotatedText,
} from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2DisplayTypewriter } from '@/components/sections/coffee2/coffee2-display-typewriter'
import { Coffee2LifeEventInteractive } from '@/components/sections/coffee2/coffee2-life-event-interactive'
import { Coffee2LifeEventJoinCta } from '@/components/sections/coffee2/coffee2-life-event-join-cta'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import type { Coffee2LifeEvent } from '@/lib/content/coffee-manifesto'
import {
  isAnnotatedSectionCopyBlock,
  type Coffee2SectionCopyBlock,
} from '@/lib/content/coffee-glossary'
import { coffee2LifeEventJoinCtas } from '@/lib/content/coffee2-page'
import { useSectionDomId } from '@/components/shared/deferred-mount-context'
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
  const joinCta = coffee2LifeEventJoinCtas[event.id]
  const { subtitle, body } = getSectionIntro(event)
  const sectionId = useSectionDomId(event.id)

  return (
    <section
      id={sectionId}
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

        <Coffee2LifeEventInteractive eventId={event.id} />

        {joinCta ? <Coffee2LifeEventJoinCta content={joinCta} /> : null}
      </div>
    </section>
  )
}
