export type AssetQuadrantId =
  | 'tangible'
  | 'financial'
  | 'intangible'
  | 'protection'

export type AssetBubble = {
  id: string
  label: string
  quadrant: AssetQuadrantId
  /** 常见度 1–5，决定资产框尺寸 */
  weight: number
  color: string
  /** 在整张图内的相对位置（百分比） */
  x: number
  y: number
}

export type AssetQuadrant = {
  id: AssetQuadrantId
  label: string
  description: string
  accent: string
}

export const assetClassesSectionMeta = {
  eyebrow: 'Asset Map · 资产地图',
  title: '你的家庭有哪些大类资产？',
  lead: '家庭在「活着」议题里面对的，不只是股票与房产——还有数字账号、藏品、保险与人脉。四象限资产图按「常见度」与资产属性分布，一览可能遇到的处置类型。',
} as const

export const assetQuadrantAxes = {
  top: '抽象权益',
  bottom: '实物占有',
  left: '沉淀周期长',
  right: '流动性高',
} as const

export const assetQuadrants: AssetQuadrant[] = [
  {
    id: 'intangible',
    label: '无形与数字',
    description: '账号、知识产权、人脉等难以入库却影响现金流的能力。',
    accent: '#ffe600',
  },
  {
    id: 'financial',
    label: '金融资产',
    description: '可定价、可交易、与金融市场联动的工具。',
    accent: '#09090b',
  },
  {
    id: 'tangible',
    label: '有形资产',
    description: '可触摸、可占有、流动性相对较低的实物与不动产。',
    accent: '#ffe600',
  },
  {
    id: 'protection',
    label: '保障类',
    description: '以契约为载体，为家庭责任与极端风险预留防火墙。',
    accent: '#09090b',
  },
]

/** 资产框尺寸：weight → 宽/高 px（再按标签长度微调宽度） */
export const assetTileSizeByWeight: Record<
  number,
  { width: number; height: number }
> = {
  5: { width: 76, height: 38 },
  4: { width: 88, height: 38 },
  3: { width: 80, height: 36 },
  2: { width: 96, height: 38 },
  1: { width: 68, height: 34 },
}

export const assetBubbles: AssetBubble[] = [
  // 左上 · 无形与数字
  {
    id: 'digital-assets',
    label: '数字资产',
    quadrant: 'intangible',
    weight: 3,
    color: '#c4b5fd',
    x: 18,
    y: 14,
  },
  {
    id: 'gaming-accounts',
    label: '游戏账号',
    quadrant: 'intangible',
    weight: 1,
    color: '#ddd6fe',
    x: 13,
    y: 32,
  },
  {
    id: 'creator-accounts',
    label: '自媒体账号',
    quadrant: 'intangible',
    weight: 2,
    color: '#a78bfa',
    x: 28,
    y: 28,
  },
  {
    id: 'account-followers',
    label: '账号粉丝',
    quadrant: 'intangible',
    weight: 1,
    color: '#e9d5ff',
    x: 14,
    y: 42,
  },
  {
    id: 'intellectual-property',
    label: '知识产权',
    quadrant: 'intangible',
    weight: 2,
    color: '#818cf8',
    x: 32,
    y: 14,
  },
  {
    id: 'brand',
    label: '品牌',
    quadrant: 'intangible',
    weight: 2,
    color: '#a5b4fc',
    x: 13,
    y: 18,
  },
  {
    id: 'copyright',
    label: '著作',
    quadrant: 'intangible',
    weight: 1,
    color: '#c7d2fe',
    x: 24,
    y: 38,
  },
  {
    id: 'patent',
    label: '专利',
    quadrant: 'intangible',
    weight: 1,
    color: '#e0e7ff',
    x: 34,
    y: 32,
  },
  {
    id: 'networking',
    label: '人脉资源',
    quadrant: 'intangible',
    weight: 3,
    color: '#8b5cf6',
    x: 14,
    y: 24,
  },

  // 右上 · 金融资产
  {
    id: 'cash',
    label: '现金',
    quadrant: 'financial',
    weight: 5,
    color: '#38bdf8',
    x: 72,
    y: 14,
  },
  {
    id: 'stocks',
    label: '股票',
    quadrant: 'financial',
    weight: 5,
    color: '#0ea5e9',
    x: 83,
    y: 22,
  },
  {
    id: 'funds-bonds',
    label: '基金/债券',
    quadrant: 'financial',
    weight: 4,
    color: '#60a5fa',
    x: 62,
    y: 28,
  },
  {
    id: 'crypto',
    label: '加密货币',
    quadrant: 'financial',
    weight: 2,
    color: '#2dd4bf',
    x: 52,
    y: 16,
  },

  // 左下 · 有形资产
  {
    id: 'real-estate',
    label: '房产',
    quadrant: 'tangible',
    weight: 5,
    color: '#f59e0b',
    x: 16,
    y: 72,
  },
  {
    id: 'collectibles',
    label: '藏品',
    quadrant: 'tangible',
    weight: 3,
    color: '#fbbf24',
    x: 30,
    y: 82,
  },
  {
    id: 'antiques',
    label: '古董',
    quadrant: 'tangible',
    weight: 1,
    color: '#fde68a',
    x: 14,
    y: 84,
  },
  {
    id: 'jade-curios',
    label: '玉石/文玩',
    quadrant: 'tangible',
    weight: 1,
    color: '#fcd34d',
    x: 24,
    y: 86,
  },
  {
    id: 'luxury-goods',
    label: '名车/名表/名包',
    quadrant: 'tangible',
    weight: 2,
    color: '#fb923c',
    x: 40,
    y: 74,
  },
  {
    id: 'artworks',
    label: '字画/艺术品',
    quadrant: 'tangible',
    weight: 2,
    color: '#fdba74',
    x: 14,
    y: 76,
  },
  {
    id: 'limited-editions',
    label: 'IP限量款',
    quadrant: 'tangible',
    weight: 1,
    color: '#fef3c7',
    x: 18,
    y: 60,
  },
  {
    id: 'gold',
    label: '黄金',
    quadrant: 'tangible',
    weight: 4,
    color: '#eab308',
    x: 46,
    y: 58,
  },

  // 右下 · 保障类
  {
    id: 'insurance',
    label: '保险',
    quadrant: 'protection',
    weight: 4,
    color: '#4ade80',
    x: 78,
    y: 78,
  },
]

export function getBubblesForQuadrant(quadrant: AssetQuadrantId): AssetBubble[] {
  return assetBubbles.filter((bubble) => bubble.quadrant === quadrant)
}
