'use client'

import {
  getWishlistDimensionLabel,
  langtontaoWishlistMeta,
  type WishlistSurveyQuestion,
} from '@/lib/content/langtontao/langtontao-wishlist-survey'
import { cn } from '@/lib/utils'

export const WISHLIST_AUTO_ADVANCE_MS = 400

type LangtontaoWishlistQuestionCardProps = {
  question: WishlistSurveyQuestion
  questionIndex: number
  totalQuestions: number
  selectedOptionId?: string
  onSelectOption: (optionId: string) => void
  onPrev?: () => void
  disabled?: boolean
}

export function LangtontaoWishlistQuestionCard({
  question,
  questionIndex,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
  onPrev,
  disabled = false,
}: LangtontaoWishlistQuestionCardProps) {
  return (
    <div className="lt-wishlist-flashcard__inner flex h-full min-h-0 flex-col p-5 md:p-6">
      <div className="shrink-0">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          {String(questionIndex + 1).padStart(2, '0')} /{' '}
          {String(totalQuestions).padStart(2, '0')} ·{' '}
          {getWishlistDimensionLabel(question.dimension)}
        </p>

        <h4 className="mt-3 text-xl font-semibold leading-snug text-zinc-950 md:text-2xl">
          {question.prompt}
        </h4>
      </div>

      <ul className="lt-wishlist-flashcard__options mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto">
        {question.options.map((option) => {
          const selected = selectedOptionId === option.id

          return (
            <li key={option.id}>
              <button
                type="button"
                className={cn(
                  'lt-wishlist-flashcard__option w-full rounded-lg border-2 px-4 py-3 text-left text-sm transition-all',
                  selected
                    ? 'border-zinc-900 bg-zinc-50 shadow-[3px_3px_0_0_#ffe600]'
                    : 'border-zinc-200 bg-white hover:border-zinc-400',
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

      <div className="lt-wishlist-flashcard__footer mt-4 shrink-0 border-t border-zinc-100 pt-4">
        <div
          className="mb-4 flex justify-center gap-2"
          role="tablist"
          aria-label="问卷进度"
        >
          {Array.from({ length: totalQuestions }, (_, index) => (
            <span
              key={index}
              className={cn(
                'lt-wishlist-flashcard__dot h-2 w-2 rounded-full transition-colors',
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
              {langtontaoWishlistMeta.prevLabel}
            </button>
          ) : (
            <span />
          )}
          <span className="text-xs text-zinc-400">{langtontaoWishlistMeta.stageHint}</span>
        </div>
      </div>
    </div>
  )
}
