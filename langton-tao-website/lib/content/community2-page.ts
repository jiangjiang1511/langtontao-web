import {
  communityJoinCtas,
  communityMembershipMeta,
  millionairePlanMeta,
  superheroJourneyIntro,
  superheroPrograms,
} from '@/lib/content/community-page'
import { langtontaoSuperheroProgramGalleries } from '@/lib/content/langtontao/langtontao-superhero-journey'

export {
  communityMembershipMeta,
  filterMillionairePlanEvents,
  getMillionairePlanCategoryCounts,
  millionairePlanFilters,
  millionairePlanMeta,
  superheroJourneyIntro,
  type MillionairePlanFilterId,
} from '@/lib/content/community-page'

export type Community2Program = {
  id: string
  anchor: string
  title: string
  subtitle: string
  description: string
  highlights: readonly string[]
  coverSrc: string
  coverAlt: string
  gallery: readonly string[]
}

const programGalleries = langtontaoSuperheroProgramGalleries

export const community2Programs: Community2Program[] = superheroPrograms.map(
  (program) => {
    const assets = programGalleries[program.id]
    return {
      id: program.id,
      anchor: program.anchor,
      title: program.title,
      subtitle: program.subtitle,
      description: program.description,
      highlights: program.highlights,
      coverSrc: assets.cover,
      coverAlt: `${program.title}活动实拍`,
      gallery: assets.gallery,
    }
  }
)

export const community2Hero = {
  eyebrow: superheroJourneyIntro.eyebrow,
  titleLines: ['超级英雄', '探索之旅'] as const,
  lead: superheroJourneyIntro.lead,
  cta: communityJoinCtas.afterHero,
} as const

export const community2Process = {
  titleLines: ['三条具身路径，', '同步认知定投'] as const,
  subtitle: '徒步、游学与航海——让身体与认知在同频社群里一起进化。',
} as const

export const community2JoinBand = {
  statement: '加入朗敦道，开启人生认知定投',
  ...communityJoinCtas.beforeMillionaire,
} as const

export const community2HowToJoin = {
  title: '如何参与社群活动',
  subtitle:
    '从具身探索到财商定投——两步进入朗敦道社群的完整参与路径。',
  steps: [
    {
      id: 'step-01',
      number: '01',
      title: '加入朗敦道会员',
      summary: '开启人生认知定投，进入完整生态与同频社群。',
      detail:
        '加入朗敦道会员，一起 all in here，努力创业，赚取人生本金。会员可参与 300+ 赋能活动、财富沙龙、线上课与读书会。',
      meta: 'member · 加入我们',
    },
    {
      id: 'step-02',
      number: '02',
      title: '选择你的路径',
      summary: '超级英雄探索之旅 × 千万富翁养成计划，双线并行。',
      detail:
        '开始超级英雄探索之旅、千万富翁养成计划。徒步麦理浩径、博睿学者游学、哪咤航海，与线上课、财富沙龙、读书会按需组合参与。',
      meta: 'superhero-journey · millionaire-plan',
    },
  ],
} as const

export const community2MembershipDetails = {
  title: '会员档位一览',
  bullets: [
    '从认知定投到财富体检与私董会圈层',
    '选择适合家族阶段的会员方案',
    '预约咨询了解详情，可随时沟通调整',
  ],
} as const

export const community2Faq = [
  {
    id: 'faq-1',
    question: '超级英雄探索之旅包含哪些项目？',
    answer:
      '目前包含麦理浩径徒步、博睿学者游学与哪咤航海三条具身路径，分别对应户外挑战、顶层认知拓展与海上远征定投。',
  },
  {
    id: 'faq-2',
    question: '千万富翁养成计划如何筛选活动？',
    answer:
      '可按「即将开始」「线上课」「财富沙龙」「读书会」四类筛选，查看活动主题、时间与参与方式。',
  },
  {
    id: 'faq-3',
    question: '如何加入朗敦道社群？',
    answer:
      '点击「加入我们」了解会员档位，预约咨询后选择适合家族阶段的方案，即可进入完整生态。',
  },
  {
    id: 'faq-4',
    question: '会员可以参与哪些社群权益？',
    answer:
      '会员可参与财富沙龙、读书会、线上课、具身探索活动等 300+ 赋能活动，并享受财富体检与圈层资源对接。',
  },
] as const

export const community2FinalCta = {
  title: '进入朗敦道社群',
  body: '与社群同频，在具身挑战与远行中开启认知定投。',
  ctaLabel: '加入我们',
  ctaHref: '/member',
} as const
