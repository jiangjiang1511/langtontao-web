'use client'

import { AllianceSurveyCell } from '@/components/sections/coffee2/alliance-survey-cell'
import { allianceSurveys } from '@/lib/content/coffee-alliance-page'

const STAGGER_MS = 140

export function AllianceSurveyMatrix() {
  return (
    <div className="alliance-survey-matrix">
      {allianceSurveys.map((survey, index) => (
        <AllianceSurveyCell
          key={survey.id}
          survey={survey}
          revealDelay={index * STAGGER_MS}
        />
      ))}
    </div>
  )
}
