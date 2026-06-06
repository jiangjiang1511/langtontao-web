'use client'

import { cn } from '@/lib/utils'

type MarqueeProps = {
  children: React.ReactNode
  className?: string
}

export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <div className="flex w-max animate-marquee gap-4 motion-reduce:animate-none">
        {children}
        {children}
      </div>
    </div>
  )
}
