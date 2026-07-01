'use client'

import { useEffect, useState } from 'react'
import { LIFECYCLE_ENTER_DELAYS } from '@/lib/lifecycle-chart/constants'
import type { EnterPhase } from '@/lib/lifecycle-chart/types'

export function useEnterSequence(visible: boolean, reducedMotion: boolean) {
  const [enterPhase, setEnterPhase] = useState<EnterPhase>('hidden')
  const [nodesRevealed, setNodesRevealed] = useState(false)
  const [legendVisible, setLegendVisible] = useState(false)

  useEffect(() => {
    if (!visible) {
      setEnterPhase('hidden')
      setNodesRevealed(false)
      setLegendVisible(false)
      return
    }

    if (reducedMotion) {
      setEnterPhase('done')
      setNodesRevealed(true)
      setLegendVisible(true)
      return
    }

    const timers: number[] = []
    const schedule = (delay: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, delay))
    }

    setEnterPhase('hidden')
    setNodesRevealed(false)
    setLegendVisible(false)

    schedule(LIFECYCLE_ENTER_DELAYS.zones, () => setEnterPhase('zones'))
    schedule(LIFECYCLE_ENTER_DELAYS.frame, () => setEnterPhase('frame'))
    schedule(LIFECYCLE_ENTER_DELAYS.chrome, () => setEnterPhase('chrome'))
    schedule(LIFECYCLE_ENTER_DELAYS.traps, () => setEnterPhase('traps'))
    schedule(LIFECYCLE_ENTER_DELAYS.curve, () => setEnterPhase('curve'))
    schedule(
      LIFECYCLE_ENTER_DELAYS.curve + LIFECYCLE_ENTER_DELAYS.curveDuration,
      () => {
        setEnterPhase('nodes')
        setNodesRevealed(true)
      }
    )
    schedule(
      LIFECYCLE_ENTER_DELAYS.curve +
        LIFECYCLE_ENTER_DELAYS.curveDuration +
        LIFECYCLE_ENTER_DELAYS.legend,
      () => {
        setEnterPhase('done')
        setLegendVisible(true)
      }
    )

    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [reducedMotion, visible])

  return { enterPhase, nodesRevealed, legendVisible }
}
