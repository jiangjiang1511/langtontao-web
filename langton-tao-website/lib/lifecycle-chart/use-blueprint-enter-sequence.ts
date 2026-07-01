'use client'

import { useEffect, useState } from 'react'

export type BlueprintEnterPhase =
  | 'hidden'
  | 'curve'
  | 'nodes'
  | 'chrome'
  | 'disc'
  | 'done'

export const BLUEPRINT_ENTER_DELAYS = {
  curve: 0,
  curveDuration: 2600,
  nodes: 2800,
  chrome: 3600,
  disc: 4400,
  done: 4600,
} as const

export const BLUEPRINT_PHASE_RANK: Record<BlueprintEnterPhase, number> = {
  hidden: 0,
  curve: 1,
  nodes: 2,
  chrome: 3,
  disc: 4,
  done: 5,
}

export function useBlueprintEnterSequence(visible: boolean, reducedMotion: boolean) {
  const [phase, setPhase] = useState<BlueprintEnterPhase>('hidden')
  const [nodesRevealed, setNodesRevealed] = useState(false)

  const rank = BLUEPRINT_PHASE_RANK[phase]
  const curveVisible = rank >= BLUEPRINT_PHASE_RANK.curve
  const curveActive =
    reducedMotion && visible ? true : rank >= BLUEPRINT_PHASE_RANK.curve
  const curveDrawn =
    reducedMotion && visible ? true : rank >= BLUEPRINT_PHASE_RANK.nodes
  const chromeVisible = rank >= BLUEPRINT_PHASE_RANK.chrome
  const discVisible = rank >= BLUEPRINT_PHASE_RANK.disc

  useEffect(() => {
    if (!visible) {
      setPhase('hidden')
      setNodesRevealed(false)
      return
    }

    if (reducedMotion) {
      setPhase('done')
      setNodesRevealed(true)
      return
    }

    const timers: number[] = []
    const schedule = (delay: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, delay))
    }

    setPhase('hidden')
    setNodesRevealed(false)

    schedule(BLUEPRINT_ENTER_DELAYS.curve, () => setPhase('curve'))
    schedule(BLUEPRINT_ENTER_DELAYS.nodes, () => {
      setPhase('nodes')
      setNodesRevealed(true)
    })
    schedule(BLUEPRINT_ENTER_DELAYS.chrome, () => setPhase('chrome'))
    schedule(BLUEPRINT_ENTER_DELAYS.disc, () => setPhase('disc'))
    schedule(BLUEPRINT_ENTER_DELAYS.done, () => setPhase('done'))

    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [reducedMotion, visible])

  return {
    phase,
    rank,
    nodesRevealed,
    curveVisible,
    curveActive,
    curveDrawn,
    chromeVisible,
    discVisible,
  }
}
