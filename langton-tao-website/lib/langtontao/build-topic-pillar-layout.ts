import type { CSSProperties } from 'react'

export type TopicPillarStackLayout = {
  x: string
  y: string
  rotate: number
  scale: number
  zIndex: number
  width: string
}

export type TopicPillarScatterLayout = {
  left: string
  top: string
  rotate: number
  scale: number
  zIndex: number
  width: string
}

export type TopicPillarLayout = {
  stack: TopicPillarStackLayout
  scatter: TopicPillarScatterLayout
}

const CARD_WIDTH = 'clamp(10.5rem, 29vw, 18rem)'
const ROTATIONS = [-3, 2.5, -2, 3, -4, 2, -1.5, 2.8, -2.2] as const
const DENSE_ROTATIONS = [-1.2, 1, -0.8, 1.2, -1, 0.8, -1.1, 1.1, -0.9] as const

function stackLayout(index: number, total: number): TopicPillarStackLayout {
  const offset = (index - (total - 1) / 2) * 2.5
  return {
    x: `${offset - 1}%`,
    y: `${(index % 2 === 0 ? -1 : 1) * 1.5}%`,
    rotate: ROTATIONS[index % ROTATIONS.length],
    scale: 0.9 - (index % 4) * 0.02,
    zIndex: total - index,
    width: 'clamp(6.5rem, 15vw, 9.5rem)',
  }
}

function scatterPositions(total: number): Array<{ left: string; top: string }> {
  if (total === 2) {
    return [
      { left: '34%', top: '50%' },
      { left: '66%', top: '50%' },
    ]
  }

  if (total <= 4) {
    return [
      { left: '34%', top: '25%' },
      { left: '66%', top: '25%' },
      { left: '34%', top: '75%' },
      { left: '66%', top: '75%' },
    ].slice(0, total)
  }

  if (total === 5) {
    return [
      { left: '22%', top: '26%' },
      { left: '50%', top: '26%' },
      { left: '78%', top: '26%' },
      { left: '36%', top: '74%' },
      { left: '64%', top: '74%' },
    ]
  }

  if (total === 6) {
    const columns = [17, 50, 83]
    const rows = [25, 75]
    const positions: Array<{ left: string; top: string }> = []
    for (const top of rows) {
      for (const left of columns) {
        positions.push({ left: `${left}%`, top: `${top}%` })
      }
    }
    return positions
  }

  if (total === 9) {
    const columns = [17, 50, 83]
    const rows = [16, 50, 84]
    const positions: Array<{ left: string; top: string }> = []
    for (const top of rows) {
      for (const left of columns) {
        positions.push({ left: `${left}%`, top: `${top}%` })
      }
    }
    return positions
  }

  const cols = 3
  const rows = Math.ceil(total / cols)
  const positions: Array<{ left: string; top: string }> = []

  for (let i = 0; i < total; i += 1) {
    const col = i % cols
    const row = Math.floor(i / cols)
    const rowCount = Math.min(cols, total - row * cols)
    const padX = rowCount === cols ? 20 : rowCount === 2 ? 36 : 50
    const left =
      rowCount === 1
        ? 50
        : padX + (col / Math.max(rowCount - 1, 1)) * (100 - padX * 2)
    const top = 20 + ((row + 0.5) / rows) * 60
    positions.push({ left: `${left}%`, top: `${top}%` })
  }

  return positions
}

function scatterLayout(index: number, total: number): TopicPillarScatterLayout {
  const positions = scatterPositions(total)
  const pos = positions[index] ?? { left: '50%', top: '50%' }
  const rotations = total >= 4 ? DENSE_ROTATIONS : ROTATIONS

  return {
    left: pos.left,
    top: pos.top,
    rotate: rotations[index % rotations.length],
    scale: 1,
    zIndex: index + 1,
    width: CARD_WIDTH,
  }
}

export function buildTopicPillarLayout(index: number, total: number): TopicPillarLayout {
  return {
    stack: stackLayout(index, total),
    scatter: scatterLayout(index, total),
  }
}

export function topicPillarStyleVars(
  layout: TopicPillarLayout,
  staggerMs: number
): CSSProperties {
  return {
    '--lt-pillar-stack-x': layout.stack.x,
    '--lt-pillar-stack-y': layout.stack.y,
    '--lt-pillar-stack-rotate': `${layout.stack.rotate}deg`,
    '--lt-pillar-stack-scale': String(layout.stack.scale),
    '--lt-pillar-stack-z': String(layout.stack.zIndex),
    '--lt-pillar-stack-width': layout.stack.width,
    '--lt-pillar-scatter-left': layout.scatter.left,
    '--lt-pillar-scatter-top': layout.scatter.top,
    '--lt-pillar-scatter-rotate': `${layout.scatter.rotate}deg`,
    '--lt-pillar-scatter-scale': String(layout.scatter.scale),
    '--lt-pillar-scatter-z': String(layout.scatter.zIndex),
    '--lt-pillar-scatter-width': layout.scatter.width,
    '--lt-pillar-stagger': `${staggerMs}ms`,
  } as CSSProperties
}

export function topicPillarStageCountAttr(total: number): string {
  return String(total)
}
