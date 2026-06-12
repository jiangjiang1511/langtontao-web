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
  style?: CSSProperties
  as?: ElementType
  id?: string
}

export function HomeJarsyCenterMotionItem({
  children,
  visible,
  index,
  total,
  className,
  style,
  as: Component = 'div',
  id,
}: HomeJarsyCenterMotionItemProps) {
  const motionStyle = {
    '--c2-reveal-delay': `${index * CENTER_MOTION_STAGGER_MS}ms`,
    '--c2-exit-delay': `${(total - 1 - index) * CENTER_MOTION_STAGGER_MS}ms`,
    ...style,
  } as CSSProperties

  return (
    <Component
      id={id}
      data-visible={visible ? 'true' : 'false'}
      style={motionStyle}
      className={cn('home-jarsy-center-motion', className)}
    >
      {children}
    </Component>
  )
}
