'use client'

import Link from 'next/link'
import { useState } from 'react'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import type { FiftyYearProduct } from '@/lib/content/fifty-year-narrative'
import { cn } from '@/lib/utils'

type HomeJarsyInsurerGridProps = {
  product: FiftyYearProduct
}

export function HomeJarsyInsurerGrid({ product }: HomeJarsyInsurerGridProps) {
  const insurers = product.insurers ?? []
  const [selected, setSelected] = useState<string | null>(insurers[0] ?? null)

  if (insurers.length === 0) return null

  return (
    <JarsyReveal className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-center md:p-6">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        {product.label}
      </p>
      <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-500">
        点击保司查看严选说明，各大保司特点与产品对比一目了然。
      </p>

      <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
        {insurers.map((name, index) => (
          <button
            key={name}
            type="button"
            data-selected={selected === name ? 'true' : 'false'}
            className={cn('home-jarsy-insurer-tile c2-card text-sm md:text-base')}
            onClick={() => setSelected(name)}
          >
            {name}
          </button>
        ))}
      </div>

      {selected ? (
        <div className="mx-auto mt-6 max-w-lg rounded-xl border border-zinc-200 bg-white p-5 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
            已选保司
          </p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">{selected}</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            {selected} 的产品特点、渠道优势与严选配置逻辑，可在保全议题中进一步展开。
          </p>
          {product.href ? (
            <div className="mt-5 flex justify-center">
              <Link
                href={product.href}
                className="c2-btn-secondary inline-flex text-sm"
              >
                查看保全详情
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </JarsyReveal>
  )
}
