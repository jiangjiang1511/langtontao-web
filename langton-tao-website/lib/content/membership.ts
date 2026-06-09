export type MembershipTierId = 'member' | 'plus' | 'pro' | 'board'

export type MembershipBenefitGroup = {
  title: string
  items: string[]
}

export type MembershipTier = {
  id: MembershipTierId
  anchor: string
  title: string
  tagline: string
  includesLabel?: string
  contactIntent: string
  benefitCount: number
  groups: MembershipBenefitGroup[]
}

export const membershipHero = {
  eyebrow: '朗敦道 MFO',
  title: '会员及私董会',
  subtitle: '生态入局——开启认知定投',
  contactIntent: '了解会员',
} as const

export const membershipCta = {
  title: '找到适合你的会员档位',
  contactIntent: '了解会员',
} as const

export const membershipTiers: MembershipTier[] = [
  {
    id: 'member',
    anchor: 'tier-member',
    title: '朗敦道MFO会员',
    tagline: '生态入局——开启认知定投',
    contactIntent: '了解会员',
    benefitCount: 4,
    groups: [
      {
        title: '身份识别的物理凭证',
        items: [
          '朗敦道MFO专属NFC勋章',
          '价值投资语录日历',
          '价值投资必读书',
        ],
      },
      {
        title: '认知定投的多元入口',
        items: [
          '闭门财商沙龙/财富夜话（会员价）',
          '财富读书会（线上）',
          '哪咤航海帆船航海（会员价）',
          '麦理浩径超级英雄之旅（1次）——24节气的具身认知定投',
        ],
      },
      {
        title: '个人叙事赋能内容库开源',
        items: ['帮你开启自己的数字资产积累'],
      },
      {
        title: '赋能活动',
        items: ['每年300+的赋能活动'],
      },
    ],
  },
  {
    id: 'plus',
    anchor: 'tier-plus',
    title: '朗敦道MFO会员 Plus',
    tagline: '财富大健康体检 + 数字资产 IP 定投',
    includesLabel: '含会员全部权益',
    contactIntent: '会员 Plus',
    benefitCount: 2,
    groups: [
      {
        title: '财富大健康体检',
        items: [
          '家庭需求/风险敞口定位：资产结构、行业特性、财富阶段不同，风险完全不同',
          '家庭已有保障梳理：以防家人不知情、理赔无头绪，风控成了一纸空文',
          '专属风控系统搭建设计：不仅懂保险，更懂高净值家庭资产结构与财富管理需求',
          '年度风控系统年检：避免家庭资产/人员结构变化后保障缺口持续出现，风控体系逐渐失效',
          '专属年度陪跑：让风控系统跟上家庭财富变化，避免「一次配置、终身脱节」，实现长效适配',
          '家庭风控知识赋能：传递专业认知，让全家都懂风控，守住家庭财富底线',
        ],
      },
      {
        title: '数字资产赋能',
        items: [
          '一对一专属IP资产梳理',
          '一个月IP梳理陪跑',
          '一条个人叙事专属定制视频',
          '开启你的个人IP数字资产定投',
        ],
      },
    ],
  },
  {
    id: 'pro',
    anchor: 'tier-pro',
    title: '朗敦道MFO会员 Pro',
    tagline: '家办事业合伙人 + CRM + IP 数字资产三部曲',
    includesLabel: '含会员 Plus 全部权益',
    contactIntent: '会员 Pro',
    benefitCount: 3,
    groups: [
      {
        title: '家办事业合伙人',
        items: ['团队共建，收益共享', '个人收益最大化', '管道收入'],
      },
      { title: 'CRM 管理系统', items: [] },
      {
        title: '数字资产赋能',
        items: [
          '完成麦理浩径十段挑战，在巅峰分享个人故事——TEDx 个人专场（全球知名品牌，跨境数字IP资产记录）',
          '一对一专属IP资产梳理，三个月IP梳理陪跑',
          '三条个人叙事专属定制视频——个人IP数字资产三部曲',
        ],
      },
    ],
  },
  {
    id: 'board',
    anchor: 'tier-board',
    title: '私董会',
    tagline: '全球权益投资共享 + 圈层共创',
    includesLabel: '含会员 Pro 全部权益',
    contactIntent: '私董会',
    benefitCount: 2,
    groups: [
      { title: '全球权益投资', items: ['全球权益投资/博弈投资配置共享'] },
      { title: '私董会圈层', items: ['私董会圈层共享，一起打开世界的大门'] },
    ],
  },
]

export const membershipTierById = Object.fromEntries(
  membershipTiers.map((tier) => [tier.id, tier])
) as Record<MembershipTierId, MembershipTier>
