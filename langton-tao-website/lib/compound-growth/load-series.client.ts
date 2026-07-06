import type {
  CompoundGrowthIndex,
  CompoundGrowthIndexEntry,
  CompoundGrowthSeries,
} from '@/lib/compound-growth/types'

export async function fetchCompoundGrowthIndex(): Promise<CompoundGrowthIndex> {
  const response = await fetch('/data/compound-growth/index.json')
  if (!response.ok) {
    throw new Error('Failed to load compound growth index')
  }
  return (await response.json()) as CompoundGrowthIndex
}

export async function fetchCompoundGrowthSeries(
  slug: string
): Promise<CompoundGrowthSeries> {
  const response = await fetch(`/data/compound-growth/${slug}.json`)
  if (!response.ok) {
    throw new Error(`Failed to load compound growth series: ${slug}`)
  }
  return (await response.json()) as CompoundGrowthSeries
}

export async function fetchAllCompoundGrowthSeries(
  stocks: CompoundGrowthIndexEntry[]
): Promise<CompoundGrowthSeries[]> {
  return Promise.all(stocks.map((stock) => fetchCompoundGrowthSeries(stock.slug)))
}
