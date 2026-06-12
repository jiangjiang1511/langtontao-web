import type {
  CoffeeCycleEvent,
  CoffeeCycleWave,
} from '@/lib/content/coffee-cycles-timeline'
import { coffeeCyclesTimeline } from '@/lib/content/coffee-cycles-timeline'

export type TimelineLayout = {
  width: number
  height: number
  padding: { top: number; right: number; bottom: number; left: number }
  waveCenterY: number
  startYear: number
  endYear: number
  pxPerYear: number
}

export type WavePoint = { year: number; x: number; y: number; value: number }

export type SnapPoint = {
  id: string
  year: number
  x: number
  /** translateX so this point aligns with viewport center */
  targetOffset: number
  event?: CoffeeCycleEvent
  isToday?: boolean
  label: string
  narrative: string
}

export const PX_PER_YEAR = 5
const START_YEAR = 1760

export function getTimelineEndYear(): number {
  return new Date().getFullYear()
}

export function createTimelineLayout(
  endYear = getTimelineEndYear(),
  overrides?: Partial<TimelineLayout>
): TimelineLayout {
  const span = endYear - START_YEAR
  const basePadding = { top: 72, right: 120, bottom: 56, left: 80 }
  const height = overrides?.height ?? 320
  const padding = { ...basePadding, ...overrides?.padding }
  const width = span * PX_PER_YEAR + padding.left + padding.right

  return {
    width,
    height,
    padding,
    waveCenterY: overrides?.waveCenterY ?? Math.round(height * 0.5),
    startYear: START_YEAR,
    endYear,
    pxPerYear: PX_PER_YEAR,
  }
}

export function yearToX(year: number, layout: TimelineLayout): number {
  const span = layout.endYear - layout.startYear
  const ratio = span === 0 ? 0 : (year - layout.startYear) / span
  return layout.padding.left + ratio * (layout.width - layout.padding.left - layout.padding.right)
}

export function waveValue(
  year: number,
  cycle: Pick<CoffeeCycleWave, 'periodYears' | 'amplitude' | 'phase'>,
  startYear = START_YEAR
): number {
  const radians =
    (2 * Math.PI * (year - startYear)) / cycle.periodYears + cycle.phase
  return cycle.amplitude * Math.sin(radians)
}

export function getCompositeRaw(
  year: number,
  cycles: CoffeeCycleWave[] = coffeeCyclesTimeline.cycles,
  startYear = START_YEAR
): number {
  const totalAmplitude = cycles.reduce((sum, cycle) => sum + cycle.amplitude, 0)
  if (totalAmplitude === 0) return 0
  return (
    cycles.reduce((sum, cycle) => sum + waveValue(year, cycle, startYear), 0) /
    totalAmplitude
  )
}

export function getCompositeNormalized(
  year: number,
  cycles: CoffeeCycleWave[] = coffeeCyclesTimeline.cycles
): number {
  return getCompositeRaw(year, cycles)
}

export function getCompositeSlope(
  year: number,
  cycles: CoffeeCycleWave[] = coffeeCyclesTimeline.cycles
): number {
  return getCompositeRaw(year + 0.5, cycles) - getCompositeRaw(year - 0.5, cycles)
}

export function computePhaseResonance(
  eventYear: number,
  todayYear: number,
  cycles: CoffeeCycleWave[] = coffeeCyclesTimeline.cycles
): number {
  const valueDiff = Math.abs(
    getCompositeRaw(eventYear, cycles) - getCompositeRaw(todayYear, cycles)
  )
  const todaySlope = getCompositeSlope(todayYear, cycles)
  const eventSlope = getCompositeSlope(eventYear, cycles)
  const sameDirection =
    Math.sign(todaySlope) === Math.sign(eventSlope) ||
    (Math.abs(todaySlope) < 0.02 && Math.abs(eventSlope) < 0.02)

  return valueDiff + (sameDirection ? -0.12 : 0.1)
}

export function filterResonantEvents(
  events: readonly CoffeeCycleEvent[],
  todayYear: number,
  options?: {
    min?: number
    max?: number
    cycles?: CoffeeCycleWave[]
  }
): CoffeeCycleEvent[] {
  const min = options?.min ?? 5
  const max = options?.max ?? 8
  const cycles = options?.cycles ?? coffeeCyclesTimeline.cycles

  const forced = events.filter(
    (event) => 'forceInclude' in event && event.forceInclude === true
  )
  const pool = events.filter(
    (event) => !('forceInclude' in event && event.forceInclude === true)
  )

  const ranked = pool
    .map((event) => ({
      event,
      score: computePhaseResonance(event.year, todayYear, cycles),
    }))
    .sort((a, b) => a.score - b.score)

  const selected = new Map<string, CoffeeCycleEvent>()
  for (const event of forced) {
    selected.set(event.id, event)
  }

  for (const { event } of ranked) {
    if (selected.size >= max) break
    selected.set(event.id, event)
  }

  let result = [...selected.values()].sort((a, b) => a.year - b.year)

  if (result.length < min) {
    for (const { event } of ranked) {
      if (result.length >= min) break
      if (!selected.has(event.id)) {
        result.push(event)
      }
    }
    result = result.sort((a, b) => a.year - b.year)
  }

  return result.slice(0, max)
}

export function sampleWavePoints(
  cycle: CoffeeCycleWave,
  layout: TimelineLayout,
  step = 2
): WavePoint[] {
  const points: WavePoint[] = []
  for (let year = layout.startYear; year <= layout.endYear; year += step) {
    const value = waveValue(year, cycle, layout.startYear)
    points.push({
      year,
      x: yearToX(year, layout),
      y: layout.waveCenterY - value,
      value,
    })
  }
  return points
}

export function sampleCompositePoints(
  cycles: CoffeeCycleWave[],
  layout: TimelineLayout,
  step = 2
): WavePoint[] {
  const points: WavePoint[] = []
  for (let year = layout.startYear; year <= layout.endYear; year += step) {
    const composite = getCompositeRaw(year, cycles, layout.startYear)
    const scaled = composite * 48
    points.push({
      year,
      x: yearToX(year, layout),
      y: layout.waveCenterY - scaled,
      value: scaled,
    })
  }
  return points
}

export function pointsToPath(points: WavePoint[]): string {
  if (points.length === 0) return ''
  return points
    .map(
      (point, index) =>
        `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
    )
    .join(' ')
}

export function computeTargetOffset(
  pointX: number,
  viewportCenterX: number
): number {
  return viewportCenterX - pointX
}

export function buildSnapPoints(
  events: CoffeeCycleEvent[],
  layout: TimelineLayout,
  viewportCenterX: number,
  todayLabel: string,
  todayNarrative: string
): SnapPoint[] {
  const snaps: SnapPoint[] = events.map((event) => {
    const x = yearToX(event.year, layout)
    const firstParagraph = event.body.split('\n\n')[0] ?? event.summary
    return {
      id: event.id,
      year: event.year,
      x,
      targetOffset: computeTargetOffset(x, viewportCenterX),
      event,
      label: event.title,
      narrative: `${event.summary}\n\n${firstParagraph}`,
    }
  })

  const todayX = yearToX(layout.endYear, layout)
  snaps.push({
    id: 'today',
    year: layout.endYear,
    x: todayX,
    targetOffset: computeTargetOffset(todayX, viewportCenterX),
    isToday: true,
    label: todayLabel,
    narrative: todayNarrative,
  })

  return snaps.sort((a, b) => a.year - b.year)
}

export function findNearestSnapIndex(
  offset: number,
  snaps: SnapPoint[],
  threshold = 36
): number | null {
  let nearest = 0
  let minDist = Infinity

  snaps.forEach((snap, index) => {
    const dist = Math.abs(offset - snap.targetOffset)
    if (dist < minDist) {
      minDist = dist
      nearest = index
    }
  })

  return minDist <= threshold ? nearest : null
}

export function getTrackOffsetBounds(
  layout: TimelineLayout,
  viewportCenterX: number
): { min: number; max: number } {
  const min = computeTargetOffset(yearToX(layout.endYear, layout), viewportCenterX)
  const max = computeTargetOffset(yearToX(layout.startYear, layout), viewportCenterX)
  return { min, max }
}

export function clampTrackOffset(
  offset: number,
  layout: TimelineLayout,
  viewportCenterX: number
): number {
  const { min, max } = getTrackOffsetBounds(layout, viewportCenterX)
  return Math.min(max, Math.max(min, offset))
}

export function clampOffset(
  offset: number,
  snaps: SnapPoint[]
): number {
  if (snaps.length === 0) return offset
  const min = Math.min(...snaps.map((s) => s.targetOffset))
  const max = Math.max(...snaps.map((s) => s.targetOffset))
  return Math.min(max, Math.max(min, offset))
}

export function getActiveSnapIndex(
  offset: number,
  snaps: SnapPoint[]
): number {
  let nearest = 0
  let minDist = Infinity
  snaps.forEach((snap, index) => {
    const dist = Math.abs(offset - snap.targetOffset)
    if (dist < minDist) {
      minDist = dist
      nearest = index
    }
  })
  return nearest
}

/** Soft pull toward nearest snap while dragging (stronger near center). */
export function applyMagneticPull(
  offset: number,
  snaps: SnapPoint[],
  options?: { captureRadius?: number; strength?: number }
): number {
  if (snaps.length === 0) return offset

  const captureRadius = options?.captureRadius ?? 160
  const strength = options?.strength ?? 0.52

  let nearestOffset = snaps[0].targetOffset
  let minDist = Infinity

  for (const snap of snaps) {
    const dist = Math.abs(offset - snap.targetOffset)
    if (dist < minDist) {
      minDist = dist
      nearestOffset = snap.targetOffset
    }
  }

  if (minDist >= captureRadius) return offset

  const proximity = 1 - minDist / captureRadius
  const pull = proximity * proximity * strength
  return offset + (nearestOffset - offset) * pull
}
