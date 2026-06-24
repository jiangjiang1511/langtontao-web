'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ALLIANCE_AUTO_ADVANCE_MS,
  AllianceSurveyQuestionCard,
} from '@/components/sections/coffee2/alliance-survey-question-card'
import { AllianceSurveyCommentaryCard } from '@/components/sections/coffee2/alliance-survey-commentary-card'
import { AllianceSurveyResultsCard } from '@/components/sections/coffee2/alliance-survey-results-card'
import {
  allianceSectionMeta,
  type AllianceSurveyAnswers,
  type AllianceSurveyDefinition,
} from '@/lib/content/coffee-alliance-page'
import {
  resolveAllianceSurveyFeedback,
  type AllianceSurveyFeedbackProfile,
} from '@/lib/content/coffee-alliance-survey-feedback'
import { cn } from '@/lib/utils'

type DeckPhase = 'question' | 'results' | 'commentary'
type DealAnim = 'none' | 'forward' | 'back'

const DEAL_MS = 480

type AllianceSurveyFlashcardDeckProps = {
  survey: AllianceSurveyDefinition
}

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

function getStackSlot(questionIndex: number, activeIndex: number, total: number) {
  const order = getBehindOrder(activeIndex, total)
  const slot = order.indexOf(questionIndex)
  return slot >= 0 ? slot : 0
}

export function AllianceSurveyFlashcardDeck({ survey }: AllianceSurveyFlashcardDeckProps) {
  const { questions, variant } = survey
  const totalQuestions = questions.length

  const [phase, setPhase] = useState<DeckPhase>('question')
  const [cardIndex, setCardIndex] = useState(0)
  const [answers, setAnswers] = useState<AllianceSurveyAnswers>({})
  const [feedbackProfile, setFeedbackProfile] =
    useState<AllianceSurveyFeedbackProfile | null>(null)
  const [dealAnim, setDealAnim] = useState<DealAnim>('none')
  const [animating, setAnimating] = useState(false)
  const autoAdvanceTimer = useRef<number | null>(null)

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
    const profile = resolveAllianceSurveyFeedback(survey.id, answers)
    setFeedbackProfile(profile)

    runDeal('forward', () => {
      setPhase('results')
    })
  }, [answers, runDeal, survey.id])

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

      const question = questions.find((q) => q.id === questionId)
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
        const delay = prefersReducedMotion() ? 0 : ALLIANCE_AUTO_ADVANCE_MS
        autoAdvanceTimer.current = window.setTimeout(() => {
          handleNext()
        }, delay)
      }
    },
    [animating, clearAutoAdvance, handleNext, questions]
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
    <div
      className="alliance-flashcard-stack relative mx-auto w-full"
      data-variant={variant}
    >
      {questions.map((question, questionIndex) => {
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
        const stackSlot = getStackSlot(questionIndex, cardIndex, totalQuestions)

        return (
          <div
            key={question.id}
            className={cn(
              'alliance-flashcard-slot',
              isTop && 'alliance-flashcard-slot--active',
              dealAnim === 'forward' &&
                phase === 'question' &&
                questionIndex === cardIndex &&
                'alliance-flashcard-slot--deal-out',
              dealAnim === 'back' &&
                phase === 'question' &&
                questionIndex === cardIndex &&
                'alliance-flashcard-slot--deal-out-back',
              questionsDimmed && 'alliance-flashcard-slot--stacked-away'
            )}
            data-active={isTop ? 'true' : 'false'}
            data-stack-slot={!isTop ? stackSlot : undefined}
            data-variant={variant}
            aria-hidden={!isTop}
          >
            <div className="alliance-flashcard alliance-flashcard--question">
              <AllianceSurveyQuestionCard
                variant={variant}
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
                nextLabel={allianceSectionMeta.nextLabel}
                completeLabel={allianceSectionMeta.completeLabel}
                prevLabel={allianceSectionMeta.prevLabel}
                tapHint={survey.hint}
                disabled={animating || !isActive}
              />
            </div>
          </div>
        )
      })}

      {phase === 'results' ? (
        <div
          className="alliance-flashcard-slot alliance-flashcard-slot--active alliance-flashcard-slot--overlay alliance-flashcard-slot--deal-in"
          data-active="true"
          data-variant={variant}
        >
          <AllianceSurveyResultsCard
            survey={survey}
            onContinue={handleContinueToCommentary}
          />
        </div>
      ) : null}

      {phase === 'commentary' && feedbackProfile ? (
        <div
          className="alliance-flashcard-slot alliance-flashcard-slot--active alliance-flashcard-slot--overlay alliance-flashcard-slot--deal-in"
          data-active="true"
          data-variant={variant}
        >
          <AllianceSurveyCommentaryCard
            variant={variant}
            profile={feedbackProfile}
            onRestart={handleRestart}
          />
        </div>
      ) : null}
    </div>
  )
}
