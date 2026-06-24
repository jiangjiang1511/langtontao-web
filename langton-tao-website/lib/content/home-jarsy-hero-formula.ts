import { homeJarsyHero } from '@/lib/content/home-jarsy-page'

export type FormulaTokenKind =
  | 'result'
  | 'op'
  | 'paren'
  | 'term'
  | 'multiplier'

export type FormulaTokenConfig = {
  id: string
  label: string
  kind: FormulaTokenKind
  orbitRadius: number
  orbitInclination: number
  orbitPhase: number
  orbitSpeed: number
}

export const FORMULA_PHASE_MS = {
  orbit: 10_000,
  snap: 350,
  hold: 2_500,
  glitch: 400,
  explode: 450,
} as const

export type FormulaPhase = keyof typeof FORMULA_PHASE_MS

export type SnapTarget = {
  x: number
  y: number
}

const { result, terms, multiplier } = homeJarsyHero.formula

export const FORMULA_TOKENS: FormulaTokenConfig[] = [
  {
    id: 'result',
    label: result,
    kind: 'result',
    orbitRadius: 0.42,
    orbitInclination: 0.55,
    orbitPhase: 0,
    orbitSpeed: 0.38,
  },
  {
    id: 'eq',
    label: '=',
    kind: 'op',
    orbitRadius: 0.36,
    orbitInclination: -0.4,
    orbitPhase: 0.9,
    orbitSpeed: 0.52,
  },
  {
    id: 'paren-open',
    label: '(',
    kind: 'paren',
    orbitRadius: 0.48,
    orbitInclination: 0.25,
    orbitPhase: 1.8,
    orbitSpeed: 0.44,
  },
  {
    id: 'term-0',
    label: terms[0],
    kind: 'term',
    orbitRadius: 0.44,
    orbitInclination: -0.65,
    orbitPhase: 2.6,
    orbitSpeed: 0.35,
  },
  {
    id: 'plus',
    label: '+',
    kind: 'op',
    orbitRadius: 0.32,
    orbitInclination: 0.72,
    orbitPhase: 3.4,
    orbitSpeed: 0.58,
  },
  {
    id: 'term-1',
    label: terms[1],
    kind: 'term',
    orbitRadius: 0.5,
    orbitInclination: -0.3,
    orbitPhase: 4.2,
    orbitSpeed: 0.41,
  },
  {
    id: 'paren-close',
    label: ')',
    kind: 'paren',
    orbitRadius: 0.38,
    orbitInclination: 0.48,
    orbitPhase: 5.0,
    orbitSpeed: 0.47,
  },
  {
    id: 'times',
    label: '×',
    kind: 'op',
    orbitRadius: 0.34,
    orbitInclination: -0.55,
    orbitPhase: 5.8,
    orbitSpeed: 0.5,
  },
  {
    id: 'multiplier',
    label: multiplier,
    kind: 'multiplier',
    orbitRadius: 0.46,
    orbitInclination: 0.62,
    orbitPhase: 6.6,
    orbitSpeed: 0.33,
  },
]

/** Gap multiplier after each token (tighter inside parentheses group). */
const SNAP_GAP_AFTER = [1.4, 1.1, 0.45, 0.4, 0.4, 0.4, 0.55, 1.1, 0] as const

export type SnapLayout = {
  targets: SnapTarget[]
  rowScale: number
}

export function buildSnapLayout(
  containerWidth: number,
  tokenWidths: readonly number[]
): SnapLayout {
  if (
    tokenWidths.length !== FORMULA_TOKENS.length ||
    tokenWidths.some((width) => width <= 0)
  ) {
    return { targets: [], rowScale: 1 }
  }

  const baseGap = Math.max(3, containerWidth * 0.0055)
  let totalWidth = 0

  for (let i = 0; i < tokenWidths.length; i++) {
    totalWidth += tokenWidths[i]
    if (i < tokenWidths.length - 1) {
      totalWidth += baseGap * SNAP_GAP_AFTER[i]
    }
  }

  const maxWidth = containerWidth * 0.9
  const rowScale = totalWidth > maxWidth ? maxWidth / totalWidth : 1
  const scaledTotal = totalWidth * rowScale
  const y =
    containerWidth < 640
      ? -containerWidth * 0.055
      : -containerWidth * 0.048

  const targets: SnapTarget[] = []
  let left = -scaledTotal / 2

  for (let i = 0; i < tokenWidths.length; i++) {
    const w = tokenWidths[i] * rowScale
    targets.push({ x: left + w / 2, y })
    left += w
    if (i < tokenWidths.length - 1) {
      left += baseGap * SNAP_GAP_AFTER[i] * rowScale
    }
  }

  return { targets, rowScale }
}

export function holdTransformsFromLayout(layout: SnapLayout): Array<{
  x: number
  y: number
  z: number
  opacity: number
  blur: number
  scale: number
}> {
  return layout.targets.map((target) => ({
    x: target.x,
    y: target.y,
    z: 0,
    opacity: 0.92,
    blur: 0,
    scale: layout.rowScale,
  }))
}

export function getOrbitPosition(
  token: FormulaTokenConfig,
  angle: number,
  maxRadius: number
): { x: number; y: number; z: number } {
  const r = token.orbitRadius * maxRadius
  const theta = angle * token.orbitSpeed + token.orbitPhase
  const incl = token.orbitInclination

  const x = r * Math.cos(theta) * Math.cos(incl * 0.6)
  const y = r * Math.sin(theta) * 0.55 + Math.sin(theta * 0.5) * maxRadius * 0.04
  const z = r * Math.sin(theta) * Math.sin(incl)

  return { x, y, z }
}

export function depthStyle(z: number, maxRadius: number) {
  const normalized = Math.min(1, Math.abs(z) / (maxRadius * 0.45))
  const opacity = 0.42 + (1 - normalized) * 0.43
  const blur = normalized * 5.5
  const scale = 0.88 + (1 - normalized) * 0.14

  return { opacity, blur, scale }
}

export const FORMULA_ARIA_LABEL = `${homeJarsyHero.formula.result}等于${homeJarsyHero.formula.terms.join('加')}乘以${homeJarsyHero.formula.multiplier}`
