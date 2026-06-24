'use client'

import { useState } from 'react'
import {
  langtontaoGlossaryTerms,
  type LangtontaoGlossaryTerm,
} from '@/lib/content/langtontao/langtontao-tools'
import { cn } from '@/lib/utils'

export function LangtontaoGlossaryExplorer() {
  const [category, setCategory] = useState<'all' | LangtontaoGlossaryTerm['category']>(
    'all'
  )
  const [active, setActive] = useState<LangtontaoGlossaryTerm | null>(null)

  const filtered =
    category === 'all'
      ? langtontaoGlossaryTerms
      : langtontaoGlossaryTerms.filter((t) => t.category === category)

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(['all', 'insurance', 'investment', 'structure'] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold',
              category === c
                ? 'bg-zinc-950 text-white'
                : 'bg-zinc-100 text-zinc-600'
            )}
          >
            {c === 'all'
              ? '全部'
              : c === 'insurance'
                ? '保险'
                : c === 'investment'
                  ? '投资'
                  : '结构'}
          </button>
        ))}
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {filtered.map((term) => (
          <li key={term.id}>
            <button
              type="button"
              onClick={() => setActive(term)}
              className="c2-card w-full p-4 text-left hover:shadow-md"
            >
              <p className="font-semibold text-zinc-950">{term.label}</p>
              <p className="mt-1 line-clamp-2 text-xs text-zinc-500">
                {term.definition}
              </p>
            </button>
          </li>
        ))}
      </ul>
      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal
          onClick={() => setActive(null)}
        >
          <div
            className="max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg font-semibold text-zinc-950">{active.label}</h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {active.definition}
            </p>
            {active.bullets ? (
              <ul className="mt-3 space-y-1">
                {active.bullets.map((b) => (
                  <li key={b} className="text-sm text-zinc-600">
                    · {b}
                  </li>
                ))}
              </ul>
            ) : null}
            <button
              type="button"
              className="c2-btn-secondary mt-6"
              onClick={() => setActive(null)}
            >
              关闭
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
