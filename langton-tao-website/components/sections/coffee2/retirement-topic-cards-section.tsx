'use client'

import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { RetirementTopicArticleDialog } from '@/components/sections/coffee2/retirement-topic-article-dialog'
import {
  getRetirementTopicArticle,
  getRetirementTopicCards,
  retirementSectionMeta,
} from '@/lib/content/coffee-retirement-page'

export function RetirementTopicCardsSection() {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null)
  const cards = getRetirementTopicCards()
  const activeArticle = activeArticleId
    ? getRetirementTopicArticle(activeArticleId) ?? null
    : null

  return (
    <div className="retirement-topic-cards-section mt-16 md:mt-24">
      <Coffee2Reveal
        delay={0}
        className="retirement-topic-cards-section__intro mx-auto max-w-3xl text-center"
      >
        <p className="c2-eyebrow c2-pop-stamp">
          {retirementSectionMeta.bubblesEyebrow}
        </p>
        <h3 className="retirement-topic-cards-section__title mt-3 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
          {retirementSectionMeta.bubblesTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 md:text-base">
          {retirementSectionMeta.bubblesLead}
        </p>
        <p className="retirement-topic-cards-section__hint mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-zinc-400">
          <span
            className="retirement-topic-cards-section__hint-dot"
            aria-hidden
          />
          {retirementSectionMeta.bubblesHint}
        </p>
      </Coffee2Reveal>

      <section
        className="retirement-topic-cards mt-10 md:mt-12"
        aria-labelledby="retirement-topics-title"
      >
        <ul className="retirement-topic-grid mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
          {cards.map((card, index) => (
            <Coffee2Reveal
              key={card.id}
              as="li"
              delay={120 + index * 70}
              className="retirement-topic-card"
              data-stagger={index % 6}
            >
              <div className="retirement-topic-card__frame">
                <div className="retirement-topic-card__glass">
                  <button
                    type="button"
                    className="retirement-topic-card__link group flex h-full flex-col p-5 md:p-6"
                    aria-label={`${card.title}：阅读摘要《${card.article.title}》`}
                    onClick={() => setActiveArticleId(card.id)}
                  >
                    <p className="retirement-topic-card__index text-xs font-medium uppercase tracking-widest">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h4
                      id={index === 0 ? 'retirement-topics-title' : undefined}
                      className="retirement-topic-card__title mt-3 text-lg font-semibold tracking-tight"
                    >
                      {card.title}
                    </h4>
                    <Coffee2AnnotatedText
                      text={card.insight}
                      className="retirement-topic-card__insight mt-3 flex-1 text-sm leading-relaxed"
                      as="span"
                    />
                    <p className="retirement-topic-card__readmore mt-4 flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-wider transition-colors">
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
      </section>

      <RetirementTopicArticleDialog
        article={activeArticle}
        onClose={() => setActiveArticleId(null)}
      />
    </div>
  )
}
