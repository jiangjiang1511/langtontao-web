import { lifecycleToSvg } from '@/lib/content/enterprise-lifecycle'

/** U-shaped plateau at the peak — wider, gentler than the enterprise spine. */
const BLUEPRINT_SPINE = [
  { x: 8, y: 14 },
  { x: 22, y: 32 },
  { x: 38, y: 58 },
  { x: 48, y: 78 },
  { x: 54, y: 87 },
  { x: 60, y: 89 },
  { x: 66, y: 89 },
  { x: 72, y: 84 },
  { x: 80, y: 68 },
  { x: 88, y: 38 },
  { x: 96, y: 12 },
] as const

type SvgPoint = { x: number; y: number }

function cubicAt(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}

function buildBlueprintMainPath() {
  const svgPoints = BLUEPRINT_SPINE.map((p) => lifecycleToSvg(p.x, p.y))
  if (svgPoints.length < 2) return ''

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
  const svgPoints = BLUEPRINT_SPINE.map((p) => lifecycleToSvg(p.x, p.y))
  const segments: Array<{ p0: SvgPoint; p1: SvgPoint; p2: SvgPoint; p3: SvgPoint }> = []

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

function svgToNormalized(svgX: number, svgY: number) {
  const width = 980 - 120
  const height = 480 - 48
  return {
    x: ((svgX - 120) / width) * 100,
    y: ((480 - svgY) / height) * 100,
  }
}

let spineSamplesCache: Array<{ x: number; y: number }> | null = null

function getNormalizedSpineSamples() {
  if (!spineSamplesCache) {
    spineSamplesCache = sampleSpineSvgPoints(220).map((p) => svgToNormalized(p.x, p.y))
  }
  return spineSamplesCache
}

/** Spine anchor at normalized x (0–100), for stage/trap alignment. */
export function getSpineAnchorAtX(targetX: number) {
  const samples = getNormalizedSpineSamples()
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

function sampleSpineSvgPoints(count = 200): SvgPoint[] {
  const segments = buildSpineSegments()
  const perSegment = Math.ceil(count / segments.length)
  const samples: SvgPoint[] = []

  for (const seg of segments) {
    for (let i = 0; i <= perSegment; i++) {
      const t = i / perSegment
      samples.push({
        x: cubicAt(t, seg.p0.x, seg.p1.x, seg.p2.x, seg.p3.x),
        y: cubicAt(t, seg.p0.y, seg.p1.y, seg.p2.y, seg.p3.y),
      })
    }
  }

  return samples
}

function zigzagSegment(
  from: SvgPoint,
  to: SvgPoint,
  amplitude: number,
  teeth: number
): string {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  let path = `M ${from.x} ${from.y}`

  for (let i = 1; i <= teeth; i++) {
    const t = i / teeth
    const baseX = from.x + dx * t
    const baseY = from.y + dy * t
    const sign = i % 2 === 0 ? 1 : -1
    path += ` L ${baseX + nx * amplitude * sign} ${baseY + ny * amplitude * sign}`
  }

  path += ` L ${to.x} ${to.y}`
  return path
}

function signedCurvatureAt(samples: SvgPoint[], index: number) {
  const prev = samples[Math.max(index - 2, 0)]
  const curr = samples[index]
  const next = samples[Math.min(index + 2, samples.length - 1)]
  const v1x = curr.x - prev.x
  const v1y = curr.y - prev.y
  const v2x = next.x - curr.x
  const v2y = next.y - curr.y
  const cross = v1x * v2y - v1y * v2x
  const len = Math.hypot(v1x, v1y) * Math.hypot(v2x, v2y) || 1
  return cross / len
}

/** Strand offset with curvature fan — outer bends widen, inner bends tighten. */
function offsetSamplePathWithRhythm(samples: SvgPoint[], offset: number) {
  if (samples.length < 2 || offset === 0) return ''

  const CURVATURE_RHYTHM = 3.2
  const TANGENT_SLIP = 0.14
  const points: SvgPoint[] = []

  for (let i = 0; i < samples.length; i++) {
    const prev = samples[Math.max(i - 1, 0)]
    const next = samples[Math.min(i + 1, samples.length - 1)]
    const curr = samples[i]

    const dx = next.x - prev.x
    const dy = next.y - prev.y
    const len = Math.hypot(dx, dy) || 1
    const tx = dx / len
    const ty = dy / len
    const nx = -dy / len
    const ny = dx / len

    const kappa = signedCurvatureAt(samples, i)
    const bendFactor = 1 + CURVATURE_RHYTHM * kappa * offset
    const effectiveOffset = offset * bendFactor
    const tangentSlip = TANGENT_SLIP * kappa * offset * Math.abs(offset)

    points.push({
      x: curr.x + nx * effectiveOffset + tx * tangentSlip,
      y: curr.y + ny * effectiveOffset + ty * tangentSlip,
    })
  }

  return buildSmoothPathFromPoints(points)
}

function buildSmoothPathFromPoints(points: SvgPoint[]) {
  if (points.length < 2) return ''

  const step = Math.max(1, Math.floor(points.length / 28))
  const keyPoints = points.filter((_, index) => index % step === 0 || index === points.length - 1)
  if (keyPoints.length < 2) return ''

  let path = `M ${keyPoints[0].x} ${keyPoints[0].y}`
  for (let i = 0; i < keyPoints.length - 1; i++) {
    const p0 = keyPoints[Math.max(i - 1, 0)]
    const p1 = keyPoints[i]
    const p2 = keyPoints[i + 1]
    const p3 = keyPoints[Math.min(i + 2, keyPoints.length - 1)]

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }

  return path
}

function offsetSamplePath(samples: SvgPoint[], offset: number): string {
  return offsetSamplePathWithRhythm(samples, offset)
}

export type BlueprintCurveLayer = {
  id: string
  d: string
  strokeWidth: number
  opacity: number
  isMain?: boolean
}

export function buildBlueprintCurveLayers(): {
  mainPath: string
  layers: BlueprintCurveLayer[]
} {
  const samples = sampleSpineSvgPoints(220)
  const mainPath = buildBlueprintMainPath()

  const bundleOffsets = [-10, -8, -6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6, 8, 10]
  const layers: BlueprintCurveLayer[] = bundleOffsets.map((offset, index) => {
    const isMain = offset === 0
    const absOff = Math.abs(offset)
    return {
      id: `bundle-${index}`,
      d: isMain ? mainPath : offsetSamplePath(samples, offset),
      strokeWidth: isMain ? 2.4 : absOff <= 3 ? 1.35 : 0.9,
      opacity: isMain ? 1 : absOff <= 4 ? 0.55 : 0.32,
      isMain,
    }
  })

  const zigStart = samples[Math.floor(samples.length * 0.34)]
  const zigMid = samples[Math.floor(samples.length * 0.38)]
  const zigEnd = samples[Math.floor(samples.length * 0.42)]
  layers.push({
    id: 'zigzag-growth-a',
    d: zigzagSegment(zigStart, zigMid, 5, 4),
    strokeWidth: 1.2,
    opacity: 0.65,
  })
  layers.push({
    id: 'zigzag-growth-b',
    d: zigzagSegment(zigMid, zigEnd, 4, 3),
    strokeWidth: 1.1,
    opacity: 0.55,
  })

  const zig2Start = samples[Math.floor(samples.length * 0.72)]
  const zig2End = samples[Math.floor(samples.length * 0.78)]
  layers.push({
    id: 'zigzag-aging',
    d: zigzagSegment(zig2Start, zig2End, 4, 5),
    strokeWidth: 1.1,
    opacity: 0.55,
  })

  return {
    mainPath,
    layers,
  }
}
