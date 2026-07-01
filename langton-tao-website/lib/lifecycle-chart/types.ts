export type LifecycleSelection =
  | { type: 'stage'; id: string }
  | { type: 'trap'; id: string }
  | { type: 'zone'; id: string }

export type EnterPhase =
  | 'hidden'
  | 'zones'
  | 'frame'
  | 'chrome'
  | 'traps'
  | 'curve'
  | 'nodes'
  | 'done'

export const ENTER_PHASE_RANK: Record<EnterPhase, number> = {
  hidden: 0,
  zones: 1,
  frame: 2,
  chrome: 3,
  traps: 4,
  curve: 5,
  nodes: 6,
  done: 7,
}
