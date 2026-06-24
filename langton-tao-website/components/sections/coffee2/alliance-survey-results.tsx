'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import type {
  AllianceSurveyQuestion,
  AllianceSurveyVariant,
} from '@/lib/content/coffee-alliance-page'
import { cn } from '@/lib/utils'

type AllianceSurveyResultsProps = {
  questions: readonly AllianceSurveyQuestion[]
  visible: boolean
  variant: AllianceSurveyVariant
}

export function AllianceSurveyResults({
  questions,
  visible,
  variant,
}: AllianceSurveyResultsProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !visible) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      root.setAttribute('data-visible', 'true')
      return
    }

    const frame = requestAnimationFrame(() => {
      root.setAttribute('data-visible', 'true')
    })

    return () => cancelAnimationFrame(frame)
  }, [visible])

  return (
    <div
      ref={rootRef}
      className="alliance-survey-results alliance-survey-results--flashcard space-y-3"
      data-visible="false"
      data-variant={variant}
    >
      {questions.map((question, questionIndex) => {
        const isPair = question.options.length === 2

        return (
          <div
            key={question.id}
            className={cn(
              'alliance-survey-result-block',
              isPair && 'alliance-survey-result-pair'
            )}
          >
            <div className="flex items-baseline gap-2">
              <span className="alliance-survey-result-index font-mono text-[10px] font-bold uppercase tracking-widest">
                {String(questionIndex + 1).padStart(2, '0')}
              </span>
              <h5 className="text-xs font-semibold text-zinc-950">
                {question.resultLabel}
              </h5>
            </div>

            <ul
              className={cn(
                'mt-1.5',
                isPair ? 'grid grid-cols-2 gap-2' : 'space-y-1.5'
              )}
            >
              {question.options.map((option) => {
                const pct = question.mockStats[option.id] ?? 0

                return (
                  <li key={option.id} className="alliance-survey-bar-row min-w-0">
                    <div className="flex items-baseline justify-between gap-1 text-[11px]">
                      <span className="truncate text-zinc-700">{option.label}</span>
                      <span className="shrink-0 font-mono text-[10px] text-zinc-400">
                        {pct}%
                      </span>
                    </div>
                    <div className="alliance-survey-bar-track mt-0.5 h-1 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="alliance-survey-bar-fill h-full rounded-full"
                        style={{ '--alliance-bar-pct': `${pct}%` } as CSSProperties}
                        data-pct={pct}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
