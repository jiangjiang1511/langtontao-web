'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { TaoCenturyRoadFloatLayer } from '@/components/sections/home-jarsy/tao-century-road-float-layer'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import { fiftyYearStages } from '@/lib/content/fifty-year-narrative'
import {
  TAO_ROAD_DEFAULT_STAGE_ID,
  TAO_ROAD_ENTER_DELAYS,
  TAO_ROAD_IMAGE,
  TAO_ROAD_NODE_LAYOUTS,
  pct,
} from '@/lib/content/tao-century-road'
import { summarizeStageBody } from '@/lib/content/tao-fifty-year-timeline'
import { cn } from '@/lib/utils'

type EnterPhase = 'hidden' | 'road' | 'nodes' | 'done'

type LeaderSegment = {
  stageId: string
  x1: number
  y1: number
  x2: number
  y2: number
}

function useEnterSequence(visible: boolean, reducedMotion: boolean) {
  const [enterPhase, setEnterPhase] = useState<EnterPhase>('hidden')
  const [nodesRevealed, setNodesRevealed] = useState(false)
  const [floatActive, setFloatActive] = useState(false)

  useEffect(() => {
    if (!visible) {
      setEnterPhase('hidden')
      setNodesRevealed(false)
      setFloatActive(false)
      return
    }

    if (reducedMotion) {
      setEnterPhase('done')
      setNodesRevealed(true)
      setFloatActive(true)
      return
    }

    const timers: number[] = []
    const schedule = (delay: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, delay))
    }

    setEnterPhase('hidden')
    setNodesRevealed(false)
    setFloatActive(false)

    schedule(TAO_ROAD_ENTER_DELAYS.road, () => setEnterPhase('road'))
    schedule(
      TAO_ROAD_ENTER_DELAYS.road + TAO_ROAD_ENTER_DELAYS.roadDuration,
      () => {
        setEnterPhase('nodes')
        setNodesRevealed(true)
      }
    )
    schedule(
      TAO_ROAD_ENTER_DELAYS.road +
        TAO_ROAD_ENTER_DELAYS.roadDuration +
        TAO_ROAD_ENTER_DELAYS.float,
      () => {
        setEnterPhase('done')
        setFloatActive(true)
      }
    )

    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [reducedMotion, visible])

  return { enterPhase, nodesRevealed, floatActive }
}

function useLeaderSegments(
  stageRef: React.RefObject<HTMLDivElement | null>,
  labelRefs: React.MutableRefObject<(HTMLAnchorElement | null)[]>,
  anchorRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>,
  ready: boolean
) {
  const [segments, setSegments] = useState<LeaderSegment[]>([])

  const measure = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return

    const stageRect = stage.getBoundingClientRect()
    if (stageRect.width <= 0 || stageRect.height <= 0) return

    const next = fiftyYearStages.flatMap((stageMeta, index) => {
      const label = labelRefs.current[index]
      const anchor = anchorRefs.current[index]
      if (!label || !anchor) return []

      const labelRect = label.getBoundingClientRect()
      const anchorRect = anchor.getBoundingClientRect()

      return [
        {
          stageId: stageMeta.id,
          x1:
            ((anchorRect.left + anchorRect.width / 2 - stageRect.left) /
              stageRect.width) *
            100,
          y1:
            ((anchorRect.top + anchorRect.height / 2 - stageRect.top) /
              stageRect.height) *
            100,
          x2:
            ((labelRect.left + labelRect.width / 2 - stageRect.left) /
              stageRect.width) *
            100,
          y2: ((labelRect.bottom - stageRect.top) / stageRect.height) * 100,
        },
      ]
    })

    setSegments(next)
  }, [anchorRefs, labelRefs, stageRef])

  useEffect(() => {
    if (!ready) return

    measure()

    const stage = stageRef.current
    if (!stage) return

    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure, ready, stageRef])

  return segments
}

export function TaoCenturyRoadTimeline() {
  const { ref: containerRef, visible } = useCenterZoneVisible<HTMLDivElement>()
  const stageRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const anchorRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  const [scrollActiveId, setScrollActiveId] = useState(TAO_ROAD_DEFAULT_STAGE_ID)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const { enterPhase, nodesRevealed, floatActive } = useEnterSequence(
    visible,
    reducedMotion
  )

  const nodesVisible = nodesRevealed || reducedMotion
  const segments = useLeaderSegments(
    stageRef,
    labelRefs,
    anchorRefs,
    nodesVisible && imageLoaded
  )

  const visibleLineId = highlightedId ?? TAO_ROAD_DEFAULT_STAGE_ID
  const emphasizedId = highlightedId

  useEffect(() => {
    if (!nodesVisible) return
    const img = stageRef.current?.querySelector(
      '.tao-century-road__image'
    ) as HTMLImageElement | null
    if (img?.complete) setImageLoaded(true)
  }, [nodesVisible])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const sections = fiftyYearStages
      .map((stage) => document.getElementById(stage.id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]?.target.id) {
          setScrollActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.55],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleStageHighlight = useCallback((stageId: string) => {
    setHighlightedId(stageId)
  }, [])

  const handleStageLeave = useCallback(() => {
    setHighlightedId(null)
  }, [])

  const roadVisible =
    reducedMotion ||
    enterPhase === 'road' ||
    enterPhase === 'nodes' ||
    enterPhase === 'done'

  return (
    <div
      ref={containerRef}
      className="tao-century-road"
      aria-label="TAO 定律九段旅程道路时间轴"
      data-phase={enterPhase}
      data-visible={visible ? 'true' : 'false'}
      data-highlight={highlightedId ?? ''}
      data-line={visibleLineId}
    >
      <TaoCenturyRoadFloatLayer active={floatActive} reducedMotion={reducedMotion} />

      <div className="tao-century-road__canvas">
        <div className="tao-century-road__stage">
          <div
            ref={stageRef}
            className="tao-century-road__artboard"
            style={{ aspectRatio: TAO_ROAD_IMAGE.aspectRatio }}
            onMouseLeave={handleStageLeave}
          >
            <Image
              src={TAO_ROAD_IMAGE.src}
              alt=""
              width={TAO_ROAD_IMAGE.width}
              height={TAO_ROAD_IMAGE.height}
              sizes="(min-width: 1280px) 80rem, 100vw"
              className={cn(
                'tao-century-road__image',
                roadVisible && 'tao-century-road__image--visible'
              )}
              priority={false}
              aria-hidden
              onLoad={() => setImageLoaded(true)}
            />

            <ol
              className={cn(
                'tao-century-road__label-strip',
                nodesVisible && 'tao-century-road__label-strip--visible'
              )}
            >
              {fiftyYearStages.map((stage, index) => {
                const summary = summarizeStageBody(stage.body)
                const isEmphasized = emphasizedId === stage.id

                return (
                  <li
                    key={stage.id}
                    className="tao-century-road__label-slot"
                    style={
                      {
                        '--slot-delay': `${index * TAO_ROAD_ENTER_DELAYS.nodeStagger}ms`,
                      } as CSSProperties
                    }
                  >
                    <Link
                      ref={(el) => {
                        labelRefs.current[index] = el
                      }}
                      href={`#${stage.id}`}
                      data-stage-id={stage.id}
                      className={cn(
                        'tao-century-road__node',
                        isEmphasized && 'tao-century-road__node--emphasized'
                      )}
                      aria-current={scrollActiveId === stage.id ? 'location' : undefined}
                      title={summary || undefined}
                      onMouseEnter={() => handleStageHighlight(stage.id)}
                      onFocus={() => handleStageHighlight(stage.id)}
                      onBlur={handleStageLeave}
                      onClick={() => handleStageHighlight(stage.id)}
                    >
                      <span className="tao-century-road__node-badge" aria-hidden>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="tao-century-road__node-period">{stage.periodLabel}</span>
                      <span className="tao-century-road__node-theme">{stage.theme}</span>
                    </Link>
                  </li>
                )
              })}
            </ol>

            <ol className="tao-century-road__anchors" aria-hidden>
              {fiftyYearStages.map((stage, index) => {
                const layout = TAO_ROAD_NODE_LAYOUTS[index]
                if (!layout) return null

                const isEmphasized = emphasizedId === stage.id

                return (
                  <li
                    key={`anchor-${stage.id}`}
                    className="tao-century-road__anchor-item"
                    style={
                      {
                        left: pct(layout.anchor.x),
                        top: pct(layout.anchor.y),
                        '--anchor-delay': `${index * TAO_ROAD_ENTER_DELAYS.nodeStagger}ms`,
                      } as CSSProperties
                    }
                    onMouseEnter={() => handleStageHighlight(stage.id)}
                  >
                    <span
                      ref={(el) => {
                        anchorRefs.current[index] = el
                      }}
                      data-stage-id={stage.id}
                      className={cn(
                        'tao-century-road__anchor-pin',
                        nodesVisible && 'tao-century-road__anchor-pin--visible',
                        isEmphasized && 'tao-century-road__anchor-pin--emphasized'
                      )}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </li>
                )
              })}
            </ol>

            <svg
              className="tao-century-road__overlay"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              role="presentation"
              aria-hidden
            >
              {segments.map((segment) => {
                const isVisible = visibleLineId === segment.stageId
                const isEmphasized = emphasizedId === segment.stageId

                return (
                  <g
                    key={segment.stageId}
                    className={cn(
                      'tao-century-road__leader',
                      nodesVisible && 'tao-century-road__leader--visible',
                      segment.stageId === TAO_ROAD_DEFAULT_STAGE_ID &&
                        'tao-century-road__leader--default',
                      isVisible && 'tao-century-road__leader--shown',
                      isEmphasized && 'tao-century-road__leader--emphasized'
                    )}
                    data-stage-id={segment.stageId}
                  >
                    <line
                      x1={segment.x1}
                      y1={segment.y1}
                      x2={segment.x2}
                      y2={segment.y2}
                      className="tao-century-road__leader-line"
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
