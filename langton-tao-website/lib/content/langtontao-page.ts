import { langtontaoMajorSections } from '@/lib/content/langtontao/langtontao-major-sections'

export const langtontaoPageMeta = {
  title: '朗敦道',
  description:
    '新型联合家族办公室（MFO）——何以为家、超级英雄之旅、财富健康体检、一体双跨，为华人家族提供跨越周期的传承系统解决方案。',
} as const

export const langtontaoHero = {
  logoSrc: '/assets/langtontao/langtontao-logo.png',
  logoAlt: '朗敦道 Langton Tao',
  title: '朗敦道',
  tagline: '一切为了孩子——穿越周期的财富架构',
  lead:
    '为第二代华人财富传承提供系统解决方案的，集结投资人、法税专家与战略先行者的新型联合家族办公室（MFO）。朗敦道不是通往财富的街，而是陪你提前思考十年后的路。',
  cta: {
    label: '关于朗敦道',
    href: '/langton',
    description: '了解朗敦道是谁、使命与全球网络',
  },
} as const

export const langtontaoSectionNav = langtontaoMajorSections.map((section) => ({
  id: section.id,
  label: section.title,
}))

export const langtontaoJoinBand = {
  statement: '加入朗敦道，开启人生认知定投',
  tagline: '从何以为家到一体双跨，找到适合你的传承系统入口。',
  ctaLabel: '加入我们',
  ctaHref: '/member',
} as const

export const langtontaoCheckupCasesIntro = {
  eyebrow: 'Checkup · Cases',
  title: '财富大健康体检 · 脱敏案例',
  lead: '先年检家庭敞口与结构，再用真实案例看见问题如何被识别、拆解与修复。',
} as const
