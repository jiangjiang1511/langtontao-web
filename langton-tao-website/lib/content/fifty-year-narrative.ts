export const fiftyYearPageTitle =
  '朗敦道TAO定律——穿越周期100年' as const

export type FiftyYearProduct = {
  label: string
  featured?: boolean
  href?: string
}

export type FiftyYearStage = {
  id: string
  periodLabel: string
  theme: string
  keywords?: string[]
  body?: string | null
  products?: FiftyYearProduct[] | null
  transition?: {
    heading: string
    body: string
  } | null
}

export const fiftyYearStages: FiftyYearStage[] = [
  {
    id: 'day-1',
    periodLabel: '第一天',
    theme: '本金',
    keywords: ['结婚', '生子', '劳动', '教育'],
    body: '要关注如何赚钱、关注现金流。通过劳动快速高效地获取人生本金，以教育提升认知，在结婚、生子等人生大事中夯实家庭基础，为后续50年的财富增长打下基础。',
    products: [
      {
        label: '化债（卸下包袱，重新上路）',
        featured: true,
        href: '/coffee#debt',
      },
      {
        label: '英语（留学规划、语言学习、海外升学）',
        featured: true,
        href: '/education#english',
      },
      {
        label: '加入朗敦道会员，一起 all in here，努力创业，赚取人生本金。',
        href: '/member',
      },
      {
        label:
          '认知提升（朗敦道会员：300+赋能活动，财富沙龙，线上课，读书会）',
        href: '/community#millionaire-plan',
      },
    ],
    transition: {
      heading: '如何完成从第一天到第二天的过渡：',
      body: '开始超级英雄探索之旅、千万富翁养成计划。',
    },
  },
  {
    id: 'day-2',
    periodLabel: '第二天',
    theme: '现金',
    body: '完成超级英雄之旅、千万富翁养成计划后：开始有所积累，财富的现金流摆脱了财富重力。但还没开始系统的配置、也还未体会复利的增长。在这个重要的窗口期，守住本金，并开始规划未来',
    products: [{ label: '国债' }, { label: '储蓄' }],
    transition: null,
  },
  {
    id: 'year-1',
    periodLabel: '第一年',
    theme: '价值投机',
    body: '通过A股、波段操作，获得劳动以外的资金增长。',
    products: null,
    transition: null,
  },
  {
    id: 'year-3',
    periodLabel: '第三年',
    theme: '进入价值投资，美股、ETF、指数',
    body: '开启价值投资，享受资产的复利增长。',
    products: null,
    transition: null,
  },
  {
    id: 'year-10',
    periodLabel: '第十年',
    theme: '穿越周期，资产压舱石',
    body: null,
    products: [
      { label: '保险' },
      { label: '房产' },
      { label: '身份规划' },
    ],
    transition: null,
  },
  {
    id: 'year-20',
    periodLabel: '第二十年',
    theme: '信托、RWA、BTC、留学',
    body: null,
    products: null,
    transition: null,
  },
  {
    id: 'year-50',
    periodLabel: '第五十年',
    theme: '黄金',
    body: null,
    products: null,
    transition: null,
  },
  {
    id: 'year-100',
    periodLabel: '第一百年',
    theme: '慈善、传承',
    body: null,
    products: null,
    transition: null,
  },
]
