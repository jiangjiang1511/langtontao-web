'use client'

import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { DeferredMount } from '@/components/shared/deferred-mount'
import { SectionLoadingFallback } from '@/components/shared/section-loading-fallback'
import {
  fiftyYearPageTitle,
  fiftyYearStages,
} from '@/lib/content/fifty-year-narrative'
import { sectionMinHeight } from '@/lib/deferred-mount-heights'

const HomeJarsyStagePanel = dynamic(
  () =>
    import('@/components/sections/home-jarsy/home-jarsy-stage-panel').then(
      (module) => ({ default: module.HomeJarsyStagePanel })
    ),
  { loading: () => <SectionLoadingFallback label="加载阶段内容…" /> }
)

const HomeJarsyCenturyBridgeSection = dynamic(
  () =>
    import('@/components/sections/home-jarsy/home-jarsy-century-bridge-section').then(
      (module) => ({ default: module.HomeJarsyCenturyBridgeSection })
    ),
  { loading: () => <SectionLoadingFallback label="加载世纪之桥…" /> }
)

export function HomeJarsyDeferredStages() {
  return (
    <div aria-label={fiftyYearPageTitle}>
      {fiftyYearStages.map((stage, index) => (
        <Fragment key={stage.id}>
          <DeferredMount
            anchorId={stage.id}
            minHeight={sectionMinHeight(stage.id)}
            mountStrategy="lazy"
          >
            <HomeJarsyStagePanel stage={stage} index={index} />
          </DeferredMount>
          {stage.id === 'day-2' ? (
            <DeferredMount
              minHeight={sectionMinHeight('century-bridge')}
              mountStrategy="lazy"
            >
              <HomeJarsyCenturyBridgeSection />
            </DeferredMount>
          ) : null}
        </Fragment>
      ))}
    </div>
  )
}
