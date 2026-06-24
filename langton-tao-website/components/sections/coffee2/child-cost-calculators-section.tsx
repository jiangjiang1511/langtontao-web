'use client'

import { Suspense } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { ChildCostCalculator } from '@/components/sections/coffee2/child-cost-calculator'
import { childCostSectionMeta } from '@/lib/content/coffee-child-cost-page'

export function ChildCostCalculatorsSection() {
  return (
    <div className="child-calc-section mt-16 md:mt-24">
      <Coffee2Reveal
        delay={0}
        className="child-calc-section__intro mx-auto max-w-3xl text-center"
      >
        <p className="c2-eyebrow">{childCostSectionMeta.calcEyebrow}</p>
        <h3 className="child-calc-section__title mt-3 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
          {childCostSectionMeta.calcTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 md:text-base">
          {childCostSectionMeta.calcLead}
        </p>
        <p className="child-calc-section__hint mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-zinc-400">
          <span className="child-calc-section__hint-dot" aria-hidden />
          {childCostSectionMeta.calcHint}
        </p>
      </Coffee2Reveal>

      <Coffee2Reveal delay={120} className="mt-10 md:mt-12">
        <Suspense
          fallback={
            <div className="child-calc__panel rounded-2xl border border-zinc-200 p-8 text-center text-sm text-zinc-500">
              加载计算器…
            </div>
          }
        >
          <ChildCostCalculator />
        </Suspense>
      </Coffee2Reveal>
    </div>
  )
}
