'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CoffeeCycleIntroCard } from '@/components/sections/coffee2/coffee-cycle-intro-card'
import { HomeJarsyCenterMotionItem } from '@/components/sections/home-jarsy/home-jarsy-center-motion-item'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import {
  buildSnapPoints,
  createTimelineLayout,
  filterResonantEvents,
  getTimelineEndYear,
  getTrackOffsetBounds,
  pointsToPath,
  sampleCompositePoints,
  sampleWavePoints,
  yearToX,
} from '@/components/sections/coffee2/coffee-cycles-timeline-math'
import { useCoffeeCyclesTimelinePlayer } from '@/components/sections/coffee2/use-coffee-cycles-timeline-player'
import {
  coffeeCyclesTimeline,
  type CoffeeCycleEvent,
} from '@/lib/content/coffee-cycles-timeline'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const cycleLabelMap = Object.fromEntries(
  coffeeCyclesTimeline.cycles.map((cycle) => [cycle.id, cycle.label])
) as Record<string, string>

const INTRO_MOTION_TOTAL = coffeeCyclesTimeline.cycles.length + 1

export function CoffeeCyclesTimeline() {
  const endYear = getTimelineEndYear()
  const layout = useMemo(() => createTimelineLayout(endYear), [endYear])
  const viewportRef = useRef<HTMLDivElement>(null)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [dialogEvent, setDialogEvent] = useState<CoffeeCycleEvent | null>(null)
  const { ref: introRef, visible: introVisible } =
    useCenterZoneVisible<HTMLDivElement>()
  const { ref: stageRef, visible: timelineVisible } =
    useCenterZoneVisible<HTMLDivElement>()

  const resonantEvents = useMemo(
    () =>
      filterResonantEvents(
        coffeeCyclesTimeline.events as CoffeeCycleEvent[],
        endYear
      ),
    [endYear]
  )

  const viewportCenterX = viewportWidth / 2

  const snaps = useMemo(() => {
    if (viewportCenterX <= 0) return []
    return buildSnapPoints(
      resonantEvents,
      layout,
      viewportCenterX,
      `Today · ${endYear}`,
      coffeeCyclesTimeline.presentMoment.narrative
    )
  }, [resonantEvents, layout, viewportCenterX, endYear])

  const trackBounds = useMemo(() => {
    if (viewportCenterX <= 0) return { min: 0, max: 0 }
    return getTrackOffsetBounds(layout, viewportCenterX)
  }, [layout, viewportCenterX])

  const player = useCoffeeCyclesTimelinePlayer({
    snaps,
    viewportCenterX,
    trackMinOffset: trackBounds.min,
    trackMaxOffset: trackBounds.max,
    initialSnapId: coffeeCyclesTimeline.chart.initialSnapEventId,
  })

  const {
    offset,
    activeSnap,
    canInteract,
    goToAdjacentSnap,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = player

  useEffect(() => {
    const node = viewportRef.current
    if (!node) return

    const update = () => setViewportWidth(node.clientWidth)
    update()

    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const activeEventId = activeSnap?.event?.id
  const activeIsToday = activeSnap?.isToday

  const wavePaths = useMemo(
    () =>
      coffeeCyclesTimeline.cycles.map((cycle) => ({
        cycle,
        path: pointsToPath(sampleWavePoints(cycle, layout, 2)),
        dashed: cycle.id === 'kitchin' || cycle.id === 'juglar',
      })),
    [layout]
  )

  const compositePath = useMemo(
    () =>
      pointsToPath(
        sampleCompositePoints(coffeeCyclesTimeline.cycles, layout, 2)
      ),
    [layout]
  )

  const axisY = layout.waveCenterY

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!canInteract) return
      event.currentTarget.setPointerCapture(event.pointerId)
      onPointerDown(event.clientX)
    },
    [canInteract, onPointerDown]
  )

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerMove(event.clientX)
    },
    [onPointerMove]
  )

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }
      onPointerUp()
    },
    [onPointerUp]
  )

  useEffect(() => {
    if (!canInteract) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') goToAdjacentSnap(-1)
      if (event.key === 'ArrowRight') goToAdjacentSnap(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [canInteract, goToAdjacentSnap])

  return (
    <div className="coffee-cycles-timeline mb-0">
      <div ref={introRef}>
        <div className="mx-auto max-w-4xl text-center">
          <HomeJarsyCenterMotionItem
            as="h3"
            id="coffee-cycles-timeline-title"
            visible={introVisible}
            index={0}
            total={INTRO_MOTION_TOTAL}
            className="c2-display text-[clamp(2.5rem,8vw,5.5rem)] text-zinc-950"
          >
            {coffeeCyclesTimeline.chart.title}
          </HomeJarsyCenterMotionItem>
        </div>

        <div className="coffee-cycle-intro-grid mt-6 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-5">
          {coffeeCyclesTimeline.cycles.map((cycle, index) => (
            <CoffeeCycleIntroCard
              key={cycle.id}
              cycle={cycle}
              visible={introVisible}
              index={index + 1}
              total={INTRO_MOTION_TOTAL}
            />
          ))}
        </div>
      </div>

      <div
        ref={stageRef}
        data-visible={timelineVisible ? 'true' : 'false'}
        className="coffee-cycles-center-motion"
      >
        <div className="coffee-cycles-timeline__stage">
          <div className="coffee-cycles-timeline__narrative">
            <div className="coffee-cycles-timeline__window" aria-live="polite">
              <p className="coffee-cycles-timeline__window-eyebrow">
                {activeIsToday ? 'Today' : activeSnap?.year}
              </p>
              <h4 className="coffee-cycles-timeline__window-title">
                {activeSnap?.label}
              </h4>
              <div className="coffee-cycles-timeline__window-body">
                <p className="coffee-cycles-timeline__window-text">
                  {activeSnap?.narrative}
                </p>
              </div>
              <div className="coffee-cycles-timeline__window-actions">
                {activeSnap?.event ? (
                  <button
                    type="button"
                    className="coffee-cycles-timeline__read-more"
                    onClick={() => setDialogEvent(activeSnap.event!)}
                  >
                    阅读全文
                  </button>
                ) : (
                  <span className="coffee-cycles-timeline__read-more coffee-cycles-timeline__read-more--placeholder" aria-hidden>
                    阅读全文
                  </span>
                )}
                <p
                  className={cn(
                    'coffee-cycles-timeline__hint',
                    !canInteract && 'coffee-cycles-timeline__hint--placeholder'
                  )}
                  aria-hidden={!canInteract}
                >
                  按住拖拽探索 · 松手后自动磁吸对齐
                </p>
              </div>
            </div>
          </div>

          <div
            ref={viewportRef}
            className={cn(
              'coffee-cycles-timeline__viewport',
              canInteract && 'coffee-cycles-timeline__viewport--interactive'
            )}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className="coffee-cycles-timeline__lens" aria-hidden>
              <div className="coffee-cycles-timeline__lens-axis" />
            </div>

            <div
              className="coffee-cycles-timeline__track"
              style={{
                width: layout.width,
                height: layout.height,
                transform: `translate3d(${offset}px, 0, 0)`,
              }}
            >
              <svg
                viewBox={`0 0 ${layout.width} ${layout.height}`}
                className="h-full w-full"
                role="img"
                aria-label="1760 年至今五层经济周期叠加时间轴"
              >
                <defs>
                  <filter
                    id="coffee-composite-glow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {[0.18, 0.32, 0.46].map((ratio) => (
                  <circle
                    key={ratio}
                    cx={layout.width * 0.5}
                    cy={axisY}
                    r={layout.height * ratio * 0.55}
                    fill="none"
                    stroke="#e4e4e7"
                    strokeWidth="0.5"
                    opacity="0.45"
                  />
                ))}

                {coffeeCyclesTimeline.centuryMarks.map((mark) => {
                  const x = yearToX(mark.year, layout)
                  return (
                    <g key={mark.year}>
                      <line
                        x1={x}
                        y1={layout.padding.top - 20}
                        x2={x}
                        y2={layout.height - layout.padding.bottom + 8}
                        stroke="#ebebeb"
                        strokeWidth="0.5"
                      />
                      <text
                        x={x}
                        y={layout.height - 16}
                        textAnchor="middle"
                        className="fill-zinc-400 text-[9px] font-medium tracking-widest"
                      >
                        {mark.label}
                      </text>
                    </g>
                  )
                })}

                <line
                  x1={layout.padding.left}
                  y1={axisY}
                  x2={layout.width - layout.padding.right}
                  y2={axisY}
                  stroke="#e4e4e7"
                  strokeWidth="0.5"
                />

                {wavePaths.map(({ cycle, path, dashed }) => (
                  <path
                    key={cycle.id}
                    d={path}
                    fill="none"
                    stroke={cycle.color}
                    strokeWidth={cycle.strokeWidth}
                    strokeDasharray={dashed ? '3 5' : undefined}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.55}
                  />
                ))}

                <path
                  d={compositePath}
                  fill="none"
                  stroke={coffeeCyclesTimeline.composite.color}
                  strokeWidth={coffeeCyclesTimeline.composite.strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#coffee-composite-glow)"
                />

                {resonantEvents.map((event) => {
                  const x = yearToX(event.year, layout)
                  const isActive = activeEventId === event.id
                  return (
                    <g key={event.id}>
                      <line
                        x1={x}
                        y1={24}
                        x2={x}
                        y2={layout.height - layout.padding.bottom}
                        stroke={isActive ? '#09090b' : '#d4d4d8'}
                        strokeWidth={isActive ? 1 : 0.5}
                        strokeDasharray={isActive ? undefined : '2 4'}
                        opacity={isActive ? 0.85 : 0.4}
                      />
                      <circle
                        cx={x}
                        cy={axisY}
                        r={isActive ? 6 : 4}
                        fill={isActive ? '#ffe600' : '#ffffff'}
                        stroke="#09090b"
                        strokeWidth={isActive ? 1.5 : 1}
                      />
                    </g>
                  )
                })}

                {(() => {
                  const todayX = yearToX(endYear, layout)
                  const isActive = activeIsToday
                  return (
                    <g>
                      <line
                        x1={todayX}
                        y1={24}
                        x2={todayX}
                        y2={layout.height - layout.padding.bottom}
                        stroke="#09090b"
                        strokeWidth={isActive ? 1.5 : 1}
                        opacity={0.85}
                      />
                      <circle
                        cx={todayX}
                        cy={axisY}
                        r={isActive ? 7 : 4.5}
                        fill="#09090b"
                        stroke={isActive ? '#ffe600' : '#09090b'}
                        strokeWidth={isActive ? 2 : 1}
                      />
                    </g>
                  )
                })()}
              </svg>
            </div>
          </div>

          <div className="coffee-cycles-timeline__legend">
            {coffeeCyclesTimeline.cycles.map((cycle) => (
              <div key={cycle.id} className="flex items-center gap-2">
                <span
                  className="h-px w-5"
                  style={{ backgroundColor: cycle.color }}
                />
                <span className="text-[10px] font-medium tracking-wide text-zinc-500">
                  {cycle.label}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="h-[3px] w-6 rounded-full bg-zinc-950" />
              <span className="text-[10px] font-bold tracking-wide text-zinc-800">
                {coffeeCyclesTimeline.composite.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={dialogEvent !== null}
        onOpenChange={(open) => {
          if (!open) setDialogEvent(null)
        }}
      >
        {dialogEvent && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                {dialogEvent.year}
              </p>
              <DialogTitle className="text-2xl">{dialogEvent.title}</DialogTitle>
            </DialogHeader>
            <p className="text-sm font-semibold text-zinc-700">
              {dialogEvent.summary}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {dialogEvent.cycles.map((cycleId) => (
                <span
                  key={cycleId}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700"
                >
                  {cycleLabelMap[cycleId]}
                </span>
              ))}
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
              {dialogEvent.body.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
