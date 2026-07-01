'use client'

import type { RetirementSoulSurveyQuestion } from '@/lib/content/coffee-retirement-page'
import { cn } from '@/lib/utils'

export const RETIREMENT_SOUL_AUTO_ADVANCE_MS = 400

type RetirementSoulSurveyQuestionCardProps = {
  question: RetirementSoulSurveyQuestion
  questionIndex: number
  totalQuestions: number
  selectedIds: string[]
  onSelectOption: (optionId: string) => void
  onNext: () => void
  onPrev?: () => void
  isLast: boolean
  nextLabel: string
  completeLabel: string
  prevLabel: string
  tapHint: string
  disabled?: boolean
}

export function RetirementSoulSurveyQuestionCard({
  question,
  questionIndex,
  totalQuestions,
  selectedIds,
  onSelectOption,
  onNext,
  onPrev,
  isLast,
  nextLabel,
  completeLabel,
  prevLabel,
  tapHint,
  disabled = false,
}: RetirementSoulSurveyQuestionCardProps) {
  return (
    <div className="retirement-chart-card__inner flex h-full min-h-0 flex-col">
      <div
        className={cn(
          'retirement-chart-card__stripe shrink-0',
          question.angle === 'langton' && 'retirement-chart-card__stripe--langton'
        )}
      >
        <span className="retirement-chart-card__angle">
          {question.angle === 'langton' ? '灵魂视角' : '常见视角'}
        </span>
        <span className="retirement-chart-card__progress">
          {String(questionIndex + 1).padStart(2, '0')} /{' '}
          {String(totalQuestions).padStart(2, '0')}
        </span>
      </div>

      <div className="retirement-chart-card__body flex min-h-0 flex-1 flex-col p-5 md:p-6">
        <div className="shrink-0">
          <h4 className="retirement-chart-card__prompt text-lg font-semibold leading-snug text-zinc-950 md:text-xl">
            {question.prompt}
          </h4>

          {question.subPrompt ? (
            <p className="retirement-chart-card__sub mt-2 text-sm leading-relaxed text-amber-800/70">
              {question.subPrompt}
            </p>
          ) : null}
        </div>

        <ul className="retirement-chart-card__options mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto">
          {question.options.map((option) => {
            const selected = selectedIds.includes(option.id)

            return (
              <li key={option.id}>
                <button
                  type="button"
                  className={cn(
                    'c2-pop-option retirement-soul-survey-option w-full px-4 py-3 text-left text-sm',
                    selected && 'retirement-soul-survey-option--selected',
                    disabled && 'pointer-events-none opacity-60'
                  )}
                  data-selected={selected}
                  aria-pressed={selected}
                  onClick={() => onSelectOption(option.id)}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="retirement-chart-card__footer mt-4 shrink-0 border-t-2 border-zinc-950 pt-4">
          <div
            className="mb-4 flex justify-center gap-2"
            role="tablist"
            aria-label="问诊进度"
          >
            {Array.from({ length: totalQuestions }, (_, index) => (
              <span
                key={index}
                className={cn(
                  'retirement-chart-card__dot h-2 w-2 rounded-full transition-colors',
                  index === questionIndex
                    ? 'bg-amber-600'
                    : 'bg-amber-100'
                )}
                aria-current={index === questionIndex ? 'step' : undefined}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            {onPrev ? (
              <button
                type="button"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 disabled:opacity-40"
                onClick={onPrev}
                disabled={disabled}
              >
                {prevLabel}
              </button>
            ) : (
              <span />
            )}

            <span className="text-xs text-amber-700/60">{tapHint}</span>

            {isLast ? (
              <button
                type="button"
                className="retirement-chart-card__primary-btn rounded-lg border-2 px-4 py-2 text-xs font-semibold opacity-0 pointer-events-none"
                tabIndex={-1}
                aria-hidden
              >
                {completeLabel}
              </button>
            ) : (
              <button
                type="button"
                className="retirement-chart-card__primary-btn rounded-lg border-2 px-4 py-2 text-xs font-semibold opacity-0 pointer-events-none"
                tabIndex={-1}
                aria-hidden
                onClick={onNext}
              >
                {nextLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
