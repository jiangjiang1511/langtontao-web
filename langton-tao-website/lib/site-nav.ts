/** 顶部导航栏（页脚左列与之保持一致） */
export const siteNav = [
  { href: '/', label: '首页' },
  { href: '/education', label: '教育' },
  { href: '/community', label: '社群' },
  { href: '/coffee', label: '熊比特咖啡' },
  { href: '/cases', label: '案例' },
  { href: '/checkup', label: '体检' },
  { href: '/faq', label: 'FAQ' },
] as const

/** 页脚右列：顶部不展示的重点页面 */
export const footerSpotlightNav = [
  { href: '/langton', label: '关于朗敦道' },
  { href: '/member', label: '会员' },
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
