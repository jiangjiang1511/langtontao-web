import type { CSSProperties } from 'react'

export type TaoStageVariant =
  | 'dawn'
  | 'cycle'
  | 'market'
  | 'growth'
  | 'garden'
  | 'legacy'
  | 'dynasty'
  | 'eternal'

export type TaoStageVisual = {
  eyebrow: string
  accent: string
  variant: TaoStageVariant
  index: string
}

export const taoStageVisualById: Record<string, TaoStageVisual> = {
  'day-1': {
    eyebrow: 'Origin · 起点',
    accent: '#ffe600',
    variant: 'dawn',
    index: '01',
  },
  'day-2': {
    eyebrow: 'Cycle · 周期',
    accent: '#6366f1',
    variant: 'cycle',
    index: '02',
  },
  'year-1': {
    eyebrow: 'Market · 战场',
    accent: '#09090b',
    variant: 'market',
    index: '03',
  },
  'year-6': {
    eyebrow: 'Growth · 生长',
    accent: '#f59e0b',
    variant: 'growth',
    index: '04',
  },
  'year-15': {
    eyebrow: 'Rite · 仪式',
    accent: '#e11d48',
    variant: 'garden',
    index: '05',
  },
  'year-30': {
    eyebrow: 'Legacy · 沉淀',
    accent: '#52525b',
    variant: 'legacy',
    index: '06',
  },
  'year-50': {
    eyebrow: 'Dynasty · 奠基',
    accent: '#ca8a04',
    variant: 'dynasty',
    index: '07',
  },
  'year-100': {
    eyebrow: 'Eternal · 永续',
    accent: '#ffe600',
    variant: 'eternal',
    index: '08',
  },
}

const defaultVisual: TaoStageVisual = {
  eyebrow: 'TAO · 路径',
  accent: '#09090b',
  variant: 'market',
  index: '00',
}

export function getTaoStageVisual(stageId: string): TaoStageVisual {
  return taoStageVisualById[stageId] ?? defaultVisual
}

export function taoStagePanelClassName(
  stageId: string,
  extra?: string
): string {
  const visual = getTaoStageVisual(stageId)
  return [
    'tao-stage-panel',
    `tao-stage-panel--${visual.variant}`,
    extra,
  ]
    .filter(Boolean)
    .join(' ')
}

export function taoStagePanelStyle(stageId: string): CSSProperties {
  const visual = getTaoStageVisual(stageId)
  return {
    '--tao-stage-accent': visual.accent,
    '--hz-accent': visual.accent,
  } as CSSProperties
}
