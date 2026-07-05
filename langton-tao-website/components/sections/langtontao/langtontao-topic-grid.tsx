'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { LangtontaoTopicModal } from '@/components/sections/langtontao/langtontao-topic-modal'
import { coffee2ManifestoImages } from '@/lib/content/coffee2-manifesto-gallery'
import type {
  LangtontaoTopicItem,
  LangtontaoTopicZone,
} from '@/lib/content/langtontao/langtontao-topic-types'
import { topicCardHash } from '@/lib/topic-share/build-share-url'
import {
  buildTopicPillarLayout,
  topicPillarStageCountAttr,
  topicPillarStyleVars,
} from '@/lib/langtontao/build-topic-pillar-layout'
import { cn } from '@/lib/utils'

const TOPIC_ACCENTS = ['var(--jarsy-violet)', '#fafafa', '#a1a1aa', 'var(--jarsy-violet)'] as const
const LINK_COMPONENT_ASSET_DIR = '/assets/langtontao/linkcomponent'

function resolveTopicBackground(topic: LangtontaoTopicItem, index: number): string {
  if (topic.coverSrc) return `url(${topic.coverSrc})`

  const manifesto =
    coffee2ManifestoImages[index % coffee2ManifestoImages.length] ??
    coffee2ManifestoImages[0]
  if (manifesto?.src) return `url(${manifesto.src})`

  const num = String((index % 4) + 1).padStart(2, '0')
  return `url(${LINK_COMPONENT_ASSET_DIR}/linkcomponent-${num}.jpg)`
}

type LangtontaoTopicGridProps = {
  topics: LangtontaoTopicItem[]
  zone?: Pick<LangtontaoTopicZone, 'title'>
  className?: string
}

export function LangtontaoTopicGrid({ topics, zone, className }: LangtontaoTopicGridProps) {
  const stageRef = useRef<HTMLUListElement | null>(null)
  const [isExploded, setIsExploded] = useState(false)
  const [activeTopic, setActiveTopic] = useState<LangtontaoTopicItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsExploded(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          setIsExploded(true)
          observer.disconnect()
        }
      },
      {
        threshold: [0, 0.2, 0.35, 0.5, 0.75, 1],
        rootMargin: '-12% 0px -12% 0px',
      }
    )

    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

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
    <div
      className={cn('lt-scatter-stage-wrap', className)}
      data-has-zone-header={zone ? 'true' : undefined}
    >
      {zone ? (
        <header className="lt-topic-zone__header">
          <h4 className="lt-topic-zone__title lt-heading-l3">{zone.title}</h4>
        </header>
      ) : null}

      <ul
        ref={stageRef}
        className="lt-topic-pillars__stage w-full"
        data-exploded={isExploded ? 'true' : 'false'}
        data-count={topicPillarStageCountAttr(topics.length)}
        role="group"
        aria-label={zone?.title ?? '话题卡片集'}
      >
        {topics.map((topic, index) => {
          const layout = buildTopicPillarLayout(index, topics.length)
          const number = String(index + 1).padStart(2, '0')
          const accent = TOPIC_ACCENTS[index % TOPIC_ACCENTS.length]

          return (
            <li
              key={topic.id}
              className="lt-topic-pillars__card"
              style={topicPillarStyleVars(layout, index * 65)}
            >
              <button
                type="button"
                id={topicCardHash(topic.id)}
                className="coffee2-pillar-card group block h-full w-full text-left"
                style={{ '--pillar-accent': accent } as CSSProperties}
                aria-label={`查看详情：${topic.title}`}
                onClick={() => handleSelect(topic)}
              >
                <div
                  className="coffee2-pillar-card__content"
                  style={
                    {
                      '--pillar-bg-image': resolveTopicBackground(topic, index),
                    } as CSSProperties
                  }
                >
                  <span className="coffee2-pillar-card__number">{number}</span>
                  <h4 className="coffee2-pillar-card__title">{topic.title}</h4>
                  <span className="coffee2-pillar-card__description">{topic.summary}</span>
                </div>
              </button>
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
