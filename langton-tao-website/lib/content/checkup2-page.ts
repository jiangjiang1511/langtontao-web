export {
  checkupPageMeta,
  checkupServiceCommitments,
  checkupServiceProcess,
  checkupSignup,
} from '@/lib/content/checkup-page'

export { wealthHealthCheckupItems } from '@/lib/content/membership-v2'

export const checkup2Hero = {
  eyebrow: 'Wealth Health Checkup',
  titleLines: ['财富', '大健康体检'] as const,
  lead: '从家庭财富体检出发，系统定位风险敞口、梳理保障缺口，搭建并年检专属风控体系，全年陪跑与家庭赋能。',
} as const

export const checkup2JoinBand = {
  statement: '预约财富大健康体检',
  tagline: 'Plus 及以上会员包含六项体检内容，专属家庭风险管家全程 1 对 1 服务。',
  ctaLabel: '立即报名',
  ctaHref: '/member',
} as const
