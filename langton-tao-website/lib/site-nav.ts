export type SiteNavItem = {
  href: string
  label: string
  featured?: boolean
}

/** Temporarily hide /langton and disable in-page “关于朗敦道” CTAs. */
export const aboutLangtonPageEnabled = false

/** 顶栏：熊比特 → TAO（突出）→ 朗敦道 */
export const siteNav: SiteNavItem[] = [
  { href: '/coffee', label: '熊比特咖啡' },
  { href: '/', label: 'TAO定律', featured: true },
  { href: '/langtontao', label: '朗敦道' },
]

/** 页脚左列：TAO → 朗敦道 → 熊比特（自上而下） */
export const footerSiteNav: SiteNavItem[] = [
  { href: '/', label: 'TAO定律' },
  { href: '/langtontao', label: '朗敦道' },
  { href: '/coffee', label: '熊比特咖啡' },
]

/** 页脚右列 */
export const footerSpotlightNav = [
  { href: '/faq', label: 'FAQ' },
  { href: '/member', label: '加入我们' },
] as const

export const contactIntents = [
  '成立家办',
  '加入家办',
  '了解会员',
  '会员 Plus',
  '会员 Pro',
  '私董会',
  '了解服务',
  '其他',
] as const
