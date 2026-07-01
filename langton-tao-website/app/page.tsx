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
  readAllCompoundGrowthSeries,
  readCompoundGrowthIndex,
} from '@/lib/compound-growth/load-series.server'
import './home.css'
import './coffee/compound-growth.css'

export const metadata: Metadata = {
  title: '朗敦道 Langton Tao | VFO/MFO Leader in China',
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

export default function HomePage() {
  const compoundIndex = compoundGrowthIndexExists()
    ? readCompoundGrowthIndex()
    : null
  const allSeries = compoundIndex
    ? readAllCompoundGrowthSeries(compoundIndex.stocks)
    : []

  return (
    <CoffeeCompoundGrowthHost
      stocks={compoundIndex?.stocks ?? []}
      allSeries={allSeries}
      disclaimer={compoundIndex?.disclaimer ?? ''}
    >
      <div className="home-jarsy-page jarsy-v2-page">
        <TopicCardHashScrollHost />
        <HomeJarsyHero />

        <DeferredMount anchorId="tao-framework" minHeight="50vh">
          <HomeJarsyTaoFrameworkSection />
        </DeferredMount>

        <HomeJarsyStageNav />

        <DeferredMount minHeight="55vh">
          <HomeJarsyDeferredStages />
        </DeferredMount>

        <DeferredMount minHeight="20vh">
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
