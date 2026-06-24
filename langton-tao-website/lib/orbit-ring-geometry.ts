export type OrbitRingTickLine = {
  x1: number
  y1: number
  x2: number
  y2: number
}

/** Round to 4 decimals so SSR and client produce identical SVG attributes. */
function roundCoord(value: number) {
  return Math.round(value * 10_000) / 10_000
}

export function buildOrbitRingTicks(options: {
  count: number
  center?: number
  innerRadius: number
  outerRadius: number
  accentEvery?: number
  accentOuterRadius?: number
  angleOffset?: number
}): OrbitRingTickLine[] {
  const {
    count,
    center = 200,
    innerRadius,
    outerRadius,
    accentEvery = 0,
    accentOuterRadius = outerRadius,
    angleOffset = 0,
  } = options

  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 + angleOffset
    const outer =
      accentEvery > 0 && index % accentEvery === 0
        ? accentOuterRadius
        : outerRadius

    return {
      x1: roundCoord(center + Math.cos(angle) * innerRadius),
      y1: roundCoord(center + Math.sin(angle) * innerRadius),
      x2: roundCoord(center + Math.cos(angle) * outer),
      y2: roundCoord(center + Math.sin(angle) * outer),
    }
  })
}

/** Pre-computed at module load — avoids hydration drift from runtime trig. */
export const LANGTONTAO_HERO_ORBIT_RING_TICKS = buildOrbitRingTicks({
  count: 48,
  innerRadius: 164,
  outerRadius: 168,
  accentEvery: 6,
  accentOuterRadius: 172,
})

export const HOME_JARSY_FORMULA_ORBIT_RING_TICKS_OUTER = buildOrbitRingTicks({
  count: 48,
  innerRadius: 164,
  outerRadius: 168,
  accentEvery: 6,
  accentOuterRadius: 172,
})

export const HOME_JARSY_FORMULA_ORBIT_RING_TICKS_INNER = buildOrbitRingTicks({
  count: 36,
  innerRadius: 124,
  outerRadius: 130,
  angleOffset: 0.2,
})
