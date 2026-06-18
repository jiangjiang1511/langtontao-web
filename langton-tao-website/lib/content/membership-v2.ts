import type { MembershipTierId } from '@/lib/content/membership'

export type ComparisonCell = boolean | string

export type TierBenefitCard = {
  id: string
  title: string
  summary: string
  items: string[]
  imageSrc: string
  imageAlt: string
  imageClass: string
}

export type MembershipTierSection = {
  id: MembershipTierId
  shortName: string
  title: string
  tagline: string
  includesLabel?: string
  audience: string
  contactIntent: string
  summaryPoints: string[]
  coreBenefits: TierBenefitCard[]
}

export type ComparisonRow = {
  label: string
  values: Record<MembershipTierId, ComparisonCell>
}

export type ComparisonCategory = {
  title: string
  description?: string
  rows: ComparisonRow[]
}

export const membershipV2Hero = {
  eyebrow: '朗敦道 MFO · 会员体系',
  slogan: "消费Cosco，家办'好事多'",
  titleLines: ['开启人生认知定投，', '掌握普通人的投资学'] as const,
  subtitle: '推开门打开更大的世界',
  disclaimer: '价格不公开展示，预约咨询了解详情。可随时沟通调整方案。',
} as const

/** 小程序 pages/tabbar/member（wx-url-link 生成） */
export const membershipJoinHref = 'https://wxaurl.cn/sGbYdhsrLOl'
export const membershipJoinLabel = '加入会员' as const

export const membershipBoardSection = {
  eyebrow: '权益详情',
  title: '私董会',
  tagline: '全球权益投资共享 + 圈层共创',
  includesLabel: '含会员 Pro 全部权益',
  mysteryEyebrow: '邀请制 · 同频入座',
  mysteryLead: '更深水域，更少同行者。静待同频家族入座。',
  mysteryCardHint: '同频入座',
  audience: '邀请制 · 同频方可入座',
  contactIntent: '私董会',
} as const

/** 财富大健康体检六项（含原「家庭风控体系」各子项） */
export const wealthHealthCheckupItems = [
  {
    title: '家庭需求/风险敞口定位',
    description: '资产结构/行业特性/财富阶段不同，风险完全不同',
  },
  {
    title: '家庭已有保障梳理',
    description: '以防家人不知情、理赔无头绪，风控成了一纸空文',
  },
  {
    title: '专属风控系统搭建设计',
    description: '不仅懂保险，更懂高净值家庭资产结构与财富管理需求',
  },
  {
    title: '年度风控系统年检',
    description:
      '避免家庭资产/人员结构变化后保障缺口持续出现，风控体系逐渐失效',
  },
  {
    title: '专属年度陪跑',
    description:
      '让风控系统跟上家庭财富变化，避免「一次配置、终身脱节」，实现长效适配',
  },
  {
    title: '家庭风控知识赋能',
    description: '传递专业认知，让全家都懂风控，守住家庭财富底线',
  },
] as const

const wealthHealthCheckupComparisonRows: ComparisonRow[] =
  wealthHealthCheckupItems.map((item) => ({
    label: `${item.title}：${item.description}`,
    values: { member: false, plus: true, pro: true, board: true },
  }))

const allTierSections: MembershipTierSection[] = [
  {
    id: 'member',
    shortName: '会员',
    title: '朗敦道MFO会员',
    tagline: '生态入局——开启认知定投',
    audience:
      '希望以较低门槛进入朗敦道生态，建立认知定投习惯与同频社群连接的家庭与个人。',
    contactIntent: '了解会员',
    summaryPoints: [
      '朗敦道物理通行证',
      '每年300+赋能活动',
      '超级英雄之旅探索',
      '开启个人数字资产积累',
    ],
    coreBenefits: [
      {
        id: 'physical-pass',
        title: '朗敦道物理通行证',
        summary: '进入朗敦道生态的实体身份凭证与日常触点。',
        items: [
          '朗敦道MFO专属NFC徽章',
          '十日谈咖啡卡 10 杯',
          '价值投资推荐书目（当下推荐）',
        ],
        imageSrc: '/membership/physical-pass.svg',
        imageAlt: '朗敦道物理通行证',
        imageClass: 'bg-gradient-to-br from-pop-yellow via-amber-200 to-zinc-400',
      },
      {
        id: 'empowerment-events',
        title: '每年300+赋能活动',
        summary: '全年高密度认知定投场景，线上与线下持续同频。',
        items: ['读书会', '沙龙', '夜话', '线上讲座'],
        imageSrc: '/membership/events.svg',
        imageAlt: '赋能活动',
        imageClass: 'bg-gradient-to-br from-zinc-700 via-zinc-500 to-pop-black',
      },
      {
        id: 'superhero',
        title: '超级英雄之旅探索',
        summary: '以航海与徒步完成的具身认知定投，在身体挑战中沉淀家族叙事。',
        items: [
          '哪咤航海帆船航海（会员价）',
          '麦理浩径超级英雄之旅（1次）——24节气的具身认知定投',
        ],
        imageSrc: '/membership/superhero.svg',
        imageAlt: '超级英雄之旅',
        imageClass: 'bg-gradient-to-br from-emerald-900 via-green-700 to-sky-900',
      },
      {
        id: 'digital-asset',
        title: '开启个人数字资产积累',
        summary: '从内容库开源起步，建立可复利积累的个人叙事资产。',
        items: ['个人叙事赋能内容库开源——帮你开启自己的数字资产积累'],
        imageSrc: '/membership/digital.svg',
        imageAlt: '数字资产积累',
        imageClass: 'bg-gradient-to-br from-violet-900 via-indigo-800 to-pop-black',
      },
    ],
  },
  {
    id: 'plus',
    shortName: 'Plus',
    title: '朗敦道MFO会员 Plus',
    tagline: '财富大健康体检 + 数字资产 IP 定投',
    includesLabel: '含会员全部权益',
    audience:
      '需要在会员基础上完成财富大健康体检，并开始个人 IP 数字资产定投的高净值家庭。',
    contactIntent: '会员 Plus',
    summaryPoints: [
      '财富大健康体检（六项）',
      '数字资产赋能（IP 起步）',
    ],
    coreBenefits: [
      {
        id: 'health-checkup',
        title: '财富大健康体检',
        summary:
          '从家庭财富体检出发，系统定位风险敞口、梳理保障缺口，搭建并年检专属风控体系，全年陪跑与家庭赋能。',
        items: wealthHealthCheckupItems.map((item) => item.title),
        imageSrc: '/membership/health.svg',
        imageAlt: '财富大健康体检',
        imageClass: 'bg-gradient-to-br from-rose-800 via-red-700 to-zinc-900',
      },
      {
        id: 'ip-starter',
        title: '数字资产赋能',
        summary: '开启个人 IP 数字资产定投的第一阶段陪跑。',
        items: [
          '一对一专属IP资产梳理',
          'IP梳理陪跑（1个月）',
          '个人叙事专属定制视频（1条）',
        ],
        imageSrc: '/membership/ip-plus.svg',
        imageAlt: '数字资产赋能 Plus',
        imageClass: 'bg-gradient-to-br from-fuchsia-900 via-purple-800 to-indigo-950',
      },
    ],
  },
  {
    id: 'pro',
    shortName: 'Pro',
    title: '朗敦道MFO会员 Pro',
    tagline: '家办事业合伙人 + CRM + IP 数字资产三部曲',
    includesLabel: '含会员 Plus 全部权益',
    audience:
      '希望深度参与家办事业、建立管道收入，并完成 IP 数字资产三部曲的合伙人型成员。',
    contactIntent: '会员 Pro',
    summaryPoints: [
      '家办事业合伙人',
      'CRM 管理系统',
      '数字资产赋能（IP 三部曲）',
    ],
    coreBenefits: [
      {
        id: 'partnership',
        title: '家办事业合伙人',
        summary: '从参与者升级为共建者，共享团队收益与管道收入。',
        items: ['团队共建，收益共享', '个人收益最大化', '管道收入'],
        imageSrc: '/membership/partner.svg',
        imageAlt: '家办事业合伙人',
        imageClass: 'bg-gradient-to-br from-amber-700 via-yellow-600 to-zinc-800',
      },
      {
        id: 'crm',
        title: 'CRM 管理系统',
        summary: '家办事业化的客户与关系管理基础设施。',
        items: ['CRM 管理系统完整使用权', '支撑合伙人业务的持续运营'],
        imageSrc: '/membership/crm.svg',
        imageAlt: 'CRM 管理系统',
        imageClass: 'bg-gradient-to-br from-cyan-900 via-teal-800 to-pop-black',
      },
      {
        id: 'ip-trilogy',
        title: '数字资产赋能',
        summary: '个人 IP 数字资产三部曲——从叙事到全球品牌记录。',
        items: [
          '一对一专属IP资产梳理',
          'IP梳理陪跑（3个月）',
          '个人叙事专属定制视频——个人IP数字资产三部曲',
          '完成麦理浩径十段挑战，在巅峰分享个人故事——TEDx 个人专场（全球知名品牌，跨境数字IP资产记录）',
        ],
        imageSrc: '/membership/ip-pro.svg',
        imageAlt: '数字资产赋能 Pro',
        imageClass: 'bg-gradient-to-br from-blue-950 via-indigo-900 to-violet-950',
      },
    ],
  },
]

/** 公开展示的三档（不含私董会） */
export const membershipTierSections = allTierSections

export const membershipV2FullComparison: ComparisonCategory[] = [
  {
    title: '朗敦道物理通行证',
    rows: [
      {
        label: 'NFC徽章 · 咖啡卡 · 推荐书目',
        values: { member: true, plus: true, pro: true, board: true },
      },
    ],
  },
  {
    title: '每年300+赋能活动',
    rows: [
      {
        label: '读书会 / 沙龙 / 夜话 / 线上讲座',
        values: { member: true, plus: true, pro: true, board: true },
      },
    ],
  },
  {
    title: '超级英雄之旅探索',
    rows: [
      {
        label: '哪咤航海帆船航海（会员价）',
        values: { member: true, plus: true, pro: true, board: true },
      },
      {
        label: '麦理浩径超级英雄之旅 —— 24节气的具身认知定投',
        values: {
          member: '1次',
          plus: '1次',
          pro: '十段挑战',
          board: '十段挑战',
        },
      },
    ],
  },
  {
    title: '个人数字资产积累',
    rows: [
      {
        label: '个人叙事赋能内容库开源——帮你开启自己的数字资产积累',
        values: { member: true, plus: true, pro: true, board: true },
      },
      {
        label: '一对一专属IP资产梳理',
        values: { member: false, plus: true, pro: true, board: true },
      },
      {
        label: 'IP梳理陪跑',
        values: { member: false, plus: '1个月', pro: '3个月', board: '3个月' },
      },
      {
        label: '个人叙事专属定制视频——个人IP数字资产三部曲',
        values: { member: false, plus: '1条', pro: '3条', board: '3条' },
      },
      {
        label:
          '完成麦理浩径十段挑战，在巅峰分享个人故事——TEDx 个人专场（全球知名品牌，跨境数字IP资产记录）',
        values: { member: false, plus: false, pro: true, board: true },
      },
    ],
  },
  {
    title: '财富大健康体检',
    rows: wealthHealthCheckupComparisonRows,
  },
  {
    title: '家办事业合伙人',
    rows: [
      {
        label: '团队共建 · 收益共享 · 管道收入',
        values: { member: false, plus: false, pro: true, board: true },
      },
    ],
  },
  {
    title: 'CRM 管理系统',
    rows: [
      {
        label: 'CRM 完整使用权',
        values: { member: false, plus: false, pro: true, board: true },
      },
    ],
  },
  {
    title: '私董会圈层',
    rows: [
      {
        label: '全球权益投资 / 博弈投资配置共享',
        values: { member: false, plus: false, pro: false, board: true },
      },
      {
        label: '私董会圈层共享',
        values: { member: false, plus: false, pro: false, board: true },
      },
    ],
  },
]

/** 折叠态：四列对比，显示至「个人叙事赋能内容库开源」行止 */
export const membershipV2CollapsedComparison: ComparisonCategory[] = [
  ...membershipV2FullComparison.slice(0, 3),
  {
    title: membershipV2FullComparison[3].title,
    rows: membershipV2FullComparison[3].rows.filter(
      (row) =>
        row.label ===
        '个人叙事赋能内容库开源——帮你开启自己的数字资产积累'
    ),
  },
]

export const tierColumnOrder: MembershipTierId[] = [
  'member',
  'plus',
  'pro',
  'board',
]

export const tierColumnLabels: Record<MembershipTierId, string> = {
  member: '普通会员',
  plus: 'Plus',
  pro: 'Pro',
  board: '私董会',
}

export type PricingOverviewCard = {
  id: MembershipTierId
  shortName: string
  title: string
  tagline: string
  includesLabel?: string
  contactIntent: string
  audience: string
  highlights: string[]
  mystery?: boolean
}

export type MembershipBenefitBar = TierBenefitCard & {
  tierIds: MembershipTierId[]
}

/** 权益详情标签：不展示私董会（私董会单独区块介绍） */
const benefitTierScope: Record<
  'member' | 'plus' | 'pro',
  MembershipTierId[]
> = {
  member: ['member', 'plus', 'pro'],
  plus: ['plus', 'pro'],
  pro: ['pro'],
}

const benefitTitleOverrides: Record<string, string> = {
  'ip-starter': '数字资产赋能（IP 起步）',
  'ip-trilogy': '数字资产赋能（IP 三部曲）',
}

export const membershipBenefitBars: MembershipBenefitBar[] = allTierSections.flatMap(
  (tier) =>
    tier.coreBenefits.map((benefit) => ({
      ...benefit,
      title: benefitTitleOverrides[benefit.id] ?? benefit.title,
      tierIds: benefitTierScope[tier.id as keyof typeof benefitTierScope],
    }))
)

export const membershipPricingOverview: PricingOverviewCard[] = [
  ...allTierSections.map((tier) => ({
    id: tier.id,
    shortName: tier.shortName,
    title: tier.title,
    tagline: tier.tagline,
    includesLabel: tier.includesLabel,
    contactIntent: tier.contactIntent,
    audience: tier.audience,
    highlights: tier.summaryPoints,
  })),
  {
    id: 'board' as const,
    shortName: '私董会',
    title: membershipBoardSection.title,
    tagline: membershipBoardSection.tagline,
    includesLabel: membershipBoardSection.includesLabel,
    contactIntent: membershipBoardSection.contactIntent,
    audience: membershipBoardSection.audience,
    highlights: ['全球权益投资共享', '私董会圈层共创'],
    mystery: true,
  },
]

/** @deprecated */
export const memberCollapsedComparison = membershipV2CollapsedComparison

/** @deprecated */
export const membershipV2TierCards = membershipTierSections.map((tier) => ({
  id: tier.id,
  shortName: tier.shortName,
  title: tier.title,
  tagline: tier.tagline,
  includesLabel: tier.includesLabel,
  highlights: tier.summaryPoints,
  addonLabel: tier.includesLabel ? `含下层全部权益，以及：` : undefined,
  audience: tier.audience,
  contactIntent: tier.contactIntent,
}))

/** @deprecated */
export const membershipV2Comparison = membershipV2FullComparison
