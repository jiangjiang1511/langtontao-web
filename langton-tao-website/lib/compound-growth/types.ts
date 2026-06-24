export type CompoundGrowthCurrency = 'USD' | 'HKD' | 'CNY'

export type CompoundGrowthPoint = {
  date: string
  marketCap: number
}

export type CompoundGrowthStats = {
  startCap: number
  endCap: number
  cagr: number
  years: number
  startDate: string
  endDate: string
}

export type CompoundGrowthSeries = {
  slug: string
  ticker: string
  name: string
  nameEn: string
  market: 'US' | 'HK' | 'CN'
  currency: CompoundGrowthCurrency
  listedYear: number
  tagline: string
  accent: string
  points: CompoundGrowthPoint[]
  stats: CompoundGrowthStats
}

export type CompoundGrowthIndexEntry = {
  slug: string
  ticker: string
  name: string
  nameEn: string
  market: 'US' | 'HK' | 'CN'
  currency: CompoundGrowthCurrency
  tagline: string
  accent: string
  listedYear: number
  stats: CompoundGrowthStats
}

export type CompoundGrowthIndex = {
  generatedAt: string
  periodLabel?: string
  disclaimer: string
  stocks: CompoundGrowthIndexEntry[]
}

export async function loadCompoundGrowthIndex(): Promise<CompoundGrowthIndex> {
  const response = await fetch('/data/compound-growth/index.json', {
    cache: 'no-store',
  })
  if (!response.ok) {
    throw new Error('Failed to load compound growth index')
  }
  return response.json() as Promise<CompoundGrowthIndex>
}

export async function loadCompoundGrowthSeries(
  slug: string,
  dataVersion?: string
): Promise<CompoundGrowthSeries> {
  const versionQuery = dataVersion
    ? `?v=${encodeURIComponent(dataVersion)}`
    : ''
  const response = await fetch(
    `/data/compound-growth/${slug}.json${versionQuery}`,
    {
      cache: 'no-store',
    }
  )
  if (!response.ok) {
    throw new Error(`Failed to load compound growth series: ${slug}`)
  }
  return response.json() as Promise<CompoundGrowthSeries>
}
