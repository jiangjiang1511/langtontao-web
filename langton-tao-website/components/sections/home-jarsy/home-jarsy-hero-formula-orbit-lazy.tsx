'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { onCurrentHeroReady } from '@/lib/hero-ready'

const HomeJarsyHeroFormulaOrbit = dynamic(
  () =>
    import('@/components/sections/home-jarsy/home-jarsy-hero-formula-orbit').then(
      (module) => ({ default: module.HomeJarsyHeroFormulaOrbit })
    ),
  { ssr: false }
)

export function HomeJarsyHeroFormulaOrbitLazy() {
  const [showOrbit, setShowOrbit] = useState(false)

  useEffect(() => {
    let cancelled = false

    const cancelReady = onCurrentHeroReady(() => {
      if (!cancelled) setShowOrbit(true)
    })

    return () => {
      cancelled = true
      cancelReady()
    }
  }, [])

  if (!showOrbit) return null

  return <HomeJarsyHeroFormulaOrbit />
}
