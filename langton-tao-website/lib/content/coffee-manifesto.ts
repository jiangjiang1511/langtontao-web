export const coffee2TenTopicsVerse = [
  '一切二让看三观，',
  '四象五法六维度。',
  '七个习惯高效能，',
  '八方来财朗敦道。',
  '九交朋友十幸福。',
] as const

export type Coffee2TenetSection = {
  label: string
  points: string[]
}

export type Coffee2TenetDetail = {
  intro?: string
  sections?: Coffee2TenetSection[]
  items?: { title: string; description?: string }[]
}

export type Coffee2Tenet = {
  number: string
  title: string
  verseLine: string
  cardSummary: string | readonly string[]
  detail: Coffee2TenetDetail | null
}

export const coffee2TenTopics: readonly Coffee2Tenet[] = [
  {
    number: '01',
    title: '一切',
    verseLine: '一切二让看三观',
    cardSummary: '一切为了孩子',
    detail: null,
  },
  {
    number: '02',
    title: '二让',
    verseLine: '一切二让看三观',
    cardSummary: [
      '让学习回归教育的本质',
      '让生意回归商业的本质',
    ],
    detail: null,
  },
  {
    number: '03',
    title: '三观',
    verseLine: '一切二让看三观',
    cardSummary: [
      '关于自由 → 关系网络',
      '关于勇气 → 具身认知',
      '关于信仰 → 穿越周期',
    ],
    detail: null,
  },
  {
    number: '04',
    title: '四象',
    verseLine: '四象五法六维度',
    cardSummary: '四象限',
    detail: null,
  },
  {
    number: '05',
    title: '五法',
    verseLine: '四象五法六维度',
    cardSummary: ['活法', '想法', '办法', '说法', '看法'],
    detail: {
      sections: [
        { label: '活法 · 第一天', points: ['勤劳动', '学英语'] },
        {
          label: '想法 · 第二天',
          points: ['理解财富和钱', '贪婪（欲望）和恐惧（代价）'],
        },
        { label: '办法 · 1 年', points: ['阿尔法收入 α', '贝塔收入 β'] },
        { label: '办法 · 5 年', points: ['人生大事：结婚', '生娃'] },
        { label: '说法 · 10 年', points: ['里程碑'] },
        { label: '说法 · 15 年', points: ['出花园、过童关'] },
        {
          label: '看法 · 50 年',
          points: ['天命计划', '养老/避险（黄金/BTC）'],
        },
        { label: '看法 · 100 年', points: ['传承'] },
      ],
    },
  },
  {
    number: '06',
    title: '六维',
    verseLine: '四象五法六维度',
    cardSummary: ['商业', '政治', '艺术', '物理', '人性', '生命'],
    detail: null,
  },
  {
    number: '07',
    title: '七个习惯',
    verseLine: '七个习惯高效能',
    cardSummary: '高效能人士的 7 个习惯',
    detail: {
      sections: [
        {
          label: '个人领域的成功',
          points: ['积极主动', '以终为始', '要事第一'],
        },
        {
          label: '公众领域的成功',
          points: ['双赢思维', '知彼解己', '统合综效'],
        },
        {
          label: '不断更新',
          points: ['身体 · 精神 · 智力 · 社会/情感'],
        },
      ],
    },
  },
  {
    number: '08',
    title: '八方来财',
    verseLine: '八方来财朗敦道',
    cardSummary: '加入平台，增加多元管道收入',
    detail: null,
  },
  {
    number: '09',
    title: '久交朋友',
    verseLine: '九交朋友十幸福',
    cardSummary: '社群',
    detail: null,
  },
  {
    number: '10',
    title: '重拾幸福',
    verseLine: '九交朋友十幸福',
    cardSummary: '有方向，在路上',
    detail: null,
  },
]

import type { Coffee2SectionCopyBlock } from '@/lib/content/coffee-glossary'

export const coffee2LifeEvents = [
  {
    number: '01',
    id: 'life-living',
    title: '活着',
    summary: '生存、生活、生意、生命。',
    sectionCopy: [
      '生存、生活、生意、生命。',
      '「活着」是人生第一天不变的主题，更是让我们个人和社会持续运转的底层动力：我们要为之劳动从而保有现金流，我们要化清债务从而轻装上路，我们要关注投资、关注置业、关注保全……',
      {
        type: 'annotated',
        segments: [
          { type: 'text', value: '在' },
          { type: 'term', id: 'mediocristan' },
          { type: 'text', value: '的泥潭，用肉身耗尽的代价，去推开' },
          { type: 'term', id: 'extremistan' },
          { type: 'text', value: '的大门。' },
        ],
      },
    ] satisfies readonly Coffee2SectionCopyBlock[],
  },
  {
    number: '02',
    id: 'life-retirement',
    title: '养老',
    summary: '长寿风险与购买力——提前布局，避免「钱还在、日子难」的错位。',
  },
  {
    number: '03',
    id: 'life-education',
    title: '教育',
    summary: '代际承诺与全球视野——读书、英语与升学路径的系统选择。',
  },
  {
    number: '04',
    id: 'life-marriage',
    title: '婚姻',
    summary: '关系结构改变资产负债表——婚育、再婚与家庭形态的敞口管理。',
  },
  {
    number: '05',
    id: 'life-legacy',
    title: '传承',
    summary: '治理、信托与受益人——让财富在代际间可执行、可同频地传递。',
  },
] as const

export type Coffee2LifeEventId = (typeof coffee2LifeEvents)[number]['id']

export type Coffee2LifeEvent = (typeof coffee2LifeEvents)[number]

export const coffee2LifeEventsPanelTitle: Coffee2BackedPanelTitle = {
  zh: '五件人生大事',
  en: 'Five Life Events',
}

export const coffee2LifeEventsSectionMeta = {
  eyebrow: 'Life Events · 人生大事',
  title: '五件人生大事',
  subtitle: 'Five Life Events',
} as const

export type Coffee2BackedPanelTitle =
  | string
  | {
      zh: string
      en: string
    }

export const coffee2Manifesto = {
  panelTitle: {
    zh: '联动十日谈',
    en: 'LTT BearBit Coffee X Decameron Coffee',
  },
  brandLogos: [
    {
      src: '/static/bearbit-coffee-logo.png',
      alt: '熊比特咖啡 Schumpeter Coffee',
      width: 1582,
      height: 480,
      variant: 'light' as const,
    },
    {
      src: '/static/decameroncoffee-logo.png',
      alt: 'DECAMERON COFFEE 十日谈',
      width: 800,
      height: 400,
      variant: 'dark' as const,
    },
  ],
} as const

export const coffee2CollaborationCta = {
  paragraphs: [
    '「十日谈咖啡联名储值卡」是熊比特精神的实体凭证——十次坐下来、十次交换、十次把复杂议题汇聚于具体对话的机会。它提醒你：家族传承里最稀缺的，往往不是更多一份说明书，而是更多一段愿意开口、愿意倾听的时间。',
    '熊比特咖啡不是产品货架，而是交谈场景：投资、保全、化债、传承，可在像喝咖啡一样自然的节奏里被诚实拆解。先建立共识，再谈配置与交付。',
  ],
  ctaLabel: '加入我们',
  ctaHref: '/member',
} as const

export const coffee2TenTopicsPanelTitle: Coffee2BackedPanelTitle = {
  zh: '用十杯咖啡参透十个人生话题',
  en: 'Ten Cups · Ten Life Topics',
}

export const coffee2Cycles = {
  eyebrow: 'Cycles · 周期',
  title: '看见周期，再谈选择',
  lead: '家庭财富不是在静止均衡里优化，而是在康波与朱格拉的叠加中被重新定价。先建立周期共识，四话题才有共同的坐标系。',
  items: [
    {
      id: 'kondratiev',
      title: '康波周期',
      duration: '约 50–60 年',
      summary:
        '长周期决定时代主题——技术革命、通胀与通缩、资产大类的主导逻辑。家庭需要回答：我们处于长波的哪个阶段？该守本金、配压舱石，还是布局传承？',
      topics: ['投资', '传承'],
    },
    {
      id: 'juglar',
      title: '朱格拉周期',
      duration: '约 7–11 年',
      summary:
        '中周期带来库存、信贷与景气波动——企业现金流、房产与风险资产的波段重估。诚实投资学强调：不预测每一个拐点，但要有可重复执行的纪律。',
      topics: ['投资', '保全', '化债'],
    },
  ],
} as const
