import { coffee2LifeEvents } from '@/lib/content/coffee-manifesto'

export type OrbitRingDecoration =
  | 'crosshair'
  | 'accentTicks'
  | 'dashed'
  | 'dimension'
  | 'coordinates'

const RING_META = [
  {
    radius: 88,
    direction: 'cw' as const,
    durationSec: 52,
    staticRotate: 12,
    decoration: 'crosshair' as const,
    dasharray: '18 6 32 10 24 8',
    tickCount: 24,
    annotation: '18.5mm',
    labelAngle: 0,
  },
  {
    radius: 116,
    direction: 'ccw' as const,
    durationSec: 68,
    staticRotate: -24,
    decoration: 'accentTicks' as const,
    dasharray: '28 8 16 6 40 12',
    tickCount: 30,
    annotation: 'Ø 68',
    labelAngle: 0,
  },
  {
    radius: 144,
    direction: 'cw' as const,
    durationSec: 84,
    staticRotate: 36,
    decoration: 'dashed' as const,
    dasharray: '8 6 8 6 48 10',
    tickCount: 36,
    annotation: 'STEAM 02°C',
    labelAngle: 0,
    annotationAngle: 138,
  },
  {
    radius: 172,
    direction: 'ccw' as const,
    durationSec: 92,
    staticRotate: -18,
    decoration: 'dimension' as const,
    dasharray: '42 10 20 8 36 14',
    tickCount: 24,
    annotation: '52°N / 13°E',
    labelAngle: 0,
  },
  {
    radius: 200,
    direction: 'cw' as const,
    durationSec: 110,
    staticRotate: 48,
    decoration: 'coordinates' as const,
    dasharray: '56 14 24 8 48 16',
    tickCount: 48,
    annotation: 'GEN · 01',
    labelAngle: 0,
  },
] as const

export const coffee2HeroOrbitRings = coffee2LifeEvents.map((event, index) => ({
  id: index + 1,
  label: event.title,
  ...RING_META[index],
}))

export const COFFEE2_HERO_ORBIT = {
  viewBoxSize: 400,
  center: 200,
  coffeeSrc: '/assets/schumpeter-coffee.jpg',
} as const
