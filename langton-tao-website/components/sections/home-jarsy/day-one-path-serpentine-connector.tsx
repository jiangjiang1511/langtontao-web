'use client'

import { HomeJarsyCenterMotionItem } from '@/components/sections/home-jarsy/home-jarsy-center-motion-item'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import { cn } from '@/lib/utils'

type DayOnePathSerpentineConnectorProps = {
  fromAlign: 'start' | 'end'
  stepIndex: number
}

/** Narrow left column: down the right edge into the next step. */
const PATH_FROM_START = 'M 100 0 L 100 20 Q 100 40 100 40'

/** Narrow right column: down the left edge into the next step. */
const PATH_FROM_END = 'M 0 0 L 0 20 Q 0 40 0 40'

export function DayOnePathSerpentineConnector({
  fromAlign,
  stepIndex,
}: DayOnePathSerpentineConnectorProps) {
  const { ref, visible } = useCenterZoneVisible<HTMLDivElement>()
  const isFromStart = fromAlign === 'start'

  return (
    <div ref={ref}>
      <HomeJarsyCenterMotionItem
        visible={visible}
        index={0}
        total={1}
        className={cn(
          'day-one-path-serpentine-connector',
          isFromStart
            ? 'day-one-path-serpentine-connector--from-start'
            : 'day-one-path-serpentine-connector--from-end'
        )}
        aria-hidden
      >
        <svg
          className="day-one-path-serpentine-connector__svg"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          role="presentation"
        >
          <path
            className="day-one-path-serpentine-connector__path"
            d={isFromStart ? PATH_FROM_START : PATH_FROM_END}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="day-one-path-serpentine-connector__node">
          {String(stepIndex + 1).padStart(2, '0')}
        </span>
      </HomeJarsyCenterMotionItem>
    </div>
  )
}
