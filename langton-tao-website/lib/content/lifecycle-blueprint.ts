import { getSpineAnchorAtX } from '@/lib/content/lifecycle-blueprint-curve'
import {
  enterpriseLifecycleMeta,
  lifecycleStages,
  lifecycleTraps,
  lifecycleZones,
  lifecycleToSvg,
} from '@/lib/content/enterprise-lifecycle'
import { LIFECYCLE_VIEWBOX_H, LIFECYCLE_VIEWBOX_W } from '@/lib/lifecycle-chart/constants'

export type BlueprintAnchor = {
  x: number
  y: number
}

export type BlueprintStageLayout = {
  /** Time position on x-axis (0–100), y derived from spine */
  x: number
  place: 'above' | 'below'
  labelShiftX?: number
}

export const lifecycleBlueprintMeta = {
  eyebrow: enterpriseLifecycleMeta.eyebrow,
  title: enterpriseLifecycleMeta.title,
  lead: enterpriseLifecycleMeta.lead,
  growthLabel: enterpriseLifecycleMeta.growthLabel,
  agingLabel: enterpriseLifecycleMeta.agingLabel,
  axisY: enterpriseLifecycleMeta.axisY,
  axisX: enterpriseLifecycleMeta.axisX,
  phaseDividerX: enterpriseLifecycleMeta.phaseDividerX,
} as const

export const BLUEPRINT_CHART_INSET = {
  left: 14,
  top: 8,
  right: 6,
  bottom: 12,
} as const

/** Label offset from spine anchor (normalized 0–100). */
const TRAP_LABEL_OFFSET: Record<string, { dx: number; dy: number }> = {
  fantasy: { dx: 14, dy: 0 },
  'infant-death': { dx: 14, dy: 0 },
  'founder-trap': { dx: 18, dy: 0 },
  unfulfilled: { dx: 14, dy: 0 },
  'premature-aging': { dx: 14, dy: -8 },
}

/** Stage x positions — y from spine sampling at runtime */
export const blueprintStageLayouts: Record<string, BlueprintStageLayout> = {
  gestation: { x: 10, place: 'above', labelShiftX: -0.5 },
  infancy: { x: 18, place: 'above' },
  toddler: { x: 28, place: 'above' },
  adolescence: { x: 38, place: 'above' },
  prime: { x: 48, place: 'above' },
  stability: { x: 58, place: 'above' },
  aristocracy: { x: 68, place: 'above' },
  'early-bureaucracy': { x: 78, place: 'above' },
  bureaucracy: { x: 88, place: 'above' },
  death: { x: 95, place: 'above' },
}

export const blueprintZonePanels = [
  {
    zoneId: 'plateau',
    label: '高原巩固期',
    body: '极少人历经磨难，到达高原。他们笑傲江湖，也知道凌晨 4 点的深圳是什么样子 ——',
    yMin: 72,
    yMax: 100,
  },
  {
    zoneId: 'rapid',
    label: '快速提升期',
    body: '不少人无法承受增速放缓，被挡在这条线前 ——',
    yMin: 38,
    yMax: 72,
  },
  {
    zoneId: 'slow',
    label: '缓慢起步期',
    body: '大多数人在这个阶段「死」掉 ——',
    yMin: 0,
    yMax: 38,
  },
] as const

export type BlueprintZonePanel = (typeof blueprintZonePanels)[number]

const ZONES_STAGE_INSET = { top: 8, bottom: 12, anchorX: 10 } as const

export function getBlueprintZoneById(zoneId: string): BlueprintZonePanel | undefined {
  return blueprintZonePanels.find((panel) => panel.zoneId === zoneId)
}

/** Center-right of a left zone band, as full-stage % coords for callout leaders. */
export function getBlueprintZoneStageAnchor(zoneId: string): { x: number; y: number } | null {
  const panel = getBlueprintZoneById(zoneId)
  if (!panel) return null

  const yTop = blueprintPercentToPlot(0, panel.yMax).y
  const yBottom = blueprintPercentToPlot(0, panel.yMin).y
  const yMidInZones = (yTop + yBottom) / 2
  const zonesHeight = 100 - ZONES_STAGE_INSET.top - ZONES_STAGE_INSET.bottom

  return {
    x: ZONES_STAGE_INSET.anchorX,
    y: ZONES_STAGE_INSET.top + (zonesHeight * yMidInZones) / 100,
  }
}

export const blueprintTrapSidebar = [
  {
    id: 'founder-trap',
    trapId: 'founder-trap',
    label: '创业者陷阱',
    variant: 'box' as const,
  },
  {
    id: 'family-trap',
    trapId: 'founder-trap',
    label: '家族陷阱',
    variant: 'box' as const,
  },
] as const

export function blueprintPercentToPlot(x: number, y: number) {
  const { left, top, right, bottom } = BLUEPRINT_CHART_INSET
  const plotW = 100 - left - right
  const plotH = 100 - top - bottom
  return {
    x: left + (x / 100) * plotW,
    y: top + ((100 - y) / 100) * plotH,
  }
}

export function artboardPercentToSvg(xPct: number, yPct: number) {
  return {
    x: (xPct / 100) * LIFECYCLE_VIEWBOX_W,
    y: (yPct / 100) * LIFECYCLE_VIEWBOX_H,
  }
}

export function getBlueprintStageLayout(stageId: string): BlueprintStageLayout | null {
  return blueprintStageLayouts[stageId] ?? null
}

export function getStageSpineAnchor(stageId: string): BlueprintAnchor | null {
  const layout = blueprintStageLayouts[stageId]
  if (!layout) return null
  return getSpineAnchorAtX(layout.x)
}

export function getBlueprintTrapAnchor(trapId: string): BlueprintAnchor | null {
  const trap = lifecycleTraps.find((item) => item.id === trapId)
  if (!trap) return null

  const spineAnchor = getStageSpineAnchor(trap.fromStageId)
  if (!spineAnchor) return null

  const layout = TRAP_LABEL_OFFSET[trapId] ?? { dx: 14, dy: 0 }
  return {
    x: spineAnchor.x + layout.dx,
    y: spineAnchor.y + layout.dy,
  }
}

export function getPhaseStickerCenterX(phase: 'growth' | 'aging') {
  const stages = lifecycleStages.filter((stage) => stage.phase === phase)
  if (stages.length === 0) return lifecycleToSvg(50, 0).x

  const midX = (stages[0].x + stages[stages.length - 1].x) / 2
  return lifecycleToSvg(midX, 0).x
}

export function anchorToArtboardPercent(anchor: BlueprintAnchor) {
  return blueprintPercentToPlot(anchor.x, anchor.y)
}

/** Map spine anchor to full-stage % aligned with SVG viewBox. */
export function anchorToStagePercent(anchor: BlueprintAnchor) {
  const svg = lifecycleToSvg(anchor.x, anchor.y)
  return {
    x: (svg.x / LIFECYCLE_VIEWBOX_W) * 100,
    y: (svg.y / LIFECYCLE_VIEWBOX_H) * 100,
  }
}

export function labelToArtboardPercent(layout: BlueprintStageLayout) {
  const anchor = getSpineAnchorAtX(layout.x)
  const base = anchorToArtboardPercent(anchor)
  return {
    x: base.x + (layout.labelShiftX ?? 0),
    y: base.y,
  }
}

/** @deprecated use getStageSpineAnchor */
export function getBlueprintStageAnchor(stageId: string): BlueprintAnchor | null {
  return getStageSpineAnchor(stageId)
}

/** @deprecated use anchorToArtboardPercent */
export function layoutToArtboardPercent(layout: BlueprintStageLayout) {
  return labelToArtboardPercent(layout)
}

export { lifecycleStages, lifecycleTraps, lifecycleZones, lifecycleToSvg }
