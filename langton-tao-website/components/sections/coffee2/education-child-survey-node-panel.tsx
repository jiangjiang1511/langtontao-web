'use client'

import type { EducationSurveyQuestion } from '@/lib/content/coffee-education-survey'
import type { EducationSurveyOption } from '@/lib/content/coffee-education-survey'
import { cn } from '@/lib/utils'

type EducationChildSurveyNodePanelProps = {
  question: EducationSurveyQuestion
  onSelect: (option: EducationSurveyOption) => void
  className?: string
}

export function EducationChildSurveyNodePanel({
  question,
  onSelect,
  className,
}: EducationChildSurveyNodePanelProps) {
  return (
    <div className={cn('education-survey-node', className)}>
      <header className="education-survey-node__header">
        <h5 className="education-survey-node__prompt">{question.prompt}</h5>
        {question.subPrompt ? (
          <p className="education-survey-node__sub">{question.subPrompt}</p>
        ) : null}
      </header>

      <ul className="education-survey-node__choices" role="list">
        {question.options.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              className="education-survey-option"
              onClick={() => onSelect(option)}
            >
              <span className="education-survey-option__label">{option.label}</span>
              {option.description ? (
                <span className="education-survey-option__desc">
                  {option.description}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
