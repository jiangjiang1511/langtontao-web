'use client'

import type { CSSProperties } from 'react'
import { HomeJarsyCenterMotionItem } from '@/components/sections/home-jarsy/home-jarsy-center-motion-item'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import type { FiftyYearStage } from '@/lib/content/fifty-year-narrative'
import { getTaoStageVisual } from '@/lib/content/tao-stage-visual'

type HomeJarsyStageHeaderProps = {
  stage: FiftyYearStage
}

export function HomeJarsyStageHeader({ stage }: HomeJarsyStageHeaderProps) {
  const { ref, visible } = useCenterZoneVisible<HTMLDivElement>()
  const visual = getTaoStageVisual(stage.id)
  const partCount = stage.body ? 4 : 3

  return (
    <header
      ref={ref}
      className="tao-stage-header mx-auto max-w-3xl"
      data-stage-variant={visual.variant}
      style={{ '--tao-stage-accent': visual.accent } as CSSProperties}
    >
      <HomeJarsyCenterMotionItem
        as="p"
        visible={visible}
        index={0}
        total={partCount}
        className="tao-stage-header__eyebrow c2-eyebrow"
      >
        {visual.eyebrow}
      </HomeJarsyCenterMotionItem>

      <HomeJarsyCenterMotionItem
        as="div"
        visible={visible}
        index={1}
        total={partCount}
        className="tao-stage-header__hero"
      >
        <span className="tao-stage-header__index" aria-hidden>
          {visual.index}
        </span>
        <h2
          id={`${stage.id}-period`}
          className="tao-stage-header__period c2-display"
        >
          {stage.periodLabel}
        </h2>
        <span className="tao-stage-header__accent-bar" aria-hidden />
      </HomeJarsyCenterMotionItem>

      <HomeJarsyCenterMotionItem
        as="p"
        visible={visible}
        index={2}
        total={partCount}
        className="tao-stage-header__theme home-jarsy-stage-theme"
      >
        {stage.theme}
      </HomeJarsyCenterMotionItem>

      {stage.body ? (
        <HomeJarsyCenterMotionItem
          as="div"
          visible={visible}
          index={3}
          total={partCount}
          className="tao-stage-header__body-wrap"
        >
          <Coffee2AnnotatedText
            text={stage.body}
            className="tao-stage-header__body"
          />
        </HomeJarsyCenterMotionItem>
      ) : null}
    </header>
  )
}
