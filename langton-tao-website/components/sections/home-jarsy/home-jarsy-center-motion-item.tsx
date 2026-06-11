'use client'

import type { CSSProperties, ElementType, ReactNode } from 'react'
import { CENTER_MOTION_STAGGER_MS } from '@/components/sections/home-jarsy/use-center-zone-visible'
import { cn } from '@/lib/utils'

type HomeJarsyCenterMotionItemProps = {
  children: ReactNode
  visible: boolean
  index: number
  total: number
  className?: string
  as?: ElementType
  id?: string
}

export function HomeJarsyCenterMotionItem({
  children,
  visible,
  index,
  total,
  className,
  as: Component = 'div',
  id,
}: HomeJarsyCenterMotionItemProps) {
  const style = {
    '--c2-reveal-delay': `${index * CENTER_MOTION_STAGGER_MS}ms`,
    '--c2-exit-delay': `${(total - 1 - index) * CENTER_MOTION_STAGGER_MS}ms`,
  } as CSSProperties

  return (
    <Component
      id={id}
      data-visible={visible ? 'true' : 'false'}
      style={style}
      className={cn('home-jarsy-center-motion', className)}
    >
      {children}
    </Component>
  )
}
