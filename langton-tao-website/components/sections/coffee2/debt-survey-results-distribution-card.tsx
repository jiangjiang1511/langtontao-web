'use client'

import { DebtSurveyResults } from '@/components/sections/coffee2/debt-survey-results'
import {
  debtSectionMeta,
  debtSurveyQuestions,
} from '@/lib/content/coffee-debt-page'

type DebtSurveyResultsDistributionCardProps = {
  onContinue: () => void
}

export function DebtSurveyResultsDistributionCard({
  onContinue,
}: DebtSurveyResultsDistributionCardProps) {
  return (
    <div className="debt-flashcard debt-flashcard--results flex h-full flex-col p-6 md:p-8">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
        社群演示分布
      </p>

      <div className="mt-4 flex-1">
        <DebtSurveyResults
          questions={debtSurveyQuestions}
          visible
          variant="flashcard"
        />
      </div>

      <div className="debt-flashcard__footer mt-5 border-t border-zinc-100 pt-4">
        <button
          type="button"
          className="debt-flashcard__primary-btn w-full rounded-lg border-2 border-zinc-900 bg-zinc-900 py-2.5 text-sm font-semibold text-white shadow-[3px_3px_0_0_#ffe600] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          onClick={onContinue}
        >
          {debtSectionMeta.surveyResultsContinueLabel}
        </button>
      </div>
    </div>
  )
}
