import { LangtontaoMajorSectionShell } from '@/components/sections/langtontao/langtontao-major-section-shell'
import { LangtontaoSuperheroExpeditions } from '@/components/sections/langtontao/langtontao-superhero-expeditions'
import { LangtontaoSuperheroJoin } from '@/components/sections/langtontao/langtontao-superhero-join'
import { LangtontaoSuperheroPhilosophy } from '@/components/sections/langtontao/langtontao-superhero-philosophy'
import { LangtontaoSuperheroPillars } from '@/components/sections/langtontao/langtontao-superhero-pillars'
import { LangtontaoSuperheroProgramHub } from '@/components/sections/langtontao/langtontao-superhero-program-hub'
import { getLangtontaoMajorSection } from '@/lib/content/langtontao/langtontao-major-sections'

export function LangtontaoSuperheroSection() {
  const meta = getLangtontaoMajorSection('superhero')
  if (!meta) return null

  return (
    <LangtontaoMajorSectionShell meta={meta}>
      <LangtontaoSuperheroPhilosophy />
      <LangtontaoSuperheroPillars />
      <LangtontaoSuperheroProgramHub />
      <LangtontaoSuperheroExpeditions />
      <LangtontaoSuperheroJoin />
    </LangtontaoMajorSectionShell>
  )
}
