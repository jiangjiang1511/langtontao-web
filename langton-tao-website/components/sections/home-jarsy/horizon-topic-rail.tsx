'use client'

import { cn } from '@/lib/utils'

type HorizonTopicRailProps = {
  topics: { id: string; label: string }[]
  activeId: string
  onSelect: (id: string) => void
  ariaLabel: string
}

export function HorizonTopicRail({
  topics,
  activeId,
  onSelect,
  ariaLabel,
}: HorizonTopicRailProps) {
  if (topics.length <= 1) return null

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="horizon-topic-rail mx-auto mt-10 flex max-w-3xl justify-center md:mt-12"
    >
      {topics.map((topic) => {
        const isActive = topic.id === activeId
        return (
          <button
            key={topic.id}
            type="button"
            role="tab"
            id={`horizon-tab-${topic.id}`}
            aria-selected={isActive}
            aria-controls={`horizon-panel-${topic.id}`}
            data-active={isActive ? 'true' : 'false'}
            className={cn('horizon-topic-rail__tab', isActive && 'horizon-topic-rail__tab--active')}
            onClick={() => onSelect(topic.id)}
          >
            {topic.label}
          </button>
        )
      })}
    </div>
  )
}
