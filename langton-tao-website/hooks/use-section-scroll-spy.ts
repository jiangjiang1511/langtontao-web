'use client'

import { useEffect, useRef, useState } from 'react'
import { DEFERRED_MOUNT_READY_EVENT } from '@/components/shared/deferred-mount-context'

type SectionScrollSpyOptions = {
  sectionIds: readonly string[]
  rootMargin?: string
  threshold?: number | number[]
  enabled?: boolean
}

export function useSectionScrollSpy({
  sectionIds,
  rootMargin = '-32% 0px -52% 0px',
  threshold = [0, 0.15, 0.35, 0.55, 0.75, 1],
  enabled = true,
}: SectionScrollSpyOptions) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')
  const sectionRatiosRef = useRef(new Map<string, number>())
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return

    const sectionRatios = sectionRatiosRef.current

    const pickActive = () => {
      let nextActive: string | null = null
      let highestRatio = 0

      sectionRatios.forEach((ratio, id) => {
        if (ratio >= highestRatio) {
          highestRatio = ratio
          nextActive = id
        }
      })

      if (nextActive) {
        setActiveId(nextActive)
      }
    }

    const schedulePick = () => {
      if (rafRef.current !== null) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        pickActive()
      })
    }

    const observers: IntersectionObserver[] = []

    const bindSections = () => {
      observers.forEach((observer) => observer.disconnect())
      observers.length = 0
      sectionRatios.clear()

      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              sectionRatios.set(id, entry.intersectionRatio)
            } else {
              sectionRatios.delete(id)
            }
            schedulePick()
          },
          { rootMargin, threshold }
        )

        observer.observe(section)
        observers.push(observer)
      })
    }

    bindSections()

    const handleDeferredReady = () => {
      bindSections()
    }

    window.addEventListener(DEFERRED_MOUNT_READY_EVENT, handleDeferredReady)

    return () => {
      window.removeEventListener(DEFERRED_MOUNT_READY_EVENT, handleDeferredReady)
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
      observers.forEach((observer) => observer.disconnect())
      sectionRatios.clear()
    }
  }, [enabled, rootMargin, sectionIds, threshold])

  return activeId
}

export function scrollToSectionAnchor(
  anchorId: string,
  options?: { updateHash?: boolean; block?: ScrollLogicalPosition }
) {
  const element = document.getElementById(anchorId)
  if (!element) return

  element.scrollIntoView({
    behavior: 'auto',
    block: options?.block ?? 'start',
  })

  if (options?.updateHash !== false && typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    url.hash = anchorId
    window.history.replaceState(null, '', url.toString())
  }
}
