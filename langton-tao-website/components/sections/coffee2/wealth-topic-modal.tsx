'use client'

import { useCallback, useEffect, useState } from 'react'
import type { WealthNarrativeNode } from '@/lib/content/coffee-wealth-narrative'
import { WealthTopicDetailContent } from '@/components/sections/coffee2/wealth-topic-detail-content'
import { WealthTopicShareActions } from '@/components/sections/coffee2/wealth-topic-share-actions'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type WealthTopicModalProps = {
  node: WealthNarrativeNode | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function nodeHasStatsInTree(node: WealthNarrativeNode): boolean {
  if (node.stats?.length) return true
  return Boolean(node.children?.some(nodeHasStatsInTree))
}

export function WealthTopicModal({ node, open, onOpenChange }: WealthTopicModalProps) {
  const [shareOpen, setShareOpen] = useState(false)
  const hasPoster = Boolean(node?.posterSrc)
  const wide = node ? nodeHasStatsInTree(node) || hasPoster : false

  useEffect(() => {
    if (!open) setShareOpen(false)
  }, [open])

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) setShareOpen(false)
      onOpenChange(nextOpen)
    },
    [onOpenChange]
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          'invest-wealth-topic-modal overflow-y-auto',
          hasPoster ? 'max-h-[min(92vh,52rem)]' : 'max-h-[min(88vh,44rem)]',
          wide ? (hasPoster ? 'max-w-3xl' : 'max-w-2xl') : 'max-w-lg'
        )}
        aria-describedby={node ? `wealth-topic-modal-${node.id}` : undefined}
      >
        {node ? (
          <>
            {node.posterSrc ? (
              <div className="invest-wealth-topic-modal__poster-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={node.posterSrc}
                  alt={node.title}
                  className="invest-wealth-topic-modal__poster"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : null}

            {node.posterSrc ? (
              <WealthTopicShareActions
                posterSrc={node.posterSrc}
                topicTitle={node.title}
                shareOpen={shareOpen}
                onShareOpenChange={setShareOpen}
              />
            ) : null}

            <DialogHeader>
              <DialogTitle className="invest-wealth-detail__title">
                {node.title}
              </DialogTitle>
            </DialogHeader>
            <div id={`wealth-topic-modal-${node.id}`}>
              <WealthTopicDetailContent node={node} />
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
