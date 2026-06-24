'use client'

import { useMemo, useState } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  langtontaoExposureCategories,
  langtontaoExposureItems,
  type ExposureSeverity,
} from '@/lib/content/langtontao/langtontao-why-mfo'
import { cn } from '@/lib/utils'

const severityStyles: Record<ExposureSeverity, string> = {
  high: 'border-red-200 bg-red-50 text-red-900',
  medium: 'border-amber-200 bg-amber-50 text-amber-900',
  watch: 'border-zinc-200 bg-zinc-50 text-zinc-700',
}

export function LangtontaoExposureShowcase() {
  const [category, setCategory] = useState<string>('全部')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (category === '全部') return langtontaoExposureItems
    return langtontaoExposureItems.filter((i) => i.category === category)
  }, [category])

  const counts = useMemo(() => {
    const c = { high: 0, medium: 0, watch: 0 }
    for (const item of filtered) c[item.severity]++
    return c
  }, [filtered])

  return (
    <div>
      <Coffee2Reveal>
        <div className="flex flex-wrap gap-2">
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

      <Coffee2Reveal delay={80} className="mt-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {(['high', 'medium', 'watch'] as ExposureSeverity[]).map((s) => (
            <div
              key={s}
              className={cn('rounded-xl border px-4 py-3 text-center', severityStyles[s])}
            >
              <p className="text-2xl font-bold tabular-nums">{counts[s]}</p>
              <p className="text-xs font-medium uppercase tracking-wide">
                {s === 'high' ? '高关注' : s === 'medium' ? '中关注' : '持续检视'}
              </p>
            </div>
          ))}
        </div>
      </Coffee2Reveal>

      <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 24).map((item, index) => (
          <Coffee2Reveal key={item.id} delay={60 + (index % 6) * 40} as="li">
            <li>
              <button
                type="button"
                onClick={() =>
                  setExpanded(expanded === item.id ? null : item.id)
                }
                className={cn(
                  'lt-exposure-card w-full rounded-xl border p-3 text-left transition-shadow',
                  severityStyles[item.severity],
                  expanded === item.id && 'ring-2 ring-zinc-950'
                )}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                  {item.category}
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug">
                  {item.label}
                </p>
              </button>
            </li>
          </Coffee2Reveal>
        ))}
      </ul>
    </div>
  )
}
