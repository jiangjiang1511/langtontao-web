'use client'

import { Coffee2PreservationArticleCard } from '@/components/sections/coffee2/coffee2-preservation-article-card'
import type { CoffeePreservationInsurer } from '@/lib/content/coffee-preservation-insurers'
import { cn } from '@/lib/utils'

export type PreservationDrawerPhase = 'closed' | 'opening' | 'open' | 'closing'

type Coffee2PreservationInsurerDrawerProps = {
  insurer: CoffeePreservationInsurer | null
  phase: PreservationDrawerPhase
  className?: string
}

export function Coffee2PreservationInsurerDrawer({
  insurer,
  phase,
  className,
}: Coffee2PreservationInsurerDrawerProps) {
  const isExpanded = phase === 'opening' || phase === 'open'
  const linkedArticles =
    insurer?.articles.filter((article) => article.href) ?? []

  return (
    <section
      className={cn('coffee2-preservation-insurer-drawer', className)}
      data-phase={phase}
      aria-hidden={phase === 'closed'}
      aria-expanded={isExpanded}
      aria-live="polite"
    >
      <div className="coffee2-preservation-insurer-drawer__inner">
        {insurer ? (
          <div
            key={insurer.id}
            className="coffee2-preservation-insurer-drawer__content"
          >
            <div className="coffee2-preservation-insurer-hub__intro space-y-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5 md:p-6">
              <div className="space-y-2">
                <h4 className="text-base font-bold tracking-tight text-zinc-950 md:text-lg">
                  {insurer.headline}
                </h4>
                <p className="text-sm font-medium text-zinc-500 md:text-base">
                  <span className="text-zinc-400">买手标签 · </span>
                  {insurer.buyerTag}
                </p>
              </div>
              {insurer.intro.map((paragraph, index) => (
                <p
                  key={`${insurer.id}-intro-${index}`}
                  className="text-sm leading-relaxed text-zinc-600 md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {linkedArticles.length > 0 ? (
              <ul className="coffee2-preservation-insurer-hub__articles mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {linkedArticles.map((article) => (
                  <li key={article.id}>
                    <Coffee2PreservationArticleCard article={article} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center text-sm text-zinc-500">
                暂无文章，敬请期待
              </p>
            )}
          </div>
        ) : null}
      </div>
    </section>
  )
}
