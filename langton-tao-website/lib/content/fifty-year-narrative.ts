export const fiftyYearPageTitle =
  '朗敦道TAO 定律：从人生第一天到家族一百年' as const

export type FiftyYearProductVariant =
  | 'accordion'
  | 'linkCard'
  | 'plain'
  | 'insurerGrid'
  | 'featureBlock'

export type FiftyYearProductSubItem = {
  label: string
  href?: string
}

export type FiftyYearProduct = {
  label: string
  featured?: boolean
  href?: string
  variant?: FiftyYearProductVariant
  summary?: string
  visualClass?: string
  subItems?: FiftyYearProductSubItem[]
  insurers?: string[]
}

export type FiftyYearStage = {
  id: string
  periodLabel: string
  theme: string
  body?: string | null
  products?: FiftyYearProduct[] | null
  transition?: {
    heading: string
    body?: string
    items?: FiftyYearProduct[]
  } | null
}

export const taoInsurerNames = [
  '富卫',
  '永明',
  '友邦',
  '安盛',
  '万通',
  '保诚',
  '太平',
  '立桥',
  '慕尼黑',
] as const

const superheroSubItems: FiftyYearProductSubItem[] = [
  { label: '麦理浩径', href: '/langtontao#maclehose' },
  { label: '博睿学者', href: '/langtontao#borui' },
  { label: '哪吒航海', href: '/langtontao#nezha' },
]

const superheroJourneyProduct: FiftyYearProduct = {
  label: '超级英雄之旅',
  variant: 'accordion',
  href: '/langtontao#superhero-programs',
  subItems: superheroSubItems,
}

const readingClubProduct: FiftyYearProduct = {
  label: '读书会',
  variant: 'accordion',
  href: '/coffee#reading',
  subItems: [
    { label: '读书', href: '/coffee#reading' },
    { label: '早会', href: '/coffee#millionaire-plan' },
    { label: '打卡', href: '/coffee#millionaire-plan' },
  ],
}

const wealthSalonProduct: FiftyYearProduct = {
  label: '财富沙龙',
  variant: 'accordion',
  href: '/coffee#millionaire-plan',
  subItems: [
    { label: '闭门会议', href: '/coffee#millionaire-plan' },
    { label: '选股', href: '/coffee#millionaire-plan' },
    { label: '投资探讨', href: '/coffee#millionaire-plan' },
  ],
}

export const fiftyYearStages: FiftyYearStage[] = [
  {
    id: 'day-1',
    periodLabel: '第一天',
    theme: '成为超级个体',
    body: '人生第一天，你拥有最高的期权价值。趁还能犯错、还能推倒重来，All in here，成为不可替代的超级个体。',
    products: [],
    transition: {
      heading: '如何进入第二天？',
      items: [
        superheroJourneyProduct,
        {
          label: '千万富翁养成计划',
          variant: 'linkCard',
          href: '/coffee#millionaire-plan',
        },
      ],
    },
  },
  {
    id: 'day-2',
    periodLabel: '第二天',
    theme: '成为超级英雄',
    body: '当现金流挣脱财富重力，你正式跨过第一天与第二天的边界——从此为家族掌舵，以周期为罗盘，行稳致远。',
    products: [superheroJourneyProduct],
    transition: null,
  },
  {
    id: 'year-1',
    periodLabel: '一年',
    theme: '价值投机',
    body: '捕捉短期增量，我们一起，用理性投机赚取财富，让每一次波动都成为资产增值的阶梯。',
    products: [readingClubProduct, wealthSalonProduct, superheroJourneyProduct],
    transition: null,
  },
  {
    id: 'year-3',
    periodLabel: '三年',
    theme: '价值投资',
    body: '跳出单一市场，开启复利增长。让优质资产的成长红利，成为你财富稳步增长的永动机。',
    products: [
      { label: '港卡美卡开户', variant: 'plain' },
      readingClubProduct,
      wealthSalonProduct,
      superheroJourneyProduct,
    ],
    transition: null,
  },
  {
    id: 'year-10',
    periodLabel: '十年',
    theme: '资产压舱石',
    body: '当你的远见看到十年，家庭理财开始穿越周期波动。为财富打造不可撼动的压舱石，守好人生的基本盘。',
    products: [
      {
        label: '家庭风险体检',
        variant: 'linkCard',
        href: '/langtontao#checkup-cases',
      },
      {
        label: '保险严选',
        variant: 'insurerGrid',
        href: '/coffee#preservation',
        insurers: [...taoInsurerNames],
      },
      {
        label: '房产配置',
        variant: 'accordion',
        href: '/coffee#invest',
        subItems: [
          { label: '房产置换', href: '/coffee#invest' },
          { label: '海外不动产', href: '/coffee#invest' },
        ],
      },
      {
        label: '身份规划',
        variant: 'accordion',
        href: '/coffee#legacy',
        subItems: [{ label: '香港身份', href: '/coffee#legacy' }],
      },
      { label: '家庭IP资产', variant: 'plain' },
      { label: '宠物晚年服务', variant: 'plain' },
      { label: '冻精冻卵服务', variant: 'plain' },
    ],
    transition: null,
  },
  {
    id: 'year-20',
    periodLabel: '二十年',
    theme: '资产防火墙',
    body: '搭建家族防火墙，实现财富的风险隔离与定向传递。为后代铺好前路，让家族财富在代际间平稳过渡。',
    products: [
      {
        label: '家庭风险体检',
        variant: 'linkCard',
        href: '/langtontao#checkup-cases',
      },
      {
        label: '保险严选',
        variant: 'accordion',
        href: '/coffee#preservation',
        subItems: [
          {
            label: '各大保司的不同特点介绍，产品严选',
            href: '/coffee#preservation',
          },
        ],
      },
      {
        label: '家族信托',
        variant: 'accordion',
        href: '/coffee#legacy',
        subItems: [{ label: '信托', href: '/coffee#legacy' }],
      },
      {
        label: '博睿学者',
        variant: 'linkCard',
        href: '/langtontao#borui',
      },
      {
        label: '哪吒航海',
        variant: 'linkCard',
        href: '/langtontao#nezha',
      },
    ],
    transition: null,
  },
  {
    id: 'year-50',
    periodLabel: '五十年',
    theme: '家族肇始',
    body: '当你的远见已然如此长远，家族基业以此为始。立家规、传家风、定秩序，奠定家族百年根基。',
    products: [
      { label: '家族宪章', variant: 'plain' },
      { label: '赛博永生', variant: 'plain' },
    ],
    transition: null,
  },
  {
    id: 'year-100',
    periodLabel: '一百年',
    theme: '永续传承',
    body: '超越生命的价值，财富早已不是数字，而是跨越世代的善意与荣光，成就家族百年的精神图腾。',
    products: [{ label: '家族慈善基金', variant: 'plain' }],
    transition: null,
  },
]
