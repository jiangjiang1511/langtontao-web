'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { AssetQuadrantDetailDialog } from '@/components/sections/coffee2/asset-quadrant-detail-dialog'
import {
  assetBubbleSizeByWeight,
  assetBubbles,
  assetQuadrantAxes,
  assetQuadrants,
  type AssetBubble,
  type AssetQuadrantId,
} from '@/lib/content/coffee-asset-classes'
import { cn } from '@/lib/utils'

const CHART_STAGE_DELAY = 400
const LEGEND_BASE_DELAY = 560
const LEGEND_STAGGER = 90

function AssetBubbleButton({
  bubble,
  index,
}: {
  bubble: AssetBubble
  index: number
}) {
  const size = assetBubbleSizeByWeight[bubble.weight] ?? 48

  return (
    <button
      type="button"
      className="invest-bubble"
      data-weight={bubble.weight}
      style={
        {
          '--bubble-size': `${size}px`,
          '--bubble-x': `${bubble.x}%`,
          '--bubble-y': `${bubble.y}%`,
          '--bubble-stagger': `${index * 42}ms`,
        } as CSSProperties
      }
      aria-label={bubble.label}
    >
      <span className="invest-bubble__ring" aria-hidden />
      <span className="invest-bubble__label">{bubble.label}</span>
    </button>
  )
}

type AssetClassesQuadrantChartProps = {
  className?: string
}

export function AssetClassesQuadrantChart({
  className,
}: AssetClassesQuadrantChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [isExploded, setIsExploded] = useState(false)
  const [activeQuadrant, setActiveQuadrant] = useState<AssetQuadrantId | null>(
    null
  )

  useEffect(() => {
    const frame = stageRef.current
    const chart = chartRef.current
    if (!frame || !chart) return

    const updateScale = () => {
      const width = frame.clientWidth
      const isMobile = width < 768
      const scale = isMobile
        ? Math.min(0.72, Math.max(0.52, width / 640))
        : Math.min(1, Math.max(0.48, width / 720))
      chart.style.setProperty('--quadrant-scale', scale.toFixed(3))
    }

    updateScale()

    const resizeObserver = new ResizeObserver(updateScale)
    resizeObserver.observe(frame)
    window.addEventListener('resize', updateScale)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateScale)
    }
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setIsExploded(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          setIsExploded(true)
          observer.disconnect()
        }
      },
      {
        threshold: [0, 0.2, 0.35, 0.5, 0.75, 1],
        rootMargin: '-15% 0px -15% 0px',
      }
    )

    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={chartRef}
      className={cn('invest-quadrant', className)}
      role="img"
      aria-label="大类资产四象限气泡图"
    >
      <Coffee2Reveal
        delay={CHART_STAGE_DELAY}
        className="invest-quadrant__stage-shell"
      >
        <div className="invest-quadrant__stage">
          <p className="invest-quadrant__axis invest-quadrant__axis--top">
            {assetQuadrantAxes.top}
          </p>
          <p className="invest-quadrant__axis invest-quadrant__axis--bottom">
            {assetQuadrantAxes.bottom}
          </p>
          <p className="invest-quadrant__axis invest-quadrant__axis--left">
            {assetQuadrantAxes.left}
          </p>
          <p className="invest-quadrant__axis invest-quadrant__axis--right">
            {assetQuadrantAxes.right}
          </p>

          <div
            ref={stageRef}
            className="invest-quadrant__frame"
            data-exploded={isExploded ? 'true' : 'false'}
          >
            <div className="invest-quadrant__crosshair" aria-hidden>
              <span className="invest-quadrant__line invest-quadrant__line--h" />
              <span className="invest-quadrant__line invest-quadrant__line--v" />
            </div>

            {assetQuadrants.map((quadrant) => (
              <div
                key={quadrant.id}
                className={cn(
                  'invest-quadrant__corner',
                  `invest-quadrant__corner--${quadrant.id}`
                )}
                style={{ '--quadrant-accent': quadrant.accent } as CSSProperties}
              >
                <span className="invest-quadrant__corner-label">
                  {quadrant.label}
                </span>
              </div>
            ))}

            <div
              className="invest-quadrant__bubbles"
              data-exploded={isExploded ? 'true' : 'false'}
            >
              {assetBubbles.map((bubble, index) => (
                <AssetBubbleButton
                  key={bubble.id}
                  bubble={bubble}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </Coffee2Reveal>

      <ul className="invest-quadrant__legend">
        {assetQuadrants.map((quadrant, index) => (
          <Coffee2Reveal
            key={quadrant.id}
            as="li"
            delay={LEGEND_BASE_DELAY + index * LEGEND_STAGGER}
            className="invest-quadrant__legend-item"
          >
            <button
              type="button"
              className="invest-quadrant__legend-button"
              onClick={() => setActiveQuadrant(quadrant.id)}
              aria-haspopup="dialog"
              aria-label={`查看${quadrant.label}资产列表`}
            >
              <span className="invest-quadrant__legend-accent" aria-hidden />
              <div className="invest-quadrant__legend-body">
                <span className="invest-quadrant__legend-label">
                  {quadrant.label}
                </span>
                <p className="invest-quadrant__legend-desc">
                  {quadrant.description}
                </p>
              </div>
            </button>
          </Coffee2Reveal>
        ))}
      </ul>

      <AssetQuadrantDetailDialog
        quadrantId={activeQuadrant}
        onClose={() => setActiveQuadrant(null)}
      />
    </div>
  )
}
