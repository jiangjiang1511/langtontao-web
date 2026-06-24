'use client'

import { toast } from 'sonner'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { retirementSectionMeta } from '@/lib/content/coffee-retirement-page'
import type { RetirementSoulSurveyFeedbackProfile } from '@/lib/content/coffee-retirement-survey-feedback'

type RetirementSoulSurveyCommentaryCardProps = {
  profile: RetirementSoulSurveyFeedbackProfile
  onRestart: () => void
}

export function RetirementSoulSurveyCommentaryCard({
  profile,
  onRestart,
}: RetirementSoulSurveyCommentaryCardProps) {
  async function handleCopyReflection() {
    try {
      await navigator.clipboard.writeText(profile.reflection)
      toast.success(retirementSectionMeta.soulCopyReflectionSuccess)
    } catch {
      toast.error('复制失败，请手动选择文字')
    }
  }

  return (
    <div className="retirement-chart-card__inner flex h-full min-h-0 flex-col">
      <div className="retirement-chart-card__stripe retirement-chart-card__stripe--langton shrink-0">
        <span className="retirement-chart-card__angle">
          {retirementSectionMeta.soulCommentaryEyebrow}
        </span>
      </div>

      <div className="retirement-chart-card__body flex min-h-0 flex-1 flex-col p-5 md:p-6">
        <blockquote className="retirement-soul-commentary-reflection flex-1 border-l-4 border-amber-500 pl-4 text-sm leading-relaxed text-zinc-800 md:text-base">
          <Coffee2AnnotatedText text={profile.reflection} />
        </blockquote>

        <p className="mt-4 text-sm leading-relaxed text-zinc-500">
          {profile.invite}
        </p>

        <div className="retirement-chart-card__footer mt-5 shrink-0 border-t border-amber-100 pt-4">
          <button
            type="button"
            className="retirement-chart-card__primary-btn w-full rounded-lg border-2 py-2.5 text-sm font-semibold"
            onClick={handleCopyReflection}
          >
            {retirementSectionMeta.soulCopyReflectionLabel}
          </button>

          <div className="mt-2 flex justify-center">
            <button
              type="button"
              className="text-xs font-medium text-zinc-400 underline-offset-2 transition-colors hover:text-zinc-600 hover:underline"
              onClick={onRestart}
            >
              {retirementSectionMeta.soulResubmitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
