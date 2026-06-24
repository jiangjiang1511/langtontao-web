import type { Metadata } from 'next'
import { JarsyJoinBand } from '@/components/jarsy/jarsy-join-band'
import { CoffeeCompoundGrowthHost } from '@/components/sections/coffee2/coffee-compound-growth-host'
import { HomeJarsyHero } from '@/components/sections/home-jarsy/home-jarsy-hero'
import { HomeJarsyStageNav } from '@/components/sections/home-jarsy/home-jarsy-stage-nav'
import { HomeJarsyStages } from '@/components/sections/home-jarsy/home-jarsy-stages'
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
        <HomeJarsyHero />
        <HomeJarsyStageNav />
        <HomeJarsyStages />
        <JarsyJoinBand
          id="home-jarsy-join-band-title"
          statement={homeJarsyJoinBand.statement}
          tagline={homeJarsyJoinBand.tagline}
          ctaLabel={homeJarsyJoinBand.ctaLabel}
          ctaHref={homeJarsyJoinBand.ctaHref}
        />
      </div>
    </CoffeeCompoundGrowthHost>
  )
}
