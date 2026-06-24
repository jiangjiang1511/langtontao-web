import {
  defaultHomeCareInput,
  defaultInstitutionalCareInput,
  retirementPlanningYearOptions,
  type ChronicDisease,
  type CityTier,
  type HomeCareInput,
  type HomeCareLevel,
  type HomeCaregiver,
  type HomeMeal,
  type HomeRetrofit,
  type InstitutionalCareInput,
  type InstitutionalCareLevel,
  type InstitutionalRoom,
  type InstitutionalType,
  type LtcInsurance,
  type MedicalAddon,
} from '@/lib/content/coffee-retirement-page'

export type RetirementCalculatorMode = 'home' | 'institutional'

const RETIREMENT_HASH = 'life-retirement'

export type ParsedRetirementShare = {
  mode: RetirementCalculatorMode
  homeInput: HomeCareInput
  institutionalInput: InstitutionalCareInput
}

function parseEnum<T extends string>(
  value: string | null,
  valid: readonly T[],
  fallback: T
): T {
  return valid.includes(value as T) ? (value as T) : fallback
}

function parsePlanningYears(value: string | null, fallback: number): number {
  const years = Number(value)
  return retirementPlanningYearOptions.includes(
    years as (typeof retirementPlanningYearOptions)[number]
  )
    ? years
    : fallback
}

export function buildRetirementShareUrl(
  mode: RetirementCalculatorMode,
  homeInput: HomeCareInput,
  institutionalInput: InstitutionalCareInput
): string {
  const input = mode === 'home' ? homeInput : institutionalInput

  if (typeof window === 'undefined') {
    const base = `/coffee?calc=retirement&mode=${mode}&ct=${input.cityTier}&cd=${input.chronicDisease}&ltc=${input.ltcInsurance}&py=${input.planningYears}`
    if (mode === 'home') {
      return `${base}&cl=${homeInput.careLevel}&cg=${homeInput.caregiver}&rf=${homeInput.retrofit}&ml=${homeInput.meal}#${RETIREMENT_HASH}`
    }
    return `${base}&it=${institutionalInput.institutionType}&icl=${institutionalInput.careLevel}&rm=${institutionalInput.roomType}&ma=${institutionalInput.medicalAddon}#${RETIREMENT_HASH}`
  }

  const url = new URL('/coffee', window.location.origin)
  url.searchParams.set('calc', 'retirement')
  url.searchParams.set('mode', mode)
  url.searchParams.set('ct', input.cityTier)
  url.searchParams.set('cd', input.chronicDisease)
  url.searchParams.set('ltc', input.ltcInsurance)
  url.searchParams.set('py', String(input.planningYears))

  if (mode === 'home') {
    url.searchParams.set('cl', homeInput.careLevel)
    url.searchParams.set('cg', homeInput.caregiver)
    url.searchParams.set('rf', homeInput.retrofit)
    url.searchParams.set('ml', homeInput.meal)
  } else {
    url.searchParams.set('it', institutionalInput.institutionType)
    url.searchParams.set('icl', institutionalInput.careLevel)
    url.searchParams.set('rm', institutionalInput.roomType)
    url.searchParams.set('ma', institutionalInput.medicalAddon)
  }

  url.hash = RETIREMENT_HASH
  return url.toString()
}

export function parseRetirementFromSearchParams(
  params: URLSearchParams
): ParsedRetirementShare | null {
  if (params.get('calc') !== 'retirement') return null

  const mode = parseEnum<RetirementCalculatorMode>(
    params.get('mode'),
    ['home', 'institutional'],
    'home'
  )

  const shared = {
    cityTier: parseEnum<CityTier>(
      params.get('ct'),
      ['tier1', 'tier2', 'tier3', 'tier4'],
      defaultHomeCareInput.cityTier
    ),
    chronicDisease: parseEnum<ChronicDisease>(
      params.get('cd'),
      ['no', 'yes'],
      defaultHomeCareInput.chronicDisease
    ),
    ltcInsurance: parseEnum<LtcInsurance>(
      params.get('ltc'),
      ['none', 'partial', 'high'],
      defaultHomeCareInput.ltcInsurance
    ),
    planningYears: parsePlanningYears(
      params.get('py'),
      defaultHomeCareInput.planningYears
    ),
  }

  const homeInput: HomeCareInput = {
    ...shared,
    careLevel: parseEnum<HomeCareLevel>(
      params.get('cl'),
      ['selfCare', 'partial', 'disabled'],
      defaultHomeCareInput.careLevel
    ),
    caregiver: parseEnum<HomeCaregiver>(
      params.get('cg'),
      ['family', 'hourly', 'liveIn', 'mixed'],
      defaultHomeCareInput.caregiver
    ),
    retrofit: parseEnum<HomeRetrofit>(
      params.get('rf'),
      ['none', 'basic', 'heavy'],
      defaultHomeCareInput.retrofit
    ),
    meal: parseEnum<HomeMeal>(
      params.get('ml'),
      ['family', 'delivery', 'nutrition'],
      defaultHomeCareInput.meal
    ),
  }

  const institutionalInput: InstitutionalCareInput = {
    cityTier: shared.cityTier,
    chronicDisease: shared.chronicDisease,
    ltcInsurance: shared.ltcInsurance,
    planningYears: shared.planningYears,
    institutionType: parseEnum<InstitutionalType>(
      params.get('it'),
      ['public', 'standard', 'premium', 'medical'],
      defaultInstitutionalCareInput.institutionType
    ),
    careLevel: parseEnum<InstitutionalCareLevel>(
      params.get('icl'),
      ['selfCare', 'mild', 'partial', 'disabled', 'cognitive'],
      defaultInstitutionalCareInput.careLevel
    ),
    roomType: parseEnum<InstitutionalRoom>(
      params.get('rm'),
      ['shared', 'double', 'single', 'suite'],
      defaultInstitutionalCareInput.roomType
    ),
    medicalAddon: parseEnum<MedicalAddon>(
      params.get('ma'),
      ['none', 'basic', 'full'],
      defaultInstitutionalCareInput.medicalAddon
    ),
  }

  return { mode, homeInput, institutionalInput }
}
