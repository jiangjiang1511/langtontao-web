'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { FlipBookCard } from '@/components/sections/home/flip-book-card'
import { DraggableScrollRow } from '@/components/shared/draggable-scroll-row'
import {
  getBooksByPhase,
  getPhaseLabel,
  phaseOrder,
  type BookshelfPhase,
} from '@/lib/content/bookshelf'
import { cn } from '@/lib/utils'

type FlattenedBook = {
  phase: BookshelfPhase
  indexInPhase: number
  book: ReturnType<typeof getBooksByPhase>[number]
}

function getSmoothBehavior() {
  if (typeof window === "undefined") return 'smooth'
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return reduceMotion ? 'auto' : 'smooth'
}

function resolveActivePhase(
  viewport: HTMLDivElement,
  markerIds: Record<BookshelfPhase, string>
): BookshelfPhase {
  const maxScroll = viewport.scrollWidth - viewport.clientWidth

  if (maxScroll > 0 && viewport.scrollLeft >= maxScroll - 4) {
    return phaseOrder[phaseOrder.length - 1]
  }

  const viewportLeft = viewport.getBoundingClientRect().left
  let active = phaseOrder[0]
  let smallestGap = Infinity

  for (const phase of phaseOrder) {
    const marker = document.getElementById(markerIds[phase])
    if (!marker) continue

    const gap = Math.abs(marker.getBoundingClientRect().left - viewportLeft)
    if (gap < smallestGap) {
      smallestGap = gap
      active = phase
    }
  }

  return active
}

function getPhaseScrollLeft(
  phase: BookshelfPhase,
  viewport: HTMLDivElement,
  markerIds: Record<BookshelfPhase, string>
) {
  const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth)

  if (phase === phaseOrder[phaseOrder.length - 1]) {
    return maxScroll
  }

  const marker = document.getElementById(markerIds[phase])
  if (!marker) return 0

  const viewportRect = viewport.getBoundingClientRect()
  const markerRect = marker.getBoundingClientRect()
  const target = viewport.scrollLeft + (markerRect.left - viewportRect.left)

  return Math.min(maxScroll, Math.max(0, target))
}

export function ReadingBookshelfRow() {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const suppressPhaseSyncRef = useRef(false)
  const targetedPhaseRef = useRef<BookshelfPhase | null>(null)
  const markerIds = useMemo(
    () =>
      phaseOrder.reduce(
        (result, phase) => {
          result[phase] = `reading-phase-marker-${phase}`
          return result
        },
        {} as Record<BookshelfPhase, string>
      ),
    []
  )
  const [activePhase, setActivePhase] = useState<BookshelfPhase>(phaseOrder[0])
  const [scrollMetrics, setScrollMetrics] = useState({
    progress: 0,
    thumbRatio: 1,
    canScroll: false,
  })

  const books = useMemo<FlattenedBook[]>(
    () =>
      phaseOrder.flatMap((phase) =>
        getBooksByPhase(phase).map((book, indexInPhase) => ({
          phase,
          indexInPhase,
          book,
        }))
      ),
    []
  )

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const updateScrollMetrics = () => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth
      const progress = maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0
      const thumbRatio =
        viewport.scrollWidth > 0 ? viewport.clientWidth / viewport.scrollWidth : 1

      setScrollMetrics({
        progress,
        thumbRatio: Math.min(1, thumbRatio),
        canScroll: maxScroll > 1,
      })

      if (!suppressPhaseSyncRef.current) {
        setActivePhase(resolveActivePhase(viewport, markerIds))
      }
    }

    updateScrollMetrics()
    viewport.addEventListener('scroll', updateScrollMetrics, { passive: true })
    window.addEventListener('resize', updateScrollMetrics)

    const resizeObserver = new ResizeObserver(updateScrollMetrics)
    resizeObserver.observe(viewport)

    return () => {
      viewport.removeEventListener('scroll', updateScrollMetrics)
      window.removeEventListener('resize', updateScrollMetrics)
      resizeObserver.disconnect()
    }
  }, [markerIds])

  const seekScroll = (clientX: number, trackLeft: number, trackWidth: number) => {
    const viewport = viewportRef.current
    if (!viewport || trackWidth <= 0) return

    const ratio = Math.min(1, Math.max(0, (clientX - trackLeft) / trackWidth))
    const maxScroll = viewport.scrollWidth - viewport.clientWidth
    viewport.scrollLeft = ratio * maxScroll
  }

  const scrollToPhase = (phase: BookshelfPhase) => {
    const viewport = viewportRef.current
    if (!viewport) return

    targetedPhaseRef.current = phase
    setActivePhase(phase)
    suppressPhaseSyncRef.current = true

    viewport.scrollTo({
      left: getPhaseScrollLeft(phase, viewport, markerIds),
      behavior: getSmoothBehavior(),
    })

    const releasePhaseSync = () => {
      if (!suppressPhaseSyncRef.current) return

      suppressPhaseSyncRef.current = false
      const phase = targetedPhaseRef.current
      targetedPhaseRef.current = null

      if (phase) {
        setActivePhase(phase)
        return
      }

      const currentViewport = viewportRef.current
      if (currentViewport) {
        setActivePhase(resolveActivePhase(currentViewport, markerIds))
      }
    }

    if ('onscrollend' in viewport) {
      viewport.addEventListener('scrollend', releasePhaseSync, { once: true })
    }
    window.setTimeout(releasePhaseSync, 500)
  }

  return (
    <div className="reading-bookshelf mt-16 md:mt-20">
      <div
        className="reading-bookshelf__tabs flex flex-wrap items-center gap-2 md:gap-3"
        role="tablist"
        aria-label="读书阶段筛选"
      >
        {phaseOrder.map((phase) => (
          <button
            key={phase}
            type="button"
            role="tab"
            aria-selected={activePhase === phase}
            className={cn(
              'c2-tab-trigger rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              activePhase === phase
                ? 'border-zinc-950 bg-zinc-950 text-white'
                : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-900'
            )}
            onClick={() => scrollToPhase(phase)}
          >
            {getPhaseLabel(phase)}
          </button>
        ))}
      </div>

      <div className="reading-bookshelf__scroll-shell mt-10 md:mt-12">
        {scrollMetrics.canScroll ? (
          <div
            className="reading-bookshelf__progress reading-bookshelf__progress--top"
            role="progressbar"
            aria-label="书单滚动位置"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(scrollMetrics.progress * 100)}
          >
            <div
              className="reading-bookshelf__progress-track"
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect()
                seekScroll(event.clientX, rect.left, rect.width)
              }}
              onKeyDown={(event) => {
                const viewport = viewportRef.current
                if (!viewport) return
                const step = viewport.clientWidth * 0.35
                if (event.key === 'ArrowRight') {
                  event.preventDefault()
                  viewport.scrollLeft += step
                }
                if (event.key === 'ArrowLeft') {
                  event.preventDefault()
                  viewport.scrollLeft -= step
                }
              }}
              tabIndex={0}
            >
              <div
                className="reading-bookshelf__progress-thumb"
                style={{
                  width: `${scrollMetrics.thumbRatio * 100}%`,
                  left: `${scrollMetrics.progress * (100 - scrollMetrics.thumbRatio * 100)}%`,
                }}
              />
            </div>
          </div>
        ) : null}

        <DraggableScrollRow
          containerRef={viewportRef}
          trackClassName="gap-x-6 md:gap-x-8"
          ariaLabel="朗敦道围读会书单"
        >
          {books.map(({ phase, indexInPhase, book }, index) => (
            <JarsyReveal
              key={book.id}
              as="li"
              delay={index * 40}
              className="reading-bookshelf__item list-none"
              id={indexInPhase === 0 ? markerIds[phase] : undefined}
              data-reading-phase={indexInPhase === 0 ? phase : undefined}
            >
              <FlipBookCard
                book={book}
                navigateOnClick={false}
                className="mx-0 w-[168px] shrink-0 snap-start md:w-[196px]"
              />
            </JarsyReveal>
          ))}
        </DraggableScrollRow>
      </div>
    </div>
  )
}
