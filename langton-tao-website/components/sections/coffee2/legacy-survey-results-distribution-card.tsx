'use client'

import { LegacySurveyResults } from '@/components/sections/coffee2/legacy-survey-results'
import {
  legacySectionMeta,
  legacySurveyQuestions,
} from '@/lib/content/coffee-legacy-page'

type LegacySurveyResultsDistributionCardProps = {
  onContinue: () => void
}

export function LegacySurveyResultsDistributionCard({
  onContinue,
}: LegacySurveyResultsDistributionCardProps) {
  return (
    <div className="legacy-flashcard legacy-flashcard--results flex h-full flex-col p-6 md:p-8">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
        社群演示分布
      </p>

      <div className="mt-4 flex-1">
        <LegacySurveyResults
          questions={legacySurveyQuestions}
          visible
          variant="flashcard"
        />
      </div>

      <div className="legacy-flashcard__footer mt-5 border-t border-zinc-100 pt-4">
        <button
          type="button"
          className="legacy-flashcard__primary-btn w-full rounded-lg border-2 border-zinc-900 bg-zinc-900 py-2.5 text-sm font-semibold text-white shadow-[3px_3px_0_0_var(--jarsy-violet)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          onClick={onContinue}
        >
          {legacySectionMeta.surveyResultsContinueLabel}
        </button>
      </div>
    </div>
  )
}
