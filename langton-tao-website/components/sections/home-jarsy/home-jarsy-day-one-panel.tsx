'use client'

import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { DayOneBubbleGroup } from '@/components/sections/home-jarsy/day-one-bubble-group'
import { HomeJarsyCenterMotionItem } from '@/components/sections/home-jarsy/home-jarsy-center-motion-item'
import { HomeJarsyStageHeader } from '@/components/sections/home-jarsy/home-jarsy-stage-header'
import { HomeJarsyTransitionSteps } from '@/components/sections/home-jarsy/home-jarsy-transition-steps'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import {
  dayOneNarrative,
  getDayOneHowSection,
  getDayOneWhatSection,
} from '@/lib/content/day-one-narrative'
import type { FiftyYearStage } from '@/lib/content/fifty-year-narrative'
import { cn } from '@/lib/utils'

type HomeJarsyDayOnePanelProps = {
  stage: FiftyYearStage
  index: number
}

export function HomeJarsyDayOnePanel({ stage, index }: HomeJarsyDayOnePanelProps) {
  const whatSection = getDayOneWhatSection()
  const howSection = getDayOneHowSection()
  const { ref: whatRef, visible: whatVisible } = useCenterZoneVisible<HTMLDivElement>()
  const { ref: howRef, visible: howVisible } = useCenterZoneVisible<HTMLDivElement>()
  const { ref: closeRef, visible: closeVisible } = useCenterZoneVisible<HTMLDivElement>()

  return (
    <section
      id={stage.id}
      className={cn(
        'day-one-panel scroll-mt-28 border-t border-zinc-200 py-16 md:py-24 lg:min-h-[85vh] lg:py-28',
        index % 2 === 1 ? 'bg-zinc-50/80' : 'bg-white'
      )}
      aria-labelledby={`${stage.id}-period`}
    >
      <div className="day-one-panel__glow" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <HomeJarsyStageHeader stage={stage} />

        <div ref={whatRef} className="day-one-section mx-auto mt-14 max-w-5xl md:mt-20">
          <HomeJarsyCenterMotionItem
            visible={whatVisible}
            index={0}
            total={2}
            className="day-one-section__header"
          >
            <p className="c2-eyebrow">Framework · 认知框架</p>
            <h3 className="day-one-section__title c2-display mt-3 text-2xl text-zinc-950 md:text-4xl">
              {whatSection.title}
            </h3>
          </HomeJarsyCenterMotionItem>

          <HomeJarsyCenterMotionItem
            visible={whatVisible}
            index={1}
            total={2}
            className="mt-10 md:mt-12"
          >
            <DayOneBubbleGroup bubbles={whatSection.bubbles} layout="concept-grid" />
          </HomeJarsyCenterMotionItem>
        </div>

        <div ref={howRef} className="day-one-section mx-auto mt-20 max-w-5xl md:mt-28">
          <HomeJarsyCenterMotionItem
            visible={howVisible}
            index={0}
            total={1}
            className="day-one-section__header"
          >
            <p className="c2-eyebrow">Path · 五步路径</p>
            <h3 className="day-one-section__title c2-display mt-3 text-2xl text-zinc-950 md:text-4xl">
              {howSection.title}
            </h3>
          </HomeJarsyCenterMotionItem>

          <ol className="day-one-timeline mt-12 md:mt-16">
            {howSection.steps.map((step, stepIndex) => (
              <li key={step.id} className="day-one-timeline__item">
                <div className="day-one-timeline__marker" aria-hidden>
                  <span className="day-one-timeline__index">
                    {String(stepIndex + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="day-one-timeline__card">
                  <p className="day-one-timeline__title">{step.title}</p>
                  <DayOneBubbleGroup
                    bubbles={step.bubbles}
                    layout={step.bubbles.length <= 2 ? 'grid-2' : 'wrap'}
                    className="mt-5"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div ref={closeRef} className="mx-auto mt-20 max-w-3xl md:mt-28">
          <HomeJarsyCenterMotionItem
            visible={closeVisible}
            index={0}
            total={1}
            className="day-one-closing"
          >
            {dayOneNarrative.closing.map((line, i) => (
              <Coffee2AnnotatedText
                key={i}
                className="day-one-closing__line"
                text={line}
                as="p"
              />
            ))}
          </HomeJarsyCenterMotionItem>
        </div>

        {stage.transition?.items && stage.transition.items.length > 0 ? (
          <HomeJarsyTransitionSteps
            heading={stage.transition.heading}
            items={stage.transition.items}
          />
        ) : null}
      </div>
    </section>
  )
}
