'use client'

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  DEFERRED_MOUNT_READY_EVENT,
  DeferredMountAnchorContext,
  type DeferredMountReadyDetail,
} from '@/components/shared/deferred-mount-context'
import { useInViewTrigger } from '@/hooks/use-in-view-trigger'
import { cn } from '@/lib/utils'

const MOBILE_MEDIA = '(max-width: 767px)'
const DEFAULT_ROOT_MARGIN_DESKTOP = '600px 0px'
const DEFAULT_ROOT_MARGIN_MOBILE = '240px 0px'

type DeferredMountProps = {
  anchorId?: string
  minHeight?: string
  rootMargin?: string
  className?: string
  fallback?: ReactNode
  eagerOnMobile?: boolean
  children: ReactNode
}

function hashTargetsAnchor(anchorId: string) {
  if (typeof window === 'undefined') return false
  const hash = window.location.hash.replace(/^#/, '')
  if (!hash) return false
  return hash === anchorId || hash.startsWith(`${anchorId}-`)
}

export function DeferredMount({
  anchorId,
  minHeight = '40vh',
  rootMargin,
  className,
  fallback,
  eagerOnMobile = true,
  children,
}: DeferredMountProps) {
  const [forceMount, setForceMount] = useState(false)
  const [eagerMobile, setEagerMobile] = useState(false)
  const [mounted, setMounted] = useState(() => {
    if (typeof window === 'undefined') return false
    return eagerOnMobile && window.matchMedia(MOBILE_MEDIA).matches
  })
  const [effectiveRootMargin, setEffectiveRootMargin] = useState(
    rootMargin ?? DEFAULT_ROOT_MARGIN_DESKTOP
  )
  const geometryRef = useRef<{ top: number; height: number } | null>(null)
  const pendingMountRef = useRef(false)

  useEffect(() => {
    if (!eagerOnMobile) return

    const media = window.matchMedia(MOBILE_MEDIA)
    const sync = () => setEagerMobile(media.matches)

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [eagerOnMobile])

  useEffect(() => {
    if (rootMargin) {
      setEffectiveRootMargin(rootMargin)
      return
    }

    const media = window.matchMedia(MOBILE_MEDIA)
    const sync = () => {
      setEffectiveRootMargin(
        media.matches ? DEFAULT_ROOT_MARGIN_MOBILE : DEFAULT_ROOT_MARGIN_DESKTOP
      )
    }

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [rootMargin])

  const shouldEagerMount = eagerOnMobile && eagerMobile
  const lazyEnabled = !forceMount && !shouldEagerMount && !mounted

  const { ref, inView } = useInViewTrigger({
    enabled: lazyEnabled,
    rootMargin: effectiveRootMargin,
    threshold: 0,
  })

  useEffect(() => {
    if (!anchorId) return

    const syncHash = () => {
      if (hashTargetsAnchor(anchorId)) {
        setForceMount(true)
      }
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [anchorId])

  useEffect(() => {
    if (mounted) return
    if (!(forceMount || inView || shouldEagerMount)) return

    if (!shouldEagerMount && ref.current) {
      geometryRef.current = {
        top: ref.current.offsetTop,
        height: ref.current.offsetHeight,
      }
    }

    pendingMountRef.current = true
    setMounted(true)
  }, [forceMount, inView, shouldEagerMount, mounted])

  useLayoutEffect(() => {
    if (!mounted || !pendingMountRef.current) return

    pendingMountRef.current = false

    if (!shouldEagerMount && geometryRef.current && ref.current) {
      const { top, height: oldHeight } = geometryRef.current
      const newHeight = ref.current.offsetHeight
      const delta = newHeight - oldHeight

      if (delta > 0 && top < window.scrollY) {
        window.scrollTo({
          top: window.scrollY + delta,
          behavior: 'instant' as ScrollBehavior,
        })
      }

      geometryRef.current = null
    }
  }, [mounted, shouldEagerMount])

  useEffect(() => {
    if (!mounted || !anchorId) return

    window.dispatchEvent(
      new CustomEvent<DeferredMountReadyDetail>(DEFERRED_MOUNT_READY_EVENT, {
        detail: { anchorId },
      })
    )
  }, [mounted, anchorId])

  if (!mounted) {
    return (
      <div
        ref={ref}
        id={anchorId}
        className={cn('deferred-mount-placeholder', className)}
        style={{ minHeight }}
        aria-hidden
      >
        {fallback ?? (
          <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="deferred-mount-skeleton h-full min-h-[inherit] rounded-2xl border border-zinc-100 bg-zinc-50/80" />
          </div>
        )}
      </div>
    )
  }

  return (
    <DeferredMountAnchorContext.Provider value={anchorId ?? null}>
      <div
        ref={ref}
        id={anchorId}
        className={cn('deferred-mount-root scroll-mt-28', className)}
      >
        {children}
      </div>
    </DeferredMountAnchorContext.Provider>
  )
}
