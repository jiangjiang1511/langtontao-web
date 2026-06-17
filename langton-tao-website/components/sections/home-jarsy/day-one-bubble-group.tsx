'use client'

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { DayOneBubble } from '@/lib/content/day-one-narrative'
import { cn } from '@/lib/utils'

const CONCEPT_ACCENTS: Record<string, string> = {
  'scarce-resource': '#f59e0b',
  mediocristan: '#a1a1aa',
  extremistan: '#ffe600',
  'every-day-is-day-one': '#fb7185',
}

type DayOneBubbleGroupProps = {
  bubbles: DayOneBubble[]
  layout?: 'wrap' | 'grid-2' | 'concept-grid'
  className?: string
}

function BubbleBody({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((paragraph, i) => (
        <p key={i} className="day-one-bubble-panel__paragraph">
          {paragraph}
        </p>
      ))}
    </>
  )
}

function BubblePanel({ bubble }: { bubble: DayOneBubble }) {
  const [showFull, setShowFull] = useState(false)
  const hasBody = Boolean(bubble.body)
  const hasSubsections = Boolean(bubble.subsections?.length)
  const accent = CONCEPT_ACCENTS[bubble.id] ?? '#09090b'

  return (
    <div
      className="day-one-bubble-panel"
      style={{ '--day-one-accent': accent } as CSSProperties}
    >
      {bubble.hook ? (
        <div className="day-one-bubble-panel__hook">
          <p>{bubble.hook}</p>
        </div>
      ) : null}

      <div className="day-one-bubble-panel__body">
        <p className="day-one-bubble-panel__summary">{bubble.summary}</p>

        {hasSubsections ? (
          <Accordion type="multiple" className="day-one-bubble-subsection mt-5">
            {bubble.subsections!.map((sub) => (
              <AccordionItem key={sub.title} value={sub.title}>
                <AccordionTrigger className="text-sm font-semibold text-zinc-800">
                  {sub.title}
                </AccordionTrigger>
                <AccordionContent>
                  {sub.paragraphs.map((p, i) => (
                    <p key={i} className="mt-2 text-sm leading-relaxed first:mt-0">
                      {p}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : null}

        {hasBody && showFull ? (
          <div className="day-one-bubble-panel__full">
            <BubbleBody text={bubble.body!} />
          </div>
        ) : null}

        <div className="day-one-bubble-panel__actions">
          {hasBody ? (
            <button
              type="button"
              onClick={() => setShowFull((v) => !v)}
              className="day-one-bubble-panel__action"
            >
              {showFull ? '收起全文' : '展开全文'}
            </button>
          ) : null}

          {bubble.href ? (
            <Link href={bubble.href} className="day-one-bubble-panel__action">
              深入了解 →
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function ConceptCard({
  bubble,
  index,
  isActive,
  onSelect,
}: {
  bubble: DayOneBubble
  index: number
  isActive: boolean
  onSelect: () => void
}) {
  const accent = CONCEPT_ACCENTS[bubble.id] ?? '#09090b'

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onSelect}
      className={cn(
        'day-one-concept-card',
        isActive && 'day-one-concept-card--active'
      )}
      style={{ '--day-one-accent': accent } as CSSProperties}
    >
      <span className="day-one-concept-card__index" aria-hidden>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="day-one-concept-card__label">{bubble.label}</span>
      <span className="day-one-concept-card__preview">{bubble.summary}</span>
    </button>
  )
}

function BubbleChip({
  bubble,
  isActive,
  onSelect,
}: {
  bubble: DayOneBubble
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onSelect}
      className={cn('day-one-bubble-chip', isActive && 'day-one-bubble-chip--active')}
    >
      <span className="day-one-bubble-chip__dot" aria-hidden />
      {bubble.label}
    </button>
  )
}

export function DayOneBubbleGroup({
  bubbles,
  layout = 'wrap',
  className,
}: DayOneBubbleGroupProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeBubble = bubbles.find((b) => b.id === activeId)

  const toggleBubble = (id: string) => {
    setActiveId((current) => (current === id ? null : id))
  }

  if (layout === 'concept-grid') {
    return (
      <div className={cn('day-one-concept-grid-wrap', className)}>
        <div
          className="day-one-concept-grid"
          role="tablist"
          aria-label="什么是第一天"
        >
          {bubbles.map((bubble, index) => (
            <ConceptCard
              key={bubble.id}
              bubble={bubble}
              index={index}
              isActive={activeId === bubble.id}
              onSelect={() => toggleBubble(bubble.id)}
            />
          ))}
        </div>
        {activeBubble ? (
          <div className="day-one-concept-panel">
            <BubblePanel bubble={activeBubble} />
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className={className}>
      <div
        className={cn(
          'day-one-bubble-chips',
          layout === 'grid-2'
            ? 'day-one-bubble-chips--grid-2'
            : 'day-one-bubble-chips--wrap'
        )}
        role="tablist"
        aria-label="第一天主题"
      >
        {bubbles.map((bubble) => (
          <BubbleChip
            key={bubble.id}
            bubble={bubble}
            isActive={activeId === bubble.id}
            onSelect={() => toggleBubble(bubble.id)}
          />
        ))}
      </div>

      {activeBubble ? <BubblePanel bubble={activeBubble} /> : null}
    </div>
  )
}
