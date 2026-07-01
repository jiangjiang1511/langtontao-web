import type { CSSProperties } from 'react'
import Link from 'next/link'
import type { FiftyYearProduct } from '@/lib/content/fifty-year-narrative'
import {
  getDayOnePathForkMeta,
  type DayOnePathForkRoad,
} from '@/lib/content/day-one-path-fork'
import { cn } from '@/lib/utils'

type DayOnePathForkProps = {
  items: FiftyYearProduct[]
}

function RoadArrow({ direction }: { direction: 'left' | 'right' }) {
  if (direction === 'left') {
    return (
      <svg
        className="day-one-path-fork__road-arrow-svg"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
      >
        <path
          d="M22 8 L10 16 L22 24"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 16 H26"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg
      className="day-one-path-fork__road-arrow-svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
    >
      <path
        d="M10 8 L22 16 L10 24"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 16 H6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ForkRoad({ road }: { road: DayOnePathForkRoad }) {
  const surfaceStyle = road.imageSrc
    ? ({
        '--road-image': `url("${road.imageSrc}")`,
      } as CSSProperties)
    : undefined

  const inner = (
    <>
      <div
        className={cn(
          'day-one-path-fork__road-surface',
          road.imageSrc && 'day-one-path-fork__road-surface--cover'
        )}
        style={surfaceStyle}
      >
        <div className="day-one-path-fork__road-glow" aria-hidden />
        <div className="day-one-path-fork__road-markings" aria-hidden />
        <div
          className={cn(
            'day-one-path-fork__road-copy',
            road.side === 'left'
              ? 'day-one-path-fork__road-copy--left'
              : 'day-one-path-fork__road-copy--right'
          )}
        >
          {road.side === 'left' ? (
            <span
              className="day-one-path-fork__road-arrow day-one-path-fork__road-arrow--left"
              aria-hidden
            >
              <RoadArrow direction="left" />
            </span>
          ) : null}
          <div className="day-one-path-fork__road-text">
            <span className="day-one-path-fork__road-index">{road.index}</span>
            <span className="day-one-path-fork__road-label">{road.label}</span>
            <span className="day-one-path-fork__road-hint">{road.hint}</span>
          </div>
          {road.side === 'right' ? (
            <span
              className="day-one-path-fork__road-arrow day-one-path-fork__road-arrow--right"
              aria-hidden
            >
              <RoadArrow direction="right" />
            </span>
          ) : null}
        </div>
      </div>
    </>
  )

  const className = cn(
    'day-one-path-fork__road',
    road.side === 'left'
      ? 'day-one-path-fork__road--left'
      : 'day-one-path-fork__road--right'
  )

  if (road.href) {
    return (
      <Link href={road.href} className={className}>
        {inner}
      </Link>
    )
  }

  return <div className={className}>{inner}</div>
}

function ForkJunction() {
  return (
    <div className="day-one-path-fork__junction-wrap" aria-hidden>
      <svg
        className="day-one-path-fork__junction"
        viewBox="0 0 120 72"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <linearGradient id="fork-junction-line" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#d4d4d8" />
            <stop offset="100%" stopColor="#e4e4e7" />
          </linearGradient>
        </defs>
        <path
          d="M60 68 L60 36 M60 36 L16 8 M60 36 L104 8"
          stroke="url(#fork-junction-line)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="60" cy="68" r="3" fill="#ffe600" stroke="#09090b" strokeWidth="1" />
      </svg>
      <span className="day-one-path-fork__fork-badge">或</span>
    </div>
  )
}

export function DayOnePathFork({ items }: DayOnePathForkProps) {
  const roads = items.map((item, index) => getDayOnePathForkMeta(item, index))
  const leftRoad = roads.find((road) => road.side === 'left') ?? roads[0]
  const rightRoad = roads.find((road) => road.side === 'right') ?? roads[1]

  if (!leftRoad || !rightRoad) return null

  return (
    <div className="day-one-path-fork">
      <div className="day-one-path-fork__horizon" aria-hidden />
      <div className="day-one-path-fork__scene">
        <ForkRoad road={leftRoad} />
        <ForkRoad road={rightRoad} />
      </div>
      <ForkJunction />
    </div>
  )
}
