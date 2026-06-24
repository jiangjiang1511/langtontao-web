export type CityTier = 'tier1' | 'tier2' | 'tier3' | 'tier4'
export type UrbanRural = 'urban' | 'rural'
export type ChildOrder = 'first' | 'second' | 'thirdPlus'
export type UpbringingStyle = 'necessary' | 'standard' | 'premium'
export type EducationPath = 'public' | 'private' | 'international'
export type BirthMethod = 'natural' | 'assisted'
export type CareArrangement = 'family' | 'grandparent' | 'daycare' | 'nanny'
export type HealthProfile = 'typical' | 'special'

export type ChildCostInput = {
  cityTier: CityTier
  urbanRural: UrbanRural
  childOrder: ChildOrder
  upbringingStyle: UpbringingStyle
  educationPath: EducationPath
  birthMethod: BirthMethod
  careArrangement: CareArrangement
  healthProfile: HealthProfile
}

export type ChildCostBranch = {
  id: string
  label: string
  amount: number
}

export type ChildCostResult = {
  monthlyTotal: number
  cumulativeTotal: number
  planningMonths: number
  branches: ChildCostBranch[]
  notes: string[]
  benchmarkLabel: string
  benchmarkMonthly: number
  benchmarkDeltaPct: number
}

export const childCostSectionMeta = {
  calcEyebrow: 'Interactive · 费用估算',
  calcTitle: '养一个娃到 18 岁，要花多少钱？',
  calcLead:
    '从备孕到成年，食品、教育、医疗、照护——按城市、路径与养育风格拼出你的鱼骨账单。对齐育娲人口研究 2026 基准，叠加朗敦道关注的生育与教育敞口。',
  calcHint: '教育用途估算，非投资建议或机构报价',
  calcDisclaimer:
    '基于《中国生育成本报告2026》CFPS 模型与公开行业区间建立假设；未计入父母机会成本、时间成本与 18 岁后高等教育。实际因家庭差异可能显著不同。',
  monthlyLabel: '月均分摊',
  cumulativeLabel: '累计至 18 岁',
  cumulativeSubLabel: '备孕至 17 岁 · 共 19 年',
} as const

export const cityTierOptions: readonly { id: CityTier; label: string }[] = [
  { id: 'tier1', label: '一线城市' },
  { id: 'tier2', label: '二线城市' },
  { id: 'tier3', label: '三四线城市' },
  { id: 'tier4', label: '县域/乡镇' },
]

export const urbanRuralOptions: readonly { id: UrbanRural; label: string }[] = [
  { id: 'urban', label: '城镇' },
  { id: 'rural', label: '乡村' },
]

export const childOrderOptions: readonly { id: ChildOrder; label: string }[] = [
  { id: 'first', label: '一孩' },
  { id: 'second', label: '二孩' },
  { id: 'thirdPlus', label: '三孩及以上' },
]

export const upbringingStyleOptions: readonly {
  id: UpbringingStyle
  label: string
}[] = [
  { id: 'necessary', label: '必要开支' },
  { id: 'standard', label: '标准分摊' },
  { id: 'premium', label: '富养体验' },
]

export const educationPathOptions: readonly {
  id: EducationPath
  label: string
}[] = [
  { id: 'public', label: '公办体系' },
  { id: 'private', label: '民办 + 培训' },
  { id: 'international', label: '国际 · 留学预备' },
]

export const birthMethodOptions: readonly { id: BirthMethod; label: string }[] =
  [
    { id: 'natural', label: '自然生育' },
    { id: 'assisted', label: '辅助生殖（IVF 等）' },
  ]

export const careArrangementOptions: readonly {
  id: CareArrangement
  label: string
}[] = [
  { id: 'family', label: '父母自带' },
  { id: 'grandparent', label: '长辈协助' },
  { id: 'daycare', label: '托育机构' },
  { id: 'nanny', label: '住家保姆' },
]

export const healthProfileOptions: readonly {
  id: HealthProfile
  label: string
}[] = [
  { id: 'typical', label: '常规' },
  { id: 'special', label: '需长期照护或慢病' },
]

export const defaultChildCostInput: ChildCostInput = {
  cityTier: 'tier2',
  urbanRural: 'urban',
  childOrder: 'first',
  upbringingStyle: 'standard',
  educationPath: 'public',
  birthMethod: 'natural',
  careArrangement: 'family',
  healthProfile: 'typical',
}
