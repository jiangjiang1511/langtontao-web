import {
  fiftyYearPageTitle,
  fiftyYearStages,
  type FiftyYearStage,
} from '@/lib/content/fifty-year-narrative'
import type { RubiksStory, StoryStep, Vec3 } from '@/lib/rubiks/types'

const GRID: Vec3 = [5, 5, 5]

function solidCube(size: number): Vec3[] {
  const start: Vec3 = [
    Math.floor((GRID[0] - size) / 2),
    Math.floor((GRID[1] - size) / 2),
    Math.floor((GRID[2] - size) / 2),
  ]
  const cells: Vec3[] = []

  for (let x = 0; x < size; x += 1) {
    for (let y = 0; y < size; y += 1) {
      for (let z = 0; z < size; z += 1) {
        cells.push([start[0] + x, start[1] + y, start[2] + z])
      }
    }
  }

  return cells
}

function hollowShell(size: number): Vec3[] {
  const all = solidCube(size)
  if (size <= 2) return all
  const inner = new Set(
    solidCube(size - 2).map((cell) => `${cell[0]},${cell[1]},${cell[2]}`)
  )
  return all.filter((cell) => !inner.has(`${cell[0]},${cell[1]},${cell[2]}`))
}

function diagonalBeam(): Vec3[] {
  const cells: Vec3[] = []
  for (let index = 0; index < GRID[0]; index += 1) {
    cells.push([index, index, index])
    if (index > 0) cells.push([index, GRID[1] - 1 - index, index])
  }
  return cells
}

function splitColumns(): Vec3[] {
  const cells: Vec3[] = []
  for (let y = 0; y < GRID[1]; y += 1) {
    for (let z = 0; z < GRID[2]; z += 1) {
      cells.push([0, y, z])
      cells.push([GRID[0] - 1, y, z])
    }
  }
  return cells
}

function floorPlate(): Vec3[] {
  const cells: Vec3[] = []
  for (let x = 0; x < GRID[0]; x += 1) {
    for (let z = 0; z < GRID[2]; z += 1) {
      cells.push([x, 0, z])
      if (x % 2 === 0 && z % 2 === 0) cells.push([x, 1, z])
    }
  }
  return cells
}

const STEP_VISUAL_PRESETS: Omit<StoryStep, 'id'>[] = [
  {
    gracePercent: 0.18,
    camera: {
      position: [8, 11, 10],
      target: [0, 1, 0],
      zoom: 0.11,
      yaw: -12,
    },
    cells: solidCube(3),
    colorStops: [
      { position: 0, color: '#f5d0fe' },
      { position: 0.45, color: '#a855f7' },
      { position: 1, color: '#111111' },
    ],
  },
  {
    gracePercent: 0.16,
    camera: {
      position: [-10, 6, 2],
      target: [0, 1, 0],
      zoom: 0.095,
      yaw: 0,
    },
    cells: hollowShell(4),
    colorStops: [
      { position: 0, color: '#dbeafe' },
      { position: 0.5, color: '#2563eb' },
      { position: 1, color: '#020617' },
    ],
  },
  {
    gracePercent: 0.14,
    camera: {
      position: [2, 14, -8],
      target: [0, 2, 0],
      zoom: 0.105,
      yaw: 8,
    },
    cells: diagonalBeam(),
    colorStops: [
      { position: 0, color: '#fef08a' },
      { position: 0.55, color: '#f97316' },
      { position: 1, color: '#1c1917' },
    ],
  },
  {
    gracePercent: 0.14,
    camera: {
      position: [0, 4, 14],
      target: [0, 2, 0],
      zoom: 0.09,
      yaw: -6,
    },
    cells: splitColumns(),
    colorStops: [
      { position: 0, color: '#bbf7d0' },
      { position: 0.5, color: '#059669' },
      { position: 1, color: '#052e16' },
    ],
  },
  {
    gracePercent: 0.12,
    camera: {
      position: [9, 8, 9],
      target: [0, 0, 0],
      zoom: 0.115,
      yaw: 0,
    },
    cells: floorPlate(),
    colorStops: [
      { position: 0, color: '#fde68a' },
      { position: 0.45, color: '#ca8a04' },
      { position: 1, color: '#09090b' },
    ],
  },
]

export type TestRubiksSection = {
  id: string
  eyebrow?: string
  periodLabel?: string
  title: string
  body: string
}

function formatStageBody(stage: FiftyYearStage): string {
  const parts: string[] = []

  if (stage.body) parts.push(stage.body)

  if (stage.keywords && stage.keywords.length > 0) {
    parts.push(stage.keywords.join(' · '))
  }

  if (stage.products && stage.products.length > 0) {
    parts.push(stage.products.map((product) => product.label).join('\n'))
  }

  if (stage.transition) {
    parts.push(`${stage.transition.heading}\n${stage.transition.body}`)
  }

  return parts.join('\n\n')
}

function buildRubiksSections(): TestRubiksSection[] {
  const heroSection: TestRubiksSection = {
    id: 'hero',
    eyebrow: '朗敦道 · Langton Tao',
    title: fiftyYearPageTitle,
    body: '',
  }

  const stageSections: TestRubiksSection[] = fiftyYearStages.map((stage) => ({
    id: stage.id,
    periodLabel: stage.periodLabel,
    title: `主题：${stage.theme}`,
    body: formatStageBody(stage),
  }))

  const ctaSection: TestRubiksSection = {
    id: 'join',
    eyebrow: 'Member',
    title: '加入我们',
    body: '进入朗敦道会员生态，与社群同频，开启人生认知定投。',
  }

  return [heroSection, ...stageSections, ctaSection]
}

function buildRubiksStory(sections: TestRubiksSection[]): RubiksStory {
  const steps: StoryStep[] = sections.map((section, index) => {
    const preset = STEP_VISUAL_PRESETS[index % STEP_VISUAL_PRESETS.length]

    return {
      id: section.id,
      ...preset,
    }
  })

  return {
    gridDimensions: GRID,
    boxSize: 1,
    steps,
  }
}

export const testRubiksSections = buildRubiksSections()
export const testRubiksStory = buildRubiksStory(testRubiksSections)
