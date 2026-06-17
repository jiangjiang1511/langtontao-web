import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import type { FiftyYearProduct } from '@/lib/content/fifty-year-narrative'
import { cn } from '@/lib/utils'

type HomeJarsyTransitionStepsProps = {
  heading: string
  items: FiftyYearProduct[]
}

const PATH_HINTS: Record<string, string> = {
  超级英雄之旅: '具身探索 · 认知定投',
  千万富翁养成计划: '社群实战 · 财富架构',
}

function TransitionPathCard({
  item,
  index,
  side,
}: {
  item: FiftyYearProduct
  index: number
  side: 'left' | 'right'
}) {
  const stepNumber = String(index + 1).padStart(2, '0')
  const hint = PATH_HINTS[item.label] ?? '点击进入下一阶段路径'
  const inner = (
    <>
      <span className="day-one-transition__path-index" aria-hidden>
        {stepNumber}
      </span>
      <span className="day-one-transition__path-label">{item.label}</span>
      <span className="day-one-transition__path-hint">{hint}</span>
      <span className="day-one-transition__path-arrow" aria-hidden>
        {side === 'left' ? '→' : '←'}
      </span>
    </>
  )

  const className = cn(
    'day-one-transition__path',
    side === 'left'
      ? 'day-one-transition__path--left'
      : 'day-one-transition__path--right'
  )

  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {inner}
      </Link>
    )
  }

  return <div className={className}>{inner}</div>
}

export function HomeJarsyTransitionSteps({
  heading,
  items,
}: HomeJarsyTransitionStepsProps) {
  const [leftItem, rightItem] = items

  return (
    <JarsyReveal delay={160} className="day-one-transition mx-auto mt-20 max-w-5xl md:mt-28">
      <div className="day-one-transition__header">
        <p className="c2-eyebrow">Next Stage</p>
        <h3 className="day-one-transition__title c2-display mt-3 text-2xl text-zinc-950 md:text-4xl">
          {heading}
        </h3>
        <p className="day-one-transition__lead mt-3 text-sm text-zinc-500 md:text-base">
          两条路径，通向第二天的起点——选一条，继续你的 TAO 旅程。
        </p>
      </div>

      {leftItem && rightItem ? (
        <div className="day-one-transition__fork">
          <TransitionPathCard item={leftItem} index={0} side="left" />
          <div className="day-one-transition__spine" aria-hidden>
            <span className="day-one-transition__spine-line" />
            <span className="day-one-transition__spine-node">或</span>
            <span className="day-one-transition__spine-line" />
          </div>
          <TransitionPathCard item={rightItem} index={1} side="right" />
        </div>
      ) : (
        <div className="day-one-transition__fork day-one-transition__fork--single">
          {items.map((item, index) => (
            <TransitionPathCard
              key={item.label}
              item={item}
              index={index}
              side={index === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      )}
    </JarsyReveal>
  )
}
