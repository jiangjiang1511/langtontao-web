'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  CompoundGrowthIndexEntry,
  CompoundGrowthSeries,
} from '@/lib/compound-growth/types'

type CompoundGrowthContextValue = {
  stocks: CompoundGrowthIndexEntry[]
  allSeries: CompoundGrowthSeries[]
  disclaimer: string
  activeSlug: string | null
  activeStock: CompoundGrowthIndexEntry | null
  selectStock: (slug: string) => void
}

const CompoundGrowthContext = createContext<CompoundGrowthContextValue | null>(
  null
)

type CompoundGrowthProviderProps = {
  stocks: CompoundGrowthIndexEntry[]
  allSeries: CompoundGrowthSeries[]
  disclaimer: string
  children: ReactNode
}

export function CompoundGrowthProvider({
  stocks,
  allSeries,
  disclaimer,
  children,
}: CompoundGrowthProviderProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  const selectStock = useCallback((slug: string) => {
    setActiveSlug((current) => (current === slug ? null : slug))
  }, [])

  const activeStock = useMemo(
    () =>
      activeSlug
        ? (stocks.find((stock) => stock.slug === activeSlug) ?? null)
        : null,
    [stocks, activeSlug]
  )

  const value = useMemo(
    () => ({
      stocks,
      allSeries,
      disclaimer,
      activeSlug,
      activeStock,
      selectStock,
    }),
    [stocks, allSeries, disclaimer, activeStock, selectStock]
  )

  return (
    <CompoundGrowthContext.Provider value={value}>
      {children}
    </CompoundGrowthContext.Provider>
  )
}

export function useCompoundGrowth() {
  const context = useContext(CompoundGrowthContext)
  if (!context) {
    throw new Error('useCompoundGrowth must be used within CompoundGrowthProvider')
  }
  return context
}

export function useCompoundGrowthOptional() {
  return useContext(CompoundGrowthContext)
}
