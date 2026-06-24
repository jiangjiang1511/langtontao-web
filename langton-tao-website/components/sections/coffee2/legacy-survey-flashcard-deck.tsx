'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AUTO_ADVANCE_MS,
  LegacySurveyQuestionCard,
} from '@/components/sections/coffee2/legacy-survey-question-card'
import { LegacySurveyCommentaryCard } from '@/components/sections/coffee2/legacy-survey-commentary-card'
import { LegacySurveyResultsDistributionCard } from '@/components/sections/coffee2/legacy-survey-results-distribution-card'
import {
  legacySectionMeta,
  legacySurveyQuestions,
  type LegacySurveyAnswers,
} from '@/lib/content/coffee-legacy-page'
import {
  resolveLegacySurveyFeedback,
  type LegacySurveyFeedbackProfile,
} from '@/lib/content/coffee-legacy-survey-feedback'
import { cn } from '@/lib/utils'

type DeckPhase = 'question' | 'results' | 'commentary'
type DealAnim = 'none' | 'forward' | 'back'

const DEAL_MS = 480

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getBehindOrder(activeIndex: number, total: number) {
  return Array.from({ length: total }, (_, i) => i)
    .filter((i) => i !== activeIndex)
    .sort((a, b) => {
      const aDone = a < activeIndex ? 0 : 1
      const bDone = b < activeIndex ? 0 : 1
      if (aDone !== bDone) return aDone - bDone
      return a - b
    })
}

function getStackSlot(questionIndex: number, activeIndex: number) {
  const order = getBehindOrder(activeIndex, legacySurveyQuestions.length)
  const slot = order.indexOf(questionIndex)
  return slot >= 0 ? slot : 0
}

export function LegacySurveyFlashcardDeck() {
  const [phase, setPhase] = useState<DeckPhase>('question')
  const [cardIndex, setCardIndex] = useState(0)
  const [answers, setAnswers] = useState<LegacySurveyAnswers>({})
  const [feedbackProfile, setFeedbackProfile] =
    useState<LegacySurveyFeedbackProfile | null>(null)
  const [dealAnim, setDealAnim] = useState<DealAnim>('none')
  const [animating, setAnimating] = useState(false)
  const autoAdvanceTimer = useRef<number | null>(null)

  const totalQuestions = legacySurveyQuestions.length

  const clearAutoAdvance = useCallback(() => {
    if (autoAdvanceTimer.current !== null) {
      window.clearTimeout(autoAdvanceTimer.current)
      autoAdvanceTimer.current = null
    }
  }, [])

  useEffect(() => clearAutoAdvance, [clearAutoAdvance])

  const runDeal = useCallback(
    (direction: DealAnim, onComplete: () => void) => {
      if (animating) return

      if (prefersReducedMotion() || direction === 'none') {
        onComplete()
        return
      }

      setAnimating(true)
      setDealAnim(direction)

      window.setTimeout(() => {
        onComplete()
        setDealAnim('none')
        setAnimating(false)
      }, DEAL_MS)
    },
    [animating]
  )

  const goToResults = useCallback(() => {
    const profile = resolveLegacySurveyFeedback(answers)
    setFeedbackProfile(profile)

    runDeal('forward', () => {
      setPhase('results')
    })
  }, [answers, runDeal])

  const handleNext = useCallback(() => {
    if (animating) return
    clearAutoAdvance()

    if (cardIndex >= totalQuestions - 1) {
      goToResults()
      return
    }

    runDeal('forward', () => {
      setCardIndex((i) => i + 1)
    })
  }, [
    animating,
    cardIndex,
    clearAutoAdvance,
    goToResults,
    runDeal,
    totalQuestions,
  ])

  const handlePrev = useCallback(() => {
    if (animating || cardIndex <= 0) return
    clearAutoAdvance()

    runDeal('back', () => {
      setCardIndex((i) => i - 1)
    })
  }, [animating, cardIndex, clearAutoAdvance, runDeal])

  const handleSelectOption = useCallback(
    (questionId: string, optionId: string) => {
      if (animating) return

      setAnswers((prev) => ({ ...prev, [questionId]: [optionId] }))

      clearAutoAdvance()
      const delay = prefersReducedMotion() ? 0 : AUTO_ADVANCE_MS
      autoAdvanceTimer.current = window.setTimeout(() => {
        handleNext()
      }, delay)
    },
    [animating, clearAutoAdvance, handleNext]
  )

  function handleContinueToCommentary() {
    if (animating) return

    runDeal('forward', () => {
      setPhase('commentary')
    })
  }

  function handleRestart() {
    clearAutoAdvance()
    setAnswers({})
    setCardIndex(0)
    setPhase('question')
    setFeedbackProfile(null)
    setDealAnim('none')
    setAnimating(false)
  }

  const questionsDimmed = phase !== 'question'

  return (
    <div className="legacy-poker-stack relative mx-auto w-full max-w-lg">
      {legacySurveyQuestions.map((question, questionIndex) => {
        const isActive =
          phase === 'question' &&
          questionIndex === cardIndex &&
          dealAnim === 'none'
        const isRisingForward =
          phase === 'question' &&
          dealAnim === 'forward' &&
          questionIndex === cardIndex + 1
        const isRisingBack =
          phase === 'question' &&
          dealAnim === 'back' &&
          questionIndex === cardIndex - 1
        const isTop = isActive || isRisingForward || isRisingBack
        const stackSlot = getStackSlot(questionIndex, cardIndex)

        return (
          <div
            key={question.id}
            className={cn(
              'legacy-poker-card',
              isTop && 'legacy-poker-card--active',
              dealAnim === 'forward' &&
                phase === 'question' &&
                questionIndex === cardIndex &&
                'legacy-poker-card--deal-out',
              dealAnim === 'back' &&
                phase === 'question' &&
                questionIndex === cardIndex &&
                'legacy-poker-card--deal-out-back',
              questionsDimmed && 'legacy-poker-card--stacked-away'
            )}
            data-active={isTop ? 'true' : 'false'}
            data-stack-slot={!isTop ? stackSlot : undefined}
            aria-hidden={!isTop}
          >
            <div className="legacy-poker-card__face legacy-flashcard legacy-flashcard--question">
              <LegacySurveyQuestionCard
                question={question}
                questionIndex={questionIndex}
                totalQuestions={totalQuestions}
                selectedIds={answers[question.id] ?? []}
                onSelectOption={(optionId) =>
                  handleSelectOption(question.id, optionId)
                }
                onNext={handleNext}
                onPrev={questionIndex > 0 ? handlePrev : undefined}
                isLast={questionIndex >= totalQuestions - 1}
                nextLabel={legacySectionMeta.nextLabel}
                completeLabel={legacySectionMeta.completeLabel}
                prevLabel={legacySectionMeta.prevLabel}
                disabled={animating || !isActive}
              />
            </div>
          </div>
        )
      })}

      {phase === 'results' ? (
        <div
          className="legacy-poker-card legacy-poker-card--active legacy-poker-card--overlay legacy-poker-card--deal-in"
          data-active="true"
        >
          <div className="legacy-poker-card__face legacy-flashcard legacy-flashcard--results-shell">
            <LegacySurveyResultsDistributionCard
              onContinue={handleContinueToCommentary}
            />
          </div>
        </div>
      ) : null}

      {phase === 'commentary' && feedbackProfile ? (
        <div
          className="legacy-poker-card legacy-poker-card--active legacy-poker-card--overlay legacy-poker-card--deal-in"
          data-active="true"
        >
          <div className="legacy-poker-card__face legacy-flashcard legacy-flashcard--results-shell">
            <LegacySurveyCommentaryCard
              profile={feedbackProfile}
              onRestart={handleRestart}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
