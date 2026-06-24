'use client'

import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LegacySurveyFlashcardDeck } from '@/components/sections/coffee2/legacy-survey-flashcard-deck'
import { legacySectionMeta } from '@/lib/content/coffee-legacy-page'

export function LegacySurveySection() {
  return (
    <section
      className="legacy-survey-stage"
      aria-labelledby="legacy-survey-stage-title"
    >
      <Coffee2Reveal
        center
        className="legacy-survey-stage__grid legacy-survey-stage__reveal"
      >
        <div className="legacy-survey-stage__intro legacy-survey-stage__reveal-item">
          <p className="legacy-survey-stage__eyebrow c2-eyebrow">
            {legacySectionMeta.surveyStageEyebrow}
          </p>
          <h4
            id="legacy-survey-stage-title"
            className="legacy-survey-stage__title"
          >
            {legacySectionMeta.surveyStageTitle}
          </h4>
          <p className="legacy-survey-stage__lead">
            {legacySectionMeta.surveyStageLead}
          </p>
          <p className="legacy-survey-stage__hint">
            <span className="legacy-survey-stage__hint-dot" aria-hidden />
            {legacySectionMeta.surveyStageHint}
          </p>
        </div>

        <div className="legacy-survey-stage__deck-wrap legacy-survey-stage__reveal-item legacy-survey-stage__reveal-item--deck">
          <LegacySurveyFlashcardDeck />
        </div>
      </Coffee2Reveal>
    </section>
  )
}
