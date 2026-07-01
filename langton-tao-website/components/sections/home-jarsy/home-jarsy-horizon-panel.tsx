'use client'

import { useState } from 'react'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import {
  HorizonCycleIllustration,
  HorizonEpilogueScale,
  HorizonTopicDemo,
} from '@/components/sections/home-jarsy/horizon-demos'
import { HorizonHkCardModule } from '@/components/sections/home-jarsy/horizon-hk-card-module'
import { HorizonStoryStage } from '@/components/sections/home-jarsy/horizon-story-stage'
import { HorizonTopicRail } from '@/components/sections/home-jarsy/horizon-topic-rail'
import { HomeJarsyCenterMotionItem } from '@/components/sections/home-jarsy/home-jarsy-center-motion-item'
import { HomeJarsyProductList } from '@/components/sections/home-jarsy/home-jarsy-product-module'
import { HomeJarsyStageHeader } from '@/components/sections/home-jarsy/home-jarsy-stage-header'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import { getCenturyHorizon } from '@/lib/content/century-horizons'
import type { FiftyYearStage } from '@/lib/content/fifty-year-narrative'
import {
  taoStagePanelClassName,
  taoStagePanelStyle,
} from '@/lib/content/tao-stage-visual'
import { cn } from '@/lib/utils'

type HomeJarsyHorizonPanelProps = {
  stage: FiftyYearStage
  index: number
}

export function HomeJarsyHorizonPanel({ stage, index }: HomeJarsyHorizonPanelProps) {
  const content = getCenturyHorizon(stage.id)
  const [activeTopicId, setActiveTopicId] = useState(content?.topics[0]?.id ?? '')
  const { ref: bodyRef, visible: bodyVisible } = useCenterZoneVisible<HTMLDivElement>()
  const { ref: introRef, visible: introVisible } = useCenterZoneVisible<HTMLDivElement>()
  const { ref: illustrationRef, visible: illustrationVisible } =
    useCenterZoneVisible<HTMLDivElement>()

  if (!content) return null

  const activeTopic =
    content.topics.find((topic) => topic.id === activeTopicId) ?? content.topics[0]

  return (
    <section
      id={stage.id}
      className={cn(
        taoStagePanelClassName(
          stage.id,
          'horizon-panel scroll-mt-28 py-16 md:py-24 lg:min-h-[85vh] lg:py-28'
        ),
        stage.id === 'year-30' && 'horizon-panel--legacy-anchor'
      )}
      style={taoStagePanelStyle(stage.id)}
      aria-labelledby={`${stage.id}-period`}
    >
      {stage.id === 'year-30' ? (
        <span id="year-20" className="pointer-events-none absolute top-0 scroll-mt-28" aria-hidden />
      ) : null}

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <HomeJarsyStageHeader stage={stage} />

        {content.cycleIllustration ? (
          <div
            ref={illustrationRef}
            className="horizon-panel__cycle-illustration mx-auto mt-8 max-w-5xl md:mt-10"
          >
            <HorizonCycleIllustration visible={illustrationVisible} />
          </div>
        ) : null}

        {content.intro ? (
          <div ref={introRef} className="horizon-panel__intro mx-auto mt-10 max-w-3xl md:mt-12">
            {content.intro.map((line, lineIndex) => (
              <HomeJarsyCenterMotionItem
                key={line}
                visible={introVisible}
                index={lineIndex}
                total={content.intro!.length}
                className={cn(lineIndex > 0 && 'mt-4')}
              >
                <Coffee2AnnotatedText
                  className="text-base leading-relaxed text-zinc-600 md:text-lg"
                  text={line}
                  as="p"
                />
              </HomeJarsyCenterMotionItem>
            ))}
          </div>
        ) : null}

        <HorizonTopicRail
          topics={content.topics}
          activeId={activeTopic.id}
          onSelect={setActiveTopicId}
          ariaLabel={`${stage.periodLabel}主题`}
        />

        <div ref={bodyRef} className="horizon-panel__body mx-auto mt-8 max-w-5xl text-left md:mt-10">
          <div
            key={activeTopic.id}
            className="horizon-panel__stage-swap"
            data-reduced-motion="false"
          >
            <HorizonStoryStage
              topic={activeTopic}
              panelId={`horizon-panel-${activeTopic.id}`}
              labelledBy={`horizon-tab-${activeTopic.id}`}
            />
            <HorizonTopicDemo topic={activeTopic} visible={bodyVisible} />
          </div>
        </div>

        {content.epilogue ? (
          <HorizonEpilogueScale lines={content.epilogue} />
        ) : null}

        {stage.products && stage.products.length > 0 ? (
          <HomeJarsyProductList products={stage.products} stageId={stage.id} />
        ) : null}

        {stage.id === 'year-1' ? <HorizonHkCardModule /> : null}
      </div>
    </section>
  )
}
