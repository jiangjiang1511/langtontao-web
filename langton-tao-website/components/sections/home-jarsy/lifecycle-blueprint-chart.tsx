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
import { LifecycleBlueprintCurve } from '@/components/sections/home-jarsy/lifecycle-blueprint-curve'
import { LifecycleChartCallout } from '@/components/sections/home-jarsy/lifecycle-chart-callout'
import { LifecyclePhaseSticker } from '@/components/sections/home-jarsy/lifecycle-phase-sticker'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import {
  LIFECYCLE_VIEWBOX_H,
  LIFECYCLE_VIEWBOX_W,
} from '@/lib/lifecycle-chart/constants'
import { useBlueprintEnterSequence } from '@/lib/lifecycle-chart/use-blueprint-enter-sequence'
import type { LifecycleSelection } from '@/lib/lifecycle-chart/types'
import {
  BLUEPRINT_CHART_INSET,
  anchorToStagePercent,
  blueprintPercentToPlot,
  blueprintTrapSidebar,
  blueprintZonePanels,
  getBlueprintStageLayout,
  getBlueprintTrapAnchor,
  getBlueprintZoneById,
  getPhaseStickerCenterX,
  getStageSpineAnchor,
  lifecycleBlueprintMeta,
  lifecycleStages,
  lifecycleTraps,
} from '@/lib/content/lifecycle-blueprint'
import {
  getStageById,
  getTrapById,
  lifecycleToSvg,
  type LifecycleStage,
  type LifecycleTrap,
} from '@/lib/content/enterprise-lifecycle'
import { cn } from '@/lib/utils'

const PHASE_DIVIDER_X = lifecycleToSvg(lifecycleBlueprintMeta.phaseDividerX, 0).x
const GROWTH_STICKER_X = getPhaseStickerCenterX('growth')
const AGING_STICKER_X = getPhaseStickerCenterX('aging')

function buildTrapArcPath(start: { x: number; y: number }, end: { x: number; y: number }) {
  const midX = (start.x + end.x) / 2
  const bow = Math.min(28, Math.abs(end.x - start.x) * 0.35)
  const controlY = start.y - bow
  return `M ${start.x} ${start.y} Q ${midX} ${controlY}, ${end.x} ${end.y}`
}

function BlueprintTrapArcLeader({
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
  const spineAnchor = getStageSpineAnchor(trap.fromStageId)
  const trapAnchor = getBlueprintTrapAnchor(trap.id)
  if (!spineAnchor || !trapAnchor) return null

  const start = lifecycleToSvg(spineAnchor.x, spineAnchor.y)
  const end = lifecycleToSvg(trapAnchor.x, trapAnchor.y)
  const path = buildTrapArcPath(start, end)

  return (
    <g
      className={cn(
        'lifecycle-blueprint__trap-group',
        trapsVisible && 'lifecycle-blueprint__trap-group--visible'
      )}
    >
      <path
        d={path}
        className={cn(
          'lifecycle-blueprint__trap-arc',
          selected && 'lifecycle-blueprint__trap-arc--selected'
        )}
        fill="none"
        pointerEvents="none"
        aria-hidden
      />
      <text
        x={end.x}
        y={end.y}
        className={cn(
          'lifecycle-blueprint__trap-label',
          selected && 'lifecycle-blueprint__trap-label--selected'
        )}
        dominantBaseline="middle"
        textAnchor="start"
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
      >
        {trap.label}
      </text>
    </g>
  )
}

export function LifecycleBlueprintChart() {
  const chartId = useId()
  const shellRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const { ref: containerRef, visible } = useCenterZoneVisible<HTMLDivElement>()
  const [reducedMotion, setReducedMotion] = useState(false)
  const [selection, setSelection] = useState<LifecycleSelection | null>(null)

  const { phase, nodesRevealed, curveVisible, curveActive, curveDrawn, chromeVisible, discVisible } =
    useBlueprintEnterSequence(visible, reducedMotion)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
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

  const selectZone = useCallback((id: string) => {
    setSelection((prev) =>
      prev?.type === 'zone' && prev.id === id ? null : { type: 'zone', id }
    )
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!selection) return

    if (event.key === 'Escape') {
      event.preventDefault()
      setSelection(null)
      return
    }

    if (selection.type !== 'stage') return
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
  }

  const selectedStage: LifecycleStage | undefined =
    selection?.type === 'stage' ? getStageById(selection.id) : undefined
  const selectedTrap: LifecycleTrap | undefined =
    selection?.type === 'trap' ? getTrapById(selection.id) : undefined
  const selectedZone =
    selection?.type === 'zone' ? getBlueprintZoneById(selection.id) : undefined

  const { left, top, right, bottom } = BLUEPRINT_CHART_INSET

  return (
    <div
      ref={containerRef}
      className="lifecycle-blueprint mx-auto mt-16 max-w-6xl md:mt-20"
      role="region"
      aria-labelledby={`${chartId}-title`}
      onKeyDown={handleKeyDown}
    >
      <header className="lifecycle-blueprint__header text-center">
        <p className="c2-eyebrow">{lifecycleBlueprintMeta.eyebrow}</p>
        <h3
          id={`${chartId}-title`}
          className="c2-display mt-3 text-2xl text-zinc-950 md:text-3xl"
        >
          {lifecycleBlueprintMeta.title}
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
          {lifecycleBlueprintMeta.lead}
        </p>
      </header>

      <div
        ref={shellRef}
        className="lifecycle-blueprint__shell mt-6 md:mt-8"
        data-reduced-motion={reducedMotion ? 'true' : 'false'}
      >
        {selection ? (
          <LifecycleChartCallout
            selectedStage={selectedStage}
            selectedTrap={selectedTrap}
            selectedZone={selectedZone}
            classPrefix="lifecycle-blueprint"
          />
        ) : null}

        <div
          ref={stageRef}
          className="lifecycle-blueprint__stage"
          data-enter-phase={phase}
          data-curve-drawn={curveDrawn ? 'true' : 'false'}
        >
          <div
            className="lifecycle-blueprint__grid"
            data-visible={chromeVisible ? 'true' : 'false'}
            aria-hidden
          />
          <div
            className="lifecycle-blueprint__crosshair lifecycle-blueprint__crosshair--tl"
            data-visible={chromeVisible ? 'true' : 'false'}
            aria-hidden
          />
          <div
            className="lifecycle-blueprint__crosshair lifecycle-blueprint__crosshair--tr"
            data-visible={chromeVisible ? 'true' : 'false'}
            aria-hidden
          />
          <div
            className="lifecycle-blueprint__crosshair lifecycle-blueprint__crosshair--bl"
            data-visible={chromeVisible ? 'true' : 'false'}
            aria-hidden
          />
          <div
            className="lifecycle-blueprint__crosshair lifecycle-blueprint__crosshair--br"
            data-visible={chromeVisible ? 'true' : 'false'}
            aria-hidden
          />

          <svg
            className="lifecycle-blueprint__barcode lifecycle-blueprint__barcode--tr"
            data-visible={chromeVisible ? 'true' : 'false'}
            aria-hidden
            viewBox="0 0 40 60"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x={i * 3.2} y={0} width={i % 3 === 0 ? 2 : 1} height={60} fill="currentColor" />
            ))}
          </svg>
          <svg
            className="lifecycle-blueprint__barcode lifecycle-blueprint__barcode--br"
            data-visible={chromeVisible ? 'true' : 'false'}
            aria-hidden
            viewBox="0 0 40 60"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x={i * 3.2} y={0} width={i % 2 === 0 ? 2 : 1} height={60} fill="currentColor" />
            ))}
          </svg>

          <div
            className="lifecycle-blueprint__disc"
            data-visible={discVisible ? 'true' : 'false'}
            aria-hidden
          />

          <div
            className="lifecycle-blueprint__zones"
            data-visible={chromeVisible ? 'true' : 'false'}
          >
            {blueprintZonePanels.map((panel, index) => {
              const yTop = blueprintPercentToPlot(0, panel.yMax).y
              const yBottom = blueprintPercentToPlot(0, panel.yMin).y
              const isSelected = selection?.type === 'zone' && selection.id === panel.zoneId

              return (
                <button
                  key={panel.zoneId}
                  type="button"
                  className={cn(
                    'lifecycle-blueprint__zone-panel',
                    isSelected && 'lifecycle-blueprint__zone-panel--selected'
                  )}
                  style={
                    {
                      top: `${yTop}%`,
                      height: `${yBottom - yTop}%`,
                      '--layer-i': index,
                    } as CSSProperties
                  }
                  aria-pressed={isSelected}
                  aria-label={panel.label}
                  onClick={() => selectZone(panel.zoneId)}
                >
                  <h4 className="lifecycle-blueprint__zone-title">{panel.label}</h4>
                </button>
              )
            })}
          </div>

          <aside
            className="lifecycle-blueprint__sidebar"
            data-visible={chromeVisible ? 'true' : 'false'}
          >
            {blueprintTrapSidebar.map((item) => {
              const isSelected =
                item.trapId !== null &&
                selection?.type === 'trap' &&
                selection.id === item.trapId

              return (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    'lifecycle-blueprint__sidebar-box',
                    isSelected && 'lifecycle-blueprint__sidebar-box--selected'
                  )}
                  aria-pressed={isSelected}
                  onClick={() => item.trapId && selectTrap(item.trapId)}
                >
                  {item.label}
                </button>
              )
            })}
          </aside>

          <svg
            viewBox={`0 0 ${LIFECYCLE_VIEWBOX_W} ${LIFECYCLE_VIEWBOX_H}`}
            className="lifecycle-blueprint__svg"
            role="img"
            aria-label={`${lifecycleBlueprintMeta.title}蓝图曲线图`}
            preserveAspectRatio="xMidYMid meet"
          >
            <LifecycleBlueprintCurve
              visible={curveVisible}
              curveActive={curveActive}
              strandsVisible={curveDrawn}
            />

            <g
              className="lifecycle-blueprint__layer lifecycle-blueprint__layer--frame"
              data-visible={chromeVisible ? 'true' : 'false'}
            >
              <line x1={120} y1={480} x2={980} y2={480} className="lifecycle-blueprint__axis-line" />
              <line x1={120} y1={48} x2={120} y2={480} className="lifecycle-blueprint__axis-line" />
              <circle cx={120} cy={480} r={4} className="lifecycle-blueprint__axis-cap" />
              <circle cx={980} cy={480} r={4} className="lifecycle-blueprint__axis-cap" />
              <circle cx={120} cy={48} r={4} className="lifecycle-blueprint__axis-cap" />
            </g>

            {blueprintZonePanels.map((panel) => {
              const y = lifecycleToSvg(0, panel.yMin).y
              return (
                <line
                  key={`guide-${panel.zoneId}`}
                  x1={120}
                  y1={y}
                  x2={980}
                  y2={y}
                  className="lifecycle-blueprint__zone-guide"
                  data-visible={chromeVisible ? 'true' : 'false'}
                />
              )
            })}

            <g
              className="lifecycle-blueprint__layer lifecycle-blueprint__layer--chrome"
              data-visible={chromeVisible ? 'true' : 'false'}
            >
              <LifecyclePhaseSticker
                centerX={GROWTH_STICKER_X}
                label={lifecycleBlueprintMeta.growthLabel}
                classPrefix="lifecycle-blueprint"
              />
              <LifecyclePhaseSticker
                centerX={AGING_STICKER_X}
                label={lifecycleBlueprintMeta.agingLabel}
                classPrefix="lifecycle-blueprint"
              />
              <line
                x1={PHASE_DIVIDER_X}
                y1={40}
                x2={PHASE_DIVIDER_X}
                y2={480}
                className="lifecycle-blueprint__phase-divider"
                pointerEvents="none"
              />
              <text x={24} y={44} className="lifecycle-blueprint__axis-label">
                {lifecycleBlueprintMeta.axisY}
              </text>
              <text x={500} y={520} className="lifecycle-blueprint__axis-label" textAnchor="middle">
                {lifecycleBlueprintMeta.axisX}
              </text>
            </g>

            {lifecycleTraps.map((trap) => (
              <BlueprintTrapArcLeader
                key={trap.id}
                trap={trap}
                selected={selection?.type === 'trap' && selection.id === trap.id}
                trapsVisible={chromeVisible}
                onSelect={selectTrap}
              />
            ))}
          </svg>

          <div
            className="lifecycle-blueprint__nodes"
            style={
              {
                '--plot-left': `${left}%`,
                '--plot-top': `${top}%`,
                '--plot-right': `${right}%`,
                '--plot-bottom': `${bottom}%`,
              } as CSSProperties
            }
          >
            {lifecycleStages.map((stage, index) => {
              const layout = getBlueprintStageLayout(stage.id)
              const anchor = getStageSpineAnchor(stage.id)
              if (!layout || !anchor) return null
              const pos = anchorToStagePercent(anchor)
              const isSelected = selection?.type === 'stage' && selection.id === stage.id

              return (
                <button
                  key={stage.id}
                  type="button"
                  className={cn(
                    'lifecycle-blueprint__stage-label',
                    nodesRevealed && 'lifecycle-blueprint__stage-label--revealed',
                    isSelected && 'lifecycle-blueprint__stage-label--selected'
                  )}
                  style={
                    {
                      left: `${pos.x + (layout.labelShiftX ?? 0)}%`,
                      top: `${pos.y}%`,
                      '--node-i': index,
                    } as CSSProperties
                  }
                  aria-pressed={isSelected}
                  aria-label={stage.label}
                  onClick={() => selectStage(stage.id)}
                >
                  {stage.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
