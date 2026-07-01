import { Fragment } from 'react'
import { HomeJarsyCenturyBridgeSection } from '@/components/sections/home-jarsy/home-jarsy-century-bridge-section'
import { HomeJarsyStagePanel } from '@/components/sections/home-jarsy/home-jarsy-stage-panel'
import {
  fiftyYearPageTitle,
  fiftyYearStages,
} from '@/lib/content/fifty-year-narrative'

export function HomeJarsyStages() {
  return (
    <div aria-label={fiftyYearPageTitle}>
      {fiftyYearStages.map((stage, index) => (
        <Fragment key={stage.id}>
          <HomeJarsyStagePanel stage={stage} index={index} />
          {stage.id === 'day-2' ? <HomeJarsyCenturyBridgeSection /> : null}
        </Fragment>
      ))}
    </div>
  )
}
