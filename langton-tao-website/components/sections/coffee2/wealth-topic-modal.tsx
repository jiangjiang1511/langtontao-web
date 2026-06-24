'use client'

import type { WealthNarrativeNode } from '@/lib/content/coffee-wealth-narrative'
import { WealthTopicDetailContent } from '@/components/sections/coffee2/wealth-topic-detail-content'
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
  const wide = node ? nodeHasStatsInTree(node) : false

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'invest-wealth-topic-modal max-h-[min(88vh,44rem)] overflow-y-auto',
          wide ? 'max-w-2xl' : 'max-w-lg'
        )}
        aria-describedby={node ? `wealth-topic-modal-${node.id}` : undefined}
      >
        {node ? (
          <>
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
