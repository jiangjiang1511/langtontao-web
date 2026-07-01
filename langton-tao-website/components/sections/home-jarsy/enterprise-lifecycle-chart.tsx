'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'
import { LifecycleChartCallout } from '@/components/sections/home-jarsy/lifecycle-chart-callout'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import {
  getTrapMarkerY,
  LIFECYCLE_TRAP_MARKER_HALF,
  LIFECYCLE_VIEWBOX_H,
  LIFECYCLE_VIEWBOX_W,
} from '@/lib/lifecycle-chart/constants'
import { useEnterSequence } from '@/lib/lifecycle-chart/use-enter-sequence'
import {
  ENTER_PHASE_RANK,
  type LifecycleSelection,
} from '@/lib/lifecycle-chart/types'
import {
  buildGrowthHighlightPath,
  buildMainCurvePath,
  enterpriseLifecycleMeta,
  getStageById,
  getStageOnSpine,
  getTrapById,
  lifecycleStages,
  lifecycleTraps,
  lifecycleToSvg,
  lifecycleZones,
  paeiLegend,
  type LifecycleStage,
  type LifecycleTrap,
} from '@/lib/content/enterprise-lifecycle'
import { cn } from '@/lib/utils'

const CHART_AXIS_Y = 480
const MAIN_CURVE_PATH = buildMainCurvePath()
const GROWTH_HIGHLIGHT_PATH = buildGrowthHighlightPath()
const PHASE_DIVIDER_X = lifecycleToSvg(enterpriseLifecycleMeta.phaseDividerX, 0).x

function PhaseSticker({ x, label }: { x: number; label: string }) {
  const width = label.length * 16 + 32
  return (
    <g transform={`translate(${x - width / 2}, 8)`}>
      <rect
        width={width}
        height={28}
        rx={14}
        className="enterprise-lifecycle__phase-sticker"
      />
      <text
        x={width / 2}
        y={18}
        className="enterprise-lifecycle__phase-sticker-text"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  )
}

function StageNode({
  stage,
  index,
  selected,
  hatchId,
  nodesRevealed,
  onSelect,
}: {
  stage: LifecycleStage
  index: number
  selected: boolean
  hatchId: string
  nodesRevealed: boolean
  onSelect: (id: string) => void
}) {
  const { x, y } = lifecycleToSvg(stage.x, stage.y)

  return (
    <g
      className={cn(
        'enterprise-lifecycle__node-group',
        nodesRevealed && 'enterprise-lifecycle__node-group--revealed'
      )}
      style={{ '--node-i': index } as CSSProperties}
    >
      <g transform={`translate(${x}, ${y})`}>
        <circle
          r={selected ? 14 : 12}
          className={cn(
            'enterprise-lifecycle__node-dot',
            stage.phase === 'growth'
              ? 'enterprise-lifecycle__node-dot--growth'
              : 'enterprise-lifecycle__node-dot--aging',
            selected && 'enterprise-lifecycle__node-dot--selected'
          )}
          fill={stage.phase === 'aging' ? `url(#${hatchId})` : undefined}
          tabIndex={nodesRevealed ? 0 : -1}
          role="button"
          aria-pressed={selected}
          aria-label={`${stage.label}，PAEI ${stage.paeiCode}`}
          onClick={() => onSelect(stage.id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onSelect(stage.id)
            }
          }}
        />
      </g>
      <text
        x={x}
        y={y - 22}
        className={cn(
          'enterprise-lifecycle__node-label',
          selected && 'enterprise-lifecycle__node-label--selected'
        )}
        textAnchor="middle"
      >
        {stage.shortLabel}
      </text>
    </g>
  )
}

function TrapPath({
  trap,
  selected,
  trapsVisible,
  onSelect,
}: {
  trap: LifecycleTrap
  selected: boolean
  trapsVisible: boolean
  onSelect: (id: string) => void
}) {
  const start = getStageOnSpine(trap.fromStageId)
  if (!start) return null

  const end = lifecycleToSvg(trap.endX, trap.endY)
  const midX = (start.x + end.x) / 2
  const midY = Math.max(start.y, end.y) + 24
  const path = `M ${start.x} ${start.y} Q ${midX} ${midY}, ${end.x} ${end.y}`
  const markerY = getTrapMarkerY(end.y)
  const labelBelowY = markerY + LIFECYCLE_TRAP_MARKER_HALF + 14
  const labelY =
    labelBelowY + 12 <= CHART_AXIS_Y ? labelBelowY : markerY - LIFECYCLE_TRAP_MARKER_HALF - 8

  return (
    <g
      className={cn(
        'enterprise-lifecycle__trap-group',
        trapsVisible && 'enterprise-lifecycle__trap-group--visible'
      )}
    >
      <path
        d={path}
        className={cn(
          'enterprise-lifecycle__trap-path',
          selected && 'enterprise-lifecycle__trap-path--selected'
        )}
        fill="none"
        pointerEvents={trapsVisible ? 'stroke' : 'none'}
        tabIndex={trapsVisible ? 0 : -1}
        role="button"
        aria-pressed={selected}
        aria-label={`失败路径：${trap.label}`}
        onClick={() => onSelect(trap.id)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onSelect(trap.id)
          }
        }}
      />
      <g transform={`translate(${end.x}, ${markerY})`}>
        <rect
          x={-12}
          y={-12}
          width={24}
          height={24}
          rx={3}
          className={cn(
            'enterprise-lifecycle__trap-marker',
            selected && 'enterprise-lifecycle__trap-marker--selected'
          )}
          tabIndex={trapsVisible ? 0 : -1}
          role="button"
          aria-pressed={selected}
          aria-label={`失败路径：${trap.label}`}
          onClick={() => onSelect(trap.id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onSelect(trap.id)
            }
          }}
        />
        <text
          y={5}
          className="enterprise-lifecycle__trap-marker-icon"
          textAnchor="middle"
          pointerEvents="none"
          aria-hidden
        >
          ×
        </text>
      </g>
      <text
        x={end.x}
        y={labelY}
        className="enterprise-lifecycle__trap-label"
        textAnchor="middle"
      >
        {trap.label}
      </text>
    </g>
  )
}

export function EnterpriseLifecycleChart() {
  const chartId = useId()
  const hatchId = `${chartId}-hatch`
  const halftoneId = `${chartId}-halftone`
  const mainPathRef = useRef<SVGPathElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<SVGSVGElement>(null)
  const { ref: containerRef, visible } = useCenterZoneVisible<HTMLDivElement>()
  const [pathLength, setPathLength] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [selection, setSelection] = useState<LifecycleSelection | null>(null)

  const { enterPhase, nodesRevealed, legendVisible } = useEnterSequence(
    visible,
    reducedMotion
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const path = mainPathRef.current
    if (!path) return
    setPathLength(path.getTotalLength())
  }, [])

  const selectStage = useCallback((id: string) => {
    setSelection((prev) =>
      prev?.type === 'stage' && prev.id === id ? null : { type: 'stage', id }
    )
  }, [])

  const selectTrap = useCallback((id: string) => {
    setSelection((prev) =>
      prev?.type === 'trap' && prev.id === id ? null : { type: 'trap', id }
    )
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!selection || selection.type !== 'stage') return
    const currentIndex = lifecycleStages.findIndex((s) => s.id === selection.id)
    if (currentIndex < 0) return

    if (event.key === 'ArrowRight' && currentIndex < lifecycleStages.length - 1) {
      event.preventDefault()
      selectStage(lifecycleStages[currentIndex + 1].id)
    }
    if (event.key === 'ArrowLeft' && currentIndex > 0) {
      event.preventDefault()
      selectStage(lifecycleStages[currentIndex - 1].id)
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      setSelection(null)
    }
  }

  const selectedStage =
    selection?.type === 'stage' ? getStageById(selection.id) : undefined
  const selectedTrap =
    selection?.type === 'trap' ? getTrapById(selection.id) : undefined

  const curveActive = reducedMotion
    ? visible
    : enterPhase === 'curve' || enterPhase === 'nodes' || enterPhase === 'done'
  const dashOffset = curveActive && pathLength > 0 ? 0 : pathLength
  const rank = ENTER_PHASE_RANK[enterPhase]

  return (
    <div
      ref={containerRef}
      className="enterprise-lifecycle mx-auto mt-10 max-w-6xl md:mt-12"
      role="region"
      aria-labelledby={`${chartId}-title`}
      onKeyDown={handleKeyDown}
    >
      <header className="enterprise-lifecycle__header text-center">
        <p className="c2-eyebrow">{enterpriseLifecycleMeta.eyebrow}</p>
        <h3
          id={`${chartId}-title`}
          className="c2-display mt-3 text-2xl text-zinc-950 md:text-3xl"
        >
          {enterpriseLifecycleMeta.title}
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
          {enterpriseLifecycleMeta.lead}
        </p>
      </header>

      <div
        ref={shellRef}
        className="enterprise-lifecycle__shell mt-6 md:mt-8"
        data-reduced-motion={reducedMotion ? 'true' : 'false'}
      >
        {selection ? (
          <LifecycleChartCallout
            selectedStage={selectedStage}
            selectedTrap={selectedTrap}
            classPrefix="enterprise-lifecycle"
          />
        ) : null}

        <div
          className="enterprise-lifecycle__stage"
          data-enter-phase={enterPhase}
          data-curve-drawn={curveActive ? 'true' : 'false'}
        >
          <svg
            ref={chartRef}
            viewBox={`0 0 ${LIFECYCLE_VIEWBOX_W} ${LIFECYCLE_VIEWBOX_H}`}
            className="enterprise-lifecycle__svg"
            role="img"
            aria-label="事业生命周期曲线图"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <pattern
                id={halftoneId}
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(12)"
              >
                <circle cx="2" cy="2" r="1.5" className="enterprise-lifecycle__halftone-dot" />
              </pattern>
              <pattern
                id={hatchId}
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="6"
                  className="enterprise-lifecycle__hatch-line"
                />
              </pattern>
            </defs>

            {lifecycleZones.map((zone, zoneIndex) => {
              const yTop = lifecycleToSvg(0, zone.yMax).y
              const yBottom = lifecycleToSvg(0, zone.yMin).y
              const fill =
                zone.id === 'rapid'
                  ? `url(#${halftoneId})`
                  : zone.id === 'plateau'
                    ? 'var(--el-paper)'
                    : 'var(--el-surface)'
              return (
                <g
                  key={zone.id}
                  className="enterprise-lifecycle__layer enterprise-lifecycle__layer--zone"
                  style={{ '--layer-i': zoneIndex } as CSSProperties}
                  data-visible={rank >= ENTER_PHASE_RANK.zones ? 'true' : 'false'}
                >
                  <rect
                    x={120}
                    y={yTop}
                    width={860}
                    height={yBottom - yTop}
                    fill={fill}
                    className="enterprise-lifecycle__zone-band"
                    pointerEvents="none"
                  />
                  <text
                    x={24}
                    y={(yTop + yBottom) / 2}
                    className="enterprise-lifecycle__zone-label"
                    transform={`rotate(-90, 24, ${(yTop + yBottom) / 2})`}
                    textAnchor="middle"
                  >
                    {zone.label}
                  </text>
                </g>
              )
            })}

            <g
              className="enterprise-lifecycle__layer enterprise-lifecycle__layer--frame"
              data-visible={rank >= ENTER_PHASE_RANK.frame ? 'true' : 'false'}
            >
              <rect
                x={118}
                y={38}
                width={864}
                height={446}
                className="enterprise-lifecycle__chart-frame"
                pointerEvents="none"
              />
              <line x1={120} y1={480} x2={980} y2={480} className="enterprise-lifecycle__axis-line" />
              <line x1={120} y1={48} x2={120} y2={480} className="enterprise-lifecycle__axis-line" />
              <circle cx={120} cy={480} r={4} className="enterprise-lifecycle__axis-cap" />
              <circle cx={980} cy={480} r={4} className="enterprise-lifecycle__axis-cap" />
              <circle cx={120} cy={48} r={4} className="enterprise-lifecycle__axis-cap" />
            </g>

            <g
              className="enterprise-lifecycle__layer enterprise-lifecycle__layer--chrome"
              data-visible={rank >= ENTER_PHASE_RANK.chrome ? 'true' : 'false'}
            >
              <PhaseSticker x={300} label={enterpriseLifecycleMeta.growthLabel} />
              <PhaseSticker x={720} label={enterpriseLifecycleMeta.agingLabel} />
              <line
                x1={PHASE_DIVIDER_X}
                y1={40}
                x2={PHASE_DIVIDER_X}
                y2={480}
                className="enterprise-lifecycle__phase-divider"
                pointerEvents="none"
              />
              <text x={24} y={44} className="enterprise-lifecycle__axis-label">
                {enterpriseLifecycleMeta.axisY}
              </text>
              <text x={500} y={520} className="enterprise-lifecycle__axis-label" textAnchor="middle">
                {enterpriseLifecycleMeta.axisX}
              </text>
            </g>

            {lifecycleTraps.map((trap) => (
              <TrapPath
                key={trap.id}
                trap={trap}
                selected={selection?.type === 'trap' && selection.id === trap.id}
                trapsVisible={rank >= ENTER_PHASE_RANK.traps}
                onSelect={selectTrap}
              />
            ))}

            <g data-visible={rank >= ENTER_PHASE_RANK.curve ? 'true' : 'false'}>
              <path
                d={GROWTH_HIGHLIGHT_PATH}
                className="enterprise-lifecycle__growth-highlight"
                fill="none"
                pointerEvents="none"
              />
              <path
                ref={mainPathRef}
                d={MAIN_CURVE_PATH}
                className="enterprise-lifecycle__main-curve"
                fill="none"
                pointerEvents="none"
                style={
                  pathLength > 0
                    ? {
                        strokeDasharray: pathLength,
                        strokeDashoffset: dashOffset,
                      }
                    : undefined
                }
              />
            </g>

            {lifecycleStages.map((stage, index) => (
              <StageNode
                key={stage.id}
                stage={stage}
                index={index}
                hatchId={hatchId}
                nodesRevealed={nodesRevealed}
                selected={selection?.type === 'stage' && selection.id === stage.id}
                onSelect={selectStage}
              />
            ))}
          </svg>

          <ul
            className={cn(
              'enterprise-lifecycle__legend',
              legendVisible && 'enterprise-lifecycle__legend--visible'
            )}
            aria-label="PAEI 图例"
          >
            {paeiLegend.map((item) => (
              <li key={item.letter} className="enterprise-lifecycle__legend-chip">
                <span className="enterprise-lifecycle__legend-letter">{item.letter}</span>
                <span className="enterprise-lifecycle__legend-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
