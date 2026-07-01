'use client'

import type { WealthNarrativeNode } from '@/lib/content/coffee-wealth-narrative'
import { WealthTopicDetailContent } from '@/components/sections/coffee2/wealth-topic-detail-content'
import { TopicPhoneDialog } from '@/components/shared/topic-phone-dialog'
import { resolveTopicSharePoster } from '@/lib/topic-share/topic-share-posters'

type WealthTopicModalProps = {
  node: WealthNarrativeNode | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WealthTopicModal({ node, open, onOpenChange }: WealthTopicModalProps) {
  if (!node) return null

  const posterSrc = resolveTopicSharePoster('coffee', node.id, node.posterSrc)

  return (
    <TopicPhoneDialog
      open={open}
      onOpenChange={onOpenChange}
      title={node.title}
      eyebrow="财富系统 · WEALTH SYSTEM"
      className="invest-wealth-topic-modal invest-phone-dialog"
      bodyClassName="invest-phone-dialog__body"
      descriptionId={`wealth-topic-modal-${node.id}`}
      share={{
        pathname: '/coffee',
        topicId: node.id,
        topicTitle: node.title,
        posterSrc,
      }}
    >
      <WealthTopicDetailContent node={node} />
    </TopicPhoneDialog>
  )
}
