import { coffeePageHero } from '@/lib/content/coffee-page'
import {
  coffeeWaterfallSections,
  type CoffeeBlock,
  type CoffeeWaterfallSection,
} from '@/lib/content/coffee'

export { coffeeNetworkHubs, coffeeNetworkMeta } from '@/lib/content/coffee-network'
export type { CoffeeBlock, CoffeeWaterfallSection } from '@/lib/content/coffee'

export type Coffee2TopicId = 'invest' | 'preservation' | 'debt' | 'legacy'

export const coffee2Topics = coffeeWaterfallSections.filter(
  (section) => section.id !== 'network'
) as Array<CoffeeWaterfallSection & { id: Coffee2TopicId }>

export const coffee2Hero = {
  eyebrow: coffeePageHero.eyebrow,
  titleLines: ['熊比特', '咖啡'] as const,
  tagline: coffeePageHero.tagline,
  lead: coffeePageHero.paragraphs[0],
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
  title: '五维议题',
  subtitle: '一杯咖啡诚实拆解',
  lead: '投资、保全、化债、传承——可在像喝咖啡一样自然的节奏里被诚实拆解；一段交谈，提前思考十年后的路。',
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

function countBlocks(blocks: CoffeeBlock[]): number {
  return blocks.reduce((total, block) => {
    switch (block.type) {
      case 'items':
      case 'insuranceIntro':
        return total + block.items.length
      case 'insurers':
        return total + block.names.length
      case 'subTopic':
      case 'highlight':
        return total + 1
      case 'placeholder':
        return total + 1
      default:
        return total
    }
  }, 0)
}

export function getCoffee2TopicCounts(): Record<Coffee2TopicId, number> {
  return coffee2Topics.reduce(
    (counts, section) => {
      counts[section.id as Coffee2TopicId] = countBlocks(section.blocks)
      return counts
    },
    {} as Record<Coffee2TopicId, number>
  )
}

export function getCoffee2TopicById(id: Coffee2TopicId) {
  return coffee2Topics.find((section) => section.id === id)
}
