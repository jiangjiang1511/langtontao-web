import { HomeJarsyDayOnePanel } from '@/components/sections/home-jarsy/home-jarsy-day-one-panel'
import { HomeJarsyDayTwoPanel } from '@/components/sections/home-jarsy/home-jarsy-day-two-panel'
import { HomeJarsyFeatureBlocks } from '@/components/sections/home-jarsy/home-jarsy-feature-blocks'
import { HomeJarsyHorizonPanel } from '@/components/sections/home-jarsy/home-jarsy-horizon-panel'
import { HomeJarsyProductList } from '@/components/sections/home-jarsy/home-jarsy-product-module'
import { HomeJarsyStageHeader } from '@/components/sections/home-jarsy/home-jarsy-stage-header'
import { HomeJarsyTransitionSteps } from '@/components/sections/home-jarsy/home-jarsy-transition-steps'
import { HORIZON_STAGE_IDS } from '@/lib/content/century-horizons'
import type { FiftyYearStage } from '@/lib/content/fifty-year-narrative'
import {
  taoStagePanelClassName,
  taoStagePanelStyle,
} from '@/lib/content/tao-stage-visual'
import { cn } from '@/lib/utils'

type HomeJarsyStagePanelProps = {
  stage: FiftyYearStage
  index: number
}

export function HomeJarsyStagePanel({ stage, index }: HomeJarsyStagePanelProps) {
  if (stage.id === 'day-1') {
    return <HomeJarsyDayOnePanel stage={stage} index={index} />
  }

  if (stage.id === 'day-2') {
    return <HomeJarsyDayTwoPanel stage={stage} index={index} />
  }

  if ((HORIZON_STAGE_IDS as readonly string[]).includes(stage.id)) {
    return <HomeJarsyHorizonPanel stage={stage} index={index} />
  }

  return (
    <section
      id={stage.id}
      className={cn(
        taoStagePanelClassName(stage.id, 'scroll-mt-28 py-16 md:py-24 lg:min-h-[85vh] lg:py-28')
      )}
      style={taoStagePanelStyle(stage.id)}
      aria-labelledby={`${stage.id}-period`}
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <HomeJarsyStageHeader stage={stage} />

        {stage.products && stage.products.length > 0 ? (
          stage.products.every((product) => product.variant === 'featureBlock') ? (
            <HomeJarsyFeatureBlocks products={stage.products} />
          ) : (
            <HomeJarsyProductList products={stage.products} stageId={stage.id} />
          )
        ) : null}

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
