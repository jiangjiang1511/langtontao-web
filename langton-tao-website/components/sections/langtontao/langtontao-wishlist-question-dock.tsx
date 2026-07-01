'use client'

import {
  getWishlistDimensionLabel,
  langtontaoWishlistMeta,
  langtontaoWishlistQuestions,
  type WishlistSurveyQuestion,
} from '@/lib/content/langtontao/langtontao-wishlist-survey'
import { cn } from '@/lib/utils'

type WishlistQuestionFloatProps = {
  visible: boolean
  question: WishlistSurveyQuestion
  questionIndex: number
  mode: 'read' | 'answer'
  waypointTeaser?: string
  selectedOptionId?: string
  onSelectOption: (optionId: string) => void
  onContinue: () => void
}

export function WishlistQuestionFloat({
  visible,
  question,
  questionIndex,
  mode,
  waypointTeaser,
  selectedOptionId,
  onSelectOption,
  onContinue,
}: WishlistQuestionFloatProps) {
  const isLastQuestion = questionIndex >= langtontaoWishlistQuestions.length - 1

  if (!visible) return null

  return (
    <div
      className={cn('lt-wishlist-question-float', 'lt-wishlist-question-float--enter')}
      role="dialog"
      aria-modal="true"
    >
      <div className="lt-wishlist-question-float__panel">
        <p className="lt-wishlist-question-float__eyebrow">
          {String(questionIndex + 1).padStart(2, '0')} /{' '}
          {String(langtontaoWishlistQuestions.length).padStart(2, '0')} ·{' '}
          {getWishlistDimensionLabel(question.dimension)}
        </p>
        <h3 className="lt-wishlist-question-float__title c2-display">
          {question.prompt}
        </h3>

        {waypointTeaser ? (
          <p className="lt-wishlist-question-float__teaser">{waypointTeaser}</p>
        ) : null}

        {mode === 'answer' ? (
          <ul className="lt-wishlist-question-float__options">
            {question.options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => onSelectOption(option.id)}
                  className={cn(
                    'lt-wishlist-question-float__option',
                    selectedOptionId === option.id &&
                      'lt-wishlist-question-float__option--selected'
                  )}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="lt-wishlist-question-float__actions">
          <button
            type="button"
            disabled={mode === 'answer' && !selectedOptionId}
            className="coffee2-cta-button disabled:opacity-40"
            onClick={onContinue}
          >
            {mode === 'read'
              ? '继续时间轴'
              : isLastQuestion
                ? langtontaoWishlistMeta.completeLabel
                : '继续时间轴'}
          </button>
        </div>
      </div>
    </div>
  )
}
