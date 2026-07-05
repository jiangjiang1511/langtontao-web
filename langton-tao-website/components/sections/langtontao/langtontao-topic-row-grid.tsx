'use client'

import { useCallback, useState, type CSSProperties } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoTopicModal } from '@/components/sections/langtontao/langtontao-topic-modal'
import { topicCardHash } from '@/lib/topic-share/build-share-url'
import type { LangtontaoTopicItem } from '@/lib/content/langtontao/langtontao-topic-types'
import { cn } from '@/lib/utils'

const ROW_REVEAL_STAGGER_MS = 90

const CHANNEL_ACCENTS: Record<string, string> = {
  'purchasing-power': 'var(--jarsy-violet)',
  'asset-shrinkage': '#fb7185',
  'debt-channel': '#a1a1aa',
}

const DEFAULT_CHANNEL_ACCENTS = ['var(--jarsy-violet)', '#fb7185', '#a1a1aa'] as const

function resolveChannelAccent(topicId: string, index: number): string {
  return CHANNEL_ACCENTS[topicId] ?? DEFAULT_CHANNEL_ACCENTS[index % DEFAULT_CHANNEL_ACCENTS.length]
}

type LangtontaoTopicRowGridProps = {
  topics: LangtontaoTopicItem[]
  ariaLabel?: string
  className?: string
}

export function LangtontaoTopicRowGrid({
  topics,
  ariaLabel = '话题卡片集',
  className,
}: LangtontaoTopicRowGridProps) {
  const [activeTopic, setActiveTopic] = useState<LangtontaoTopicItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleSelect = useCallback((topic: LangtontaoTopicItem) => {
    setActiveTopic(topic)
    setModalOpen(true)
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    setModalOpen(open)
    if (!open) setActiveTopic(null)
  }, [])

  if (topics.length === 0) return null

  return (
    <div className={cn('lt-topic-row-wrap', className)}>
      <ul className="lt-topic-row-grid w-full" role="group" aria-label={ariaLabel}>
        {topics.map((topic, index) => {
          const accent = resolveChannelAccent(topic.id, index)

          return (
            <li key={topic.id} className="lt-topic-row-grid__item">
              <Coffee2Reveal
                delay={index * ROW_REVEAL_STAGGER_MS}
                className="lt-topic-row-grid__reveal"
              >
                <button
                  type="button"
                  id={topicCardHash(topic.id)}
                  className="lt-topic-concept-card"
                  style={{ '--lt-topic-accent': accent } as CSSProperties}
                  aria-label={`查看详情：${topic.title}`}
                  onClick={() => handleSelect(topic)}
                >
                  <span className="lt-topic-concept-card__label">{topic.title}</span>
                  <span className="lt-topic-concept-card__preview">{topic.summary}</span>
                </button>
              </Coffee2Reveal>
            </li>
          )
        })}
      </ul>

      <LangtontaoTopicModal
        topic={activeTopic}
        open={modalOpen}
        onOpenChange={handleOpenChange}
      />
    </div>
  )
}
