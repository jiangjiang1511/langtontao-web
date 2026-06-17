import { coffeePageHero } from '@/lib/content/coffee-page'
import type { Coffee2GlossarySegment } from '@/lib/content/coffee-glossary'
import type { Coffee2LifeEventId } from '@/lib/content/coffee-manifesto'
import {
  coffeeWaterfallSections,
  type CoffeeWaterfallSection,
} from '@/lib/content/coffee'

export { coffeeNetworkHubs, coffeeNetworkMeta } from '@/lib/content/coffee-network'
export type { CoffeeBlock, CoffeeWaterfallSection } from '@/lib/content/coffee'

export type Coffee2TopicId = 'invest' | 'preservation' | 'debt' | 'legacy'

export const coffee2LifeEventTopicIds: Partial<
  Record<Coffee2LifeEventId, readonly Coffee2TopicId[]>
> = {
  'life-living': ['invest', 'preservation', 'debt'],
  'life-legacy': ['legacy'],
}

export const coffee2Topics = coffeeWaterfallSections.filter(
  (section) => section.id !== 'network'
) as Array<CoffeeWaterfallSection & { id: Coffee2TopicId }>

export const coffee2Hero = {
  logoSrc: '/assets/bearbit-coffee-logo.png',
  logoAlt: '熊比特咖啡 Schumpeter Coffee',
  titleLine1: '一杯咖啡',
  titleLine2: '聊聊人生大事',
  lead: [
    { type: 'term', id: 'bearbit' },
    {
      type: 'text',
      value:
        '与朗敦道在同一件事上相遇：相信一杯咖啡、一段诚实对话，比任何预设答案更接近真实判断。如果你也在想周期、家庭与人生大事，欢迎来坐一会儿——带上你的问题，也听听不同的版本。',
    },
  ] satisfies readonly Coffee2GlossarySegment[],
  cta: {
    ctaLabel: '加入我们',
    ctaHref: '/member',
  },
} as const

export const coffee2Philosophy = {
  paragraphs: coffeePageHero.paragraphs,
} as const

export const coffee2TopicsMeta = {
  eyebrow: 'Coffee Chat · Topics',
  title: '四件事',
  subtitle: '在周期共识之上诚实拆解',
  lead: '投资、保全、化债、传承——在康波与朱格拉的坐标系里，用 Coffee Chat 把四件事讲清楚，提前思考十年后的路。',
} as const

export const coffee2EventsMeta = {
  eyebrow: 'WHAT WE DO',
  title: '活动',
  tagline: '具身认知定投',
  lead: '读书为活着、养老、教育、婚姻、传承五件人生大事搭好共通语言，活动把它带回真实场域——线上课、财富沙龙、教育沙龙与读书会，让家人与社群在关系里把判断说到底、把议题练成共同体技艺。',
  moreEventsLabel: '更多活动',
  moreEventsHref: 'https://wxaurl.cn/WUntmc7J4at',
} as const

export const coffee2JoinBand = {
  statement: '加入朗敦道，开启人生认知定投',
  tagline: '与社群同频，在 Coffee Chat 中交换观点与心得。',
  ctaLabel: '加入我们',
  ctaHref: '/member',
} as const

export const coffee2TopicMeta: Record<
  Coffee2TopicId,
  { number: string; summary: string }
> = {
  invest: {
    number: '01',
    summary: '房屋置换与私募量化——在咖啡桌上拆解资产配置与量化路径。',
  },
  preservation: {
    number: '02',
    summary: '从理解保险到选择保司——保全议题的系统化入口与合作伙伴网络。',
  },
  debt: {
    number: '03',
    summary: '化债方案与家族现金流——在诚实对话中梳理债务结构与修复路径。',
  },
  legacy: {
    number: '04',
    summary: '税务 CRS 与身份规划——传承周期的关键子题，与生态伙伴协同交付。',
  },
}

export function getCoffee2TopicById(id: Coffee2TopicId) {
  return coffee2Topics.find((section) => section.id === id)
}
