'use client'

import { Suspense, useEffect, useState, type ReactNode } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  CompoundGrowthProvider,
  useCompoundGrowthOptional,
} from '@/components/sections/coffee2/compound-growth-provider'
import { fetchAllCompoundGrowthSeries } from '@/lib/compound-growth/load-series.client'
import type {
  CompoundGrowthIndexEntry,
  CompoundGrowthSeries,
} from '@/lib/compound-growth/types'

type CoffeeCompoundGrowthHostProps = {
  stocks: CompoundGrowthIndexEntry[]
  allSeries?: CompoundGrowthSeries[]
  disclaimer: string
  deferSeriesLoad?: boolean
  children: ReactNode
}

function CompoundGrowthDeepLinkSync() {
  const context = useCompoundGrowthOptional()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    if (!context) return
    const slug = searchParams.get('compound')
    if (!slug) return

    const exists = context.stocks.some((stock) => stock.slug === slug)
    if (exists) {
      context.selectStock(slug)
      if (typeof window !== 'undefined') {
        const targetHash = pathname === '/tao' ? 'day-2' : 'invest'
        if (!window.location.hash.includes(targetHash)) {
          window.location.hash = targetHash
        }
      }
      const hash = typeof window !== 'undefined' ? window.location.hash : ''
      window.history.replaceState(null, '', `${pathname}${hash}`)
    }
  }, [context, pathname, searchParams])

  return null
}

export function CoffeeCompoundGrowthHost({
  stocks,
  allSeries: initialAllSeries = [],
  disclaimer,
  deferSeriesLoad = false,
  children,
}: CoffeeCompoundGrowthHostProps) {
  const [allSeries, setAllSeries] = useState(initialAllSeries)

  useEffect(() => {
    if (!deferSeriesLoad || stocks.length === 0 || allSeries.length > 0) return

    let cancelled = false

    const loadSeries = () => {
      void fetchAllCompoundGrowthSeries(stocks)
        .then((series) => {
          if (!cancelled) setAllSeries(series)
        })
        .catch(() => {
          // Provider still renders; compound panels show their existing fallback copy.
        })
    }

    const cancelSchedule =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (callback: () => void) => {
            const idleId = window.requestIdleCallback(callback, { timeout: 2000 })
            return () => window.cancelIdleCallback(idleId)
          }
        : (callback: () => void) => {
            const timeoutId = window.setTimeout(callback, 1500)
            return () => window.clearTimeout(timeoutId)
          }

    const cancelIdle = cancelSchedule(loadSeries)
    return () => {
      cancelled = true
      cancelIdle()
    }
  }, [allSeries.length, deferSeriesLoad, stocks])

  if (stocks.length === 0) {
    return <>{children}</>
  }

  return (
    <CompoundGrowthProvider
      stocks={stocks}
      allSeries={allSeries}
      disclaimer={disclaimer}
    >
      <Suspense fallback={null}>
        <CompoundGrowthDeepLinkSync />
      </Suspense>
      {children}
    </CompoundGrowthProvider>
  )
}
