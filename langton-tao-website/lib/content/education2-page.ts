import {
  englishJoinCta,
  readingJoinCta,
} from '@/lib/content/education-page'

export {
  englishJoinCta,
  englishPrograms,
  englishSectionMeta,
  readingJoinCta,
  readingPhilosophyIntro,
  readingSectionMeta,
} from '@/lib/content/education-page'

export { getBooksByPhase, getPhaseLabel, phaseOrder } from '@/lib/content/bookshelf'

export const education2Hero = {
  eyebrow: 'Education · 教育',
  titleLines: ['读书', '与英语'] as const,
  tagline: '打开认知的入口，推开世界的门',
  lead: '阅读是认知定投的起点；英语是思维方式与全球视野的钥匙——朗敦道教育板块的两条主线。',
  cta: { ctaLabel: '加入我们', ctaHref: '/member' },
} as const

export const education2JoinBand = {
  statement: '加入朗敦道，开启人生认知定投',
  tagline: readingJoinCta.tagline,
  ctaLabel: readingJoinCta.ctaLabel,
  ctaHref: readingJoinCta.ctaHref,
} as const

export const education2EnglishJoin = {
  statement: '推开世界的门',
  tagline: '从智能英语到海外升学——为家庭打开更大的世界。',
  ctaLabel: englishJoinCta.ctaLabel,
  ctaHref: englishJoinCta.ctaHref,
} as const
