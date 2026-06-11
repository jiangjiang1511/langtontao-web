import { HomeJarsyStagePanel } from '@/components/sections/home-jarsy/home-jarsy-stage-panel'
import {
  fiftyYearPageTitle,
  fiftyYearStages,
} from '@/lib/content/fifty-year-narrative'

export function HomeJarsyStages() {
  return (
    <div aria-label={fiftyYearPageTitle}>
      {fiftyYearStages.map((stage, index) => (
        <HomeJarsyStagePanel key={stage.id} stage={stage} index={index} />
      ))}
    </div>
  )
}
