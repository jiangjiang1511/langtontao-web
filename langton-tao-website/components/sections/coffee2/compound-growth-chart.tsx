'use client'

import { useId, useMemo } from 'react'
import type { CompoundGrowthPoint } from '@/lib/compound-growth/types'
import { buildChartPath } from '@/components/sections/coffee2/use-compound-growth-player'

type CompoundGrowthChartProps = {
  points: CompoundGrowthPoint[]
  progress: number
  accent?: string
  className?: string
  width?: number
  height?: number
}

export function CompoundGrowthChart({
  points,
  progress,
  accent = 'var(--jarsy-violet)',
  className,
  width = 640,
  height = 280,
}: CompoundGrowthChartProps) {
  const uid = useId().replace(/:/g, '')
  const areaGradientId = `cg-area-gradient-${uid}`
  const glowFilterId = `cg-glow-${uid}`

  const { linePath, areaPath, currentCoord, minCap, maxCap } = useMemo(
    () => buildChartPath(points, width, height, progress),
    [points, width, height, progress]
  )

  const gridLines = useMemo(() => {
    if (minCap === undefined || maxCap === undefined) return []
    const padding = { top: 16, right: 16, bottom: 24, left: 8 }
    const innerH = height - padding.top - padding.bottom
    const lines = 4
    return Array.from({ length: lines }, (_, index) => {
      const y = padding.top + (innerH / (lines - 1)) * index
      return { y, key: index }
    })
  }, [height, minCap, maxCap])

  if (!linePath) return null

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label="市值历史曲线"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={areaGradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {gridLines.map((line) => (
        <line
          key={line.key}
          x1={8}
          y1={line.y}
          x2={width - 16}
          y2={line.y}
          className="cg-chart-grid-line"
        />
      ))}

      {areaPath ? (
        <path
          d={areaPath}
          fill={`url(#${areaGradientId})`}
          className="cg-chart-area"
        />
      ) : null}

      <path
        d={linePath}
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cg-chart-line"
        filter={`url(#${glowFilterId})`}
      />

      {currentCoord ? (
        <>
          <circle
            cx={currentCoord.x}
            cy={currentCoord.y}
            r="14"
            fill={accent}
            opacity="0.2"
            className="cg-chart-pulse-ring"
          />
          <circle
            cx={currentCoord.x}
            cy={currentCoord.y}
            r="5"
            fill={accent}
            stroke="#09090b"
            strokeWidth="2"
          />
        </>
      ) : null}
    </svg>
  )
}
