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
import { BELOW_HERO_IDLE_MS } from '@/lib/hero-ready'
import { cn } from '@/lib/utils'

const MOBILE_MEDIA = '(max-width: 767px)'
const DEFAULT_ROOT_MARGIN_DESKTOP = '280px 0px'
const IDLE_STAGGER_MS = 120
const IDLE_FALLBACK_MS = 1500

function getMobileLazyRootMargin() {
  return `${Math.round(window.innerHeight)}px 0px`
}

export type MountStrategy = 'immediate' | 'idle' | 'lazy'

type DeferredMountProps = {
  anchorId?: string
  minHeight?: string
  rootMargin?: string
  className?: string
  fallback?: ReactNode
  mountStrategy?: MountStrategy
  idleStaggerIndex?: number
  /** @deprecated Use mountStrategy="immediate" instead. */
  eagerOnMobile?: boolean
  children: ReactNode
}

function hashTargetsAnchor(anchorId: string) {
  if (typeof window === 'undefined') return false
  const hash = window.location.hash.replace(/^#/, '')
  if (!hash) return false
  return hash === anchorId || hash.startsWith(`${anchorId}-`)
}

function resolveMountStrategy(
  mountStrategy: MountStrategy | undefined,
  eagerOnMobile: boolean | undefined
): MountStrategy {
  if (mountStrategy) return mountStrategy
  if (eagerOnMobile === true) return 'immediate'
  return 'lazy'
}

function dispatchMountReady(anchorId: string) {
  window.dispatchEvent(
    new CustomEvent<DeferredMountReadyDetail>(DEFERRED_MOUNT_READY_EVENT, {
      detail: { anchorId },
    })
  )
}

function ImmediateDeferredMount({
  anchorId,
  className,
  children,
}: {
  anchorId?: string
  className?: string
  children: ReactNode
}) {
  useEffect(() => {
    if (!anchorId) return
    dispatchMountReady(anchorId)
  }, [anchorId])

  return (
    <DeferredMountAnchorContext.Provider value={anchorId ?? null}>
      <div
        id={anchorId}
        className={cn('deferred-mount-root scroll-mt-28', className)}
      >
        {children}
      </div>
    </DeferredMountAnchorContext.Provider>
  )
}

function DeferredLazyMount({
  anchorId,
  minHeight = '40vh',
  rootMargin,
  className,
  fallback,
  strategy,
  idleStaggerIndex = 0,
  children,
}: DeferredMountProps & { strategy: 'idle' | 'lazy' }) {
  const [forceMount, setForceMount] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [effectiveRootMargin, setEffectiveRootMargin] = useState(
    rootMargin ?? DEFAULT_ROOT_MARGIN_DESKTOP
  )
  const geometryRef = useRef<{ top: number; height: number } | null>(null)
  const pendingMountRef = useRef(false)

  useEffect(() => {
    if (rootMargin) {
      setEffectiveRootMargin(rootMargin)
      return
    }

    const media = window.matchMedia(MOBILE_MEDIA)
    const sync = () => {
      setEffectiveRootMargin(
        media.matches ? getMobileLazyRootMargin() : DEFAULT_ROOT_MARGIN_DESKTOP
      )
    }

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [rootMargin])

  const lazyEnabled = strategy === 'lazy' && !forceMount && !mounted

  const { ref, inView } = useInViewTrigger({
    enabled: lazyEnabled,
    rootMargin: effectiveRootMargin,
    threshold: 0,
  })

  const captureGeometry = () => {
    if (!ref.current) return
    geometryRef.current = {
      top: ref.current.offsetTop,
      height: ref.current.offsetHeight,
    }
  }

  const triggerMount = () => {
    if (mounted) return
    captureGeometry()
    pendingMountRef.current = true
    setMounted(true)
  }

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
    if (mounted || strategy !== 'idle') return

    let cancelled = false
    let gateTimeoutId: number | undefined
    let staggerTimeoutId: number | undefined
    let cancelIdle: (() => void) | undefined

    const mountAfterGate = () => {
      if (cancelled) return
      staggerTimeoutId = window.setTimeout(() => {
        if (!cancelled) triggerMount()
      }, idleStaggerIndex * IDLE_STAGGER_MS)
    }

    const scheduleIdle =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (callback: () => void) => {
            const idleId = window.requestIdleCallback(callback, {
              timeout: IDLE_FALLBACK_MS,
            })
            return () => window.cancelIdleCallback(idleId)
          }
        : (callback: () => void) => {
            const fallbackId = window.setTimeout(callback, IDLE_FALLBACK_MS)
            return () => window.clearTimeout(fallbackId)
          }

    gateTimeoutId = window.setTimeout(() => {
      if (cancelled) return
      cancelIdle = scheduleIdle(mountAfterGate)
    }, BELOW_HERO_IDLE_MS)

    return () => {
      cancelled = true
      if (gateTimeoutId !== undefined) window.clearTimeout(gateTimeoutId)
      if (staggerTimeoutId !== undefined) window.clearTimeout(staggerTimeoutId)
      cancelIdle?.()
    }
  }, [mounted, strategy, idleStaggerIndex])

  useEffect(() => {
    if (mounted || strategy !== 'lazy') return
    if (forceMount || inView) triggerMount()
  }, [forceMount, inView, mounted, strategy])

  useLayoutEffect(() => {
    if (!mounted || !pendingMountRef.current) return

    pendingMountRef.current = false

    if (geometryRef.current && ref.current) {
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
  }, [mounted])

  useEffect(() => {
    if (!mounted || !anchorId) return
    dispatchMountReady(anchorId)
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

export function DeferredMount(props: DeferredMountProps) {
  const strategy = resolveMountStrategy(props.mountStrategy, props.eagerOnMobile)

  if (strategy === 'immediate') {
    return (
      <ImmediateDeferredMount
        anchorId={props.anchorId}
        className={props.className}
      >
        {props.children}
      </ImmediateDeferredMount>
    )
  }

  return <DeferredLazyMount {...props} strategy={strategy} />
}
