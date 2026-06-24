'use client'

import { useCompoundGrowth } from '@/components/sections/coffee2/compound-growth-provider'
import { CompoundGrowthStagePanel } from '@/components/sections/coffee2/compound-growth-stage-panel'
import { CompoundGrowthStockList } from '@/components/sections/coffee2/compound-growth-stock-list'
import { useInViewTrigger } from '@/hooks/use-in-view-trigger'

export function CompoundGrowthSplitView() {
  const { stocks, activeSlug, selectStock } = useCompoundGrowth()
  const { ref, inView, enterCount } = useInViewTrigger()

  if (stocks.length === 0) return null

  return (
    <div ref={ref} className="cg-split mt-8">
      <CompoundGrowthStockList
        stocks={stocks}
        activeSlug={activeSlug}
        onSelect={selectStock}
      />
      <CompoundGrowthStagePanel
        inView={inView}
        replayToken={enterCount}
      />
    </div>
  )
}
