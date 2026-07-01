'use client'

import type { CSSProperties, ReactNode } from 'react'
import { TopicShareBottomBar } from '@/components/shared/topic-share-edge-rail'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { TopicShareContext } from '@/lib/topic-share/build-share-url'
import { cn } from '@/lib/utils'

export type TopicPhoneDialogShare = TopicShareContext & {
  topicTitle: string
  posterSrc?: string | null
}

type TopicPhoneDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  eyebrow?: string
  descriptionId?: string
  share?: TopicPhoneDialogShare | null
  className?: string
  bodyClassName?: string
  style?: CSSProperties
  children: ReactNode
}

export function TopicPhoneDialog({
  open,
  onOpenChange,
  title,
  eyebrow,
  descriptionId,
  share,
  className,
  bodyClassName,
  style,
  children,
}: TopicPhoneDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="topic-phone-dialog-overlay"
        className={cn(
          'topic-phone-dialog inset-0 m-auto translate-x-0 translate-y-0',
          className
        )}
        style={style}
        aria-describedby={descriptionId}
      >
        <div className="topic-phone-dialog__shell">
          <div className="topic-phone-dialog__header">
            <DialogHeader className="space-y-0 text-left">
              {eyebrow ? (
                <p className="topic-phone-dialog__eyebrow c2-pop-stamp">{eyebrow}</p>
              ) : null}
              <DialogTitle className="topic-phone-dialog__title">{title}</DialogTitle>
            </DialogHeader>
          </div>

          <div
            id={descriptionId}
            className={cn('topic-phone-dialog__body', bodyClassName)}
          >
            {children}
          </div>

          {share ? (
            <TopicShareBottomBar
              share={{ pathname: share.pathname, topicId: share.topicId }}
              topicTitle={share.topicTitle}
              posterSrc={share.posterSrc}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
