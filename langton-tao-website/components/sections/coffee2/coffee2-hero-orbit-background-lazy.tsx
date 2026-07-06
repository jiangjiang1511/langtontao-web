'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Coffee2HeroOrbitPlaceholder } from '@/components/sections/coffee2/coffee2-hero-orbit-placeholder'
import { onHeroDecorReady } from '@/lib/hero-ready'

const Coffee2HeroOrbitBackground = dynamic(
  () =>
    import('@/components/sections/coffee2/coffee2-hero-orbit-background').then(
      (module) => ({ default: module.Coffee2HeroOrbitBackground })
    ),
  { ssr: false }
)

export function Coffee2HeroOrbitBackgroundLazy() {
  const [showOrbit, setShowOrbit] = useState(false)

  useEffect(() => {
    let cancelled = false

    const cancelReady = onHeroDecorReady(() => {
      if (!cancelled) setShowOrbit(true)
    })

    return () => {
      cancelled = true
      cancelReady()
    }
  }, [])

  if (!showOrbit) return <Coffee2HeroOrbitPlaceholder />

  return <Coffee2HeroOrbitBackground />
}
