'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { legacySectionMeta } from '@/lib/content/coffee-legacy-page'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import type { LegacySurveyFeedbackProfile } from '@/lib/content/coffee-legacy-survey-feedback'

type LegacySurveyCommentaryCardProps = {
  profile: LegacySurveyFeedbackProfile
  onRestart: () => void
}

export function LegacySurveyCommentaryCard({
  profile,
  onRestart,
}: LegacySurveyCommentaryCardProps) {
  const [comingSoonOpen, setComingSoonOpen] = useState(false)

  return (
    <div className="legacy-flashcard legacy-flashcard--commentary flex h-full flex-col p-6 md:p-8">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
        {legacySectionMeta.surveyCommentaryEyebrow}
      </p>

      <h5 className="mt-4 text-lg font-semibold tracking-tight text-zinc-950 md:text-xl">
        {profile.headline}
      </h5>

      <blockquote className="legacy-survey-commentary-reflection mt-4 flex-1 border-l-4 border-jarsy-violet pl-4 text-sm leading-relaxed text-zinc-800 md:text-base">
        <Coffee2AnnotatedText text={profile.reflection} />
      </blockquote>

      <p className="mt-4 text-sm leading-relaxed text-zinc-500">{profile.invite}</p>

      <div className="legacy-flashcard__footer mt-5 border-t border-zinc-100 pt-4">
        <Button
          type="button"
          variant="default"
          size="sm"
          className="w-full"
          onClick={() => setComingSoonOpen(true)}
        >
          {profile.softCta.label}
        </Button>

        <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>{legacySectionMeta.comingSoonTitle}</DialogTitle>
            </DialogHeader>
            <p className="text-sm leading-relaxed text-zinc-600">
              {legacySectionMeta.comingSoonBody}
            </p>
          </DialogContent>
        </Dialog>

        <div className="mt-3 flex justify-center">
          <button
            type="button"
            className="legacy-survey-restart-btn text-[11px] font-medium text-zinc-400 underline-offset-2 transition-colors hover:text-zinc-600 hover:underline"
            onClick={onRestart}
          >
            {legacySectionMeta.resubmitLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
