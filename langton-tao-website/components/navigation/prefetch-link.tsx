'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ComponentProps } from 'react'

type PrefetchLinkProps = ComponentProps<typeof Link>

export function PrefetchLink({
  href,
  onTouchStart,
  prefetch = true,
  ...props
}: PrefetchLinkProps) {
  const router = useRouter()
  const hrefString = typeof href === 'string' ? href : undefined

  return (
    <Link
      href={href}
      prefetch={prefetch}
      onTouchStart={(event) => {
        if (hrefString) {
          const [path] = hrefString.split('#')
          if (path) router.prefetch(path)
        }
        onTouchStart?.(event)
      }}
      {...props}
    />
  )
}
