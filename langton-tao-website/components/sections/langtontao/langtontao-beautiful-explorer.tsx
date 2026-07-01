import { LangtontaoBeautifulFamilyosHub } from '@/components/sections/langtontao/langtontao-beautiful-familyos-hub'
import { LangtontaoBeautifulPhilosophyGrid } from '@/components/sections/langtontao/langtontao-beautiful-philosophy-grid'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import { langtontaoBeautifulMeta } from '@/lib/content/langtontao/langtontao-beautiful-business'

export function LangtontaoBeautifulExplorer() {
  return (
    <div id="beautiful" className="scroll-mt-28">
      <LangtontaoSubsectionHeader
        eyebrow={langtontaoBeautifulMeta.eyebrow}
        title={langtontaoBeautifulMeta.title}
        lead={langtontaoBeautifulMeta.lead}
        theme="home"
      />

      <div className="mt-10">
        <LangtontaoBeautifulPhilosophyGrid />
      </div>

      <div className="mt-16 border-t border-zinc-200 pt-16">
        <LangtontaoBeautifulFamilyosHub />
      </div>
    </div>
  )
}
