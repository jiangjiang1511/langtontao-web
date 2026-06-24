import { langtonBusinessLead } from '@/lib/content/langton-page'

export const langtontaoPageMeta = {
  title: '朗敦道',
  description:
    '新型联合家族办公室（MFO）——何必家办、何以为家、何为香港，为华人家族提供跨越周期的传承系统解决方案。',
} as const

export const langtontaoHero = {
  logoSrc: '/assets/langtontao/langtontao-logo.png',
  logoAlt: '朗敦道 Langton Tao',
  title: '朗敦道',
  tagline: '保全 · 增长 · 传承——穿越周期的财富架构',
  lead: langtonBusinessLead,
  cta: {
    label: '关于朗敦道',
    href: '/langton',
    description: '了解朗敦道是谁、使命与全球网络',
  },
} as const

export const langtontaoSectionNav = [
  { id: 'why-mfo', label: '何必家办' },
  { id: 'panic-wealth', label: '惊慌·财富' },
  { id: 'beautiful', label: '漂亮·业务' },
  { id: 'hong-kong', label: '香港' },
] as const

export const langtontaoJoinBand = {
  statement: '加入朗敦道，开启人生认知定投',
  tagline: '从何必家办到何为香港，找到适合你的传承系统入口。',
  ctaLabel: '加入我们',
  ctaHref: '/member',
} as const

export const langtontaoCheckupCasesIntro = {
  eyebrow: 'Checkup · Cases',
  title: '财富大健康体检 · 溪河案例',
  lead: '先年检家庭敞口与结构，再用真实案例看见问题如何被识别、拆解与修复。',
} as const
