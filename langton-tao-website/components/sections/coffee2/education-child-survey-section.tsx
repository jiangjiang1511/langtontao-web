'use client'

import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { EducationChildSurveyNavigator } from '@/components/sections/coffee2/education-child-survey-navigator'
import { educationSurveyMeta } from '@/lib/content/coffee-education-survey'

export function EducationChildSurveySection() {
  return (
    <section
      className="education-survey-stage"
      aria-labelledby="education-survey-stage-title"
    >
      <Coffee2Reveal
        center
        className="education-survey-stage__grid education-survey-stage__reveal"
      >
        <div className="education-survey-stage__intro education-survey-stage__reveal-item">
          <p className="education-survey-stage__eyebrow c2-eyebrow">
            {educationSurveyMeta.eyebrow}
          </p>
          <h4
            id="education-survey-stage-title"
            className="education-survey-stage__title"
          >
            {educationSurveyMeta.title}
          </h4>
          <p className="education-survey-stage__lead">{educationSurveyMeta.lead}</p>
          <p className="education-survey-stage__hint">
            <span className="education-survey-stage__hint-dot" aria-hidden />
            {educationSurveyMeta.hint}
          </p>
        </div>

        <div className="education-survey-stage__panel-wrap education-survey-stage__reveal-item education-survey-stage__reveal-item--panel">
          <EducationChildSurveyNavigator />
        </div>
      </Coffee2Reveal>
    </section>
  )
}
