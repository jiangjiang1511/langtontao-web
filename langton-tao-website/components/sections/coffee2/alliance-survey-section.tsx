'use client'

import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { AllianceSurveyMatrix } from '@/components/sections/coffee2/alliance-survey-matrix'
import { allianceSectionMeta } from '@/lib/content/coffee-alliance-page'

export function AllianceSurveySection() {
  return (
    <div className="alliance-survey-section mt-12 md:mt-16">
      <Coffee2Reveal delay={0} className="alliance-survey-section__intro mx-auto max-w-3xl text-center">
        <p className="c2-eyebrow">{allianceSectionMeta.matrixEyebrow}</p>
        <h3 className="alliance-survey-section__title mt-3 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
          {allianceSectionMeta.matrixTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 md:text-base">
          {allianceSectionMeta.matrixLead}
        </p>
        <p className="alliance-survey-section__hint mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-zinc-400">
          <span className="alliance-survey-section__hint-dot" aria-hidden />
          {allianceSectionMeta.matrixHint}
        </p>
      </Coffee2Reveal>

      <AllianceSurveyMatrix />
    </div>
  )
}
