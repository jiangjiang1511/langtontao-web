import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { AssetClassesQuadrantChart } from '@/components/sections/coffee2/asset-classes-quadrant-chart'
import { assetClassesSectionMeta } from '@/lib/content/coffee-asset-classes'

const INTRO_EYEBROW_DELAY = 0
const INTRO_TITLE_DELAY = 140
const INTRO_LEAD_DELAY = 280

export function AssetClassesVennSection() {
  return (
    <section className="invest-venn-section" aria-labelledby="invest-venn-title">
      <div className="invest-venn-section__intro text-center">
        <Coffee2Reveal delay={INTRO_EYEBROW_DELAY}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {assetClassesSectionMeta.eyebrow}
          </p>
        </Coffee2Reveal>
        <Coffee2Reveal delay={INTRO_TITLE_DELAY}>
          <h3
            id="invest-venn-title"
            className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl"
          >
            {assetClassesSectionMeta.title}
          </h3>
        </Coffee2Reveal>
        <Coffee2Reveal delay={INTRO_LEAD_DELAY}>
          <Coffee2AnnotatedText
            text={assetClassesSectionMeta.lead}
            className="invest-venn-section__intro-lead mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base"
          />
        </Coffee2Reveal>
      </div>

      <AssetClassesQuadrantChart className="invest-venn-section__chart mt-10 md:mt-14" />
    </section>
  )
}
