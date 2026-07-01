'use client'

import { HomeJarsyCenterMotionItem } from '@/components/sections/home-jarsy/home-jarsy-center-motion-item'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'

type DayOnePathFootprintProps = {
  stepIndex: number
}

export function DayOnePathFootprint({ stepIndex }: DayOnePathFootprintProps) {
  const { ref, visible } = useCenterZoneVisible<HTMLDivElement>()

  return (
    <div ref={ref}>
      <HomeJarsyCenterMotionItem
        visible={visible}
        index={0}
        total={1}
        className="day-one-path-footprint"
        aria-hidden
      >
        <span className="day-one-path-footprint__line" />
        <span className="day-one-path-footprint__node">
          {String(stepIndex + 1).padStart(2, '0')}
        </span>
        <span className="day-one-path-footprint__line" />
      </HomeJarsyCenterMotionItem>
    </div>
  )
}
