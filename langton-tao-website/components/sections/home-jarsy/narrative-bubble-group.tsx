'use client'

import { useState, type CSSProperties, type KeyboardEvent } from 'react'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import type { NarrativeBubble } from '@/lib/content/narrative-bubble'
import { cn } from '@/lib/utils'

function handleTabKeyDown(event: KeyboardEvent, onSelect: () => void) {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  onSelect()
}

type NarrativeBubbleGroupProps = {
  bubbles: NarrativeBubble[]
  layout?: 'wrap' | 'grid-2' | 'concept-grid' | 'concept-grid-2-1'
  className?: string
  accentMap?: Record<string, string>
  tablistLabel?: string
}

function BubbleBody({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((paragraph, i) => (
        <Coffee2AnnotatedText
          key={i}
          className="day-one-bubble-panel__paragraph"
          text={paragraph}
          as="p"
        />
      ))}
    </>
  )
}

function BubblePanel({
  bubble,
  accentMap,
}: {
  bubble: NarrativeBubble
  accentMap: Record<string, string>
}) {
  const [showFull, setShowFull] = useState(false)
  const hasBody = Boolean(bubble.body)
  const hasSubsections = Boolean(bubble.subsections?.length)
  const accent = accentMap[bubble.id] ?? '#09090b'

  const scrollToTarget = () => {
    if (!bubble.scrollTarget) return
    document.getElementById(bubble.scrollTarget)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div
      className="day-one-bubble-panel"
      style={{ '--day-one-accent': accent } as CSSProperties}
    >
      {bubble.hook ? (
        <div className="day-one-bubble-panel__hook">
          <Coffee2AnnotatedText text={bubble.hook} as="p" />
        </div>
      ) : null}

      <div className="day-one-bubble-panel__body">
        <Coffee2AnnotatedText
          className="day-one-bubble-panel__summary"
          text={bubble.summary}
          as="p"
        />

        {hasSubsections ? (
          <Accordion type="multiple" className="day-one-bubble-subsection mt-5">
            {bubble.subsections!.map((sub) => (
              <AccordionItem key={sub.title} value={sub.title}>
                <AccordionTrigger className="text-sm font-semibold text-zinc-800">
                  {sub.title}
                </AccordionTrigger>
                <AccordionContent>
                  {sub.paragraphs.map((p, i) => (
                    <Coffee2AnnotatedText
                      key={i}
                      className="mt-2 text-sm leading-relaxed first:mt-0"
                      text={p}
                      as="p"
                    />
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

          {bubble.scrollTarget ? (
            <button
              type="button"
              onClick={scrollToTarget}
              className="day-two-cycles-cta"
            >
              {bubble.scrollCtaLabel ?? '探索 ↓'}
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
  accentMap,
}: {
  bubble: NarrativeBubble
  index: number
  isActive: boolean
  onSelect: () => void
  accentMap: Record<string, string>
}) {
  const accent = accentMap[bubble.id] ?? '#09090b'

  return (
    <div
      role="tab"
      tabIndex={0}
      aria-selected={isActive}
      onClick={onSelect}
      onKeyDown={(event) => handleTabKeyDown(event, onSelect)}
      className={cn(
        'day-one-concept-card',
        isActive && 'day-one-concept-card--active'
      )}
      style={{ '--day-one-accent': accent } as CSSProperties}
    >
      <span className="day-one-concept-card__index" aria-hidden>
        {String(index + 1).padStart(2, '0')}
      </span>
      <Coffee2AnnotatedText
        as="span"
        className="day-one-concept-card__label"
        text={bubble.label}
      />
      <Coffee2AnnotatedText
        as="span"
        className="day-one-concept-card__preview"
        text={bubble.summary}
      />
    </div>
  )
}

function BubbleChip({
  bubble,
  isActive,
  onSelect,
}: {
  bubble: NarrativeBubble
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <div
      role="tab"
      tabIndex={0}
      aria-selected={isActive}
      onClick={onSelect}
      onKeyDown={(event) => handleTabKeyDown(event, onSelect)}
      className={cn('day-one-bubble-chip', isActive && 'day-one-bubble-chip--active')}
    >
      <span className="day-one-bubble-chip__dot" aria-hidden />
      <Coffee2AnnotatedText as="span" text={bubble.label} />
    </div>
  )
}

export function NarrativeBubbleGroup({
  bubbles,
  layout = 'wrap',
  className,
  accentMap = {},
  tablistLabel = '主题',
}: NarrativeBubbleGroupProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeBubble = bubbles.find((b) => b.id === activeId)

  const toggleBubble = (id: string) => {
    setActiveId((current) => (current === id ? null : id))
  }

  if (layout === 'concept-grid' || layout === 'concept-grid-2-1') {
    return (
      <div className={cn('day-one-concept-grid-wrap', className)}>
        <div
          className={cn(
            'day-one-concept-grid',
            layout === 'concept-grid-2-1' && 'day-one-concept-grid--2-1'
          )}
          role="tablist"
          aria-label={tablistLabel}
        >
          {bubbles.map((bubble, index) => (
            <ConceptCard
              key={bubble.id}
              bubble={bubble}
              index={index}
              isActive={activeId === bubble.id}
              onSelect={() => toggleBubble(bubble.id)}
              accentMap={accentMap}
            />
          ))}
        </div>
        {activeBubble ? (
          <div className="day-one-concept-panel">
            <BubblePanel bubble={activeBubble} accentMap={accentMap} />
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
        aria-label={tablistLabel}
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

      {activeBubble ? (
        <BubblePanel bubble={activeBubble} accentMap={accentMap} />
      ) : null}
    </div>
  )
}
