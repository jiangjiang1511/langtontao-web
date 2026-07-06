'use client'

import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { CoffeeCompoundGrowthSection } from '@/components/sections/coffee2/coffee-compound-growth-section'
import { Coffee2TimelineSection } from '@/components/sections/coffee2/coffee2-timeline-section'
import { HomeJarsyCenterMotionItem } from '@/components/sections/home-jarsy/home-jarsy-center-motion-item'
import { DayOnePathExplorer } from '@/components/sections/home-jarsy/day-one-path-explorer'
import { HomeJarsyStageHeader } from '@/components/sections/home-jarsy/home-jarsy-stage-header'
import { NarrativeBubbleGroup } from '@/components/sections/home-jarsy/narrative-bubble-group'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import {
  dayTwoAccentMap,
  dayTwoNarrative,
  getDayTwoCyclesSection,
  getDayTwoSuperheroSection,
  getDayTwoWhatSection,
} from '@/lib/content/day-two-narrative'
import type { FiftyYearStage } from '@/lib/content/fifty-year-narrative'
import {
  taoStagePanelClassName,
  taoStagePanelStyle,
} from '@/lib/content/tao-stage-visual'
import { useSectionDomId } from '@/components/shared/deferred-mount-context'
import { cn } from '@/lib/utils'

type HomeJarsyDayTwoPanelProps = {
  stage: FiftyYearStage
  index: number
}

export function HomeJarsyDayTwoPanel({ stage, index }: HomeJarsyDayTwoPanelProps) {
  const whatSection = getDayTwoWhatSection()
  const cyclesSection = getDayTwoCyclesSection()
  const superheroSection = getDayTwoSuperheroSection()

  const { ref: openingRef, visible: openingVisible } =
    useCenterZoneVisible<HTMLDivElement>()
  const { ref: whatRef, visible: whatVisible } = useCenterZoneVisible<HTMLDivElement>()
  const { ref: cyclesRef, visible: cyclesVisible } =
    useCenterZoneVisible<HTMLDivElement>()
  const { ref: superheroRef, visible: superheroVisible } =
    useCenterZoneVisible<HTMLDivElement>()
  const { ref: closeRef, visible: closeVisible } = useCenterZoneVisible<HTMLDivElement>()

  const sectionId = useSectionDomId(stage.id)

  return (
    <section
      id={sectionId}
      className={cn(
        taoStagePanelClassName(stage.id, 'day-two-panel scroll-mt-28 py-16 md:py-24 lg:min-h-[85vh] lg:py-28')
      )}
      style={taoStagePanelStyle(stage.id)}
      aria-labelledby={`${stage.id}-period`}
    >
      <div className="day-two-panel__glow" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <HomeJarsyStageHeader stage={stage} />

        <div className="compound-growth-scope mt-14 text-left md:mt-16 lg:mt-20">
          <CoffeeCompoundGrowthSection />
        </div>

        <div ref={openingRef} className="day-two-opening mx-auto mt-14 max-w-3xl md:mt-20">
          {dayTwoNarrative.opening.map((line, i) => (
            <HomeJarsyCenterMotionItem
              key={i}
              visible={openingVisible}
              index={i}
              total={dayTwoNarrative.opening.length}
              className={cn('day-two-opening__line', i > 0 && 'mt-5')}
            >
              <Coffee2AnnotatedText text={line} as="p" />
            </HomeJarsyCenterMotionItem>
          ))}
        </div>

        <div ref={whatRef} className="day-two-section mx-auto mt-20 max-w-5xl md:mt-28">
          <HomeJarsyCenterMotionItem
            visible={whatVisible}
            index={0}
            total={2}
            className="day-two-section__header"
          >
            <p className="c2-eyebrow">Framework · 认知框架</p>
            <h3 className="day-two-section__title c2-display mt-3 text-2xl text-zinc-950 md:text-4xl">
              {whatSection.title}
            </h3>
          </HomeJarsyCenterMotionItem>

          <HomeJarsyCenterMotionItem
            visible={whatVisible}
            index={1}
            total={2}
            className="mt-10 md:mt-12"
          >
            <NarrativeBubbleGroup
              bubbles={whatSection.bubbles}
              layout="concept-grid-2-1"
              accentMap={dayTwoAccentMap}
              tablistLabel="什么是第二天"
            />
          </HomeJarsyCenterMotionItem>
        </div>

        <div ref={cyclesRef} className="day-two-section mx-auto mt-20 max-w-5xl md:mt-28">
          <HomeJarsyCenterMotionItem
            visible={cyclesVisible}
            index={0}
            total={2}
            className="day-two-section__header"
          >
            <p className="c2-eyebrow">Cycles · 周期罗盘</p>
            <h3 className="day-two-section__title c2-display mt-3 text-2xl text-zinc-950 md:text-4xl">
              {cyclesSection.title}
            </h3>
          </HomeJarsyCenterMotionItem>

          <HomeJarsyCenterMotionItem
            visible={cyclesVisible}
            index={1}
            total={2}
            className="mt-10 md:mt-12"
          >
            <NarrativeBubbleGroup
              bubbles={cyclesSection.bubbles}
              layout="wrap"
              accentMap={dayTwoAccentMap}
              tablistLabel="周期主题"
            />
          </HomeJarsyCenterMotionItem>
        </div>

        <Coffee2TimelineSection placement="in-day-two" />

        <div className="day-two-section mx-auto mt-20 max-w-5xl md:mt-28">
          <div ref={superheroRef}>
            <HomeJarsyCenterMotionItem
              visible={superheroVisible}
              index={0}
              total={1}
              className="day-two-section__header"
            >
              <p className="c2-eyebrow">Superhero · 财富本质</p>
              <h3 className="day-two-section__title c2-display mt-3 text-2xl text-zinc-950 md:text-4xl">
                {superheroSection.title}
              </h3>
            </HomeJarsyCenterMotionItem>
          </div>

          <DayOnePathExplorer
            steps={superheroSection.steps}
            accentMap={dayTwoAccentMap}
            tablistLabel="超级英雄五步路径"
            hubVariant="subsection-matrix"
          />
        </div>

        <div ref={closeRef} className="mx-auto mt-20 max-w-3xl md:mt-28">
          <HomeJarsyCenterMotionItem
            visible={closeVisible}
            index={0}
            total={1}
            className="day-one-closing"
          >
            {dayTwoNarrative.closing.map((line, i) => (
              <Coffee2AnnotatedText
                key={i}
                className="day-one-closing__line"
                text={line}
                as="p"
              />
            ))}
          </HomeJarsyCenterMotionItem>
        </div>
      </div>
    </section>
  )
}
