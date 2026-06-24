import fs from 'node:fs'
import path from 'node:path'
import type {
  CompoundGrowthIndex,
  CompoundGrowthIndexEntry,
  CompoundGrowthSeries,
} from '@/lib/compound-growth/types'

const dataDir = path.join(process.cwd(), 'public/data/compound-growth')

export function readCompoundGrowthIndex(): CompoundGrowthIndex {
  const filePath = path.join(dataDir, 'index.json')
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw) as CompoundGrowthIndex
}

export function readCompoundGrowthSeries(slug: string): CompoundGrowthSeries {
  const filePath = path.join(dataDir, `${slug}.json`)
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw) as CompoundGrowthSeries
}

export function readAllCompoundGrowthSeries(
  stocks: CompoundGrowthIndexEntry[]
): CompoundGrowthSeries[] {
  return stocks.map((stock) => readCompoundGrowthSeries(stock.slug))
}

export function compoundGrowthIndexExists(): boolean {
  return fs.existsSync(path.join(dataDir, 'index.json'))
}
