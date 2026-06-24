import type {
  InstitutionalCareInput,
  RetirementCostResult,
} from '@/lib/content/coffee-retirement-page'
import {
  applyCityTier,
  applyLtcReduction,
  chronicDiseaseMonthlyCost,
  computeLifetimeExposure,
  institutionTypeMultiplier,
  institutionalBaseByCareLevel,
  institutionalRoomAddon,
  medicalAddonCost,
} from '@/lib/retirement/cost-benchmarks'

export function calculateInstitutionalCareCost(
  input: InstitutionalCareInput
): RetirementCostResult {
  const notes: string[] = []

  const careBase = institutionalBaseByCareLevel[input.careLevel]
  const typeAdjusted = Math.round(
    careBase * institutionTypeMultiplier[input.institutionType]
  )
  const bedAndCare = applyCityTier(typeAdjusted, input.cityTier)

  const room = applyCityTier(
    institutionalRoomAddon[input.roomType],
    input.cityTier
  )

  const medical =
    applyCityTier(medicalAddonCost[input.medicalAddon], input.cityTier) +
    applyCityTier(
      chronicDiseaseMonthlyCost[input.chronicDisease],
      input.cityTier
    )

  const meal = applyCityTier(1200, input.cityTier)
  const management = Math.round(bedAndCare * 0.08)

  const branchesBeforeLtc = [
    { id: 'bed-care', label: '床位+护理', amount: bedAndCare },
    { id: 'room', label: '房型溢价', amount: room },
    { id: 'meal', label: '餐费', amount: meal },
    { id: 'medical', label: '医疗附加', amount: medical },
    { id: 'mgmt', label: '管理费', amount: management },
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
    notes.push('机构养老长护险报销范围因地而异，此处为示意性扣减。')
  }

  if (input.institutionType === 'premium') {
    notes.push('高端医养机构实际报价区间跨度大，模型取中位假设。')
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
