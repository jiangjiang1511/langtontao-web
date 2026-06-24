'use client'

import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { DebtSurveyFlashcardDeck } from '@/components/sections/coffee2/debt-survey-flashcard-deck'
import { debtSectionMeta } from '@/lib/content/coffee-debt-page'

export function DebtSurveySection() {
  return (
    <section
      className="debt-survey-stage"
      aria-labelledby="debt-survey-stage-title"
    >
      <Coffee2Reveal
        center
        className="debt-survey-stage__grid debt-survey-stage__reveal"
      >
        <div className="debt-survey-stage__intro debt-survey-stage__reveal-item">
          <p className="debt-survey-stage__eyebrow c2-eyebrow">
            {debtSectionMeta.surveyStageEyebrow}
          </p>
          <h4
            id="debt-survey-stage-title"
            className="debt-survey-stage__title"
          >
            {debtSectionMeta.surveyStageTitle}
          </h4>
          <p className="debt-survey-stage__lead">
            {debtSectionMeta.surveyStageLead}
          </p>
          <p className="debt-survey-stage__hint">
            <span className="debt-survey-stage__hint-dot" aria-hidden />
            {debtSectionMeta.surveyStageHint}
          </p>
        </div>

        <div className="debt-survey-stage__deck-wrap debt-survey-stage__reveal-item debt-survey-stage__reveal-item--deck">
          <DebtSurveyFlashcardDeck />
        </div>
      </Coffee2Reveal>
    </section>
  )
}
