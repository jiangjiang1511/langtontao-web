import type { CityTier } from '@/lib/content/coffee-retirement-page'

/** NDRC 36-city monthly averages (CNY/person/month), educational reference only */
export const institutionalBaseByCareLevel = {
  selfCare: 2676,
  mild: 3200,
  partial: 3900,
  disabled: 4672,
  cognitive: 5400,
} as const

export const homeLivingBaseByCareLevel = {
  selfCare: 2800,
  partial: 3200,
  disabled: 3800,
} as const

export const cityTierMultiplier: Record<CityTier, number> = {
  tier1: 1.35,
  tier2: 1.15,
  tier3: 1.0,
  tier4: 0.85,
}

export const institutionTypeMultiplier = {
  public: 0.75,
  standard: 1.0,
  premium: 1.55,
  medical: 1.35,
} as const

export const institutionalRoomAddon = {
  shared: 0,
  double: 800,
  single: 3500,
  suite: 7000,
} as const

export const medicalAddonCost = {
  none: 0,
  basic: 1200,
  full: 4500,
} as const

export const chronicDiseaseMonthlyCost = {
  no: 0,
  yes: 1600,
} as const

export const homeCaregiverCost = {
  family: 0,
  hourly: 2800,
  liveIn: 6500,
  mixed: 4200,
} as const

export const homeCareLevelCareCost = {
  selfCare: 0,
  partial: 3800,
  disabled: 7200,
} as const

export const homeRetrofitMonthly = {
  none: 0,
  basic: 500,
  heavy: 1200,
} as const

export const homeMealMonthly = {
  family: 0,
  delivery: 900,
  nutrition: 1800,
} as const

export const ltcInsuranceReductionRate = {
  none: 0,
  partial: 0.18,
  high: 0.32,
} as const

export function applyCityTier(base: number, tier: CityTier): number {
  return Math.round(base * cityTierMultiplier[tier])
}

export function applyLtcReduction(
  amount: number,
  ltc: keyof typeof ltcInsuranceReductionRate
): number {
  const rate = ltcInsuranceReductionRate[ltc]
  return Math.round(amount * (1 - rate))
}

export function computeLifetimeExposure(
  monthlyTotal: number,
  planningYears: number
): number {
  return monthlyTotal * 12 * planningYears
}

export function formatCny(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: 0,
  }).format(amount)
}
