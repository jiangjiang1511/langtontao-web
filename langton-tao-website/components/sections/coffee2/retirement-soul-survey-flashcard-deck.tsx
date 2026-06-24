'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  RETIREMENT_SOUL_AUTO_ADVANCE_MS,
  RetirementSoulSurveyQuestionCard,
} from '@/components/sections/coffee2/retirement-soul-survey-question-card'
import { RetirementSoulSurveyCommentaryCard } from '@/components/sections/coffee2/retirement-soul-survey-commentary-card'
import { RetirementSoulSurveyResultsCard } from '@/components/sections/coffee2/retirement-soul-survey-results-card'
import {
  retirementSectionMeta,
  retirementSoulSurveyQuestions,
  type RetirementSoulSurveyAnswers,
} from '@/lib/content/coffee-retirement-page'
import {
  resolveRetirementSoulSurveyFeedback,
  type RetirementSoulSurveyFeedbackProfile,
} from '@/lib/content/coffee-retirement-survey-feedback'
import { cn } from '@/lib/utils'

type DeckPhase = 'question' | 'results' | 'commentary'
type SlideAnim = 'none' | 'forward' | 'back'

const SLIDE_MS = 420

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
  const order = getBehindOrder(activeIndex, retirementSoulSurveyQuestions.length)
  const slot = order.indexOf(questionIndex)
  return slot >= 0 ? slot : 0
}

export function RetirementSoulSurveyFlashcardDeck() {
  const [phase, setPhase] = useState<DeckPhase>('question')
  const [cardIndex, setCardIndex] = useState(0)
  const [answers, setAnswers] = useState<RetirementSoulSurveyAnswers>({})
  const [feedbackProfile, setFeedbackProfile] =
    useState<RetirementSoulSurveyFeedbackProfile | null>(null)
  const [slideAnim, setSlideAnim] = useState<SlideAnim>('none')
  const [animating, setAnimating] = useState(false)
  const autoAdvanceTimer = useRef<number | null>(null)

  const totalQuestions = retirementSoulSurveyQuestions.length

  const clearAutoAdvance = useCallback(() => {
    if (autoAdvanceTimer.current !== null) {
      window.clearTimeout(autoAdvanceTimer.current)
      autoAdvanceTimer.current = null
    }
  }, [])

  useEffect(() => clearAutoAdvance, [clearAutoAdvance])

  const runSlide = useCallback(
    (direction: SlideAnim, onComplete: () => void) => {
      if (animating) return

      if (prefersReducedMotion() || direction === 'none') {
        onComplete()
        return
      }

      setAnimating(true)
      setSlideAnim(direction)

      window.setTimeout(() => {
        onComplete()
        setSlideAnim('none')
        setAnimating(false)
      }, SLIDE_MS)
    },
    [animating]
  )

  const goToResults = useCallback(() => {
    const profile = resolveRetirementSoulSurveyFeedback(answers)
    setFeedbackProfile(profile)

    runSlide('forward', () => {
      setPhase('results')
    })
  }, [answers, runSlide])

  const handleNext = useCallback(() => {
    if (animating) return
    clearAutoAdvance()

    if (cardIndex >= totalQuestions - 1) {
      goToResults()
      return
    }

    runSlide('forward', () => {
      setCardIndex((i) => i + 1)
    })
  }, [
    animating,
    cardIndex,
    clearAutoAdvance,
    goToResults,
    runSlide,
    totalQuestions,
  ])

  const handlePrev = useCallback(() => {
    if (animating || cardIndex <= 0) return
    clearAutoAdvance()

    runSlide('back', () => {
      setCardIndex((i) => i - 1)
    })
  }, [animating, cardIndex, clearAutoAdvance, runSlide])

  const handleSelectOption = useCallback(
    (questionId: string, optionId: string) => {
      if (animating) return

      setAnswers((prev) => ({ ...prev, [questionId]: [optionId] }))

      clearAutoAdvance()
      const delay = prefersReducedMotion() ? 0 : RETIREMENT_SOUL_AUTO_ADVANCE_MS
      autoAdvanceTimer.current = window.setTimeout(() => {
        handleNext()
      }, delay)
    },
    [animating, clearAutoAdvance, handleNext]
  )

  function handleContinueToCommentary() {
    if (animating) return

    runSlide('forward', () => {
      setPhase('commentary')
    })
  }

  function handleRestart() {
    clearAutoAdvance()
    setAnswers({})
    setCardIndex(0)
    setPhase('question')
    setFeedbackProfile(null)
    setSlideAnim('none')
    setAnimating(false)
  }

  const questionsDimmed = phase !== 'question'

  return (
    <div className="retirement-chart-stack relative mx-auto w-full max-w-lg">
      {retirementSoulSurveyQuestions.map((question, questionIndex) => {
        const isActive =
          phase === 'question' &&
          questionIndex === cardIndex &&
          slideAnim === 'none'
        const isRisingForward =
          phase === 'question' &&
          slideAnim === 'forward' &&
          questionIndex === cardIndex + 1
        const isRisingBack =
          phase === 'question' &&
          slideAnim === 'back' &&
          questionIndex === cardIndex - 1
        const isTop = isActive || isRisingForward || isRisingBack
        const stackSlot = getStackSlot(questionIndex, cardIndex)

        return (
          <div
            key={question.id}
            className={cn(
              'retirement-chart-card',
              isTop && 'retirement-chart-card--active',
              slideAnim === 'forward' &&
                phase === 'question' &&
                questionIndex === cardIndex &&
                'retirement-chart-card--slide-out',
              slideAnim === 'back' &&
                phase === 'question' &&
                questionIndex === cardIndex &&
                'retirement-chart-card--slide-out-back',
              questionsDimmed && 'retirement-chart-card--stacked-away'
            )}
            data-active={isTop ? 'true' : 'false'}
            data-stack-slot={!isTop ? stackSlot : undefined}
            aria-hidden={!isTop}
          >
            <div className="retirement-chart-card__face">
              <RetirementSoulSurveyQuestionCard
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
                nextLabel={retirementSectionMeta.soulNextLabel}
                completeLabel={retirementSectionMeta.soulCompleteLabel}
                prevLabel={retirementSectionMeta.soulPrevLabel}
                tapHint={retirementSectionMeta.soulTapHint}
                disabled={animating || !isActive}
              />
            </div>
          </div>
        )
      })}

      {phase === 'results' ? (
        <div
          className="retirement-chart-card retirement-chart-card--active retirement-chart-card--overlay retirement-chart-card--slide-in"
          data-active="true"
        >
          <div className="retirement-chart-card__face">
            <RetirementSoulSurveyResultsCard
              answers={answers}
              onContinue={handleContinueToCommentary}
            />
          </div>
        </div>
      ) : null}

      {phase === 'commentary' && feedbackProfile ? (
        <div
          className="retirement-chart-card retirement-chart-card--active retirement-chart-card--overlay retirement-chart-card--slide-in"
          data-active="true"
        >
          <div className="retirement-chart-card__face">
            <RetirementSoulSurveyCommentaryCard
              profile={feedbackProfile}
              onRestart={handleRestart}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
