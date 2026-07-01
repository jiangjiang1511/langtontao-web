import type { Coffee2SectionCopyBlock } from '@/lib/content/coffee-glossary'
import { toAnnotatedCopyBlock } from '@/lib/content/coffee-glossary'
import { langtontaoMajorSections } from '@/lib/content/langtontao/langtontao-major-sections'

export type LangtontaoPillarId =
  | 'home-roots'
  | 'superhero'
  | 'wealth-checkup'
  | 'yitishuangkua'

export type LangtontaoPillarStackLayout = {
  x: string
  y: string
  rotate: number
  scale: number
  zIndex: number
  width: string
}

export type LangtontaoPillarScatterLayout = {
  left: string
  top: string
  rotate: number
  scale: number
  zIndex: number
  width: string
}

export type LangtontaoPillarCard = {
  id: LangtontaoPillarId
  number: string
  title: string
  description: Coffee2SectionCopyBlock
  href: string
  accent: string
  backgroundImage: string
  stack: LangtontaoPillarStackLayout
  scatter: LangtontaoPillarScatterLayout
}

export const langtontaoPillarsMeta = {
  ariaLabel: '何以为家 · 超级英雄之旅 · 财富健康体检 · 一体双跨',
} as const

const LINK_COMPONENT_ASSET_DIR = '/assets/langtontao/linkcomponent'

const pillarAccents: Record<LangtontaoPillarId, string> = {
  'home-roots': '#ffe600',
  superhero: '#fafafa',
  'wealth-checkup': '#ffe600',
  yitishuangkua: '#a1a1aa',
}

function linkComponentBackground(index: number): string {
  const num = String(index + 1).padStart(2, '0')
  return `url(${LINK_COMPONENT_ASSET_DIR}/linkcomponent-${num}.jpg)`
}

const pillarScatterLayouts: readonly LangtontaoPillarScatterLayout[] = [
  {
    left: '34%',
    top: '21%',
    rotate: -3,
    scale: 1,
    zIndex: 2,
    width: 'clamp(10.5rem, 29vw, 18rem)',
  },
  {
    left: '66%',
    top: '21%',
    rotate: 2.5,
    scale: 1,
    zIndex: 4,
    width: 'clamp(10.5rem, 29vw, 18rem)',
  },
  {
    left: '34%',
    top: '79%',
    rotate: -2,
    scale: 1,
    zIndex: 3,
    width: 'clamp(10.5rem, 29vw, 18rem)',
  },
  {
    left: '66%',
    top: '79%',
    rotate: 3,
    scale: 1,
    zIndex: 5,
    width: 'clamp(10.5rem, 29vw, 18rem)',
  },
]

const pillarStackLayouts: readonly LangtontaoPillarStackLayout[] = [
  {
    x: '-3%',
    y: '-2%',
    rotate: -6,
    scale: 0.9,
    zIndex: 4,
    width: 'clamp(6.5rem, 15vw, 9.5rem)',
  },
  {
    x: '2%',
    y: '-2%',
    rotate: 4,
    scale: 0.88,
    zIndex: 3,
    width: 'clamp(6.75rem, 15.5vw, 9.75rem)',
  },
  {
    x: '-2%',
    y: '2%',
    rotate: -3,
    scale: 0.92,
    zIndex: 5,
    width: 'clamp(6.5rem, 15vw, 9.5rem)',
  },
  {
    x: '3%',
    y: '2%',
    rotate: 5,
    scale: 0.89,
    zIndex: 2,
    width: 'clamp(6.75rem, 15.5vw, 9.75rem)',
  },
]

export const langtontaoPillarCards: readonly LangtontaoPillarCard[] =
  langtontaoMajorSections.map((section, index) => ({
    id: section.id as LangtontaoPillarId,
    number: String(index + 1).padStart(2, '0'),
    title: section.title,
    description: toAnnotatedCopyBlock(section.lead),
    href: `#${section.id}`,
    accent: pillarAccents[section.id as LangtontaoPillarId],
    backgroundImage: linkComponentBackground(index),
    stack: pillarStackLayouts[index],
    scatter: pillarScatterLayouts[index],
  }))
