'use client'

import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import {
  DeferredMount,
  type MountStrategy,
} from '@/components/shared/deferred-mount'
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

function getStageMountConfig(index: number): {
  mountStrategy: MountStrategy
  idleStaggerIndex?: number
} {
  if (index === 0) return { mountStrategy: 'immediate' }
  if (index === 1) return { mountStrategy: 'idle', idleStaggerIndex: 0 }
  if (index >= 2 && index <= 5) {
    return { mountStrategy: 'idle', idleStaggerIndex: index }
  }
  return { mountStrategy: 'lazy' }
}

export function HomeJarsyDeferredStages() {
  return (
    <div aria-label={fiftyYearPageTitle}>
      {fiftyYearStages.map((stage, index) => {
        const mountConfig = getStageMountConfig(index)

        return (
          <Fragment key={stage.id}>
            <DeferredMount
              anchorId={stage.id}
              minHeight={sectionMinHeight(stage.id)}
              mountStrategy={mountConfig.mountStrategy}
              idleStaggerIndex={mountConfig.idleStaggerIndex}
            >
              <HomeJarsyStagePanel stage={stage} index={index} />
            </DeferredMount>
            {stage.id === 'day-2' ? (
              <DeferredMount
                minHeight={sectionMinHeight('century-bridge')}
                mountStrategy="idle"
                idleStaggerIndex={1}
              >
                <HomeJarsyCenturyBridgeSection />
              </DeferredMount>
            ) : null}
          </Fragment>
        )
      })}
    </div>
  )
}
