'use client'

import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { CompoundGrowthSplitView } from '@/components/sections/coffee2/compound-growth-split-view'
import { useCompoundGrowthOptional } from '@/components/sections/coffee2/compound-growth-provider'
import { compoundGrowthSectionMeta } from '@/lib/content/compound-growth-stocks'

export function CoffeeCompoundGrowthSection() {
  const context = useCompoundGrowthOptional()
  if (!context || context.stocks.length === 0) return null

  return (
    <section className="cg-section" aria-labelledby="cg-section-title">
      <Coffee2Reveal delay={0} className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          {compoundGrowthSectionMeta.eyebrow}
        </p>
        <h3
          id="cg-section-title"
          className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl"
        >
          {compoundGrowthSectionMeta.title}
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
          {compoundGrowthSectionMeta.lead}
        </p>
      </Coffee2Reveal>

      <CompoundGrowthSplitView />

      <Coffee2Reveal delay={120} className="mt-6">
        <p className="text-[11px] leading-relaxed text-zinc-400">
          {context.disclaimer || compoundGrowthSectionMeta.disclaimer}
        </p>
      </Coffee2Reveal>
    </section>
  )
}
