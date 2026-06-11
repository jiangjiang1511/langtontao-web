import { HomeJarsyFeatureBlocks } from '@/components/sections/home-jarsy/home-jarsy-feature-blocks'
import { HomeJarsyProductList } from '@/components/sections/home-jarsy/home-jarsy-product-module'
import { HomeJarsyStageHeader } from '@/components/sections/home-jarsy/home-jarsy-stage-header'
import { HomeJarsyTransitionSteps } from '@/components/sections/home-jarsy/home-jarsy-transition-steps'
import type { FiftyYearStage } from '@/lib/content/fifty-year-narrative'
import { cn } from '@/lib/utils'

type HomeJarsyStagePanelProps = {
  stage: FiftyYearStage
  index: number
}

export function HomeJarsyStagePanel({ stage, index }: HomeJarsyStagePanelProps) {
  return (
    <section
      id={stage.id}
      className={cn(
        'scroll-mt-28 border-t border-zinc-200 py-16 md:py-24 lg:min-h-[85vh] lg:py-28',
        index % 2 === 1 ? 'bg-zinc-50/80' : 'bg-white'
      )}
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
