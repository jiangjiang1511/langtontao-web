'use client'

import { BookOpen } from 'lucide-react'
import type { NarrativeReadingRef } from '@/lib/content/narrative-bubble'

type PathTopicReadingListProps = {
  readings?: NarrativeReadingRef[]
  onSelect: (articleId: string) => void
}

export function PathTopicReadingList({
  readings,
  onSelect,
}: PathTopicReadingListProps) {
  if (!readings?.length) return null

  return (
    <div className="path-topic-reading-list">
      <p className="path-topic-reading-list__label">引申阅读</p>
      <ul className="path-topic-reading-list__items">
        {readings.map((reading) => (
          <li key={reading.id}>
            <button
              type="button"
              className="path-topic-reading-list__item group"
              onClick={() => onSelect(reading.id)}
            >
              <BookOpen
                className="path-topic-reading-list__icon"
                aria-hidden
              />
              <span className="path-topic-reading-list__text">
                <span className="path-topic-reading-list__title line-clamp-2">
                  {reading.title}
                </span>
                <span className="path-topic-reading-list__outlet">
                  {reading.outlet}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
