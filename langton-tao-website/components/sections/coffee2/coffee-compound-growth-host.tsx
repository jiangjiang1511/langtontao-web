'use client'

import { Suspense, useEffect, type ReactNode } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  CompoundGrowthProvider,
  useCompoundGrowthOptional,
} from '@/components/sections/coffee2/compound-growth-provider'
import type {
  CompoundGrowthIndexEntry,
  CompoundGrowthSeries,
} from '@/lib/compound-growth/types'

type CoffeeCompoundGrowthHostProps = {
  stocks: CompoundGrowthIndexEntry[]
  allSeries: CompoundGrowthSeries[]
  disclaimer: string
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
  allSeries,
  disclaimer,
  children,
}: CoffeeCompoundGrowthHostProps) {
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
