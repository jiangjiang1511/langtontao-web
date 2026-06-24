'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import type { DebtSurveyQuestion } from '@/lib/content/coffee-debt-page'
import { cn } from '@/lib/utils'

type DebtSurveyResultsProps = {
  questions: readonly DebtSurveyQuestion[]
  visible: boolean
  variant?: 'default' | 'flashcard'
}

export function DebtSurveyResults({
  questions,
  visible,
  variant = 'default',
}: DebtSurveyResultsProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const isFlashcard = variant === 'flashcard'

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
      className={cn(
        'debt-survey-results',
        isFlashcard ? 'debt-survey-results--flashcard space-y-3' : 'space-y-8'
      )}
      data-visible="false"
    >
      {questions.map((question, questionIndex) => {
        const isPair = question.options.length === 2

        return (
          <div
            key={question.id}
            className={cn(
              'debt-survey-result-block',
              isFlashcard && isPair && 'debt-survey-result-pair'
            )}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                {String(questionIndex + 1).padStart(2, '0')}
              </span>
              <h5
                className={cn(
                  'font-semibold text-zinc-950',
                  isFlashcard ? 'text-xs' : 'text-base'
                )}
              >
                {question.resultLabel}
              </h5>
            </div>

            <ul
              className={cn(
                'mt-1.5',
                isFlashcard && isPair
                  ? 'grid grid-cols-2 gap-2'
                  : isFlashcard
                    ? 'space-y-1.5'
                    : 'space-y-3'
              )}
            >
              {question.options.map((option) => {
                const pct = question.mockStats[option.id] ?? 0

                return (
                  <li key={option.id} className="debt-survey-bar-row min-w-0">
                    <div
                      className={cn(
                        'flex items-baseline justify-between gap-1',
                        isFlashcard ? 'text-[11px]' : 'text-sm'
                      )}
                    >
                      <span className="truncate text-zinc-700">{option.label}</span>
                      <span className="shrink-0 font-mono text-[10px] text-zinc-400">
                        {pct}%
                      </span>
                    </div>
                    <div
                      className={cn(
                        'debt-survey-bar-track mt-0.5 overflow-hidden rounded-full bg-zinc-100',
                        isFlashcard ? 'h-1' : 'h-2'
                      )}
                    >
                      <div
                        className="debt-survey-bar-fill h-full rounded-full bg-zinc-900"
                        style={{ '--debt-bar-pct': `${pct}%` } as CSSProperties}
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
