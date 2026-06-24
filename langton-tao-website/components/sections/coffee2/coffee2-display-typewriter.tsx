'use client'

import { Coffee2TypewriterReveal } from '@/components/sections/coffee2/coffee2-typewriter-reveal'
import { cn } from '@/lib/utils'

type Coffee2DisplayTypewriterProps = {
  text: string
  className?: string
  baseDelay?: number
  charStagger?: number
  showCursor?: boolean
}

export function Coffee2DisplayTypewriter({
  text,
  className,
  baseDelay = 0,
  charStagger = 100,
  showCursor = false,
}: Coffee2DisplayTypewriterProps) {
  return (
    <Coffee2TypewriterReveal
      text={text}
      baseDelay={baseDelay}
      charStagger={charStagger}
      showCursor={showCursor}
      className={cn('coffee2-section-title-typewriter', className)}
    />
  )
}
