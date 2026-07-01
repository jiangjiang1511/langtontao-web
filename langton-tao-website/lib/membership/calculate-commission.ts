import type { MembershipTierId } from '@/lib/content/membership'
import {
  membershipCommissionMatrix,
  membershipCommissionProducts,
  type CommissionProductId,
} from '@/lib/content/membership-commission'

export type CommissionCalculation = {
  eligible: boolean
  amount: number
  formattedAmount: string
  ruleLabel: string
  breakdown: string
}

export function getCommissionProduct(productId: CommissionProductId) {
  return membershipCommissionProducts.find((product) => product.id === productId)
}

export function calculateMembershipCommission(
  tierId: MembershipTierId,
  productId: CommissionProductId,
  orderAmount: number
): CommissionCalculation {
  const rule = membershipCommissionMatrix[tierId][productId]
  const product = getCommissionProduct(productId)

  if (!rule || !product) {
    return {
      eligible: false,
      amount: 0,
      formattedAmount: '¥0',
      ruleLabel: '当前档位不适用此产品',
      breakdown: '请升级档位或选择其他可分享产品。',
    }
  }

  const amount =
    rule.type === 'percent'
      ? Math.round(orderAmount * rule.value)
      : rule.value

  const formattedAmount = `¥${amount.toLocaleString('zh-CN')}`

  const breakdown =
    rule.type === 'percent'
      ? `${product.name} · 成交额 ¥${orderAmount.toLocaleString('zh-CN')} × ${rule.display ?? `${Math.round(rule.value * 100)}%`}`
      : `${product.name} · 固定推荐奖 ${formattedAmount}`

  return {
    eligible: true,
    amount,
    formattedAmount,
    ruleLabel: rule.note ?? formattedAmount,
    breakdown,
  }
}
