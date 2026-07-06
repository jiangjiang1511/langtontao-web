import { TopicCardHashScrollHost } from '@/hooks/use-topic-card-hash-scroll'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { CoffeeCompoundGrowthHost } from '@/components/sections/coffee2/coffee-compound-growth-host'
import { HomeJarsyHero } from '@/components/sections/home-jarsy/home-jarsy-hero'
import { HomeJarsyStageNav } from '@/components/sections/home-jarsy/home-jarsy-stage-nav'
import { DeferredMount } from '@/components/shared/deferred-mount'
import { SectionLoadingFallback } from '@/components/shared/section-loading-fallback'
import {
  fiftyYearPageTitle,
  homeJarsyJoinBand,
} from '@/lib/content/home-jarsy-page'
import {
  compoundGrowthIndexExists,
  readCompoundGrowthIndex,
} from '@/lib/compound-growth/load-series.server'
import { sectionMinHeight } from '@/lib/deferred-mount-heights'
import '@/app/home.css'
import '@/app/coffee/compound-growth.css'

export const metadata: Metadata = {
  title: 'TAO定律 | 朗敦道 Langton Tao',
  description: fiftyYearPageTitle,
}

const HomeJarsyTaoFrameworkSection = dynamic(
  () =>
    import('@/components/sections/home-jarsy/home-jarsy-tao-framework-section').then(
      (module) => ({ default: module.HomeJarsyTaoFrameworkSection })
    ),
  { loading: () => <SectionLoadingFallback label="加载 TAO 框架…" /> }
)

const HomeJarsyDeferredStages = dynamic(
  () =>
    import('@/components/sections/home-jarsy/home-jarsy-deferred-stages').then(
      (module) => ({ default: module.HomeJarsyDeferredStages })
    ),
  { loading: () => <SectionLoadingFallback label="加载百年路径…" /> }
)

const JarsyJoinBand = dynamic(
  () =>
    import('@/components/jarsy/jarsy-join-band').then((module) => ({
      default: module.JarsyJoinBand,
    })),
  { loading: () => <SectionLoadingFallback /> }
)

export default function TaoPage() {
  const compoundIndex = compoundGrowthIndexExists()
    ? readCompoundGrowthIndex()
    : null

  return (
    <CoffeeCompoundGrowthHost
      stocks={compoundIndex?.stocks ?? []}
      disclaimer={compoundIndex?.disclaimer ?? ''}
      deferSeriesLoad
    >
      <div className="home-jarsy-page jarsy-v2-page">
        <TopicCardHashScrollHost />
        <HomeJarsyHero />

        <DeferredMount
          anchorId="tao-framework"
          minHeight={sectionMinHeight('tao-framework')}
          mountStrategy="immediate"
        >
          <HomeJarsyTaoFrameworkSection />
        </DeferredMount>

        <HomeJarsyStageNav />

        <HomeJarsyDeferredStages />

        <DeferredMount minHeight={sectionMinHeight('jarsy-join-band')} mountStrategy="lazy">
          <JarsyJoinBand
            id="home-jarsy-join-band-title"
            statement={homeJarsyJoinBand.statement}
            tagline={homeJarsyJoinBand.tagline}
            ctaLabel={homeJarsyJoinBand.ctaLabel}
            ctaHref={homeJarsyJoinBand.ctaHref}
          />
        </DeferredMount>
      </div>
    </CoffeeCompoundGrowthHost>
  )
}
