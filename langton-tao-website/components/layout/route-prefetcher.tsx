'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { onCurrentHeroReady } from '@/lib/hero-ready'
import { warmOtherRouteHeroChunks } from '@/lib/route-chunk-prefetch'

const PREFETCH_ROUTES = ['/tao', '/coffee', '/member', '/faq'] as const

export function RoutePrefetcher() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let cancelled = false
    let index = 0

    const prefetchNext = () => {
      if (cancelled || index >= PREFETCH_ROUTES.length) return
      router.prefetch(PREFETCH_ROUTES[index])
      index += 1
      if (index < PREFETCH_ROUTES.length) {
        window.setTimeout(prefetchNext, 80)
      }
    }

    const start = () => {
      if (!cancelled) prefetchNext()
    }

    const schedule =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (callback: () => void) => {
            const idleId = window.requestIdleCallback(callback, { timeout: 2500 })
            return () => window.cancelIdleCallback(idleId)
          }
        : (callback: () => void) => {
            const timeoutId = window.setTimeout(callback, 1200)
            return () => window.clearTimeout(timeoutId)
          }

    const cancelSchedule = schedule(start)
    const cancelHeroReady = onCurrentHeroReady(() => {
      if (!cancelled) warmOtherRouteHeroChunks(pathname)
    })

    return () => {
      cancelled = true
      cancelSchedule()
      cancelHeroReady()
    }
  }, [pathname, router])

  return null
}
