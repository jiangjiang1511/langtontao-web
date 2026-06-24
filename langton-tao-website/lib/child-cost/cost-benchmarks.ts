import type {
  BirthMethod,
  CareArrangement,
  ChildOrder,
  CityTier,
  EducationPath,
  HealthProfile,
  UrbanRural,
  UpbringingStyle,
} from '@/lib/content/coffee-child-cost-page'

/** Urban monthly baseline (CNY), aligned with 育娲报告2026 城镇 3127 元/月 */
export const urbanMonthlyBaseline = 3127

/** National & urban reference values for benchmark comparison */
export const nationalMonthlyReference = 2544
export const urbanMonthlyReference = 3127

export const childCostPlanningMonths = 19 * 12

export const cityTierMultiplier: Record<CityTier, number> = {
  tier1: 1.52,
  tier2: 1.0,
  tier3: 0.88,
  tier4: 0.75,
}

export const urbanRuralMultiplier: Record<UrbanRural, number> = {
  urban: 1.0,
  rural: 0.55,
}

export const childOrderMultiplier: Record<ChildOrder, number> = {
  first: 1.0,
  second: 0.8,
  thirdPlus: 0.65,
}

export const upbringingStyleMultiplier: Record<UpbringingStyle, number> = {
  necessary: 0.68,
  standard: 1.0,
  premium: 1.35,
}

export const educationPathMultiplier: Record<EducationPath, number> = {
  public: 1.0,
  private: 1.5,
  international: 2.3,
}

export const careArrangementMultiplier: Record<CareArrangement, number> = {
  family: 1.0,
  grandparent: 0.7,
  daycare: 1.5,
  nanny: 2.5,
}

export const healthProfileMultiplier: Record<HealthProfile, number> = {
  typical: 1.0,
  special: 1.25,
}

/** Branch share of monthly baseline before option-specific adjustments */
export const branchShare = {
  birth: 0.08,
  food: 0.25,
  housing: 0.18,
  education: 0.22,
  medical: 0.12,
  care: 0.1,
  goods: 0.03,
  experience: 0.02,
} as const

/** Amortized monthly add-on for assisted reproduction (one-time ~12 万 / 228 月) */
export const assistedReproductionMonthlyAddon = 526

export function applyCityTier(base: number, tier: CityTier): number {
  return Math.round(base * cityTierMultiplier[tier])
}

export function computeCumulativeTotal(monthlyTotal: number): number {
  return monthlyTotal * childCostPlanningMonths
}

export function formatCny(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getAssistedBirthAddon(method: BirthMethod): number {
  return method === 'assisted' ? assistedReproductionMonthlyAddon : 0
}
