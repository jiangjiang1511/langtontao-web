'use client'

import { X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
import { DebtSurveyShareActions } from '@/components/sections/coffee2/debt-survey-share-actions'
import type { DebtSurveyFeedbackProfile } from '@/lib/content/coffee-debt-survey-feedback'
import { cn } from '@/lib/utils'

type DebtSurveyFeedbackDialogProps = {
  profile: DebtSurveyFeedbackProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DebtSurveyFeedbackDialog({
  profile,
  open,
  onOpenChange,
}: DebtSurveyFeedbackDialogProps) {
  if (!profile) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="z-[120]" />
        <DialogPrimitive.Content
          className={cn(
            'debt-survey-feedback-dialog coffee2-tenet-dialog',
            'fixed left-1/2 top-1/2 z-[130] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2',
            'overflow-y-auto rounded-xl border-2 border-zinc-800 bg-white p-6 shadow-pop-black'
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-left text-xl font-semibold text-zinc-950">
              留一个问题给你
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <blockquote className="debt-survey-feedback-reflection border-l-4 border-jarsy-violet pl-4 text-sm leading-relaxed text-zinc-800">
              {profile.reflection}
            </blockquote>

            <p className="text-sm leading-relaxed text-zinc-500">{profile.invite}</p>

            <DebtSurveyShareActions
              posterData={{
                reflection: profile.reflection,
                invite: profile.invite,
                answers: {},
              }}
            />
          </div>

          <DialogClose
            className="absolute right-4 top-4 rounded-md border border-zinc-200 p-1 text-zinc-500 hover:bg-zinc-100"
            aria-label="关闭"
          >
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
