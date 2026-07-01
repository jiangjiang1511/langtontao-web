'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  LangtontaoWishlistQuestionCard,
  WISHLIST_AUTO_ADVANCE_MS,
} from '@/components/sections/langtontao/langtontao-wishlist-question-card'
import { LangtontaoWishlistResults } from '@/components/sections/langtontao/langtontao-wishlist-results'
import { WishlistTopicWindows } from '@/components/sections/langtontao/langtontao-wishlist-topic-windows'
import {
  flattenToDiscoveredWaypoints,
  mergeDiscoveredWaypoints,
  segmentToDiscoveredWaypoints,
  type WishlistDiscoveredWaypoint,
} from '@/lib/content/langtontao/langtontao-wishlist-timeline'
import {
  langtontaoWishlistQuestions,
  type WishlistAnswers,
} from '@/lib/content/langtontao/langtontao-wishlist-survey'
import { cn } from '@/lib/utils'

type DeckPhase = 'question' | 'results'
type SlideAnim = 'none' | 'forward' | 'back'

const SLIDE_MS = 480

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
  const order = getBehindOrder(activeIndex, langtontaoWishlistQuestions.length)
  const slot = order.indexOf(questionIndex)
  return slot >= 0 ? slot : 0
}

type LangtontaoWishlistFlashcardDeckProps = {
  initialDiscoveredWaypoints?: WishlistDiscoveredWaypoint[]
  initialAnswers?: WishlistAnswers
  initialPhase?: DeckPhase
}

export function LangtontaoWishlistFlashcardDeck({
  initialDiscoveredWaypoints = [],
  initialAnswers,
  initialPhase = 'question',
}: LangtontaoWishlistFlashcardDeckProps = {}) {
  const [phase, setPhase] = useState<DeckPhase>(initialPhase)
  const [cardIndex, setCardIndex] = useState(0)
  const [answers, setAnswers] = useState<WishlistAnswers>(initialAnswers ?? {})
  const [discoveredWaypoints, setDiscoveredWaypoints] = useState<
    WishlistDiscoveredWaypoint[]
  >(initialDiscoveredWaypoints)
  const [revealAllTopics, setRevealAllTopics] = useState(
    initialDiscoveredWaypoints.length >= flattenToDiscoveredWaypoints().length
  )
  const [slideAnim, setSlideAnim] = useState<SlideAnim>('none')
  const [animating, setAnimating] = useState(false)
  const autoAdvanceTimer = useRef<number | null>(null)

  const totalQuestions = langtontaoWishlistQuestions.length

  const clearAutoAdvance = useCallback(() => {
    if (autoAdvanceTimer.current !== null) {
      window.clearTimeout(autoAdvanceTimer.current)
      autoAdvanceTimer.current = null
    }
  }, [])

  useEffect(() => clearAutoAdvance, [clearAutoAdvance])

  const unlockSegmentWaypoints = useCallback((segmentIndex: number) => {
    setDiscoveredWaypoints((current) =>
      mergeDiscoveredWaypoints(current, segmentToDiscoveredWaypoints(segmentIndex))
    )
  }, [])

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
    unlockSegmentWaypoints(cardIndex)
    runSlide('forward', () => {
      setPhase('results')
    })
  }, [cardIndex, runSlide, unlockSegmentWaypoints])

  const handleNext = useCallback(() => {
    if (animating) return
    clearAutoAdvance()

    unlockSegmentWaypoints(cardIndex)

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
    unlockSegmentWaypoints,
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

      setAnswers((prev) => ({ ...prev, [questionId]: optionId }))

      clearAutoAdvance()
      const delay = prefersReducedMotion() ? 0 : WISHLIST_AUTO_ADVANCE_MS
      autoAdvanceTimer.current = window.setTimeout(() => {
        handleNext()
      }, delay)
    },
    [animating, clearAutoAdvance, handleNext]
  )

  const handleRevealAllTopics = useCallback(() => {
    setDiscoveredWaypoints(flattenToDiscoveredWaypoints())
    setRevealAllTopics(true)
  }, [])

  const handleRestart = useCallback(() => {
    clearAutoAdvance()
    setAnswers({})
    setCardIndex(0)
    setPhase('question')
    setDiscoveredWaypoints([])
    setRevealAllTopics(false)
    setSlideAnim('none')
    setAnimating(false)
  }, [clearAutoAdvance])

  const questionsDimmed = phase !== 'question'

  return (
    <div className="lt-wishlist-survey mx-auto w-full max-w-lg">
      <div className="lt-wishlist-flashcard-stack relative mx-auto w-full">
          {langtontaoWishlistQuestions.map((question, questionIndex) => {
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
                  'lt-wishlist-flashcard-card',
                  isTop && 'lt-wishlist-flashcard-card--active',
                  slideAnim === 'forward' &&
                    phase === 'question' &&
                    questionIndex === cardIndex &&
                    'lt-wishlist-flashcard-card--slide-out',
                  slideAnim === 'back' &&
                    phase === 'question' &&
                    questionIndex === cardIndex &&
                    'lt-wishlist-flashcard-card--slide-out-back',
                  questionsDimmed && 'lt-wishlist-flashcard-card--stacked-away'
                )}
                data-active={isTop ? 'true' : 'false'}
                data-stack-slot={!isTop ? stackSlot : undefined}
                aria-hidden={!isTop}
              >
                <div className="lt-wishlist-flashcard-card__face">
                  <LangtontaoWishlistQuestionCard
                    question={question}
                    questionIndex={questionIndex}
                    totalQuestions={totalQuestions}
                    selectedOptionId={answers[question.id]}
                    onSelectOption={(optionId) =>
                      handleSelectOption(question.id, optionId)
                    }
                    onPrev={questionIndex > 0 ? handlePrev : undefined}
                    disabled={animating || !isActive}
                  />
                </div>
              </div>
            )
          })}

          {phase === 'results' ? (
            <div
              className="lt-wishlist-flashcard-card lt-wishlist-flashcard-card--active lt-wishlist-flashcard-card--overlay lt-wishlist-flashcard-card--slide-in"
              data-active="true"
            >
              <div className="lt-wishlist-flashcard-card__face lt-wishlist-flashcard-card__face--results">
                <LangtontaoWishlistResults answers={answers} onRestart={handleRestart} />
              </div>
            </div>
          ) : null}
      </div>

      <div className="lt-wishlist-survey__toolbar mt-5 flex flex-col items-center gap-2">
        <button
          type="button"
          className="c2-btn-secondary text-sm"
          onClick={handleRevealAllTopics}
        >
          浏览全部关注点
        </button>
        {revealAllTopics ? (
          <p className="text-center text-xs text-zinc-400">
            已展示全部话题，仍可继续填写问卷
          </p>
        ) : null}
      </div>

      <div className="lt-wishlist-survey__topics mt-8">
        <WishlistTopicWindows items={discoveredWaypoints} />
      </div>
    </div>
  )
}
