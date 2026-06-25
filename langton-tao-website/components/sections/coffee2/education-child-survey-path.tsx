'use client'

import { cn } from '@/lib/utils'

type EducationChildSurveyProgressProps = {
  current: number
  total: number
  className?: string
}

export function EducationChildSurveyProgress({
  current,
  total,
  className,
}: EducationChildSurveyProgressProps) {
  if (total <= 0) return null

  return (
    <div
      className={cn('education-survey-progress', className)}
      aria-label={`对话进度，第 ${current} 步`}
    >
      <div className="education-survey-progress__meta">
        <span className="education-survey-progress__label">聊到哪了</span>
      </div>
      <ol className="education-survey-progress__steps" aria-hidden>
        {Array.from({ length: total }, (_, index) => {
          const step = index + 1
          const isDone = step < current
          const isActive = step === current && current <= total

          return (
            <li
              key={step}
              className={cn(
                'education-survey-progress__step',
                isDone && 'education-survey-progress__step--done',
                isActive && 'education-survey-progress__step--active'
              )}
            />
          )
        })}
      </ol>
    </div>
  )
}

// Keep path file name for minimal import churn; export progress as primary UI.
export { EducationChildSurveyProgress as EducationChildSurveyPath }
