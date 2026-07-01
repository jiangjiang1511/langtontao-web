import { LifecycleBlueprintChart } from '@/components/sections/home-jarsy/lifecycle-blueprint-chart'
import { TaoCenturyRoadTimeline } from '@/components/sections/home-jarsy/tao-century-road-timeline'
import { taoFiftyYearTimelineMeta } from '@/lib/content/tao-fifty-year-timeline'

export function HomeJarsyTaoFrameworkSection() {
  return (
    <section
      id="tao-framework"
      className="tao-framework scroll-mt-28 border-b border-zinc-200 bg-white py-16 md:py-24"
      aria-labelledby="tao-framework-title"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <header className="tao-framework__header mx-auto max-w-3xl">
          <p className="c2-eyebrow">{taoFiftyYearTimelineMeta.eyebrow}</p>
          <h2
            id="tao-framework-title"
            className="c2-display mt-3 text-2xl text-zinc-950 md:text-4xl"
          >
            {taoFiftyYearTimelineMeta.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 md:text-base">
            {taoFiftyYearTimelineMeta.lead}
          </p>
        </header>

        <div className="mt-8 md:mt-10">
          <TaoCenturyRoadTimeline />
        </div>

        <div className="tao-framework__lifecycle-blueprint">
          <LifecycleBlueprintChart />
        </div>
      </div>
    </section>
  )
}
