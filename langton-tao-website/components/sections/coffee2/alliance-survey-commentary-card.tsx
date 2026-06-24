'use client'

import { toast } from 'sonner'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { allianceSectionMeta } from '@/lib/content/coffee-alliance-page'
import type { AllianceSurveyFeedbackProfile } from '@/lib/content/coffee-alliance-survey-feedback'
import type { AllianceSurveyVariant } from '@/lib/content/coffee-alliance-page'

type AllianceSurveyCommentaryCardProps = {
  variant: AllianceSurveyVariant
  profile: AllianceSurveyFeedbackProfile
  onRestart: () => void
}

export function AllianceSurveyCommentaryCard({
  variant,
  profile,
  onRestart,
}: AllianceSurveyCommentaryCardProps) {
  async function handleCopyReflection() {
    try {
      await navigator.clipboard.writeText(profile.reflection)
      toast.success(allianceSectionMeta.copyReflectionSuccess)
    } catch {
      toast.error('复制失败，请手动选择文字')
    }
  }

  return (
    <div
      className="alliance-flashcard alliance-flashcard--commentary flex h-full flex-col p-4 md:p-5"
      data-variant={variant}
    >
      <p className="alliance-flashcard__eyebrow text-[10px] font-medium uppercase tracking-widest">
        {allianceSectionMeta.commentaryEyebrow}
      </p>

      <blockquote className="alliance-survey-commentary-reflection mt-3 flex-1 border-l-4 pl-3 text-xs leading-relaxed md:text-sm">
        <Coffee2AnnotatedText text={profile.reflection} />
      </blockquote>

      <p className="mt-3 text-xs leading-relaxed opacity-80">{profile.invite}</p>

      <div className="alliance-flashcard__footer mt-4 border-t pt-3">
        <button
          type="button"
          className="alliance-flashcard__primary-btn w-full rounded-lg border-2 py-2 text-xs font-semibold"
          onClick={handleCopyReflection}
        >
          {allianceSectionMeta.copyReflectionLabel}
        </button>

        <div className="mt-2 flex justify-center">
          <button
            type="button"
            className="text-[10px] font-medium opacity-60 underline-offset-2 hover:opacity-100 hover:underline"
            onClick={onRestart}
          >
            {allianceSectionMeta.resubmitLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
