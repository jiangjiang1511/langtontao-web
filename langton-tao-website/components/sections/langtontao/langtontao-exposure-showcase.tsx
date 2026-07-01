'use client'

import { useMemo, useState } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoExposureDanmaku } from '@/components/sections/langtontao/langtontao-exposure-danmaku'
import {
  langtontaoExposureCategories,
  langtontaoExposureItems,
} from '@/lib/content/langtontao/langtontao-why-mfo'
import { cn } from '@/lib/utils'

export function LangtontaoExposureShowcase() {
  const [category, setCategory] = useState<string>('全部')

  const filtered = useMemo(() => {
    if (category === '全部') return langtontaoExposureItems
    return langtontaoExposureItems.filter((i) => i.category === category)
  }, [category])

  return (
    <>
      <Coffee2Reveal>
        <div className="relative z-10 flex flex-wrap gap-2">
          {['全部', ...langtontaoExposureCategories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                category === cat
                  ? 'bg-zinc-950 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </Coffee2Reveal>

      <div className="lt-exposure-danmaku-breakout mt-8">
        <LangtontaoExposureDanmaku items={filtered} categoryKey={category} />
      </div>
    </>
  )
}
