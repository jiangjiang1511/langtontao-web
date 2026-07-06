'use client'

import { useEffect } from 'react'
import { parseTopicCardHash, topicCardHash } from '@/lib/topic-share/build-share-url'

const HIGHLIGHT_MS = 2400

function highlightTopicCard(element: HTMLElement) {
  element.classList.add('topic-card-hash-highlight')
  window.setTimeout(() => {
    element.classList.remove('topic-card-hash-highlight')
  }, HIGHLIGHT_MS)
}

function scrollToTopicCard(topicId: string): boolean {
  const element = document.getElementById(topicCardHash(topicId))
  if (!element) return false

  element.scrollIntoView({ behavior: 'auto', block: 'center' })
  highlightTopicCard(element)
  return true
}

export function useTopicCardHashScroll(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    const run = () => {
      const topicId = parseTopicCardHash(window.location.hash)
      if (!topicId) return

      const attemptScroll = (remaining: number) => {
        if (scrollToTopicCard(topicId)) return
        if (remaining <= 0) return
        window.setTimeout(() => attemptScroll(remaining - 1), 200)
      }

      attemptScroll(8)
    }

    run()
    window.addEventListener('hashchange', run)

    return () => {
      window.removeEventListener('hashchange', run)
    }
  }, [enabled])
}

export function TopicCardHashScrollHost() {
  useTopicCardHashScroll(true)
  return null
}
