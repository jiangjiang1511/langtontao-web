'use client'

import type { DebtSurveyQuestion } from '@/lib/content/coffee-debt-page'
import { cn } from '@/lib/utils'

const AUTO_ADVANCE_MS = 400

type DebtSurveyQuestionCardProps = {
  question: DebtSurveyQuestion
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
  disabled?: boolean
}

export function DebtSurveyQuestionCard({
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
  disabled = false,
}: DebtSurveyQuestionCardProps) {
  const isSingle = question.selectionMode === 'single'
  const isMulti = question.selectionMode === 'multi'

  function handleOptionClick(optionId: string) {
    if (disabled) return
    onSelectOption(optionId)
  }

  return (
    <div className="debt-poker-card__inner flex h-full min-h-0 flex-col p-5 md:p-6">
      <div className="shrink-0">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          {String(questionIndex + 1).padStart(2, '0')} /{' '}
          {String(totalQuestions).padStart(2, '0')}
        </p>

        <h4
          className={cn(
            'mt-3 font-semibold leading-snug text-zinc-950',
            isMulti ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
          )}
        >
          {question.prompt}
        </h4>

        {question.subPrompt ? (
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {question.subPrompt}
          </p>
        ) : null}
      </div>

      <ul
        className={cn(
          'debt-poker-card__options mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto',
          isMulti && 'debt-poker-card__options--multi'
        )}
      >
        {question.options.map((option) => {
          const selected = selectedIds.includes(option.id)

          return (
            <li key={option.id}>
              <button
                type="button"
                className={cn(
                  'debt-survey-option w-full rounded-lg border-2 px-4 text-left text-sm transition-all',
                  isMulti ? 'py-2.5' : 'py-3',
                  selected
                    ? 'border-zinc-900 bg-zinc-50 shadow-[3px_3px_0_0_var(--jarsy-violet)]'
                    : 'border-zinc-200 bg-white hover:border-zinc-400',
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

      <div className="debt-flashcard__footer mt-4 shrink-0 border-t border-zinc-100 pt-4">
        <div
          className="mb-4 flex justify-center gap-2"
          role="tablist"
          aria-label="调查进度"
        >
          {Array.from({ length: totalQuestions }, (_, index) => (
            <span
              key={index}
              className={cn(
                'debt-flashcard__dot h-2 w-2 rounded-full transition-colors',
                index === questionIndex ? 'bg-zinc-900' : 'bg-zinc-200'
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

          {isMulti ? (
            <button
              type="button"
              className="debt-flashcard__primary-btn rounded-lg border-2 border-zinc-900 bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white shadow-[3px_3px_0_0_var(--jarsy-violet)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:opacity-60"
              onClick={onNext}
              disabled={disabled}
            >
              {isLast ? completeLabel : nextLabel}
            </button>
          ) : (
            <span className="text-xs text-zinc-400">进入下一页</span>
          )}
        </div>
      </div>
    </div>
  )
}

export { AUTO_ADVANCE_MS }
