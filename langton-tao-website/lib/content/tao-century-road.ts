import {
  FORMULA_TOKENS,
  depthStyle,
  type FormulaTokenKind,
} from '@/lib/content/home-jarsy-hero-formula'

export const TAO_ROAD_IMAGE = {
  src: '/assets/100years/100yearpath.png',
  width: 2064,
  height: 1152,
  aspectRatio: 2064 / 1152,
} as const

/** Normalized 0–1 positions on the PNG road centerline (near → far) */
export type TaoRoadNodeLayout = {
  anchor: { x: number; y: number }
}

export const TAO_ROAD_NODE_LAYOUTS: TaoRoadNodeLayout[] = [
  { anchor: { x: 0.05, y: 0.82 } },
  { anchor: { x: 0.12, y: 0.76 } },
  { anchor: { x: 0.28, y: 0.77 } },
  { anchor: { x: 0.55, y: 0.73 } },
  { anchor: { x: 0.65, y: 0.57 } },
  { anchor: { x: 0.74, y: 0.37 } },
  { anchor: { x: 0.79, y: 0.26 } },
  { anchor: { x: 0.91, y: 0.17 } },
]

export const TAO_ROAD_DEFAULT_STAGE_ID = 'day-1'

export type TaoRoadFloatToken = {
  id: string
  label: string
  kind: FormulaTokenKind
  baseX: number
  baseY: number
  driftSpeed: number
  zPhase: number
  rotate: number
}

const FLOAT_PICK_IDS = [
  'result',
  'term-0',
  'plus',
  'term-1',
  'times',
  'multiplier',
  'eq',
  'paren-open',
  'paren-close',
] as const

const FLOAT_LAYOUT: Array<
  Pick<TaoRoadFloatToken, 'baseX' | 'baseY' | 'driftSpeed' | 'zPhase' | 'rotate'>
> = [
  { baseX: 0.12, baseY: 0.22, driftSpeed: 0.38, zPhase: 0.2, rotate: -8 },
  { baseX: 0.78, baseY: 0.18, driftSpeed: 0.44, zPhase: 1.1, rotate: 6 },
  { baseX: 0.28, baseY: 0.72, driftSpeed: 0.52, zPhase: 2.4, rotate: -4 },
  { baseX: 0.88, baseY: 0.58, driftSpeed: 0.35, zPhase: 3.8, rotate: 10 },
  { baseX: 0.52, baseY: 0.12, driftSpeed: 0.48, zPhase: 4.6, rotate: -12 },
  { baseX: 0.18, baseY: 0.48, driftSpeed: 0.41, zPhase: 5.2, rotate: 5 },
  { baseX: 0.62, baseY: 0.78, driftSpeed: 0.33, zPhase: 0.9, rotate: -6 },
  { baseX: 0.42, baseY: 0.38, driftSpeed: 0.55, zPhase: 2.9, rotate: 8 },
  { baseX: 0.92, baseY: 0.32, driftSpeed: 0.37, zPhase: 4.1, rotate: -9 },
]

export const TAO_ROAD_FLOAT_TOKENS: TaoRoadFloatToken[] = FLOAT_PICK_IDS.map(
  (id, index) => {
    const token = FORMULA_TOKENS.find((item) => item.id === id)
    const layout = FLOAT_LAYOUT[index]
    if (!token || !layout) {
      throw new Error(`Missing float token config for ${id}`)
    }
    return {
      id: token.id,
      label: token.label,
      kind: token.kind,
      ...layout,
    }
  }
)

export const TAO_ROAD_FLOAT_TOKENS_MOBILE = TAO_ROAD_FLOAT_TOKENS.filter((_, i) =>
  [0, 1, 3, 5, 7].includes(i)
)

export function pct(n: number): string {
  return `${n * 100}%`
}

export { depthStyle }

export const TAO_ROAD_ENTER_DELAYS = {
  road: 80,
  roadDuration: 1200,
  nodeStagger: 90,
  float: 400,
} as const
