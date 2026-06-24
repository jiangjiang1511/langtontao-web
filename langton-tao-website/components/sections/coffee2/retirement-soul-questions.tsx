'use client'

import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { RetirementSoulSurveyFlashcardDeck } from '@/components/sections/coffee2/retirement-soul-survey-flashcard-deck'
import { retirementSectionMeta } from '@/lib/content/coffee-retirement-page'

export function RetirementSoulQuestions() {
  return (
    <section
      className="retirement-soul-survey-stage"
      aria-labelledby="retirement-soul-survey-title"
    >
      <Coffee2Reveal
        center
        className="retirement-soul-survey-stage__grid retirement-soul-survey-stage__reveal"
      >
        <div className="retirement-soul-survey-stage__intro retirement-soul-survey-stage__reveal-item">
          <p className="c2-eyebrow">{retirementSectionMeta.soulEyebrow}</p>
          <h3
            id="retirement-soul-survey-title"
            className="retirement-soul-survey-stage__title"
          >
            {retirementSectionMeta.soulTitle}
          </h3>
          <p className="retirement-soul-survey-stage__lead">
            {retirementSectionMeta.soulLead}
          </p>
          <p className="retirement-soul-survey-stage__hint">
            <span className="retirement-soul-survey-stage__hint-dot" aria-hidden />
            {retirementSectionMeta.soulHint}
          </p>
        </div>

        <div className="retirement-soul-survey-stage__deck-wrap retirement-soul-survey-stage__reveal-item retirement-soul-survey-stage__reveal-item--deck">
          <RetirementSoulSurveyFlashcardDeck />
        </div>
      </Coffee2Reveal>
    </section>
  )
}
