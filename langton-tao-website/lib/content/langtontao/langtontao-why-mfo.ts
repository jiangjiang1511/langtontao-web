import { aboutModules } from '@/lib/content/about-modules'
import { problemCards, serveContent } from '@/lib/content/langton-page'

export const langtontaoWhyMfoMeta = {
  eyebrow: 'Part I · 何必家办',
  title: '何必家办',
  lead: '家办不是资产到了某个数字之后的奢侈品，而是当关系、人脉、人生选择与财富目标同时堆叠时，用来统摄决策的顶层架构。',
} as const

export const langtontaoMfoNeedLines = [
  {
    id: 'relations',
    title: '家庭关系',
    summary: '角色、结构、权力与理念是否同频',
    items: [
      '创业、退休、接班是否改写家庭角色',
      '再婚、多元家庭形态是否扩展结构',
      '价值观与信息是否长期错位',
    ],
  },
  {
    id: 'social',
    title: '社会关系',
    summary: '股权合作、人脉与政治身份的真实权重',
    items: [
      '合作方与上下游关系',
      '重要人脉与姻亲网络',
      '政治身份带来的约束与资源',
    ],
  },
  {
    id: 'choices',
    title: '重大选择',
    summary: '身份、教育、事业与生活方式的代际承诺',
    items: [
      '身份与税务身份规划',
      '教育与国际路线选择',
      '置业、生育与重大生活方式决策',
    ],
  },
  {
    id: 'wealth',
    title: '财富选择',
    summary: '保全、增长与传承需在同一架构中统筹',
    items: [
      '跨越或稳固阶层的资产配置',
      '风险敞口与现金流结构',
      '传承路径与治理规则',
    ],
  },
] as const

export type ExposureSeverity = 'high' | 'medium' | 'watch'

export type LangtontaoExposureItem = {
  id: string
  category: string
  label: string
  severity: ExposureSeverity
  moduleId: 'exposure' | 'assets'
}

function buildExposureItems(): LangtontaoExposureItem[] {
  const exposure = aboutModules.find((m) => m.id === 'exposure')!
  const assets = aboutModules.find((m) => m.id === 'assets')!
  const items: LangtontaoExposureItem[] = []

  for (const group of exposure.groups) {
    const severity: ExposureSeverity =
      group.title === '认知风险' || group.title === '债务'
        ? 'high'
        : group.title === '健康' || group.title === '婚姻关系'
          ? 'medium'
          : 'watch'

    if (group.items.length === 0) {
      items.push({
        id: `exposure-${group.title}`,
        category: group.title,
        label: group.title,
        severity,
        moduleId: 'exposure',
      })
      continue
    }

    for (const item of group.items) {
      items.push({
        id: `exposure-${group.title}-${item.slice(0, 12)}`,
        category: group.title,
        label: item,
        severity,
        moduleId: 'exposure',
      })
    }
  }

  for (const group of assets.groups) {
    for (const item of group.items.length > 0 ? group.items : [group.title]) {
      items.push({
        id: `assets-${group.title}-${item.slice(0, 12)}`,
        category: group.title,
        label: item,
        severity: 'watch' as const,
        moduleId: 'assets',
      })
    }
  }

  return items
}

export const langtontaoExposureItems = buildExposureItems()

export const langtontaoExposureCategories = [
  ...new Set(langtontaoExposureItems.map((i) => i.category)),
]

export const langtontaoOpportunityNeeds = {
  opportunities: [
    {
      id: 'density',
      title: '密度与同频',
      body: '每年 300+ 场活动与工坊式陪跑，让架构讨论发生在真实场景里。',
    },
    {
      id: 'cognition',
      title: '认知定投',
      body: '诚实投资学与财富沙龙，把 TAO 路径变成可执行的长期纪律。',
    },
    {
      id: 'embodied',
      title: '具身陪跑',
      body: '超级英雄之旅、私董会与六人茶局，传递默会知识。',
    },
  ],
  needs: problemCards.map((card, index) => ({
    id: `need-${index}`,
    title: card.title,
    bullets: [...card.bullets],
  })),
  serveQuote: serveContent.quote,
} as const
