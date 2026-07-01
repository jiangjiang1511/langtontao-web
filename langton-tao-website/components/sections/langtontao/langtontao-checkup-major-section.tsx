import { Checkup2SignupSection } from '@/components/sections/checkup2/checkup2-signup-section'
import { LangtontaoCheckupCasesSection } from '@/components/sections/langtontao/langtontao-checkup-cases-section'
import { LangtontaoCheckupItemsSection } from '@/components/sections/langtontao/langtontao-checkup-items-section'
import { LangtontaoCheckupProcessSection } from '@/components/sections/langtontao/langtontao-checkup-process-section'
import { LangtontaoMajorSectionShell } from '@/components/sections/langtontao/langtontao-major-section-shell'
import { getLangtontaoMajorSection } from '@/lib/content/langtontao/langtontao-major-sections'

export function LangtontaoCheckupMajorSection() {
  const meta = getLangtontaoMajorSection('wealth-checkup')
  if (!meta) return null

  return (
    <LangtontaoMajorSectionShell meta={meta}>
      <div className="lt-checkup-major__body">
        <LangtontaoCheckupItemsSection />
        <LangtontaoCheckupProcessSection />
        <Checkup2SignupSection variant="embedded" />
        <LangtontaoCheckupCasesSection />
      </div>
    </LangtontaoMajorSectionShell>
  )
}
