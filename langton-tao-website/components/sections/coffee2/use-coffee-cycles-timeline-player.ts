'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { SnapPoint } from '@/components/sections/coffee2/coffee-cycles-timeline-math'
import {
  applyMagneticPull,
  clampOffset,
  getActiveSnapIndex,
} from '@/components/sections/coffee2/coffee-cycles-timeline-math'

export type TimelinePlayerPhase =
  | 'waitingReveal'
  | 'autoScroll'
  | 'magnetSnap'
  | 'typewriter'
  | 'hold'
  | 'interactive'

const MAGNET_MS = 520
const SCROLL_MIN_MS = 900
const SCROLL_MAX_MS = 2800
const MAGNET_CAPTURE_RADIUS = 160
const MAGNET_PULL_STRENGTH = 0.52

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function easeOutBack(t: number): number {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

function scrollDuration(distance: number): number {
  return Math.min(SCROLL_MAX_MS, Math.max(SCROLL_MIN_MS, distance * 1.4))
}

type UseCoffeeCyclesTimelinePlayerOptions = {
  snaps: SnapPoint[]
  viewportCenterX: number
  trackMinOffset: number
  trackMaxOffset: number
  initialSnapId?: string
}

function resolveInitialSnapIndex(snaps: SnapPoint[], initialSnapId?: string): number {
  if (!snaps.length) return 0
  if (!initialSnapId) return snaps.length - 1
  const index = snaps.findIndex((snap) => snap.id === initialSnapId)
  return index >= 0 ? index : snaps.length - 1
}

export function useCoffeeCyclesTimelinePlayer({
  snaps,
  viewportCenterX,
  trackMinOffset,
  trackMaxOffset,
  initialSnapId,
}: UseCoffeeCyclesTimelinePlayerOptions) {
  const [phase, setPhase] = useState<TimelinePlayerPhase>('waitingReveal')
  const [offset, setOffset] = useState(0)
  const [snapIndex, setSnapIndex] = useState(0)
  const [typingActive, setTypingActive] = useState(false)

  const offsetRef = useRef(0)
  const snapIndexRef = useRef(0)
  const phaseRef = useRef<TimelinePlayerPhase>('waitingReveal')
  const dragRef = useRef<{ startX: number; startOffset: number } | null>(null)
  const rafRef = useRef(0)
  const tourStartedRef = useRef(false)

  const syncOffset = useCallback(
    (value: number, mode: 'track' | 'snap' = 'track') => {
      const clamped =
        mode === 'snap'
          ? clampOffset(value, snaps)
          : Math.min(trackMaxOffset, Math.max(trackMinOffset, value))
      offsetRef.current = clamped
      setOffset(clamped)
      setSnapIndex(getActiveSnapIndex(clamped, snaps))
    },
    [snaps, trackMinOffset, trackMaxOffset]
  )

  const animateTo = useCallback(
    (
      target: number,
      duration: number,
      onDone?: () => void,
      easing: (t: number) => number = easeOutCubic
    ) => {
      cancelAnimationFrame(rafRef.current)
      const from = offsetRef.current
      const start = performance.now()

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = easing(t)
        syncOffset(from + (target - from) * eased)
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step)
        } else {
          syncOffset(target, 'snap')
          onDone?.()
        }
      }

      rafRef.current = requestAnimationFrame(step)
    },
    [syncOffset]
  )

  const goToSnap = useCallback(
    (index: number, mode: 'auto' | 'magnet' | 'instant' = 'magnet') => {
      if (snaps.length === 0) return
      const clampedIndex = Math.max(0, Math.min(index, snaps.length - 1))
      snapIndexRef.current = clampedIndex
      setSnapIndex(clampedIndex)

      const target = snaps[clampedIndex].targetOffset

      if (mode === 'instant') {
        syncOffset(target)
        setPhase('interactive')
        phaseRef.current = 'interactive'
        setTypingActive(true)
        return
      }

      const distance = Math.abs(target - offsetRef.current)

      if (mode === 'auto') {
        setPhase('autoScroll')
        phaseRef.current = 'autoScroll'
        setTypingActive(false)
        animateTo(target, scrollDuration(distance), () => {
          setPhase('magnetSnap')
          phaseRef.current = 'magnetSnap'
          animateTo(
            target,
            MAGNET_MS,
            () => {
              setPhase('typewriter')
              phaseRef.current = 'typewriter'
              setTypingActive(true)
            },
            easeOutBack
          )
        })
        return
      }

      setPhase('magnetSnap')
      phaseRef.current = 'magnetSnap'
      setTypingActive(false)
      animateTo(
        target,
        MAGNET_MS,
        () => {
          setPhase('interactive')
          phaseRef.current = 'interactive'
          setTypingActive(true)
        },
        easeOutBack
      )
    },
    [animateTo, snaps, syncOffset]
  )

  const advanceTour = useCallback(() => {
    const next = snapIndexRef.current + 1
    if (next >= snaps.length) {
      snapIndexRef.current = snaps.length - 1
      setSnapIndex(snaps.length - 1)
      setPhase('interactive')
      phaseRef.current = 'interactive'
      setTypingActive(true)
      syncOffset(snaps[snaps.length - 1].targetOffset, 'snap')
      return
    }
    goToSnap(next, 'auto')
  }, [goToSnap, snaps, syncOffset])

  useEffect(() => {
    if (snaps.length === 0 || viewportCenterX <= 0 || tourStartedRef.current) {
      return
    }

    tourStartedRef.current = true

    const initialIndex = resolveInitialSnapIndex(snaps, initialSnapId)
    snapIndexRef.current = initialIndex
    setSnapIndex(initialIndex)
    syncOffset(snaps[initialIndex].targetOffset, 'snap')
    setPhase('interactive')
    phaseRef.current = 'interactive'
    setTypingActive(true)
  }, [snaps, viewportCenterX, syncOffset, initialSnapId])

  const onPointerDown = useCallback((clientX: number) => {
    if (phaseRef.current !== 'interactive') return
    cancelAnimationFrame(rafRef.current)
    dragRef.current = { startX: clientX, startOffset: offsetRef.current }
  }, [])

  const onPointerMove = useCallback(
    (clientX: number) => {
      if (!dragRef.current) return
      const delta = clientX - dragRef.current.startX
      const raw = dragRef.current.startOffset + delta
      const pulled = applyMagneticPull(raw, snaps, {
        captureRadius: MAGNET_CAPTURE_RADIUS,
        strength: MAGNET_PULL_STRENGTH,
      })
      syncOffset(pulled)
    },
    [snaps, syncOffset]
  )

  const onPointerUp = useCallback(() => {
    if (!dragRef.current) return
    dragRef.current = null
    const nearest = getActiveSnapIndex(offsetRef.current, snaps)
    goToSnap(nearest, 'magnet')
  }, [goToSnap, snaps])

  const goToAdjacentSnap = useCallback(
    (direction: -1 | 1) => {
      if (phaseRef.current !== 'interactive') return
      const next = Math.max(
        0,
        Math.min(snaps.length - 1, snapIndexRef.current + direction)
      )
      goToSnap(next, 'magnet')
    },
    [goToSnap, snaps.length]
  )

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const activeSnap = snaps[snapIndex] ?? snaps[0]
  const canInteract = phase === 'interactive'

  return {
    phase,
    offset,
    snapIndex,
    activeSnap,
    typingActive:
      typingActive &&
      (phase === 'typewriter' || phase === 'hold' || phase === 'interactive'),
    canInteract,
    advanceTour,
    goToSnap,
    goToAdjacentSnap,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }
}
