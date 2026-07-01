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
        {
          label: '千万富翁养成计划',
          variant: 'linkCard',
          href: '/coffee#millionaire-plan',
        },
        superheroJourneyProduct,
      ],
    },
  },
  {
    id: 'day-2',
    periodLabel: '第二天',
    theme: '成为超级英雄',
    body: '当现金流挣脱财富重力，你正式跨过第一天与第二天的边界——从此为家族掌舵，以周期为罗盘，行稳致远。',
    products: [],
    transition: null,
  },
  {
    id: 'year-1',
    periodLabel: '一年',
    theme: '价值投机 · 价值投资 · 全球配置 · 保障底盘',
    body: '第一年完成理念升级：理解投机与投资的边界，布局全球核心资产，同步筑牢意外、疾病等黑天鹅的保障底盘，为长远征途储备弹药。',
    products: [],
    transition: null,
  },
  {
    id: 'year-6',
    periodLabel: '六年',
    theme: '孩子入学 · 教育储备',
    body: '孩子六七岁踏入义务教育，家庭资产配置迎来新变量。提前布局学区置产，建立专项教育储备金，用保险锁定孩子未来。',
    products: [],
    transition: null,
  },
  {
    id: 'year-15',
    periodLabel: '十五年',
    theme: '出花园 · 教育 · 身份规划',
    body: '以资产托举后辈「出花园」，让子女从你的花园走向世界的花园。正式落地代际托举与身份规划，衔接两代人的人生周期。',
    products: [],
    transition: null,
  },
  {
    id: 'year-30',
    periodLabel: '三十年',
    theme: '身后传承',
    body: '提前安顿养老与身后传承，人走基业不散，财富有序代代传递。搭建信托、数字资产与养老的完整闭环。',
    products: [],
    transition: null,
  },
  {
    id: 'year-50',
    periodLabel: '五十年',
    theme: '家族肇始',
    body: '一人开基立业，立规章传家风，打破富不过三代的宿命枷锁。格局彻底跳出个人小家，完成从家庭到家族的跨越。',
    products: [],
    transition: null,
  },
  {
    id: 'year-100',
    periodLabel: '一百年',
    theme: '慈善 · 永续传承',
    body: '一百年，以慈善定格家族荣光。财富传世，精神不朽——完成物质财富与精神价值的双重永续传承。',
    products: [{ label: '家族慈善基金', variant: 'plain' }],
    transition: null,
  },
]
