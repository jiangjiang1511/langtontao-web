'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Coffee2BackedPanel } from '@/components/sections/coffee2/coffee2-backed-panel'
import {
  Coffee2PreservationInsurerDrawer,
  type PreservationDrawerPhase,
} from '@/components/sections/coffee2/coffee2-preservation-insurer-drawer'
import { Coffee2PreservationInsurersMarquee } from '@/components/sections/coffee2/coffee2-preservation-insurers-marquee'
import {
  coffeePreservationInsurerPanelTitle,
  coffeePreservationInsurers,
  type CoffeePreservationInsurer,
} from '@/lib/content/coffee-preservation-insurers'

const DRAWER_TRANSITION_MS = 450

type Coffee2PreservationInsurerHubProps = {
  revealDelay?: number
}

export function Coffee2PreservationInsurerHub({
  revealDelay = 160,
}: Coffee2PreservationInsurerHubProps) {
  const insurers = coffeePreservationInsurers
  const [selectedInsurerId, setSelectedInsurerId] = useState<string | null>(null)
  const [displayInsurer, setDisplayInsurer] = useState<CoffeePreservationInsurer | null>(
    null
  )
  const [swapTarget, setSwapTarget] = useState<CoffeePreservationInsurer | null>(null)
  const [drawerPhase, setDrawerPhase] = useState<PreservationDrawerPhase>('closed')
  const swapTargetRef = useRef<CoffeePreservationInsurer | null>(null)
  const reduceMotionRef = useRef(false)
  const transitionGenRef = useRef(0)

  useEffect(() => {
    swapTargetRef.current = swapTarget
  }, [swapTarget])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      reduceMotionRef.current = media.matches
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const marqueeSelectedId =
    drawerPhase !== 'closed' && selectedInsurerId ? selectedInsurerId : ''

  const handleSelect = useCallback(
    (insurer: CoffeePreservationInsurer) => {
      if (
        insurer.id === selectedInsurerId &&
        (drawerPhase === 'open' || drawerPhase === 'opening')
      ) {
        return
      }

      if (drawerPhase === 'closed') {
        setDisplayInsurer(insurer)
        setSelectedInsurerId(insurer.id)
        swapTargetRef.current = null
        setSwapTarget(null)
        setDrawerPhase(reduceMotionRef.current ? 'open' : 'opening')
        return
      }

      if (drawerPhase === 'opening' && insurer.id !== selectedInsurerId) {
        swapTargetRef.current = insurer
        setSwapTarget(insurer)
        return
      }

      if (drawerPhase === 'open' && insurer.id !== selectedInsurerId) {
        swapTargetRef.current = insurer
        setSwapTarget(insurer)

        if (reduceMotionRef.current) {
          setDisplayInsurer(insurer)
          setSelectedInsurerId(insurer.id)
          setSwapTarget(null)
          setDrawerPhase('open')
          return
        }

        setDrawerPhase('closing')
      }
    },
    [drawerPhase, selectedInsurerId]
  )

  const handleDrawerTransitionEnd = useCallback((phase: PreservationDrawerPhase) => {
    if (phase === 'closing') {
      const nextInsurer = swapTargetRef.current

      if (!nextInsurer) {
        setDisplayInsurer(null)
        setSelectedInsurerId(null)
        setSwapTarget(null)
        setDrawerPhase('closed')
        return
      }

      setSwapTarget(null)
      swapTargetRef.current = null
      setDisplayInsurer(nextInsurer)
      setSelectedInsurerId(nextInsurer.id)
      setDrawerPhase('opening')
      return
    }

    if (phase === 'opening') {
      const queuedInsurer = swapTargetRef.current
      if (queuedInsurer) {
        swapTargetRef.current = null
        setSwapTarget(null)
        setDisplayInsurer(queuedInsurer)
        setSelectedInsurerId(queuedInsurer.id)
      }
      setDrawerPhase('open')
    }
  }, [])

  useEffect(() => {
    if (drawerPhase !== 'opening' && drawerPhase !== 'closing') return

    const gen = ++transitionGenRef.current
    const durationMs = reduceMotionRef.current ? 0 : DRAWER_TRANSITION_MS
    const timer = window.setTimeout(() => {
      if (transitionGenRef.current !== gen) return
      handleDrawerTransitionEnd(drawerPhase)
    }, durationMs)

    return () => window.clearTimeout(timer)
  }, [drawerPhase, handleDrawerTransitionEnd])

  if (insurers.length === 0) return null

  return (
    <Coffee2BackedPanel
      title={coffeePreservationInsurerPanelTitle}
      ariaLabelledBy="coffee2-preservation-insurer-panel-title"
      revealDelay={revealDelay}
      stackPosition="middle"
      className="coffee2-preservation-insurer-hub"
    >
      <section className="coffee2-preservation-insurer-hub__marquee" aria-label="合作保司列表">
        <Coffee2PreservationInsurersMarquee
          insurers={insurers}
          selectedId={marqueeSelectedId}
          onSelect={handleSelect}
        />
      </section>

      <Coffee2PreservationInsurerDrawer
        insurer={displayInsurer}
        phase={drawerPhase}
      />
    </Coffee2BackedPanel>
  )
}
