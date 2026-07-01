'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import type { LangtontaoExposureItem } from '@/lib/content/langtontao/langtontao-why-mfo'
import {
  buildExposureDanmakuTracks,
  type ExposureDanmakuTrack,
} from '@/lib/langtontao/build-exposure-danmaku-tracks'
import { useExposureDanmakuDrag } from '@/lib/langtontao/use-exposure-danmaku-drag'
import { cn } from '@/lib/utils'

type LangtontaoExposureDanmakuProps = {
  items: LangtontaoExposureItem[]
  categoryKey: string
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setCoarse(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return coarse
}

function ExposureDanmakuStaticList({ items }: { items: LangtontaoExposureItem[] }) {
  return (
    <ul className="lt-exposure-danmaku__static-list mx-auto grid max-w-7xl gap-2 px-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-6 lg:px-8">
      {items.map((item) => (
        <li key={item.id}>
          <div
            className={cn(
              'lt-exposure-danmaku__static-card',
              `lt-exposure-danmaku__card--severity-${item.severity}`
            )}
          >
            <p className="lt-exposure-danmaku__card-category">{item.category}</p>
            <p className="lt-exposure-danmaku__card-label">{item.label}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

type ExposureDanmakuCardProps = {
  item: LangtontaoExposureItem
  track: ExposureDanmakuTrack
  isActive: boolean
  coarsePointer: boolean
  stageRef: React.RefObject<HTMLDivElement | null>
  onCardClick: (itemId: string) => void
}

function ExposureDanmakuCard({
  item,
  track,
  isActive,
  coarsePointer,
  stageRef,
  onCardClick,
}: ExposureDanmakuCardProps) {
  const {
    elementRef,
    isDragging,
    suppressClick,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  } = useExposureDanmakuDrag({
    durationSec: track.durationSec,
    rotateDeg: track.rotateDeg,
    scale: track.scale,
    stageRef,
  })

  return (
    <button
      ref={elementRef}
      type="button"
      aria-pressed={coarsePointer ? isActive : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onClick={() => {
        if (suppressClick) return
        onCardClick(item.id)
      }}
      className={cn(
        'lt-exposure-danmaku__card',
        `lt-exposure-danmaku__card--severity-${item.severity}`,
        `lt-exposure-danmaku__card--collage-${track.collageVariant}`,
        isActive && 'lt-exposure-danmaku__card--active',
        isDragging && 'lt-exposure-danmaku__card--dragging'
      )}
      style={
        {
          '--drift-duration': `${track.durationSec}s`,
          '--drift-delay': `-${track.delaySec}s`,
          '--drift-top': `${track.topPercent}%`,
          '--drift-scale': String(track.scale),
          '--drift-blur': `${track.blurPx}px`,
          '--drift-opacity': String(track.opacity),
          '--drift-rotate': `${track.rotateDeg}deg`,
          '--drift-z': String(track.depthIndex + 1),
        } as CSSProperties
      }
    >
      <span className="lt-exposure-danmaku__card-category">{item.category}</span>
      <span className="lt-exposure-danmaku__card-label">{item.label}</span>
    </button>
  )
}

export function LangtontaoExposureDanmaku({
  items,
  categoryKey,
}: LangtontaoExposureDanmakuProps) {
  const reducedMotion = usePrefersReducedMotion()
  const coarsePointer = useCoarsePointer()
  const stageRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [fadeIn, setFadeIn] = useState(true)

  const itemById = useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items]
  )

  const tracks = useMemo(
    () => buildExposureDanmakuTracks(items, categoryKey),
    [items, categoryKey]
  )

  useEffect(() => {
    setActiveId(null)
    setFadeIn(false)
    const frame = requestAnimationFrame(() => setFadeIn(true))
    return () => cancelAnimationFrame(frame)
  }, [categoryKey, items])

  const handleCardClick = useCallback(
    (itemId: string) => {
      if (!coarsePointer) return
      setActiveId((current) => (current === itemId ? null : itemId))
    },
    [coarsePointer]
  )

  if (reducedMotion) {
    return (
      <div className="lt-exposure-danmaku lt-exposure-danmaku--static">
        <ExposureDanmakuStaticList items={items} />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'lt-exposure-danmaku',
        fadeIn ? 'lt-exposure-danmaku--visible' : 'lt-exposure-danmaku--fading'
      )}
      aria-label="家庭风险敞口流动视图"
    >
      <div ref={stageRef} className="lt-exposure-danmaku__stage" key={categoryKey}>
        {tracks.map((track) => {
          const item = itemById.get(track.itemId)
          if (!item) return null

          return (
            <ExposureDanmakuCard
              key={track.itemId}
              item={item}
              track={track}
              isActive={activeId === track.itemId}
              coarsePointer={coarsePointer}
              stageRef={stageRef}
              onCardClick={handleCardClick}
            />
          )
        })}
      </div>
    </div>
  )
}
