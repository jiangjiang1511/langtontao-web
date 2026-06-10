import type { ColorStop, Vec3 } from '@/lib/rubiks/types'

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function lerpVec3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

function parseHex(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '')
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized
  return [
    Number.parseInt(value.slice(0, 2), 16) / 255,
    Number.parseInt(value.slice(2, 4), 16) / 255,
    Number.parseInt(value.slice(4, 6), 16) / 255,
  ]
}

export function sampleGradient(stops: ColorStop[], t: number): [number, number, number] {
  const sorted = [...stops].sort((a, b) => a.position - b.position)
  const clamped = clamp01(t)

  if (sorted.length === 0) return [1, 1, 1]
  if (sorted.length === 1) return parseHex(sorted[0].color)

  if (clamped <= sorted[0].position) return parseHex(sorted[0].color)
  if (clamped >= sorted[sorted.length - 1].position) {
    return parseHex(sorted[sorted.length - 1].color)
  }

  for (let index = 0; index < sorted.length - 1; index += 1) {
    const left = sorted[index]
    const right = sorted[index + 1]
    if (clamped >= left.position && clamped <= right.position) {
      const local =
        (clamped - left.position) / Math.max(right.position - left.position, 1e-4)
      const [lr, lg, lb] = parseHex(left.color)
      const [rr, rg, rb] = parseHex(right.color)
      return [lerp(lr, rr, local), lerp(lg, rg, local), lerp(lb, rb, local)]
    }
  }

  return parseHex(sorted[sorted.length - 1].color)
}

export function interpolateColorStops(
  from: ColorStop[],
  to: ColorStop[],
  t: number
): ColorStop[] {
  const positions = Array.from(
    new Set([...from.map((stop) => stop.position), ...to.map((stop) => stop.position)])
  ).sort((a, b) => a - b)

  return positions.map((position) => {
    const fromColor = sampleGradient(from, position)
    const toColor = sampleGradient(to, position)
    const r = Math.round(lerp(fromColor[0], toColor[0], t) * 255)
    const g = Math.round(lerp(fromColor[1], toColor[1], t) * 255)
    const b = Math.round(lerp(fromColor[2], toColor[2], t) * 255)
    return {
      position,
      color: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
    }
  })
}

export function gridToWorld(
  grid: Vec3,
  dimensions: Vec3,
  boxSize: number
): Vec3 {
  const [gx, gy, gz] = grid
  const [dx, dy, dz] = dimensions
  const offsetX = ((dx - 1) * boxSize) / 2
  const offsetY = ((dy - 1) * boxSize) / 2
  const offsetZ = ((dz - 1) * boxSize) / 2
  return [gx * boxSize - offsetX, gy * boxSize - offsetY, gz * boxSize - offsetZ]
}

function distance(a: Vec3, b: Vec3): number {
  const dx = a[0] - b[0]
  const dy = a[1] - b[1]
  const dz = a[2] - b[2]
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

export function computeAssignments(
  cubeIds: string[],
  currentPositions: Map<string, Vec3>,
  targetCells: Vec3[],
  dimensions: Vec3,
  boxSize: number
): Map<string, Vec3> {
  const assignments = new Map<string, Vec3>()
  const usedCubes = new Set<string>()
  const targetWorld = targetCells.map((cell) =>
    gridToWorld(cell, dimensions, boxSize)
  )

  targetWorld.forEach((target, targetIndex) => {
    let bestId = ''
    let bestDistance = Number.POSITIVE_INFINITY

    for (const id of cubeIds) {
      if (usedCubes.has(id)) continue
      const current = currentPositions.get(id) ?? [0, 0, 0]
      const nextDistance = distance(current, target)
      if (nextDistance < bestDistance) {
        bestDistance = nextDistance
        bestId = id
      }
    }

    if (bestId) {
      usedCubes.add(bestId)
      assignments.set(bestId, targetCells[targetIndex])
    }
  })

  return assignments
}

export function normalizeMorphProgress(
  progress: number,
  gracePercent = 0.15,
  gracePercentBottom = 0.1
): number {
  const top = clamp01(gracePercent)
  const bottom = clamp01(gracePercentBottom)
  const span = Math.max(1 - top - bottom, 1e-4)

  if (progress <= top) return 0
  if (progress >= 1 - bottom) return 1
  return clamp01((progress - top) / span)
}
