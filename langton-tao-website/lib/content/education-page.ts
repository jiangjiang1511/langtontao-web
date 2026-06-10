export type EnglishProgramItem = {
  id: string
  title: string
  summary: string
  layout?: 'default' | 'smartEnglish'
  children?: { id: string; title: string; summary: string }[]
}

export type EnglishProgram = {
  id: 'english-key' | 'excellent-generation'
  sectionLabel: string
  planTitle: string
  planTagline: string
  items: EnglishProgramItem[]
  footnote?: string
}

export const readingSectionMeta = {
  eyebrow: 'WHAT WE READ',
  title: '读书',
  tagline: '打开认知的入口',
  helper: '悬停或点击书籍，查看朗敦道选书金句',
} as const

export const readingPhilosophyIntro = {
  title: '为什么要开启人生认知定投',
  paragraphs: [
    '在朗敦道，阅读是打开认知的入口，也是「人生第二个可能性」的起点。读书不只是求知，更是把判断练成可重复执行的纪律——朗敦道所说的「定投」，首先是认知定投，其次才是资金定投。',
    '周期会放大贪婪与恐惧；若没有诚实投资学与长期同频的陪跑，家庭容易在旧经验失效时同时失去方向感与选择权。每月围读、沙龙与具身活动，训练的是你的思考与输出，而非被动消费他人的总结。',
  ],
  ctaLabel: '加入我们',
  ctaHref: '/member',
} as const

export const readingJoinCta = {
  title: '加入我们',
  tagline: '开启人生认知定投，进入朗敦道生态与同频社群。',
  ctaLabel: '了解会员',
  ctaHref: '/member',
} as const

export const englishSectionMeta = {
  eyebrow: 'ENGLISH',
  title: '英语',
  tagline: '推开世界的门，看见更大的世界',
  lead: '英语不只是考试科目，更是思维方式与全球视野的钥匙——从语言能力到升学路径，为家庭打开更大的世界。',
} as const

export const englishPrograms: EnglishProgram[] = [
  {
    id: 'english-key',
    sectionLabel: '纯英语',
    planTitle: '英语钥匙计划',
    planTagline: '推开世界的门，看见更大的世界',
    items: [
      {
        id: 'smart-english',
        title: '智能英语',
        summary:
          '朗敦道 AI 智能英语——AI 系统 + 真人伴学，阶梯化模块与标准交付，打开世界的大门。',
        layout: 'smartEnglish',
      },
      {
        id: 'english-corner',
        title: '英语角',
        summary: '真实场景口语与同频练习，在交流中建立表达自信。',
      },
      {
        id: 'overseas-summer-camp',
        title: '海外成长夏令营',
        summary: '沉浸式语言与跨文化体验，在行走中打开世界。',
      },
    ],
  },
  {
    id: 'excellent-generation',
    sectionLabel: '海外升学',
    planTitle: '卓越世代计划',
    planTagline: '一切为了孩子，让学习回归教育的本质',
    items: [
      {
        id: 'cxo-business-school',
        title: 'CXO环球商学院',
        summary: '面向家庭与企业决策者的全球视野课程，拓展认知边界。',
      },
      {
        id: 'international-education-planning',
        title: '国际教育规划',
        summary: '从路径评估到背景提升，为家庭制定可执行的长期规划。',
      },
      {
        id: 'international-admissions',
        title: '国际升学指导',
        summary: '覆盖多地区升学路径，连接朗敦道全球教育资源网络。',
        children: [
          {
            id: 'hk-macau',
            title: '港澳升学',
            summary: '港澳高校申请与路径规划，衔接大湾区教育资源。',
          },
          {
            id: 'five-countries',
            title: '英美澳加新升学',
            summary: '覆盖英、美、澳、加、新等主要留学目的地申请指导。',
          },
          {
            id: 'hk-vtc',
            title: '香港VTC计划',
            summary: '香港职业专才教育路径，提供多元升学与就业衔接方案。',
          },
        ],
      },
    ],
  },
]

export const englishJoinCta = {
  ctaLabel: '加入我们',
  ctaHref: '/member',
} as const
