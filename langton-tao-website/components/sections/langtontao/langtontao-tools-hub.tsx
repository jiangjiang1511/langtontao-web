'use client'

import { useState } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoGlossaryExplorer } from '@/components/sections/langtontao/langtontao-glossary-explorer'
import { LangtontaoHkSavingsCalculator } from '@/components/sections/langtontao/langtontao-hk-savings-calculator'
import { LangtontaoPolicyFinancingCalculator } from '@/components/sections/langtontao/langtontao-policy-financing-calculator'
import { langtontaoToolsMeta } from '@/lib/content/langtontao/langtontao-tools'
import { cn } from '@/lib/utils'

type ToolsTab = 'savings' | 'financing' | 'glossary'

export function LangtontaoToolsHub() {
  const [tab, setTab] = useState<ToolsTab>('savings')

  return (
    <div id="beautiful-tools" className="scroll-mt-28">
      <Coffee2Reveal>
        <p className="c2-eyebrow">{langtontaoToolsMeta.eyebrow}</p>
        <h3 className="c2-display mt-2 text-2xl text-zinc-950 md:text-3xl">
          {langtontaoToolsMeta.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-600">{langtontaoToolsMeta.lead}</p>
      </Coffee2Reveal>

      <div className="mt-6 flex flex-wrap gap-2">
        {(
          [
            { id: 'savings' as const, label: '港险复利演示' },
            { id: 'financing' as const, label: '融资保单演示' },
            { id: 'glossary' as const, label: langtontaoToolsMeta.tabGlossary },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold',
              tab === t.id
                ? 'bg-zinc-950 text-white'
                : 'bg-zinc-100 text-zinc-600'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="c2-card mt-6 p-6">
        {tab === 'savings' ? <LangtontaoHkSavingsCalculator /> : null}
        {tab === 'financing' ? <LangtontaoPolicyFinancingCalculator /> : null}
        {tab === 'glossary' ? <LangtontaoGlossaryExplorer /> : null}
      </div>

      <p className="mt-4 text-xs text-zinc-400">{langtontaoToolsMeta.disclaimer}</p>
    </div>
  )
}
