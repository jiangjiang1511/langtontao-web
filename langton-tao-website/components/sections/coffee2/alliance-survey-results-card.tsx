'use client'

import { AllianceSurveyResults } from '@/components/sections/coffee2/alliance-survey-results'
import {
  allianceSectionMeta,
  type AllianceSurveyDefinition,
} from '@/lib/content/coffee-alliance-page'

type AllianceSurveyResultsCardProps = {
  survey: AllianceSurveyDefinition
  onContinue: () => void
}

export function AllianceSurveyResultsCard({
  survey,
  onContinue,
}: AllianceSurveyResultsCardProps) {
  return (
    <div
      className="alliance-flashcard alliance-flashcard--results flex h-full flex-col p-4 md:p-5"
      data-variant={survey.variant}
    >
      <p className="alliance-flashcard__eyebrow text-[10px] font-medium uppercase tracking-widest">
        {allianceSectionMeta.resultsEyebrow}
      </p>

      <div className="mt-3 flex-1 overflow-y-auto">
        <AllianceSurveyResults
          questions={survey.questions}
          visible
          variant={survey.variant}
        />
      </div>

      <div className="alliance-flashcard__footer mt-4 border-t pt-3">
        <button
          type="button"
          className="alliance-flashcard__primary-btn w-full rounded-lg border-2 py-2 text-xs font-semibold"
          onClick={onContinue}
        >
          {allianceSectionMeta.resultsContinueLabel}
        </button>
      </div>
    </div>
  )
}
