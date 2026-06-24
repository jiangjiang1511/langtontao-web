import type {
  HomeCareInput,
  RetirementCostResult,
} from '@/lib/content/coffee-retirement-page'
import {
  applyCityTier,
  applyLtcReduction,
  chronicDiseaseMonthlyCost,
  computeLifetimeExposure,
  homeCaregiverCost,
  homeCareLevelCareCost,
  homeLivingBaseByCareLevel,
  homeMealMonthly,
  homeRetrofitMonthly,
} from '@/lib/retirement/cost-benchmarks'

export function calculateHomeCareCost(
  input: HomeCareInput
): RetirementCostResult {
  const notes: string[] = []

  const livingBase = applyCityTier(
    homeLivingBaseByCareLevel[input.careLevel],
    input.cityTier
  )

  const careCost =
    input.caregiver === 'family'
      ? Math.round(homeCareLevelCareCost[input.careLevel] * 0.35)
      : applyCityTier(homeCaregiverCost[input.caregiver], input.cityTier) +
        Math.round(homeCareLevelCareCost[input.careLevel] * 0.5)

  if (input.caregiver === 'family') {
    notes.push(
      '子女/家人照护的现金支出已按较低估算；机会成本（职业中断、时间、关系压力）未计入。'
    )
  }

  const medical = applyCityTier(
    chronicDiseaseMonthlyCost[input.chronicDisease],
    input.cityTier
  )

  const retrofit = homeRetrofitMonthly[input.retrofit]
  const meal = homeMealMonthly[input.meal]

  const branchesBeforeLtc = [
    { id: 'living', label: '生活基础', amount: livingBase },
    { id: 'care', label: '照护服务', amount: careCost },
    { id: 'medical', label: '医疗用药', amount: medical },
    { id: 'retrofit', label: '适老改造摊销', amount: retrofit },
    { id: 'meal', label: '餐饮支持', amount: meal },
  ].filter((branch) => branch.amount > 0)

  const subtotal = branchesBeforeLtc.reduce((sum, b) => sum + b.amount, 0)
  const ltcReduction =
    subtotal - applyLtcReduction(subtotal, input.ltcInsurance)

  const branches = [...branchesBeforeLtc]
  if (ltcReduction > 0) {
    branches.push({
      id: 'ltc',
      label: '长护险抵扣',
      amount: -ltcReduction,
    })
    notes.push('长护险报销比例因城市与评估等级差异较大，此处为示意性扣减。')
  }

  const monthlyTotal = Math.max(
    0,
    branches.reduce((sum, b) => sum + b.amount, 0)
  )

  return {
    monthlyTotal,
    planningYears: input.planningYears,
    lifetimeExposure: computeLifetimeExposure(
      monthlyTotal,
      input.planningYears
    ),
    branches,
    notes,
  }
}
