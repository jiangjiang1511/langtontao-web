'use client'

import { useCallback, useMemo, useState } from 'react'
import { EducationChildSurveyNodePanel } from '@/components/sections/coffee2/education-child-survey-node-panel'
import { EducationChildSurveyProgress } from '@/components/sections/coffee2/education-child-survey-path'
import { EducationChildSurveyResult } from '@/components/sections/coffee2/education-child-survey-result'
import { resolveEducationSurveyOutcome } from '@/lib/content/coffee-education-survey-feedback'
import {
  educationSurveyMeta,
  educationSurveyRootChoices,
  getEducationSurveyQuestions,
  type EducationSurveyAnswers,
  type EducationSurveyOption,
  type EducationSurveyQuestion,
  type EducationSurveyTrack,
} from '@/lib/content/coffee-education-survey'
import { cn } from '@/lib/utils'

type EducationChildSurveyNavigatorProps = {
  className?: string
}

type RootPanel = {
  kind: 'root'
  prompt: string
  subPrompt?: string
  options: readonly { id: string; label: string; description?: string }[]
}

export function EducationChildSurveyNavigator({
  className,
}: EducationChildSurveyNavigatorProps) {
  const [track, setTrack] = useState<EducationSurveyTrack | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<EducationSurveyAnswers>({})

  const questions = useMemo(
    () => (track ? getEducationSurveyQuestions(track) : []),
    [track]
  )

  const isComplete =
    track !== null && questionIndex >= questions.length && questions.length > 0

  const resultProfile = useMemo(() => {
    if (!isComplete || !track) return null
    return resolveEducationSurveyOutcome(track, answers)
  }, [isComplete, track, answers])

  const currentQuestion: EducationSurveyQuestion | null = useMemo(() => {
    if (!track || isComplete) return null
    return questions[questionIndex] ?? null
  }, [track, isComplete, questions, questionIndex])

  const rootPanel: RootPanel = useMemo(
    () => ({
      kind: 'root',
      prompt: educationSurveyMeta.rootPrompt,
      subPrompt: educationSurveyMeta.rootSubPrompt,
      options: educationSurveyRootChoices,
    }),
    []
  )

  const handleRootSelect = useCallback((choiceId: string) => {
    setTrack(choiceId as EducationSurveyTrack)
    setQuestionIndex(0)
    setAnswers({})
  }, [])

  const handleQuestionSelect = useCallback(
    (option: EducationSurveyOption) => {
      if (!track || !currentQuestion) return

      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: option.id,
      }))
      setQuestionIndex((prev) => prev + 1)
    },
    [track, currentQuestion]
  )

  const handleBack = useCallback(() => {
    if (isComplete) {
      if (!track || questions.length === 0) return
      const lastQuestion = questions[questions.length - 1]
      setQuestionIndex(questions.length - 1)
      setAnswers((prev) => {
        const next = { ...prev }
        delete next[lastQuestion.id]
        return next
      })
      return
    }

    if (questionIndex > 0) {
      const prevQuestion = questions[questionIndex - 1]
      setQuestionIndex((prev) => prev - 1)
      setAnswers((prev) => {
        const next = { ...prev }
        delete next[prevQuestion.id]
        return next
      })
      return
    }

    if (track) {
      setTrack(null)
      setQuestionIndex(0)
      setAnswers({})
    }
  }, [isComplete, track, questions, questionIndex])

  const handleRestart = useCallback(() => {
    setTrack(null)
    setQuestionIndex(0)
    setAnswers({})
  }, [])

  const showBack =
    track !== null && (questionIndex > 0 || isComplete || resultProfile)

  const progressCurrent = track
    ? isComplete
      ? questions.length
      : questionIndex + 1
    : 0

  const progressTotal = track ? questions.length : 0

  return (
    <div className={cn('education-survey-navigator', className)}>
      {track ? (
        <EducationChildSurveyProgress
          current={progressCurrent}
          total={progressTotal}
          className="education-survey-navigator__progress"
        />
      ) : null}

      <div
        className="education-survey-navigator__panel"
        key={
          resultProfile?.id ??
          currentQuestion?.id ??
          (track ? 'track' : 'root')
        }
      >
        {resultProfile ? (
          <EducationChildSurveyResult
            profile={resultProfile}
            onRestart={handleRestart}
          />
        ) : currentQuestion ? (
          <EducationChildSurveyNodePanel
            question={currentQuestion}
            onSelect={handleQuestionSelect}
          />
        ) : (
          <EducationChildSurveyNodePanel
            question={{
              id: 'root',
              prompt: rootPanel.prompt,
              subPrompt: rootPanel.subPrompt,
              options: rootPanel.options.map((option) => ({
                ...option,
                weights: {},
              })),
            }}
            onSelect={(option) => handleRootSelect(option.id)}
          />
        )}
      </div>

      {showBack ? (
        <div className="education-survey-navigator__footer">
          <button
            type="button"
            className="education-survey-navigator__back"
            onClick={handleBack}
          >
            {educationSurveyMeta.backLabel}
          </button>
        </div>
      ) : null}
    </div>
  )
}
