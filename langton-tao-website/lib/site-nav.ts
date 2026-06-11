export type SiteNavItem = {
  href: string
  label: string
  featured?: boolean
}

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

/** 页脚右列：在现有条目基础上增补，暂不删除 dev/备份链接 */
export const footerSpotlightNav = [
  { href: '/langton', label: '关于朗敦道' },
  { href: '/faq', label: 'FAQ' },
  { href: '/member', label: '加入我们' },
  { href: '/home-backup', label: '首页备份' },
  { href: '/test', label: 'Test' },
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
