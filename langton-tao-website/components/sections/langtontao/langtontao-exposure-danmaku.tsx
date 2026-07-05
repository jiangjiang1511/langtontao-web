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
  selectedCategory: string
}

function isExposureItemDimmed(item: LangtontaoExposureItem, selectedCategory: string) {
  return selectedCategory !== '全部' && item.category !== selectedCategory
}

function isExposureItemFocused(item: LangtontaoExposureItem, selectedCategory: string) {
  return selectedCategory !== '全部' && item.category === selectedCategory
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

function ExposureDanmakuStaticList({
  items,
  selectedCategory,
}: {
  items: LangtontaoExposureItem[]
  selectedCategory: string
}) {
  return (
    <ul className="lt-exposure-danmaku__static-list mx-auto grid max-w-7xl gap-2 px-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-6 lg:px-8">
      {items.map((item) => (
        <li key={item.id}>
          <div
            className={cn(
              'lt-exposure-danmaku__static-card',
              `lt-exposure-danmaku__card--severity-${item.severity}`,
              isExposureItemDimmed(item, selectedCategory) &&
                'lt-exposure-danmaku__static-card--dimmed',
              isExposureItemFocused(item, selectedCategory) &&
                'lt-exposure-danmaku__static-card--focused'
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
  isDimmed: boolean
  isFocused: boolean
  coarsePointer: boolean
  stageRef: React.RefObject<HTMLDivElement | null>
  onCardClick: (itemId: string) => void
}

function ExposureDanmakuCard({
  item,
  track,
  isActive,
  isDimmed,
  isFocused,
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
        isDimmed && 'lt-exposure-danmaku__card--dimmed',
        isFocused && 'lt-exposure-danmaku__card--focused',
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
  selectedCategory,
}: LangtontaoExposureDanmakuProps) {
  const reducedMotion = usePrefersReducedMotion()
  const coarsePointer = useCoarsePointer()
  const stageRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  const itemById = useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items]
  )

  const tracks = useMemo(() => buildExposureDanmakuTracks(items), [items])

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
        <ExposureDanmakuStaticList items={items} selectedCategory={selectedCategory} />
      </div>
    )
  }

  return (
    <div className="lt-exposure-danmaku lt-exposure-danmaku--visible" aria-label="家庭风险敞口流动视图">
      <div ref={stageRef} className="lt-exposure-danmaku__stage">
        {tracks.map((track) => {
          const item = itemById.get(track.itemId)
          if (!item) return null

          return (
            <ExposureDanmakuCard
              key={track.itemId}
              item={item}
              track={track}
              isDimmed={isExposureItemDimmed(item, selectedCategory)}
              isFocused={isExposureItemFocused(item, selectedCategory)}
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
