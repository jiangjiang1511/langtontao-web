'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CompoundGrowthPoint } from '@/lib/compound-growth/types'

const DEFAULT_DURATION_MS = 4000

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function interpolatePoints(points: CompoundGrowthPoint[], progress: number) {
  if (points.length === 0) {
    return { marketCap: 0, date: '', index: 0, localT: 0 }
  }
  if (points.length === 1 || progress <= 0) {
    return { marketCap: points[0].marketCap, date: points[0].date, index: 0, localT: 0 }
  }
  if (progress >= 1) {
    const last = points[points.length - 1]
    return {
      marketCap: last.marketCap,
      date: last.date,
      index: points.length - 1,
      localT: 1,
    }
  }

  const scaled = progress * (points.length - 1)
  const index = Math.min(Math.floor(scaled), points.length - 2)
  const localT = scaled - index
  const from = points[index]
  const to = points[index + 1]

  const fromMs = new Date(from.date).getTime()
  const toMs = new Date(to.date).getTime()
  const dateMs = lerp(fromMs, toMs, localT)
  const date = new Date(dateMs).toISOString().slice(0, 10)

  return {
    marketCap: lerp(from.marketCap, to.marketCap, localT),
    date,
    index,
    localT,
  }
}

type UseCompoundGrowthPlayerOptions = {
  points: CompoundGrowthPoint[]
  durationMs?: number
  autoPlay?: boolean
  reducedMotion?: boolean
}

export function useCompoundGrowthPlayer({
  points,
  durationMs = DEFAULT_DURATION_MS,
  autoPlay = true,
  reducedMotion = false,
}: UseCompoundGrowthPlayerOptions) {
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0)
  const [playing, setPlaying] = useState(autoPlay && !reducedMotion)
  const [speed, setSpeed] = useState<1 | 2>(2)
  const rafRef = useRef(0)
  const startRef = useRef<number | null>(null)
  const progressRef = useRef(reducedMotion ? 1 : 0)

  const frame = useCallback(
    (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = (now - startRef.current) * speed
      const next = Math.min(1, elapsed / durationMs)
      progressRef.current = next
      setProgress(next)

      if (next < 1) {
        rafRef.current = requestAnimationFrame(frame)
      } else {
        setPlaying(false)
      }
    },
    [durationMs, speed]
  )

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    if (!playing || reducedMotion) return

    startRef.current = null
    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing, frame, reducedMotion])

  const play = useCallback(() => {
    if (reducedMotion) {
      progressRef.current = 1
      setProgress(1)
      return
    }
    if (progressRef.current >= 1) {
      progressRef.current = 0
      setProgress(0)
    }
    startRef.current = null
    setPlaying(true)
  }, [reducedMotion])

  const pause = useCallback(() => {
    setPlaying(false)
    cancelAnimationFrame(rafRef.current)
  }, [])

  const togglePlay = useCallback(() => {
    if (playing) pause()
    else play()
  }, [playing, pause, play])

  const seek = useCallback(
    (value: number) => {
      const clamped = Math.max(0, Math.min(1, value))
      progressRef.current = clamped
      setProgress(clamped)
      if (clamped >= 1) setPlaying(false)
    },
    []
  )

  const reset = useCallback(() => {
    pause()
    progressRef.current = 0
    setProgress(0)
  }, [pause])

  const toggleSpeed = useCallback(() => {
    setSpeed((current) => (current === 1 ? 2 : 1))
  }, [])

  const interpolated = useMemo(
    () => interpolatePoints(points, progress),
    [points, progress]
  )

  const displayYear = useMemo(() => {
    if (!interpolated.date) return '—'
    return String(new Date(interpolated.date).getFullYear())
  }, [interpolated.date])

  const milestonePulse = useMemo(() => {
    const cap = interpolated.marketCap
    if (cap <= 0) return false
    const log = Math.log10(cap)
    const fractional = log - Math.floor(log)
    return fractional < 0.02 || fractional > 0.98
  }, [interpolated.marketCap])

  return {
    progress,
    playing,
    speed,
    interpolated,
    displayYear,
    milestonePulse,
    play,
    pause,
    togglePlay,
    seek,
    reset,
    toggleSpeed,
    finished: progress >= 1,
  }
}

type ChartScale = {
  minCap: number
  maxCap: number
  log?: boolean
}

function valueToChartRatio(
  value: number,
  minCap: number,
  maxCap: number,
  log = false
) {
  if (log) {
    const minLog = Math.log10(Math.max(minCap, 1))
    const maxLog = Math.log10(Math.max(maxCap, 1))
    const valueLog = Math.log10(Math.max(value, 1))
    const range = maxLog - minLog || 1
    return (valueLog - minLog) / range
  }

  const range = maxCap - minCap || 1
  return (value - minCap) / range
}

export function buildChartPath(
  points: CompoundGrowthPoint[],
  width: number,
  height: number,
  progress = 1,
  padding = { top: 16, right: 16, bottom: 24, left: 8 },
  scale?: ChartScale
) {
  if (points.length < 2) {
    return {
      linePath: '',
      areaPath: '',
      coords: [] as { x: number; y: number }[],
      currentCoord: null,
      minCap: 0,
      maxCap: 0,
    }
  }

  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const visibleCount = Math.max(2, Math.ceil(progress * (points.length - 1)) + 1)
  const visible = points.slice(0, visibleCount)

  const caps = points.map((p) => p.marketCap)
  const minCap = scale?.minCap ?? Math.min(...caps)
  const maxCap = scale?.maxCap ?? Math.max(...caps)
  const useLog = scale?.log ?? false

  const coords = visible.map((point, index) => {
    const x = padding.left + (index / (points.length - 1)) * innerW
    const ratio = valueToChartRatio(point.marketCap, minCap, maxCap, useLog)
    const y = padding.top + innerH - ratio * innerH
    return { x, y }
  })

  const linePath = coords
    .map(
      (coord, index) =>
        `${index === 0 ? 'M' : 'L'} ${coord.x.toFixed(2)} ${coord.y.toFixed(2)}`
    )
    .join(' ')

  const baseline = padding.top + innerH
  const areaPath = coords.length
    ? `${linePath} L ${coords[coords.length - 1].x.toFixed(2)} ${baseline} L ${coords[0].x.toFixed(2)} ${baseline} Z`
    : ''

  const currentCoord = coords[coords.length - 1] ?? null

  return { linePath, areaPath, coords, currentCoord, minCap, maxCap }
}

export function getMultiSeriesScale(
  seriesList: CompoundGrowthPoint[][],
  log = true
): ChartScale {
  const caps = seriesList.flatMap((points) =>
    points.map((point) => point.marketCap)
  )
  if (!caps.length) return { minCap: 1, maxCap: 10, log }

  const positiveCaps = caps.filter((cap) => cap > 0)
  return {
    minCap: Math.min(...positiveCaps),
    maxCap: Math.max(...positiveCaps),
    log,
  }
}

export function getLogGridLines(
  scale: ChartScale,
  height: number,
  padding = { top: 16, right: 16, bottom: 24, left: 8 },
  lineCount = 5
) {
  const innerH = height - padding.top - padding.bottom
  const useLog = scale.log ?? false

  if (!useLog) {
    return Array.from({ length: lineCount }, (_, index) => ({
      y: padding.top + (innerH / (lineCount - 1)) * index,
      key: index,
      logValue: null as number | null,
    }))
  }

  const minLog = Math.log10(Math.max(scale.minCap, 1))
  const maxLog = Math.log10(Math.max(scale.maxCap, 1))

  return Array.from({ length: lineCount }, (_, index) => {
    const t = index / (lineCount - 1)
    return {
      y: padding.top + innerH * t,
      key: index,
      logValue: Math.pow(10, maxLog - t * (maxLog - minLog)),
    }
  })
}
