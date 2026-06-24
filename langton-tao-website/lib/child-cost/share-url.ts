import {
  defaultChildCostInput,
  type BirthMethod,
  type CareArrangement,
  type ChildCostInput,
  type ChildOrder,
  type CityTier,
  type EducationPath,
  type HealthProfile,
  type UrbanRural,
  type UpbringingStyle,
} from '@/lib/content/coffee-child-cost-page'

const CHILD_HASH = 'life-education'

function parseEnum<T extends string>(
  value: string | null,
  valid: readonly T[],
  fallback: T
): T {
  return valid.includes(value as T) ? (value as T) : fallback
}

export function buildChildCostShareUrl(input: ChildCostInput): string {
  if (typeof window === 'undefined') {
    return `/coffee?calc=child&ct=${input.cityTier}&ur=${input.urbanRural}&co=${input.childOrder}&us=${input.upbringingStyle}&ep=${input.educationPath}&bm=${input.birthMethod}&ca=${input.careArrangement}&hp=${input.healthProfile}#${CHILD_HASH}`
  }

  const url = new URL('/coffee', window.location.origin)
  url.searchParams.set('calc', 'child')
  url.searchParams.set('ct', input.cityTier)
  url.searchParams.set('ur', input.urbanRural)
  url.searchParams.set('co', input.childOrder)
  url.searchParams.set('us', input.upbringingStyle)
  url.searchParams.set('ep', input.educationPath)
  url.searchParams.set('bm', input.birthMethod)
  url.searchParams.set('ca', input.careArrangement)
  url.searchParams.set('hp', input.healthProfile)
  url.hash = CHILD_HASH
  return url.toString()
}

export function parseChildCostFromSearchParams(
  params: URLSearchParams
): ChildCostInput | null {
  if (params.get('calc') !== 'child') return null

  return {
    cityTier: parseEnum<CityTier>(
      params.get('ct'),
      ['tier1', 'tier2', 'tier3', 'tier4'],
      defaultChildCostInput.cityTier
    ),
    urbanRural: parseEnum<UrbanRural>(
      params.get('ur'),
      ['urban', 'rural'],
      defaultChildCostInput.urbanRural
    ),
    childOrder: parseEnum<ChildOrder>(
      params.get('co'),
      ['first', 'second', 'thirdPlus'],
      defaultChildCostInput.childOrder
    ),
    upbringingStyle: parseEnum<UpbringingStyle>(
      params.get('us'),
      ['necessary', 'standard', 'premium'],
      defaultChildCostInput.upbringingStyle
    ),
    educationPath: parseEnum<EducationPath>(
      params.get('ep'),
      ['public', 'private', 'international'],
      defaultChildCostInput.educationPath
    ),
    birthMethod: parseEnum<BirthMethod>(
      params.get('bm'),
      ['natural', 'assisted'],
      defaultChildCostInput.birthMethod
    ),
    careArrangement: parseEnum<CareArrangement>(
      params.get('ca'),
      ['family', 'grandparent', 'daycare', 'nanny'],
      defaultChildCostInput.careArrangement
    ),
    healthProfile: parseEnum<HealthProfile>(
      params.get('hp'),
      ['typical', 'special'],
      defaultChildCostInput.healthProfile
    ),
  }
}
