'use client'

import type { AllianceSurveyQuestion, AllianceSurveyVariant } from '@/lib/content/coffee-alliance-page'
import { cn } from '@/lib/utils'

export const ALLIANCE_AUTO_ADVANCE_MS = 400

type AllianceSurveyQuestionCardProps = {
  variant: AllianceSurveyVariant
  question: AllianceSurveyQuestion
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

export function AllianceSurveyQuestionCard({
  variant,
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
}: AllianceSurveyQuestionCardProps) {
  const isSingle = question.selectionMode === 'single'
  const isMulti = question.selectionMode === 'multi'

  function handleOptionClick(optionId: string) {
    if (disabled) return
    onSelectOption(optionId)
  }

  return (
    <div
      className="alliance-flashcard__inner flex h-full min-h-0 flex-col p-4 md:p-5"
      data-variant={variant}
    >
      <div className="shrink-0">
        <p className="alliance-flashcard__progress text-[10px] font-medium uppercase tracking-widest">
          {String(questionIndex + 1).padStart(2, '0')} /{' '}
          {String(totalQuestions).padStart(2, '0')}
        </p>

        <h4 className="alliance-flashcard__prompt mt-2 text-base font-semibold leading-snug md:text-lg">
          {question.prompt}
        </h4>

        {question.subPrompt ? (
          <p className="alliance-flashcard__sub mt-1.5 text-xs leading-relaxed">
            {question.subPrompt}
          </p>
        ) : null}
      </div>

      <ul
        className={cn(
          'alliance-flashcard__options mt-3 min-h-0 flex-1 space-y-1.5 overflow-y-auto',
          isMulti && 'alliance-flashcard__options--multi'
        )}
      >
        {question.options.map((option) => {
          const selected = selectedIds.includes(option.id)

          return (
            <li key={option.id}>
              <button
                type="button"
                className={cn(
                  'alliance-survey-option w-full rounded-lg border-2 px-3 text-left text-xs transition-all md:text-sm',
                  isMulti ? 'py-2' : 'py-2.5',
                  selected && 'alliance-survey-option--selected',
                  disabled && 'pointer-events-none opacity-60'
                )}
                data-selected={selected}
                aria-pressed={selected}
                onClick={() => handleOptionClick(option.id)}
              >
                {option.label}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="alliance-flashcard__footer mt-3 shrink-0 border-t pt-3">
        <div
          className="mb-3 flex justify-center gap-1.5"
          role="tablist"
          aria-label="调查进度"
        >
          {Array.from({ length: totalQuestions }, (_, index) => (
            <span
              key={index}
              className={cn(
                'alliance-flashcard__dot h-1.5 w-1.5 rounded-full transition-colors',
                index === questionIndex && 'alliance-flashcard__dot--active'
              )}
              aria-current={index === questionIndex ? 'step' : undefined}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          {onPrev ? (
            <button
              type="button"
              className="text-xs font-medium opacity-70 hover:opacity-100 disabled:opacity-40"
              onClick={onPrev}
              disabled={disabled}
            >
              {prevLabel}
            </button>
          ) : (
            <span />
          )}

          {isMulti ? (
            <button
              type="button"
              className="alliance-flashcard__primary-btn rounded-lg border-2 px-4 py-2 text-xs font-semibold disabled:opacity-60"
              onClick={onNext}
              disabled={disabled}
            >
              {isLast ? completeLabel : nextLabel}
            </button>
          ) : (
            <span className="alliance-flashcard__tap-hint text-[10px]">{tapHint}</span>
          )}
        </div>
      </div>
    </div>
  )
}
