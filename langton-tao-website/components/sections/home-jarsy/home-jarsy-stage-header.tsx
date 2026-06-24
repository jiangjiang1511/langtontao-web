'use client'

import { HomeJarsyCenterMotionItem } from '@/components/sections/home-jarsy/home-jarsy-center-motion-item'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import type { FiftyYearStage } from '@/lib/content/fifty-year-narrative'

type HomeJarsyStageHeaderProps = {
  stage: FiftyYearStage
}

export function HomeJarsyStageHeader({ stage }: HomeJarsyStageHeaderProps) {
  const { ref, visible } = useCenterZoneVisible<HTMLDivElement>()
  const partCount = stage.body ? 3 : 2

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <HomeJarsyCenterMotionItem
        as="h2"
        id={`${stage.id}-period`}
        visible={visible}
        index={0}
        total={partCount}
        className="c2-display text-[clamp(2.5rem,8vw,5.5rem)] text-zinc-950"
      >
        {stage.periodLabel}
      </HomeJarsyCenterMotionItem>

      <HomeJarsyCenterMotionItem
        as="p"
        visible={visible}
        index={1}
        total={partCount}
        className="home-jarsy-stage-theme mt-3 text-2xl font-semibold tracking-tight text-zinc-400 md:mt-4 md:text-3xl"
      >
        {stage.theme}
      </HomeJarsyCenterMotionItem>

      {stage.body ? (
        <HomeJarsyCenterMotionItem
          as="div"
          visible={visible}
          index={2}
          total={partCount}
          className="mx-auto mt-6 max-w-2xl md:mt-8"
        >
          <Coffee2AnnotatedText
            text={stage.body}
            className="text-base leading-relaxed text-zinc-600 md:text-lg"
          />
        </HomeJarsyCenterMotionItem>
      ) : null}
    </div>
  )
}
