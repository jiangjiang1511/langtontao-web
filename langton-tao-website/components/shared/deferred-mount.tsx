'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useInViewTrigger } from '@/hooks/use-in-view-trigger'
import { cn } from '@/lib/utils'

type DeferredMountProps = {
  anchorId?: string
  minHeight?: string
  rootMargin?: string
  className?: string
  fallback?: ReactNode
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
  rootMargin = '600px 0px',
  className,
  fallback,
  children,
}: DeferredMountProps) {
  const [forceMount, setForceMount] = useState(false)
  const { ref, inView } = useInViewTrigger({
    enabled: !forceMount,
    rootMargin,
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

  const shouldMount = forceMount || inView

  if (!shouldMount) {
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

  return <div ref={ref} className={className}>{children}</div>
}
