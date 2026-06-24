'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import {
  retirementBubbleSizeByWeight,
  retirementBubbles,
  retirementSectionMeta,
  type RetirementBubble,
} from '@/lib/content/coffee-retirement-page'
import { cn } from '@/lib/utils'

function RetirementBubbleButton({
  bubble,
  index,
  isActive,
  onSelect,
}: {
  bubble: RetirementBubble
  index: number
  isActive: boolean
  onSelect: (bubble: RetirementBubble) => void
}) {
  const size = retirementBubbleSizeByWeight[bubble.weight] ?? 48

  return (
    <button
      type="button"
      className={cn('invest-bubble', isActive && 'invest-bubble--active')}
      data-weight={bubble.weight}
      style={
        {
          '--bubble-size': `${size}px`,
          '--bubble-x': `${bubble.x}%`,
          '--bubble-y': `${bubble.y}%`,
          '--bubble-stagger': `${index * 42}ms`,
        } as CSSProperties
      }
      aria-label={bubble.label}
      aria-pressed={isActive}
      onClick={() => onSelect(bubble)}
    >
      <span className="invest-bubble__ring" aria-hidden />
      <span className="invest-bubble__label">{bubble.label}</span>
    </button>
  )
}

export function RetirementBubblesStage() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [isExploded, setIsExploded] = useState(false)
  const [activeBubble, setActiveBubble] = useState<RetirementBubble | null>(
    null
  )

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setIsExploded(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          setIsExploded(true)
          observer.disconnect()
        }
      },
      {
        threshold: [0, 0.2, 0.35, 0.5, 0.75, 1],
        rootMargin: '-15% 0px -15% 0px',
      }
    )

    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="retirement-bubbles-section mt-16 md:mt-24">
      <Coffee2Reveal
        delay={0}
        className="retirement-bubbles-section__intro mx-auto max-w-3xl text-center"
      >
        <p className="c2-eyebrow">{retirementSectionMeta.bubblesEyebrow}</p>
        <h3 className="retirement-bubbles-section__title mt-3 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
          {retirementSectionMeta.bubblesTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 md:text-base">
          {retirementSectionMeta.bubblesLead}
        </p>
        <p className="retirement-bubbles-section__hint mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-zinc-400">
          <span className="retirement-bubbles-section__hint-dot" aria-hidden />
          {retirementSectionMeta.bubblesHint}
        </p>
      </Coffee2Reveal>

      <Coffee2Reveal delay={120} className="mt-10 md:mt-12">
        <div
          className="retirement-bubbles-stage invest-quadrant"
          role="img"
          aria-label="养老关键议题泡泡星座图"
        >
          <div ref={stageRef} className="retirement-bubbles-stage__shell">
            <div
              className="invest-quadrant__bubbles retirement-bubbles-stage__bubbles"
              data-exploded={isExploded ? 'true' : 'false'}
            >
              {retirementBubbles.map((bubble, index) => (
                <RetirementBubbleButton
                  key={bubble.id}
                  bubble={bubble}
                  index={index}
                  isActive={activeBubble?.id === bubble.id}
                  onSelect={setActiveBubble}
                />
              ))}
            </div>
          </div>

          {activeBubble ? (
            <div className="retirement-bubble-panel">
              <button
                type="button"
                className="retirement-bubble-panel__close"
                onClick={() => setActiveBubble(null)}
                aria-label="关闭"
              >
                ×
              </button>
              <h4 className="retirement-bubble-panel__title">
                {activeBubble.label}
              </h4>
              <Coffee2AnnotatedText
                text={activeBubble.summary}
                className="retirement-bubble-panel__summary"
              />
              <div className="retirement-bubble-panel__body">
                {activeBubble.body.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          ) : (
            <p className="retirement-bubbles-stage__placeholder">
              点选上方泡泡，展开议题详情
            </p>
          )}
        </div>
      </Coffee2Reveal>
    </div>
  )
}
