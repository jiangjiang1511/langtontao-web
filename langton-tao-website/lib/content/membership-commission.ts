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
      /** Override table cell display (e.g. `50%+`) */
      display?: string
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
  lead: '以下为基于会员、Plus、Pro 与私董会四档的占位渠道收益结构：会员入会类按固定金额结算，其他产品仍可按比例或固定奖结算。实际结算以签约协议与 CRM 系统记录为准；Pro 与私董会另享团队分润与管道收入，细则另行说明。',
  calculatorCta: '打开渠道收益计算器',
  calculatorHint: '选择你的档位与分享产品，即时估算推荐渠道收益；支持生成分享海报与二维码。',
  placeholderNote:
    '表格数值为占位示例，正式金额与阶梯奖励以朗敦道 MFO 事业合伙人协议为准。',
} as const

export const membershipCommissionPayoutModel = [
  {
    title: '直推渠道收益',
    description:
      '你直接推荐并成功成交：会员入会类按档位与产品固定金额结算；教育、体检等其他产品按对应比例或固定奖结算。',
  },
  {
    title: '团队分润',
    description: 'Pro 及以上可参与团队业绩分润；私董会圈层引荐另有叠加奖励。',
  },
  {
    title: '结算节奏',
    description: '会员类推荐成交、课程/活动/体检与家办类业务核销后，次月10号前即可申请结算。',
  },
] as const

export const membershipCommissionProducts: CommissionProduct[] = [
  {
    id: 'member',
    name: '朗敦道 MFO 会员',
    category: '会员入会',
    referencePrice: 298,
    priceLabel: '¥298 / 年',
    description: '生态入局档，适合首次推荐入会。',
  },
  {
    id: 'plus',
    name: 'MFO 会员 Plus',
    category: '会员入会',
    referencePrice: 2980,
    priceLabel: '¥2,980 / 年',
    description: '含财富大健康体检与 IP 起步陪跑。',
  },
  {
    id: 'pro',
    name: 'MFO 会员 Pro',
    category: '会员入会',
    referencePrice: 9800,
    priceLabel: '¥9,800 / 年',
    description: '家办事业合伙人档，含 CRM 与 IP 三部曲。',
  },
  {
    id: 'health-checkup',
    name: '财富大健康体检',
    category: '家办服务',
    referencePrice: 2980,
    priceLabel: '¥2,980',
    description: 'Plus 及以上会员包含；亦可单独转介绍。',
  },
  {
    id: 'smart-english',
    name: '智能英语 / 教育产品',
    category: '教育',
    referencePrice: 5400,
    priceLabel: '¥5,400 / 30节',
    description: '英语钥匙计划、智能英语等教育产品线。',
  },
  {
    id: 'board-referral',
    name: '私董会席位引荐',
    category: '私董会',
    referencePrice: 60000,
    priceLabel: '¥60,000 起',
    description: '邀请制圈层席位引荐，Pro 与私董会可参与。',
  },
]

/** 渠道收益矩阵：[推荐人档位][成交产品] */
export const membershipCommissionMatrix: Record<
  MembershipTierId,
  Record<CommissionProductId, CommissionRule>
> = {
  member: {
    member: { type: 'fixed', value: 100, note: '分享3个同级即回本' },
    plus: { type: 'fixed', value: 500 },
    pro: { type: 'fixed', value: 1500 },
    'health-checkup': { type: 'percent', value: 0.05 },
    'smart-english': { type: 'percent', value: 0.05 },
    'board-referral': null,
  },
  plus: {
    member: { type: 'fixed', value: 150 },
    plus: { type: 'fixed', value: 1000, note: '分享3个同级即回本' },
    pro: { type: 'fixed', value: 2000 },
    'health-checkup': { type: 'percent', value: 0.12 },
    'smart-english': { type: 'percent', value: 0.12 },
    'board-referral': null,
  },
  pro: {
    member: { type: 'fixed', value: 200 },
    plus: { type: 'fixed', value: 1500 },
    pro: { type: 'fixed', value: 3000, note: '分享3个同级即回本' },
    'health-checkup': { type: 'percent', value: 0.2 },
    'smart-english': {
      type: 'percent',
      value: 0.5,
      display: '50%+',
    },
    'board-referral': { type: 'fixed', value: 5000 },
  },
  board: {
    member: { type: 'percent', value: 0.3 },
    plus: { type: 'percent', value: 0.3 },
    pro: {
      type: 'percent',
      value: 0.5,
      display: '50%+',
    },
    'health-checkup': { type: 'percent', value: 0.3 },
    'smart-english': { type: 'percent', value: 0.3 },
    'board-referral': { type: 'percent', value: 0.2 },
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
    return rule.display ?? `${Math.round(rule.value * 100)}%`
  }
  return `¥${rule.value.toLocaleString('zh-CN')}`
}

export function getCommissionRuleLabel(
  tierId: MembershipTierId,
  productId: CommissionProductId
): string {
  const rule = membershipCommissionMatrix[tierId][productId]
  if (!rule?.note) return ''
  return rule.note
}

export const membershipCommissionTierLabels = tierColumnLabels
