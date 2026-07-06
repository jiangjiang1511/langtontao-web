'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ComponentProps } from 'react'
import { useNavigationPendingOptional } from '@/components/navigation/navigation-pending-context'
import { warmRouteChunks } from '@/lib/route-chunk-prefetch'
import { cn } from '@/lib/utils'

type NavigationLinkProps = ComponentProps<typeof Link>

function isSameRoute(href: NavigationLinkProps['href'], pathname: string) {
  if (typeof href !== 'string') return false
  const [path] = href.split('#')
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

export function NavigationLink({
  href,
  onClick,
  onTouchStart,
  prefetch = true,
  className,
  ...props
}: NavigationLinkProps) {
  const router = useRouter()
  const pendingContext = useNavigationPendingOptional()

  const hrefString = typeof href === 'string' ? href : undefined

  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={cn(
        pendingContext?.pending && 'pointer-events-none opacity-80',
        className
      )}
      onTouchStart={(event) => {
        if (hrefString) {
          const [path] = hrefString.split('#')
          if (path) {
            router.prefetch(path)
            warmRouteChunks(path)
          }
        }
        onTouchStart?.(event)
      }}
      onClick={(event) => {
        if (
          hrefString &&
          pendingContext &&
          !event.defaultPrevented &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          event.button === 0
        ) {
          const [path] = hrefString.split('#')
          if (path && typeof window !== 'undefined') {
            const currentPath = window.location.pathname
            if (!isSameRoute(hrefString, currentPath) || hrefString.includes('#')) {
              pendingContext.setPending(true)
            }
          }
        }
        onClick?.(event)
      }}
      {...props}
    />
  )
}
