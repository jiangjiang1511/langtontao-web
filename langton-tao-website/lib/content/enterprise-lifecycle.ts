export type LifecyclePhase = 'growth' | 'aging'

export type LifecycleStage = {
  id: string
  label: string
  shortLabel: string
  paeiCode: string
  phase: LifecyclePhase
  summary: string
  x: number
  y: number
}

export type LifecycleTrap = {
  id: string
  label: string
  code: string
  fromStageId: string
  summary: string
  endX: number
  endY: number
}

export type LifecycleZone = {
  id: string
  label: string
  summary: string
  yMin: number
  yMax: number
}

export const enterpriseLifecycleMeta = {
  eyebrow: 'Lifecycle · 事业周期',
  title: '事业生命周期',
  lead: '从孕育到盛年，再到官僚与消亡——事业周期是「第一天」的微观镜像。看清阶段节律，才能在从第一天到一百年的九段 TAO 旅程中，把期权价值押在正确的跃迁上。',
  growthLabel: '成长阶段',
  agingLabel: '老化阶段',
  axisY: '能力水平',
  axisX: '专注投入的时间',
  phaseDividerX: 52,
} as const

export const lifecycleZones: readonly LifecycleZone[] = [
  {
    id: 'plateau',
    label: '高原巩固期',
    summary: '极少数历经磨难抵达此处，成为领域大师。',
    yMin: 72,
    yMax: 100,
  },
  {
    id: 'rapid',
    label: '快速提升期',
    summary: '增速放缓时，许多人止步于此线之下。',
    yMin: 38,
    yMax: 72,
  },
  {
    id: 'slow',
    label: '缓慢起步期',
    summary: '多数人或企业在此阶段夭折、放弃。',
    yMin: 0,
    yMax: 38,
  },
] as const

const lifecycleSpine = [
  { x: 8, y: 14 },
  { x: 22, y: 32 },
  { x: 38, y: 58 },
  { x: 52, y: 82 },
  { x: 62, y: 94 },
  { x: 74, y: 72 },
  { x: 86, y: 42 },
  { x: 96, y: 12 },
] as const

const CHART = {
  left: 120,
  right: 980,
  top: 48,
  bottom: 480,
} as const

const SPINE_SAMPLES = 240

type Point2D = { x: number; y: number }
type SvgPoint2D = { x: number; y: number }

export function lifecycleToSvg(x: number, y: number) {
  const width = CHART.right - CHART.left
  const height = CHART.bottom - CHART.top
  return {
    x: CHART.left + (x / 100) * width,
    y: CHART.bottom - (y / 100) * height,
  }
}

function svgToNormalized(svgX: number, svgY: number) {
  const width = CHART.right - CHART.left
  const height = CHART.bottom - CHART.top
  return {
    x: ((svgX - CHART.left) / width) * 100,
    y: ((CHART.bottom - svgY) / height) * 100,
  }
}

function cubicAt(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}

function catmullRomToBezierPath(points: readonly Point2D[]) {
  if (points.length < 2) return ''
  const svgPoints = points.map((p) => lifecycleToSvg(p.x, p.y))
  let path = `M ${svgPoints[0].x} ${svgPoints[0].y}`

  for (let i = 0; i < svgPoints.length - 1; i++) {
    const p0 = svgPoints[Math.max(i - 1, 0)]
    const p1 = svgPoints[i]
    const p2 = svgPoints[i + 1]
    const p3 = svgPoints[Math.min(i + 2, svgPoints.length - 1)]

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }

  return path
}

function buildSpineSegments() {
  const svgPoints = lifecycleSpine.map((p) => lifecycleToSvg(p.x, p.y))
  const segments: Array<{
    p0: SvgPoint2D
    p1: SvgPoint2D
    p2: SvgPoint2D
    p3: SvgPoint2D
  }> = []

  for (let i = 0; i < svgPoints.length - 1; i++) {
    const p0 = svgPoints[Math.max(i - 1, 0)]
    const p1 = svgPoints[i]
    const p2 = svgPoints[i + 1]
    const p3 = svgPoints[Math.min(i + 2, svgPoints.length - 1)]

    segments.push({
      p0: p1,
      p1: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
      p2: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 },
      p3: p2,
    })
  }

  return segments
}

function sampleSpinePoints(): Point2D[] {
  const segments = buildSpineSegments()
  const perSegment = Math.ceil(SPINE_SAMPLES / segments.length)
  const samples: Point2D[] = []

  for (const seg of segments) {
    for (let i = 0; i <= perSegment; i++) {
      const t = i / perSegment
      const x = cubicAt(t, seg.p0.x, seg.p1.x, seg.p2.x, seg.p3.x)
      const y = cubicAt(t, seg.p0.y, seg.p1.y, seg.p2.y, seg.p3.y)
      samples.push(svgToNormalized(x, y))
    }
  }

  return samples
}

let spineSamplesCache: Point2D[] | null = null

function getSpineSamples() {
  if (!spineSamplesCache) {
    spineSamplesCache = sampleSpinePoints()
  }
  return spineSamplesCache
}

function getPointOnSpineAtX(targetX: number, samples: readonly Point2D[]): Point2D {
  let best = samples[0]
  let bestDist = Math.abs(samples[0].x - targetX)

  for (const sample of samples) {
    const dist = Math.abs(sample.x - targetX)
    if (dist < bestDist) {
      best = sample
      bestDist = dist
    }
  }

  return { x: targetX, y: best.y }
}

const STAGE_DEFINITIONS: Omit<LifecycleStage, 'y'>[] = [
  {
    id: 'gestation',
    label: '孕育期',
    shortLabel: '孕育',
    paeiCode: 'paEi',
    phase: 'growth',
    summary: '创新（E）驱动构想成形，目标（P）尚弱，组织尚未成型。',
    x: 10,
  },
  {
    id: 'infancy',
    label: '婴儿期',
    shortLabel: '婴儿',
    paeiCode: 'Paei',
    phase: 'growth',
    summary: '生存目标（P）压倒一切，创始人亲力亲为，创新仍活跃。',
    x: 18,
  },
  {
    id: 'toddler',
    label: '学步期',
    shortLabel: '学步',
    paeiCode: 'PaEi',
    phase: 'growth',
    summary: '目标与冒险并存，开始建立基本管理，但系统仍脆弱。',
    x: 28,
  },
  {
    id: 'adolescence',
    label: '青春期',
    shortLabel: '青春',
    paeiCode: 'pAEi',
    phase: 'growth',
    summary: '行政管理（A）介入带来冲突，创新与整合开始角力。',
    x: 38,
  },
  {
    id: 'prime',
    label: '盛年期',
    shortLabel: '盛年',
    paeiCode: 'PAEi',
    phase: 'growth',
    summary: 'P·A·E 均衡，事业最具活力与可扩展性的黄金阶段。',
    x: 48,
  },
  {
    id: 'stability',
    label: '稳定期',
    shortLabel: '稳定',
    paeiCode: 'PAeI',
    phase: 'growth',
    summary: '峰值阶段，整合（I）增强，创新（e）开始褪色。',
    x: 58,
  },
  {
    id: 'aristocracy',
    label: '贵族期',
    shortLabel: '贵族',
    paeiCode: 'pAeI',
    phase: 'aging',
    summary: '重管理、重整合，目标与创新让位于守成与形式。',
    x: 68,
  },
  {
    id: 'early-bureaucracy',
    label: '官僚化早期',
    shortLabel: '官僚早期',
    paeiCode: 'pA-i',
    phase: 'aging',
    summary: '制度压过结果，流程取代判断，活力持续流失。',
    x: 78,
  },
  {
    id: 'bureaucracy',
    label: '官僚期',
    shortLabel: '官僚',
    paeiCode: '-A-',
    phase: 'aging',
    summary: '只剩行政外壳，目标与创新几乎归零。',
    x: 88,
  },
  {
    id: 'death',
    label: '死亡期',
    shortLabel: '死亡',
    paeiCode: '----',
    phase: 'aging',
    summary: '组织停止创造价值的终点，系统彻底僵死。',
    x: 95,
  },
]

function buildStagesOnSpine(): readonly LifecycleStage[] {
  const samples = getSpineSamples()
  return STAGE_DEFINITIONS.map((stage) => {
    const onSpine = getPointOnSpineAtX(stage.x, samples)
    return { ...stage, y: onSpine.y }
  })
}

export const lifecycleStages: readonly LifecycleStage[] = buildStagesOnSpine()

export const lifecycleTraps: readonly LifecycleTrap[] = [
  {
    id: 'fantasy',
    label: '创业空想',
    code: '--E-',
    fromStageId: 'gestation',
    summary: '只有想法、没有执行与目标，在孕育期便脱离现实。',
    endX: 4,
    endY: 4,
  },
  {
    id: 'infant-death',
    label: '企业婴儿夭折',
    code: 'P---',
    fromStageId: 'infancy',
    summary: '现金流断裂、产品未立，婴儿期即退出市场。',
    endX: 12,
    endY: 8,
  },
  {
    id: 'founder-trap',
    label: '创业者陷阱 / 家族陷阱',
    code: 'P-E-',
    fromStageId: 'toddler',
    summary: '创始人无法放权，或家族关系绑架治理，学步期陷入僵局。',
    endX: 22,
    endY: 18,
  },
  {
    id: 'unfulfilled',
    label: '壮志未酬的企业家',
    code: 'paEi',
    fromStageId: 'adolescence',
    summary: '青春期冲突未解，创新与管理内耗，未能进入盛年。',
    endX: 32,
    endY: 28,
  },
  {
    id: 'premature-aging',
    label: '未老先衰',
    code: 'PAeI',
    fromStageId: 'adolescence',
    summary: '青春期活力未稳，提前滑向保守与官僚化，未能真正进入盛年。',
    endX: 34,
    endY: 22,
  },
]

export const paeiLegend = [
  { letter: 'P', label: '企业目标', description: 'Performance · 结果导向' },
  { letter: 'A', label: '行政管理', description: 'Administration · 流程与秩序' },
  { letter: 'E', label: '创新精神', description: 'Entrepreneurship · 冒险与创造' },
  { letter: 'I', label: '经营整合', description: 'Integration · 协同与凝聚' },
] as const

export function buildMainCurvePath() {
  return catmullRomToBezierPath(lifecycleSpine)
}

export function buildGrowthHighlightPath() {
  const firstGrowth = lifecycleStages.find((s) => s.phase === 'growth')
  const lastGrowth = [...lifecycleStages].reverse().find((s) => s.phase === 'growth')
  if (!firstGrowth || !lastGrowth) return buildMainCurvePath()

  const growthSpine = lifecycleSpine.filter(
    (p) => p.x >= firstGrowth.x - 4 && p.x <= lastGrowth.x + 4
  )
  if (growthSpine.length >= 2) {
    return catmullRomToBezierPath(growthSpine)
  }

  return buildMainCurvePath()
}

export function getStageOnSpine(stageId: string) {
  const stage = lifecycleStages.find((s) => s.id === stageId)
  if (!stage) return null
  return lifecycleToSvg(stage.x, stage.y)
}

export function getStageById(id: string) {
  return lifecycleStages.find((s) => s.id === id)
}

export function getTrapById(id: string) {
  return lifecycleTraps.find((t) => t.id === id)
}
