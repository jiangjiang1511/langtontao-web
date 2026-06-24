'use client'

import { useEffect, useState } from 'react'
import { Coffee2PreservationArticleCard } from '@/components/sections/coffee2/coffee2-preservation-article-card'
import { Coffee2PreservationArticleDialog } from '@/components/sections/coffee2/coffee2-preservation-article-dialog'
import type { CoffeePreservationInsurer } from '@/lib/content/coffee-preservation-insurers'
import { getCoffeePreservationArticle } from '@/lib/content/coffee-preservation-articles'
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
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null)
  const isExpanded = phase === 'opening' || phase === 'open'
  const linkedArticles =
    insurer?.articles.filter((article) => getCoffeePreservationArticle(article.id)) ??
    []
  const activeArticle = activeArticleId
    ? getCoffeePreservationArticle(activeArticleId) ?? null
    : null

  useEffect(() => {
    setActiveArticleId(null)
  }, [insurer?.id])

  return (
    <>
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
                      <Coffee2PreservationArticleCard
                        article={article}
                        onSelect={(selected) => setActiveArticleId(selected.id)}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <Coffee2PreservationArticleDialog
        article={activeArticle}
        onClose={() => setActiveArticleId(null)}
      />
    </>
  )
}
