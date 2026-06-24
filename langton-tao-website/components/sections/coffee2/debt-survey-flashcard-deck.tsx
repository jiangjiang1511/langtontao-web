'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AUTO_ADVANCE_MS,
  DebtSurveyQuestionCard,
} from '@/components/sections/coffee2/debt-survey-question-card'
import { DebtSurveyCommentaryCard } from '@/components/sections/coffee2/debt-survey-commentary-card'
import { DebtSurveyResultsDistributionCard } from '@/components/sections/coffee2/debt-survey-results-distribution-card'
import {
  debtSectionMeta,
  debtSurveyQuestions,
  type DebtSurveyAnswers,
} from '@/lib/content/coffee-debt-page'
import {
  resolveDebtSurveyFeedback,
  type DebtSurveyFeedbackProfile,
} from '@/lib/content/coffee-debt-survey-feedback'
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
  const order = getBehindOrder(activeIndex, debtSurveyQuestions.length)
  const slot = order.indexOf(questionIndex)
  return slot >= 0 ? slot : 0
}

export function DebtSurveyFlashcardDeck() {
  const [phase, setPhase] = useState<DeckPhase>('question')
  const [cardIndex, setCardIndex] = useState(0)
  const [answers, setAnswers] = useState<DebtSurveyAnswers>({})
  const [feedbackProfile, setFeedbackProfile] =
    useState<DebtSurveyFeedbackProfile | null>(null)
  const [dealAnim, setDealAnim] = useState<DealAnim>('none')
  const [animating, setAnimating] = useState(false)
  const autoAdvanceTimer = useRef<number | null>(null)

  const totalQuestions = debtSurveyQuestions.length

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
    const profile = resolveDebtSurveyFeedback(answers)
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

      const question = debtSurveyQuestions.find((q) => q.id === questionId)
      if (!question) return

      setAnswers((prev) => {
        if (question.selectionMode === 'single') {
          return { ...prev, [questionId]: [optionId] }
        }

        const current = prev[questionId] ?? []
        const next = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId]
        return { ...prev, [questionId]: next }
      })

      if (question.selectionMode === 'single') {
        clearAutoAdvance()
        const delay = prefersReducedMotion() ? 0 : AUTO_ADVANCE_MS
        autoAdvanceTimer.current = window.setTimeout(() => {
          handleNext()
        }, delay)
      }
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
    <div className="debt-poker-stack relative mx-auto w-full max-w-lg">
      {debtSurveyQuestions.map((question, questionIndex) => {
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
              'debt-poker-card',
              isTop && 'debt-poker-card--active',
              dealAnim === 'forward' &&
                phase === 'question' &&
                questionIndex === cardIndex &&
                'debt-poker-card--deal-out',
              dealAnim === 'back' &&
                phase === 'question' &&
                questionIndex === cardIndex &&
                'debt-poker-card--deal-out-back',
              questionsDimmed && 'debt-poker-card--stacked-away'
            )}
            data-active={isTop ? 'true' : 'false'}
            data-stack-slot={!isTop ? stackSlot : undefined}
            aria-hidden={!isTop}
          >
            <div className="debt-poker-card__face debt-flashcard debt-flashcard--question">
              <DebtSurveyQuestionCard
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
                nextLabel={debtSectionMeta.nextLabel}
                completeLabel={debtSectionMeta.completeLabel}
                prevLabel={debtSectionMeta.prevLabel}
                disabled={animating || !isActive}
              />
            </div>
          </div>
        )
      })}

      {phase === 'results' ? (
        <div
          className="debt-poker-card debt-poker-card--active debt-poker-card--overlay debt-poker-card--deal-in"
          data-active="true"
        >
          <div className="debt-poker-card__face debt-flashcard debt-flashcard--results-shell">
            <DebtSurveyResultsDistributionCard
              onContinue={handleContinueToCommentary}
            />
          </div>
        </div>
      ) : null}

      {phase === 'commentary' && feedbackProfile ? (
        <div
          className="debt-poker-card debt-poker-card--active debt-poker-card--overlay debt-poker-card--deal-in"
          data-active="true"
        >
          <div className="debt-poker-card__face debt-flashcard debt-flashcard--results-shell">
            <DebtSurveyCommentaryCard
              profile={feedbackProfile}
              answers={answers}
              onRestart={handleRestart}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
