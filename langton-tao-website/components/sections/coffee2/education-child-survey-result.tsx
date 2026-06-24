'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { EducationSurveyFeedbackProfile } from '@/lib/content/coffee-education-survey-feedback'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { educationSurveyMeta } from '@/lib/content/coffee-education-survey'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type EducationChildSurveyResultProps = {
  profile: EducationSurveyFeedbackProfile
  onRestart: () => void
  className?: string
}

function isComingSoonCta(
  cta: NonNullable<EducationSurveyFeedbackProfile['softCta']>
): cta is { label: string; comingSoon: true } {
  return 'comingSoon' in cta && cta.comingSoon === true
}

export function EducationChildSurveyResult({
  profile,
  onRestart,
  className,
}: EducationChildSurveyResultProps) {
  const [comingSoonOpen, setComingSoonOpen] = useState(false)

  return (
    <div className={cn('education-survey-result', className)}>
      <p className="education-survey-result__eyebrow c2-eyebrow">
        Coffee Chat · 你的路径
      </p>
      <h5 className="education-survey-result__headline">{profile.headline}</h5>

      <blockquote className="education-survey-result__reflection">
        <Coffee2AnnotatedText text={profile.reflection} />
      </blockquote>

      <p className="education-survey-result__invite">{profile.invite}</p>

      <div className="education-survey-result__actions">
        {profile.softCta ? (
          isComingSoonCta(profile.softCta) ? (
            <>
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => setComingSoonOpen(true)}
              >
                {profile.softCta.label}
              </Button>
              <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>敬请期待</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm leading-relaxed text-zinc-600">
                    相关内容正在筹备中，欢迎先通过 Coffee Chat 与我们聊聊你的家庭节奏。
                  </p>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <Button type="button" variant="default" size="sm" asChild>
              <Link href={profile.softCta.href}>{profile.softCta.label}</Link>
            </Button>
          )
        ) : null}
        <button
          type="button"
          className="education-survey-result__restart"
          onClick={onRestart}
        >
          {educationSurveyMeta.restartLabel}
        </button>
      </div>
    </div>
  )
}
