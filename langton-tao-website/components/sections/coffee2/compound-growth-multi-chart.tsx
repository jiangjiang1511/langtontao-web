'use client'

import { useId, useMemo } from 'react'
import type { CompoundGrowthPoint } from '@/lib/compound-growth/types'
import { formatTotalReturn } from '@/lib/compound-growth/format-market-cap'
import { cn } from '@/lib/utils'
import {
  buildChartPath,
  getLogGridLines,
  getMultiSeriesScale,
} from '@/components/sections/coffee2/use-compound-growth-player'

export type CompoundGrowthChartSeries = {
  slug: string
  points: CompoundGrowthPoint[]
  accent: string
  name: string
}

type CompoundGrowthMultiChartProps = {
  seriesList: CompoundGrowthChartSeries[]
  progress: number
  highlightedSlug: string | null
  className?: string
  width?: number
  height?: number
}

function interpolateValue(points: CompoundGrowthPoint[], progress: number) {
  if (!points.length) return 0
  if (progress <= 0) return points[0].marketCap
  if (progress >= 1) return points[points.length - 1].marketCap

  const scaled = progress * (points.length - 1)
  const index = Math.min(Math.floor(scaled), points.length - 2)
  const localT = scaled - index
  const from = points[index]
  const to = points[index + 1]
  return from.marketCap + (to.marketCap - from.marketCap) * localT
}

function layoutEndpointLabels(
  items: {
    slug: string
    name: string
    accent: string
    x: number
    y: number
    value: number
    dimmed: boolean
  }[],
  minGap = 14
) {
  const sorted = [...items].sort((a, b) => a.y - b.y)
  const placed: typeof sorted = []

  for (const item of sorted) {
    let y = item.y
    if (placed.length > 0) {
      const prev = placed[placed.length - 1]
      if (y - prev.y < minGap) {
        y = prev.y + minGap
      }
    }
    placed.push({ ...item, y })
  }

  return placed
}

export function CompoundGrowthMultiChart({
  seriesList,
  progress,
  highlightedSlug,
  className,
  width = 800,
  height = 340,
}: CompoundGrowthMultiChartProps) {
  const uid = useId().replace(/:/g, '')
  const chartPadding = { top: 16, right: 112, bottom: 24, left: 52 }

  const scale = useMemo(
    () => getMultiSeriesScale(seriesList.map((series) => series.points), true),
    [seriesList]
  )

  const paths = useMemo(
    () =>
      seriesList.map((series) => ({
        slug: series.slug,
        accent: series.accent,
        name: series.name,
        points: series.points,
        value: interpolateValue(series.points, progress),
        ...buildChartPath(
          series.points,
          width,
          height,
          progress,
          chartPadding,
          scale
        ),
      })),
    [seriesList, width, height, progress, scale]
  )

  const gridLines = useMemo(
    () => getLogGridLines(scale, height, chartPadding, 5),
    [scale, height]
  )

  const sortedPaths = useMemo(() => {
    if (!highlightedSlug) return paths
    const rest = paths.filter((path) => path.slug !== highlightedSlug)
    const active = paths.find((path) => path.slug === highlightedSlug)
    return active ? [...rest, active] : paths
  }, [paths, highlightedSlug])

  const endpointLabels = useMemo(() => {
    const items = paths
      .filter((path) => path.currentCoord)
      .map((path) => {
        const dimmed = Boolean(highlightedSlug) && path.slug !== highlightedSlug
        return {
          slug: path.slug,
          name: path.name,
          accent: path.accent,
          x: path.currentCoord!.x + 8,
          y: path.currentCoord!.y,
          value: path.value,
          dimmed,
        }
      })

    return layoutEndpointLabels(items)
  }, [paths, highlightedSlug])

  if (!paths.some((path) => path.linePath)) return null

  return (
    <div className={cn('cg-chart-svg-wrap', className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="cg-chart-svg"
        role="img"
        aria-label="十年复利收益曲线对比"
        preserveAspectRatio="none"
      >
      <defs>
        {sortedPaths.map((path) => (
          <filter
            key={`glow-${path.slug}`}
            id={`cg-glow-${uid}-${path.slug}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>

      {gridLines.map((line) => (
        <line
          key={line.key}
          x1={chartPadding.left}
          y1={line.y}
          x2={width - chartPadding.right}
          y2={line.y}
          className="cg-chart-grid-line"
        />
      ))}

      {sortedPaths.map((path) => {
        const isHighlighted = !highlightedSlug || path.slug === highlightedSlug
        const dimmed = Boolean(highlightedSlug) && path.slug !== highlightedSlug

        return (
          <g
            key={path.slug}
            className="cg-multi-chart-series"
            data-highlighted={isHighlighted}
            data-dimmed={dimmed}
          >
            {isHighlighted && path.areaPath ? (
              <path
                d={path.areaPath}
                fill={path.accent}
                className="cg-chart-area cg-multi-chart-area"
                opacity={highlightedSlug ? 0.35 : 0.12}
              />
            ) : null}

            <path
              d={path.linePath}
              fill="none"
              stroke={path.accent}
              strokeWidth={isHighlighted ? 2.75 : 1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cg-chart-line cg-multi-chart-line"
              opacity={dimmed ? 0.28 : highlightedSlug ? 1 : 0.82}
              filter={
                isHighlighted ? `url(#cg-glow-${uid}-${path.slug})` : undefined
              }
            />

            {isHighlighted && path.currentCoord ? (
              <>
                <circle
                  cx={path.currentCoord.x}
                  cy={path.currentCoord.y}
                  r="14"
                  fill={path.accent}
                  opacity="0.2"
                  className="cg-chart-pulse-ring"
                />
                <circle
                  cx={path.currentCoord.x}
                  cy={path.currentCoord.y}
                  r="5"
                  fill={path.accent}
                  stroke="#09090b"
                  strokeWidth="2"
                />
              </>
            ) : null}
          </g>
        )
      })}

      </svg>

      <div className="cg-chart-label-overlay" aria-hidden="true">
        {gridLines.map((line) =>
          line.logValue != null ? (
            <span
              key={line.key}
              className="cg-chart-axis-label"
              style={{
                left: `${((chartPadding.left - 6) / width) * 100}%`,
                top: `${((line.y + 4) / height) * 100}%`,
              }}
            >
              {formatTotalReturn(Math.round(line.logValue))}
            </span>
          ) : null
        )}

        {endpointLabels.map((label) => (
          <span
            key={label.slug}
            className="cg-chart-endpoint-label"
            style={{
              left: `${(label.x / width) * 100}%`,
              top: `${((label.y + 3) / height) * 100}%`,
              color: label.accent,
              opacity: label.dimmed ? 0.45 : 0.92,
            }}
          >
            {label.name} {formatTotalReturn(label.value)}
          </span>
        ))}
      </div>
    </div>
  )
}
