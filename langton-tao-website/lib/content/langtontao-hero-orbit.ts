export type LangtontaoLogoId = 'bearbit' | 'ltt' | 'snap'

export type LangtontaoLogoOrbitItem = {
  id: LangtontaoLogoId
  label: string
  colorSrc: string
  monoSrc: string
  orbitRadius: number
  orbitInclination: number
  orbitPhase: number
  orbitSpeed: number
}

export const LANGTONTAO_HERO_LOGOS: LangtontaoLogoOrbitItem[] = [
  {
    id: 'bearbit',
    label: '熊比特咖啡',
    colorSrc: '/assets/logo/logo-bearbit-color.jpg',
    monoSrc: '/assets/logo/logo-bearbit.png',
    orbitRadius: 0.44,
    orbitInclination: 0.58,
    orbitPhase: 0,
    orbitSpeed: 0.36,
  },
  {
    id: 'ltt',
    label: '朗敦道',
    colorSrc: '/assets/logo/logo-ltt-color.jpg',
    monoSrc: '/assets/logo/logo-ltt.png',
    orbitRadius: 0.4,
    orbitInclination: -0.48,
    orbitPhase: 2.09,
    orbitSpeed: 0.42,
  },
  {
    id: 'snap',
    label: 'Snap',
    colorSrc: '/assets/logo/logo-snap-color.png',
    monoSrc: '/assets/logo/logo-snap.png',
    orbitRadius: 0.46,
    orbitInclination: 0.32,
    orbitPhase: 4.19,
    orbitSpeed: 0.33,
  },
]

export const LANGTONTAO_HERO_ORBIT_PHASE_MS = {
  holdStatic: 2_500,
  explode: 450,
  orbit: 8_000,
  glitch: 420,
  collapse: 450,
} as const

export type LangtontaoHeroOrbitPhase = keyof typeof LANGTONTAO_HERO_ORBIT_PHASE_MS

export type LogoTransform = {
  x: number
  y: number
  z: number
  opacity: number
  blur: number
  scale: number
}

export function getLangtontaoLogoOrbitPosition(
  item: LangtontaoLogoOrbitItem,
  angle: number,
  maxRadius: number
): { x: number; y: number; z: number } {
  const r = item.orbitRadius * maxRadius
  const theta = angle * item.orbitSpeed + item.orbitPhase
  const incl = item.orbitInclination

  const x = r * Math.cos(theta) * Math.cos(incl * 0.6)
  const y = r * Math.sin(theta) * 0.52 + Math.sin(theta * 0.5) * maxRadius * 0.035
  const z = r * Math.sin(theta) * Math.sin(incl)

  return { x, y, z }
}

export function langtontaoLogoDepthStyle(z: number, maxRadius: number) {
  const normalized = Math.min(1, Math.abs(z) / (maxRadius * 0.45))
  const opacity = 0.38 + (1 - normalized) * 0.5
  const blur = normalized * 6
  const scale = 0.82 + (1 - normalized) * 0.2

  return { opacity, blur, scale }
}

export function getStaticCirclePosition(
  index: number,
  count: number,
  radius: number
): { x: number; y: number; z: number } {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * 0.9,
    z: 0,
  }
}

export function getStaticCircleTransforms(
  maxRadius: number,
  radiusFactor = 0.34
): LogoTransform[] {
  const radius = maxRadius * radiusFactor
  return LANGTONTAO_HERO_LOGOS.map((_, index) => {
    const { x, y, z } = getStaticCirclePosition(
      index,
      LANGTONTAO_HERO_LOGOS.length,
      radius
    )
    return { x, y, z, opacity: 0.94, blur: 0, scale: 1 }
  })
}

export function getOrbitTransforms(angle: number, maxRadius: number): LogoTransform[] {
  return LANGTONTAO_HERO_LOGOS.map((item) => {
    const { x, y, z } = getLangtontaoLogoOrbitPosition(item, angle, maxRadius)
    const depth = langtontaoLogoDepthStyle(z, maxRadius)
    return { x, y, z, ...depth }
  })
}
