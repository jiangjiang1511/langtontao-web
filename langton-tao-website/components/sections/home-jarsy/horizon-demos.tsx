'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { CompoundGrowthSplitView } from '@/components/sections/coffee2/compound-growth-split-view'
import { useCompoundGrowthOptional } from '@/components/sections/coffee2/compound-growth-provider'
import { HorizonCardRow } from '@/components/sections/home-jarsy/horizon-card-row'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import type { HorizonCard, HorizonRitualStep, HorizonTopic } from '@/lib/content/century-horizons'
import { centuryHorizonScale } from '@/lib/content/century-horizons'
import { cn } from '@/lib/utils'

const COMPOUND_GROUPS = [
  { id: 'us', label: '美股', slugs: ['sp500', 'nasdaq'] },
  { id: 'bond', label: '美债', slugs: ['us-treasury'] },
  { id: 'etf', label: 'ETF', slugs: ['sp500', 'nasdaq', 'gold'] },
] as const

const YEAR1_CYCLE_ILLUSTRATION_SRC = '/assets/100years/year1/year1-cycle.png'

export function HorizonCycleIllustration({ visible }: { visible: boolean }) {
  return (
    <figure
      className="horizon-cycle-illustration"
      data-visible={visible ? 'true' : 'false'}
    >
      <img
        src={YEAR1_CYCLE_ILLUSTRATION_SRC}
        alt="经济周期示意图：锚定短波、产业转化与财富储备"
        width={1024}
        height={506}
        className="horizon-cycle-illustration__img"
        decoding="async"
      />
    </figure>
  )
}

export function HorizonMentorCards({ cards }: { cards: HorizonCard[] }) {
  return <HorizonCardRow cards={cards} columns={3} className="mt-8" />
}

export function HorizonCompoundDemo() {
  const context = useCompoundGrowthOptional()
  const [groupId, setGroupId] = useState<(typeof COMPOUND_GROUPS)[number]['id']>('us')
  const group = COMPOUND_GROUPS.find((item) => item.id === groupId) ?? COMPOUND_GROUPS[0]

  useEffect(() => {
    if (!context) return
    const first = group.slugs.find((slug) =>
      context.stocks.some((stock) => stock.slug === slug)
    )
    if (first) context.selectStock(first)
  }, [groupId, context, group.slugs])

  if (!context || context.stocks.length === 0) {
    return (
      <p className="horizon-compound-fallback mt-8 text-sm text-zinc-500">
        复利走势数据加载中，请稍后刷新页面。
      </p>
    )
  }

  const filtered = context.stocks.filter((stock) =>
    (group.slugs as readonly string[]).includes(stock.slug)
  )

  return (
    <div className="horizon-compound-demo mt-8">
      <div className="horizon-compound-demo__tabs" role="tablist" aria-label="全球资产类别">
        {COMPOUND_GROUPS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === groupId}
            className={cn(
              'horizon-compound-demo__tab',
              item.id === groupId && 'horizon-compound-demo__tab--active'
            )}
            onClick={() => setGroupId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="horizon-compound-demo__chips">
        {filtered.map((stock) => (
          <button
            key={stock.slug}
            type="button"
            className={cn(
              'horizon-compound-demo__chip',
              context.activeSlug === stock.slug && 'horizon-compound-demo__chip--active'
            )}
            style={{ '--chip-accent': stock.accent } as CSSProperties}
            onClick={() => context.selectStock(stock.slug)}
          >
            {stock.name}
          </button>
        ))}
      </div>
      <div className="compound-growth-scope mt-4 text-left">
        <CompoundGrowthSplitView />
      </div>
    </div>
  )
}

export function HorizonBallastDemo({ topic }: { topic: HorizonTopic }) {
  return topic.cards ? (
    <HorizonCardRow cards={topic.cards} columns={2} className="mt-8" />
  ) : null
}

export function HorizonIdentityDemo({ topic }: { topic: HorizonTopic }) {
  return topic.cards ? <HorizonCardRow cards={topic.cards} columns={2} className="mt-8" /> : null
}

export function HorizonGardenRitual({
  steps,
  visible,
}: {
  steps: HorizonRitualStep[]
  visible: boolean
}) {
  const { ref, visible: inView } = useCenterZoneVisible<HTMLDivElement>()
  const show = visible && inView

  return (
    <div ref={ref} className="horizon-garden-ritual mt-8" data-visible={show ? 'true' : 'false'}>
      <ol className="horizon-garden-ritual__track">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="horizon-garden-ritual__step"
            style={{ '--step-i': index } as CSSProperties}
            data-lit={show ? 'true' : 'false'}
          >
            <span className="horizon-garden-ritual__marker" aria-hidden />
            <div className="horizon-garden-ritual__content">
              <h4 className="horizon-garden-ritual__label">{step.label}</h4>
              <p className="horizon-garden-ritual__detail">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function HorizonEducationDemo({ topic }: { topic: HorizonTopic }) {
  if (!topic.cards?.length) return null

  const featuredCards = topic.cards.filter((card) => card.featured)
  const restCards = topic.cards.filter((card) => !card.featured)

  return (
    <div className="horizon-education-demo mt-8">
      {featuredCards.length > 0 ? (
        <HorizonCardRow cards={featuredCards} columns={1} />
      ) : null}
      {restCards.length > 0 ? (
        <HorizonCardRow cards={restCards} columns={2} className="horizon-education-demo__rest" />
      ) : null}
    </div>
  )
}

export function HorizonLegacyBento({ topic }: { topic: HorizonTopic }) {
  return topic.cards ? <HorizonCardRow cards={topic.cards} columns={3} className="mt-8" /> : null
}

export function HorizonFamilyBento({ topic }: { topic: HorizonTopic }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (!topic.cards) return null

  return (
    <div className="horizon-family-bento mt-8">
      {topic.cards.map((card) => {
        const isExpanded = expandedId === card.title
        const isTrap = card.title === '三代囚笼'

        return (
          <article
            key={card.title}
            className={cn(
              'horizon-family-bento__card',
              isTrap && 'horizon-family-bento__card--trap'
            )}
          >
            <h4 className="horizon-family-bento__title">{card.title}</h4>
            <p className="horizon-family-bento__body">
              <Coffee2AnnotatedText text={card.body} as="span" />
            </p>
            {isTrap ? (
              <button
                type="button"
                className="horizon-family-bento__expand"
                aria-expanded={isExpanded}
                onClick={() => setExpandedId(isExpanded ? null : card.title)}
              >
                {isExpanded ? '收起' : '为何富不过三代？'}
              </button>
            ) : null}
            {isTrap && isExpanded ? (
              <p className="horizon-family-bento__extra">
                <Coffee2AnnotatedText
                  text="资产无隔离、家风断层、后代无财富认知——三大陷阱环环相扣。提前以宪章、信托与财商教育预埋制度，才能打破三代囚笼。"
                  as="span"
                />
              </p>
            ) : null}
            {card.href ? (
              <Link href={card.href} className="horizon-card-row__cta">
                了解更多 →
              </Link>
            ) : card.cta ? (
              <span className="horizon-card-row__cta">了解更多 →</span>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}

export function HorizonCharityHalo({ visible }: { visible: boolean }) {
  return (
    <div className="horizon-charity-halo mt-8" data-visible={visible ? 'true' : 'false'}>
      <svg viewBox="0 0 400 240" className="horizon-charity-halo__svg" aria-hidden>
        {[40, 70, 100, 130].map((r, i) => (
          <circle
            key={r}
            cx={200}
            cy={120}
            r={r}
            className="horizon-charity-halo__ring"
            style={{ animationDelay: `${i * 400}ms` }}
          />
        ))}
        <text x={200} y={125} textAnchor="middle" className="horizon-charity-halo__label">
          家族慈善基金
        </text>
      </svg>
    </div>
  )
}

export function HorizonEpilogueScale({ lines }: { lines: readonly string[] }) {
  return (
    <div className="horizon-epilogue mt-16 md:mt-20">
      <div className="horizon-epilogue__scale" aria-hidden>
        {centuryHorizonScale.map((mark) => (
          <span key={mark.year} className="horizon-epilogue__tick">
            <span className="horizon-epilogue__tick-line" />
            <span className="horizon-epilogue__tick-label">{mark.label}</span>
          </span>
        ))}
      </div>
      <div className="horizon-epilogue__copy">
        {lines.map((line, index) => (
          <p key={index} className="horizon-epilogue__line">
            <Coffee2AnnotatedText text={line} as="span" />
          </p>
        ))}
      </div>
    </div>
  )
}

export function HorizonTopicDemo({
  topic,
  visible,
}: {
  topic: HorizonTopic
  visible: boolean
}) {
  switch (topic.demo) {
    case 'value-investing':
      return topic.cards ? <HorizonMentorCards cards={topic.cards} /> : null
    case 'compound-us':
    case 'compound-bond':
    case 'compound-etf':
      return <HorizonCompoundDemo />
    case 'ballast':
      return <HorizonBallastDemo topic={topic} />
    case 'identity':
      return <HorizonIdentityDemo topic={topic} />
    case 'garden-ritual':
      return (
        <HorizonGardenRitual steps={topic.ritualSteps ?? []} visible={visible} />
      )
    case 'education':
      return <HorizonEducationDemo topic={topic} />
    case 'legacy-bento':
      return <HorizonLegacyBento topic={topic} />
    case 'family-bento':
      return <HorizonFamilyBento topic={topic} />
    case 'charity-halo':
      return <HorizonCharityHalo visible={visible} />
    default:
      return topic.cards ? <HorizonCardRow cards={topic.cards} className="mt-8" /> : null
  }
}
