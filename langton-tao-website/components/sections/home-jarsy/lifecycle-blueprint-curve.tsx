'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { buildBlueprintCurveLayers } from '@/lib/content/lifecycle-blueprint-curve'
import { cn } from '@/lib/utils'

type LifecycleBlueprintCurveProps = {
  visible: boolean
  curveActive: boolean
  strandsVisible: boolean
  className?: string
}

const CURVE_DATA = buildBlueprintCurveLayers()

export function LifecycleBlueprintCurve({
  visible,
  curveActive,
  strandsVisible,
  className,
}: LifecycleBlueprintCurveProps) {
  const mainPathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)

  useLayoutEffect(() => {
    const path = mainPathRef.current
    if (!path) return
    setPathLength(path.getTotalLength())
  }, [])

  const dashOffset = curveActive && pathLength > 0 ? 0 : pathLength
  const mainReady = pathLength > 0

  return (
    <g
      className={cn('lifecycle-blueprint__curve', className)}
      data-visible={visible ? 'true' : 'false'}
      data-curve-active={curveActive ? 'true' : 'false'}
      aria-hidden
    >
      {CURVE_DATA.layers.map((layer) => {
        if (layer.isMain) {
          return (
            <path
              key={layer.id}
              ref={mainPathRef}
              d={layer.d}
              className="lifecycle-blueprint__curve-main"
              fill="none"
              style={
                mainReady
                  ? {
                      opacity: visible ? layer.opacity : 0,
                      strokeDasharray: pathLength,
                      strokeDashoffset: dashOffset,
                    }
                  : { opacity: 0 }
              }
            />
          )
        }

        return (
          <path
            key={layer.id}
            d={layer.d}
            className="lifecycle-blueprint__curve-strand"
            fill="none"
            style={{
              opacity: visible && strandsVisible ? layer.opacity : 0,
              strokeWidth: layer.strokeWidth,
            }}
          />
        )
      })}
    </g>
  )
}

export { CURVE_DATA }
