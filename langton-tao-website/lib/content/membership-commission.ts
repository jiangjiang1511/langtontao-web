import type { MembershipTierId } from '@/lib/content/membership'
import { tierColumnLabels } from '@/lib/content/membership-v2'

export type CommissionProductId =
  | 'member'
  | 'plus'
  | 'pro'
  | 'health-checkup'
  | 'smart-english'
  | 'board-referral'

export type CommissionRule =
  | {
      type: 'percent'
      value: number
      note?: string
    }
  | {
      type: 'fixed'
      value: number
      note?: string
    }
  | null

export type CommissionProduct = {
  id: CommissionProductId
  name: string
  category: string
  referencePrice: number
  priceLabel: string
  description: string
}

export const membershipCommissionSection = {
  eyebrow: 'Partner · 事业合伙人',
  title: '推荐渠道收益总览',
  subtitle: '占位方案 · 细则后续更新',
  lead: '以下为基于会员、Plus、Pro 与私董会四档的占位渠道收益结构。实际结算以签约协议与 CRM 系统记录为准；Pro 与私董会另享团队分润与管道收入，细则另行说明。',
  calculatorCta: '打开渠道收益计算器',
  calculatorHint: '选择你的档位与分享产品，即时估算推荐渠道收益；支持生成分享海报与二维码。',
  placeholderNote:
    '表格数值为占位示例，正式费率与阶梯奖励以朗敦道 MFO 事业合伙人协议为准。',
} as const

export const membershipCommissionPayoutModel = [
  {
    title: '直推渠道收益',
    description: '你直接推荐并成功成交，按对应产品与档位比例或固定金额结算。',
  },
  {
    title: '团队分润',
    description: 'Pro 及以上可参与团队业绩分润；私董会圈层引荐另有叠加奖励（占位）。',
  },
  {
    title: '结算节奏',
    description: '占位：成交确认后 T+15 工作日；体检与家办类产品按服务启动节点分批结算。',
  },
] as const

export const membershipCommissionProducts: CommissionProduct[] = [
  {
    id: 'member',
    name: '朗敦道 MFO 会员',
    category: '会员入会',
    referencePrice: 9800,
    priceLabel: '¥9,800 / 年（占位）',
    description: '生态入局档，适合首次推荐入会。',
  },
  {
    id: 'plus',
    name: 'MFO 会员 Plus',
    category: '会员入会',
    referencePrice: 29800,
    priceLabel: '¥29,800 / 年（占位）',
    description: '含财富大健康体检与 IP 起步陪跑。',
  },
  {
    id: 'pro',
    name: 'MFO 会员 Pro',
    category: '会员入会',
    referencePrice: 98000,
    priceLabel: '¥98,000 / 年（占位）',
    description: '家办事业合伙人档，含 CRM 与 IP 三部曲。',
  },
  {
    id: 'health-checkup',
    name: '财富大健康体检',
    category: '家办服务',
    referencePrice: 18800,
    priceLabel: '¥18,800 起（占位）',
    description: 'Plus 及以上会员包含；亦可单独转介绍。',
  },
  {
    id: 'smart-english',
    name: '智能英语 / 教育产品',
    category: '教育',
    referencePrice: 12800,
    priceLabel: '¥12,800 / 年（占位）',
    description: '英语钥匙计划、智能英语等教育产品线。',
  },
  {
    id: 'board-referral',
    name: '私董会席位引荐',
    category: '私董会',
    referencePrice: 500000,
    priceLabel: '面议（占位基准 ¥500,000）',
    description: '邀请制圈层席位引荐，Pro 与私董会可参与。',
  },
]

/** 占位渠道收益矩阵：[推荐人档位][成交产品] */
export const membershipCommissionMatrix: Record<
  MembershipTierId,
  Record<CommissionProductId, CommissionRule>
> = {
  member: {
    member: { type: 'percent', value: 0.08, note: '直推 8%' },
    plus: { type: 'percent', value: 0.06, note: '跨档 6%' },
    pro: null,
    'health-checkup': { type: 'percent', value: 0.05, note: '服务 5%' },
    'smart-english': { type: 'percent', value: 0.06, note: '教育 6%' },
    'board-referral': null,
  },
  plus: {
    member: { type: 'percent', value: 0.1, note: '直推 10%' },
    plus: { type: 'percent', value: 0.08, note: '同档 8%' },
    pro: { type: 'percent', value: 0.05, note: '跨档 5%' },
    'health-checkup': { type: 'percent', value: 0.08, note: '服务 8%' },
    'smart-english': { type: 'percent', value: 0.08, note: '教育 8%' },
    'board-referral': null,
  },
  pro: {
    member: { type: 'percent', value: 0.12, note: '直推 12%' },
    plus: { type: 'percent', value: 0.1, note: 'Plus 10%' },
    pro: { type: 'percent', value: 0.08, note: 'Pro 8%' },
    'health-checkup': { type: 'percent', value: 0.1, note: '服务 10%' },
    'smart-english': { type: 'percent', value: 0.1, note: '教育 10%' },
    'board-referral': { type: 'fixed', value: 5000, note: '引荐奖 ¥5,000' },
  },
  board: {
    member: { type: 'percent', value: 0.15, note: '直推 15%' },
    plus: { type: 'percent', value: 0.12, note: 'Plus 12%' },
    pro: { type: 'percent', value: 0.1, note: 'Pro 10%' },
    'health-checkup': { type: 'percent', value: 0.12, note: '服务 12%' },
    'smart-english': { type: 'percent', value: 0.12, note: '教育 12%' },
    'board-referral': {
      type: 'percent',
      value: 0.03,
      note: '席位 3%（占位）',
    },
  },
}

export const membershipCommissionTierOrder: MembershipTierId[] = [
  'member',
  'plus',
  'pro',
  'board',
]

export function formatCommissionRule(rule: CommissionRule): string {
  if (!rule) return '—'
  if (rule.type === 'percent') {
    return `${Math.round(rule.value * 100)}%`
  }
  return `¥${rule.value.toLocaleString('zh-CN')}`
}

export function getCommissionRuleLabel(
  tierId: MembershipTierId,
  productId: CommissionProductId
): string {
  const rule = membershipCommissionMatrix[tierId][productId]
  if (!rule) return '不适用'
  return rule.note ?? formatCommissionRule(rule)
}

export const membershipCommissionTierLabels = tierColumnLabels
