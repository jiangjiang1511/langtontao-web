import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoBeautifulPillars } from '@/components/sections/langtontao/langtontao-beautiful-pillars'
import {
  LangtontaoChallengeSolutionBridge,
  LangtontaoChallengeSolutionBridgeMobile,
} from '@/components/sections/langtontao/langtontao-challenge-solution-bridge'
import { LangtontaoEmbeddedSolutions } from '@/components/sections/langtontao/langtontao-embedded-solutions'
import { LangtontaoFamilyosTree } from '@/components/sections/langtontao/langtontao-familyos-tree'
import { LangtontaoToolsHub } from '@/components/sections/langtontao/langtontao-tools-hub'
import { langtontaoBeautifulMeta } from '@/lib/content/langtontao/langtontao-beautiful-business'

export function LangtontaoBeautifulSection() {
  return (
    <section
      id="beautiful"
      className="lt-section lt-section--beautiful scroll-mt-28 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="beautiful-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <p className="c2-eyebrow">{langtontaoBeautifulMeta.eyebrow}</p>
          <h2
            id="beautiful-title"
            className="c2-display mt-3 text-4xl text-zinc-950 md:text-5xl"
          >
            {langtontaoBeautifulMeta.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {langtontaoBeautifulMeta.lead}
          </p>
        </Coffee2Reveal>

        <div className="mt-12">
          <LangtontaoBeautifulPillars />
        </div>

        <div className="mt-16">
          <h3 className="c2-display text-2xl text-zinc-950">LangtonTAO FamilyOS</h3>
          <p className="mt-2 text-sm text-zinc-600">
            点击业务模块，跳转到对应解决方案
          </p>
          <div className="mt-6">
            <LangtontaoFamilyosTree />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-lg font-semibold text-zinc-950">挑战 → 理念 → 方案</h3>
          <div className="mt-6">
            <LangtontaoChallengeSolutionBridge />
            <LangtontaoChallengeSolutionBridgeMobile />
          </div>
        </div>

        <div className="mt-16">
          <LangtontaoEmbeddedSolutions />
        </div>

        <div className="mt-16">
          <LangtontaoToolsHub />
        </div>
      </div>
    </section>
  )
}
