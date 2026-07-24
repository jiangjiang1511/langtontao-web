'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { onPrefetchHeroReady } from '@/lib/hero-ready'
import { warmOtherRouteHeroChunks } from '@/lib/route-chunk-prefetch'

const PREFETCH_ROUTES = ['/', '/tao', '/coffee', '/member', '/faq'] as const
const PREFETCH_START_MS = 900
const PREFETCH_STAGGER_MS = 80

export function RoutePrefetcher() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let cancelled = false
    let index = 0
    let startTimeoutId: number | undefined
    let staggerTimeoutId: number | undefined

    const prefetchNext = () => {
      if (cancelled || index >= PREFETCH_ROUTES.length) return
      router.prefetch(PREFETCH_ROUTES[index])
      index += 1
      if (index < PREFETCH_ROUTES.length) {
        staggerTimeoutId = window.setTimeout(prefetchNext, PREFETCH_STAGGER_MS)
      }
    }

    startTimeoutId = window.setTimeout(() => {
      if (!cancelled) prefetchNext()
    }, PREFETCH_START_MS)

    const cancelHeroReady = onPrefetchHeroReady(() => {
      if (!cancelled) warmOtherRouteHeroChunks(pathname)
    })

    return () => {
      cancelled = true
      if (startTimeoutId !== undefined) window.clearTimeout(startTimeoutId)
      if (staggerTimeoutId !== undefined) window.clearTimeout(staggerTimeoutId)
      cancelHeroReady()
    }
  }, [pathname, router])

  return null
}
