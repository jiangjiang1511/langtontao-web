'use client'

import type { CSSProperties } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { AllianceSurveyFlashcardDeck } from '@/components/sections/coffee2/alliance-survey-flashcard-deck'
import type { AllianceSurveyDefinition } from '@/lib/content/coffee-alliance-page'
import { allianceMatrixOffsets } from '@/lib/content/coffee-alliance-page'

type AllianceSurveyCellProps = {
  survey: AllianceSurveyDefinition
  revealDelay: number
}

export function AllianceSurveyCell({ survey, revealDelay }: AllianceSurveyCellProps) {
  const offset = allianceMatrixOffsets[survey.id]

  const cellStyle = {
    '--alliance-cell-y': `${offset.translateY}px`,
    '--alliance-cell-rotate': `${offset.rotate}deg`,
  } as CSSProperties

  return (
    <div
      className="alliance-survey-cell"
      style={cellStyle}
      data-alliance-id={survey.id}
    >
      <Coffee2Reveal delay={revealDelay}>
        <header className="alliance-survey-cell__header">
          <p className="alliance-survey-cell__eyebrow">{survey.eyebrow}</p>
          <h3 className="alliance-survey-cell__title">{survey.title}</h3>
          <p className="alliance-survey-cell__hook">{survey.hook}</p>
        </header>

        <div className="alliance-survey-cell__deck">
          <AllianceSurveyFlashcardDeck survey={survey} />
        </div>
      </Coffee2Reveal>
    </div>
  )
}
