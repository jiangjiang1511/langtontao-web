'use client'

import Link from 'next/link'
import { Coffee2AnnotatedCopyBlock } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import type { Coffee2SectionCopyBlock } from '@/lib/content/coffee-glossary'
import { cn } from '@/lib/utils'

export type Coffee2NavGridCardItem = {
  number: string
  id: string
  title: string
  summary: Coffee2SectionCopyBlock
}

type Coffee2NavGridCardProps = {
  item: Coffee2NavGridCardItem
  tag: string
  variantId?: string
  className?: string
  href?: string
}

export function Coffee2NavGridCard({
  item,
  tag,
  variantId,
  className,
  href,
}: Coffee2NavGridCardProps) {
  const cardClassName = cn(
    'coffee2-life-event-card',
    `coffee2-life-event-card--${variantId ?? item.id}`,
    href && 'coffee2-life-event-card--link',
    className
  )

  const summaryLabel =
    typeof item.summary === 'string' ? item.summary : item.summary.segments
        .map((segment) => (segment.type === 'text' ? segment.value : segment.id))
        .join('')

  const content = (
    <>
      <div className="coffee2-life-event-card__meta">
        <span className="coffee2-life-event-card__number">{item.number}</span>
        <span className="coffee2-life-event-card__tag">{tag}</span>
      </div>
      <p className="coffee2-life-event-card__title">{item.title}</p>
      <Coffee2AnnotatedCopyBlock
        block={item.summary}
        className="coffee2-life-event-card__summary"
        as="span"
      />
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cardClassName}
        aria-label={`${item.title}：${summaryLabel}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <article className={cardClassName} aria-label={item.title}>
      {content}
    </article>
  )
}
