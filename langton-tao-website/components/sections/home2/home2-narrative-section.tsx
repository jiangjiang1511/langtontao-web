'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import {
  fiftyYearPageTitle,
  fiftyYearStages,
  type FiftyYearProduct,
  type FiftyYearStage,
} from '@/lib/content/fifty-year-narrative'
import { cn } from '@/lib/utils'

const stageVisuals = [
  'bg-gradient-to-br from-amber-100 via-orange-50 to-zinc-100',
  'bg-gradient-to-br from-sky-100 via-blue-50 to-zinc-100',
  'bg-gradient-to-br from-emerald-100 via-teal-50 to-zinc-100',
  'bg-gradient-to-br from-violet-100 via-indigo-50 to-zinc-100',
  'bg-gradient-to-br from-rose-100 via-pink-50 to-zinc-100',
  'bg-gradient-to-br from-zinc-200 via-stone-100 to-zinc-50',
  'bg-gradient-to-br from-yellow-100 via-amber-50 to-zinc-100',
  'bg-gradient-to-br from-stone-200 via-zinc-100 to-amber-50',
] as const

function StageVisual({
  stage,
  index,
}: {
  stage: FiftyYearStage
  index: number
}) {
  return (
    <div
      className={cn(
        'relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] md:aspect-[5/6]',
        stageVisuals[index % stageVisuals.length]
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.65),transparent_55%)]" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
          {stage.periodLabel}
        </p>
        <p className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-3xl">
          {stage.theme}
        </p>
        {stage.keywords && stage.keywords.length > 0 ? (
          <p className="mt-3 text-xs font-medium tracking-wide text-zinc-600">
            {stage.keywords.join(' · ')}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function ProductItem({ product }: { product: FiftyYearProduct }) {
  const content = (
    <>
      {product.featured ? (
        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          核心产品
        </span>
      ) : null}
      <span>{product.label}</span>
    </>
  )

  const className = cn(
    product.featured
      ? 'rounded-2xl border-2 border-zinc-900 bg-zinc-950 px-5 py-4 text-base font-semibold leading-relaxed text-white md:text-lg'
      : 'border-l border-zinc-300 pl-4 text-sm leading-relaxed text-zinc-700 md:text-base'
  )

  if (product.href) {
    return (
      <Link href={product.href} className={cn(className, 'block transition-opacity hover:opacity-90')}>
        {content}
      </Link>
    )
  }

  return <div className={className}>{content}</div>
}

function StagePanel({
  stage,
  index,
}: {
  stage: FiftyYearStage
  index: number
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.visible = 'true'
        }
      },
      { rootMargin: '-10% 0px -15% 0px', threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const reversed = index % 2 === 1

  return (
    <article
      ref={ref}
      id={stage.id}
      data-visible="false"
      className="home2-stage scroll-mt-28 border-b border-zinc-200 py-16 last:border-b-0 md:py-24 lg:min-h-[90vh] lg:py-28"
      aria-labelledby={`${stage.id}-theme`}
    >
      <div
        className={cn(
          'grid items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20',
          reversed && 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'
        )}
      >
        <div className="home2-stage-copy">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            {stage.periodLabel}
          </p>
          <h2
            id={`${stage.id}-theme`}
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-zinc-950 md:text-4xl lg:text-[2.75rem]"
          >
            主题：{stage.theme}
          </h2>

          {stage.keywords && stage.keywords.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {stage.keywords.map((keyword) => (
                <li
                  key={keyword}
                  className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          ) : null}

          {stage.body ? (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg">
              {stage.body}
            </p>
          ) : null}

          {stage.products && stage.products.length > 0 ? (
            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                产品
              </p>
              <ul className="mt-4 space-y-3">
                {stage.products.map((product) => (
                  <li key={product.label}>
                    <ProductItem product={product} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {stage.transition ? (
            <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                {stage.transition.heading}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
                {stage.transition.body}
              </p>
            </div>
          ) : null}
        </div>

        <StageVisual stage={stage} index={index} />
      </div>
    </article>
  )
}

export function Home2NarrativeSection() {
  return (
    <section className="bg-white" aria-label={fiftyYearPageTitle}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {fiftyYearStages.map((stage, index) => (
          <StagePanel key={stage.id} stage={stage} index={index} />
        ))}
      </div>
    </section>
  )
}
