'use client'

import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { DebtTopicArticleDialog } from '@/components/sections/coffee2/debt-topic-article-dialog'
import {
  debtSectionMeta,
  debtTopicCards,
} from '@/lib/content/coffee-debt-page'
import { getDebtTopicArticle } from '@/lib/content/debt-topic-articles'

export function DebtTopicCardsSection() {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null)
  const activeArticle = activeArticleId
    ? getDebtTopicArticle(activeArticleId) ?? null
    : null

  return (
    <section aria-labelledby="debt-topics-title">
      <Coffee2Reveal delay={0}>
        <p className="c2-eyebrow">{debtSectionMeta.topicsEyebrow}</p>
        <h4
          id="debt-topics-title"
          className="mt-3 text-xl font-semibold tracking-tight text-zinc-950 md:text-2xl"
        >
          {debtSectionMeta.topicsTitle}
        </h4>
      </Coffee2Reveal>

      <ul className="debt-topic-grid mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
        {debtTopicCards.map((card, index) => (
          <Coffee2Reveal
            key={card.id}
            as="li"
            delay={80 + index * 70}
            className="debt-topic-card"
            data-stagger={index}
          >
            <div className="debt-topic-card__frame">
              <div className="debt-topic-card__glass">
                <button
                  type="button"
                  className="debt-topic-card__link group flex h-full flex-col p-5 md:p-6"
                  aria-label={`${card.title}：阅读摘要《${card.article.title}》`}
                  onClick={() => setActiveArticleId(card.id)}
                >
                  <p className="debt-topic-card__index text-xs font-medium uppercase tracking-widest">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h5 className="debt-topic-card__title mt-3 text-lg font-semibold tracking-tight">
                    {card.title}
                  </h5>
                  <Coffee2AnnotatedText
                    text={card.insight}
                    className="debt-topic-card__insight mt-3 flex-1 text-sm leading-relaxed"
                    as="span"
                  />
                  <p className="debt-topic-card__readmore mt-4 flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-wider transition-colors">
                    <span className="line-clamp-1">
                      阅读摘要 · {card.article.outlet}
                    </span>
                    <BookOpen
                      className="h-3 w-3 shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </p>
                </button>
              </div>
            </div>
          </Coffee2Reveal>
        ))}
      </ul>

      <DebtTopicArticleDialog
        article={activeArticle}
        onClose={() => setActiveArticleId(null)}
      />
    </section>
  )
}
