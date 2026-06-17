import { fiftyYearPageTitle } from '@/lib/content/fifty-year-narrative'

export const homeJarsyHero = {
  eyebrow: '朗敦道 · LangtonTAO',
  title: 'TAO定律',
  subtitle: '从人生第一天到家族一百年',
  lead: '如果把人生分为第一天，第二天，第三天，TAO定律想和你聊聊穿越周期，看见关系，开启具身认知，拥抱物理AI的新时代，去探索生命的英雄旅程。',
  formula: {
    result: '人生财富',
    terms: ['周期韧性', '关系深度'] as const,
    multiplier: '具身认知',
  },
  cta: {
    primaryLabel: '加入我们',
    primaryHref: '/member',
  },
} as const

export const homeJarsyJoinBand = {
  statement: '加入朗敦道，开启人生认知定投',
  tagline: '与社群同频，在 TAO 路径上完成认知定投与财富架构。',
  ctaLabel: '加入我们',
  ctaHref: '/member',
} as const

export { fiftyYearPageTitle }
