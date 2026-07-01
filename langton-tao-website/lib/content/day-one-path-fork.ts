import type { FiftyYearProduct } from '@/lib/content/fifty-year-narrative'

export type DayOnePathForkSide = 'left' | 'right'
export type DayOnePathForkArrowDirection = 'left' | 'right'

export type DayOnePathForkVisual = {
  imageSrc?: string
  hint: string
  side: DayOnePathForkSide
  arrowDirection: DayOnePathForkArrowDirection
}

const DAY_ONE_PATH_FORK_VISUALS: Record<string, DayOnePathForkVisual> = {
  超级英雄之旅: {
    imageSrc: '/assets/100years/2paths/superhero.jpg',
    hint: '具身探索 · 认知定投',
    side: 'right',
    arrowDirection: 'right',
  },
  千万富翁养成计划: {
    imageSrc: '/assets/100years/2paths/millionaire-incubation.jpg',
    hint: '社群实战 · 财富架构',
    side: 'left',
    arrowDirection: 'left',
  },
}

export type DayOnePathForkRoad = {
  href?: string
  label: string
  index: string
  hint: string
  side: DayOnePathForkSide
  arrowDirection: DayOnePathForkArrowDirection
  imageSrc?: string
}

export function getDayOnePathForkMeta(
  item: FiftyYearProduct,
  index: number
): DayOnePathForkRoad {
  const visual = DAY_ONE_PATH_FORK_VISUALS[item.label]
  const side: DayOnePathForkSide =
    visual?.side ?? (index === 0 ? 'left' : 'right')
  const arrowDirection: DayOnePathForkArrowDirection =
    visual?.arrowDirection ?? (side === 'left' ? 'left' : 'right')

  return {
    href: item.href,
    label: item.label,
    index: String(index + 1).padStart(2, '0'),
    hint: visual?.hint ?? '点击进入下一阶段路径',
    side,
    arrowDirection,
    imageSrc: visual?.imageSrc,
  }
}
