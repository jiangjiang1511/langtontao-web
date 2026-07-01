'use client'

import { useMemo, useState } from 'react'
import { Copy, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { TopicSharePosterDialog } from '@/components/shared/topic-share-poster-dialog'
import { buildTopicShareUrl, type TopicShareContext } from '@/lib/topic-share/build-share-url'

type TopicShareBottomBarProps = {
  share: TopicShareContext
  topicTitle: string
  posterSrc?: string | null
}

export function TopicShareBottomBar({
  share,
  topicTitle,
  posterSrc,
}: TopicShareBottomBarProps) {
  const [posterOpen, setPosterOpen] = useState(false)
  const shareUrl = useMemo(() => buildTopicShareUrl(share), [share])

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('链接已复制')
    } catch {
      toast.error('复制失败，请手动复制链接')
    }
  }

  return (
    <>
      <footer className="topic-share-bottom-bar" aria-label="分享">
        <button
          type="button"
          className="topic-share-bottom-bar__btn"
          onClick={() => setPosterOpen(true)}
        >
          <Share2 className="topic-share-bottom-bar__btn-icon" aria-hidden />
          分享卡片
        </button>
        <button
          type="button"
          className="topic-share-bottom-bar__btn topic-share-bottom-bar__btn--secondary"
          onClick={() => void handleCopyLink()}
        >
          <Copy className="topic-share-bottom-bar__btn-icon" aria-hidden />
          复制链接
        </button>
      </footer>

      <TopicSharePosterDialog
        open={posterOpen}
        onOpenChange={setPosterOpen}
        topicTitle={topicTitle}
        shareUrl={shareUrl}
        posterSrc={posterSrc}
      />
    </>
  )
}

/** @deprecated use TopicShareBottomBar */
export const TopicShareEdgeRail = TopicShareBottomBar
