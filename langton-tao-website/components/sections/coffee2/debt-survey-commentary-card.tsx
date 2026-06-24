'use client'

import { DebtSurveyShareActions } from '@/components/sections/coffee2/debt-survey-share-actions'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { debtSectionMeta } from '@/lib/content/coffee-debt-page'
import type { DebtSurveyFeedbackProfile } from '@/lib/content/coffee-debt-survey-feedback'
import type { DebtSurveyAnswers } from '@/lib/content/coffee-debt-page'

type DebtSurveyCommentaryCardProps = {
  profile: DebtSurveyFeedbackProfile
  answers: DebtSurveyAnswers
  onRestart: () => void
}

export function DebtSurveyCommentaryCard({
  profile,
  answers,
  onRestart,
}: DebtSurveyCommentaryCardProps) {
  return (
    <div className="debt-flashcard debt-flashcard--commentary flex h-full flex-col p-6 md:p-8">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
        {debtSectionMeta.surveyCommentaryEyebrow}
      </p>

      <blockquote className="debt-survey-commentary-reflection mt-4 flex-1 border-l-4 border-pop-yellow pl-4 text-sm leading-relaxed text-zinc-800 md:text-base">
        <Coffee2AnnotatedText text={profile.reflection} />
      </blockquote>

      <p className="mt-4 text-sm leading-relaxed text-zinc-500">{profile.invite}</p>

      <div className="debt-flashcard__footer mt-5 border-t border-zinc-100 pt-4">
        <DebtSurveyShareActions
          posterData={{
            reflection: profile.reflection,
            invite: profile.invite,
            answers,
          }}
          layout="flashcard"
        />

        <div className="mt-3 flex justify-center">
          <button
            type="button"
            className="debt-survey-restart-btn text-[11px] font-medium text-zinc-400 underline-offset-2 transition-colors hover:text-zinc-600 hover:underline"
            onClick={onRestart}
          >
            {debtSectionMeta.resubmitLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
