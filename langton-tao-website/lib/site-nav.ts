export type SiteNavItem = {
  href: string
  label: string
}

/** Temporarily hide /langton and disable in-page “关于朗敦道” CTAs. */
export const aboutLangtonPageEnabled = false

/** 顶栏：朗敦道 → TAO → 熊比特 */
export const siteNav: SiteNavItem[] = [
  { href: '/', label: '朗敦道' },
  { href: '/tao', label: 'TAO定律' },
  { href: '/coffee', label: '熊比特咖啡' },
]

/** 页脚左列：朗敦道 → TAO → 熊比特（自上而下） */
export const footerSiteNav: SiteNavItem[] = [
  { href: '/', label: '朗敦道' },
  { href: '/tao', label: 'TAO定律' },
  { href: '/coffee', label: '熊比特咖啡' },
]

export function isSiteNavActive(pathname: string, href: string) {
  if (href === '/') {
    return (
      pathname === '/' ||
      pathname === '/langtontao' ||
      pathname.startsWith('/langtontao/')
    )
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

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
