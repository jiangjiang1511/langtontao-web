'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export const BRIDGE_COLLAGE_SRC =
  '/assets/100years/century-bridge/bridge-collage-source.png'

const COLLAGE_SLICES = [
  {
    id: 'pop-art',
    position: '0%',
    rotate: -3.2,
    offsetX: -6,
    offsetY: 10,
    delayMs: 0,
    z: 1,
  },
  {
    id: 'op-art',
    position: '33.333%',
    rotate: 2.4,
    offsetX: 4,
    offsetY: -8,
    delayMs: 180,
    z: 2,
  },
  {
    id: 'expressionist',
    position: '66.666%',
    rotate: -1.6,
    offsetX: -3,
    offsetY: 6,
    delayMs: 360,
    z: 3,
  },
  {
    id: 'pop-culture',
    position: '100%',
    rotate: 2.8,
    offsetX: 5,
    offsetY: -5,
    delayMs: 540,
    z: 4,
  },
] as const

const WAVE_CURVES = [
  {
    id: 'wave-a',
    d: 'M -50 115 C 25 70, 75 160, 125 115 S 225 70, 275 115 S 375 160, 425 115 S 525 70, 575 115 S 675 160, 725 115 S 825 70, 875 115 S 975 160, 1050 115',
    strokeWidth: 2.5,
    durationMs: 2200,
    delayMs: 80,
    opacity: 0.55,
  },
  {
    id: 'wave-b',
    d: 'M -70 132 C 0 62, 65 202, 130 132 S 260 62, 325 132 S 455 202, 520 132 S 650 62, 715 132 S 845 202, 910 132 S 1040 62, 1060 132',
    strokeWidth: 4,
    durationMs: 2600,
    delayMs: 0,
    opacity: 0.85,
  },
  {
    id: 'wave-c',
    d: 'M -40 98 C 20 58, 55 138, 85 98 S 155 58, 185 98 S 255 138, 285 98 S 355 58, 385 98 S 455 138, 485 98 S 555 58, 585 98 S 655 138, 685 98 S 755 58, 785 98 S 855 138, 885 98 S 955 58, 1040 98',
    strokeWidth: 1.5,
    durationMs: 1900,
    delayMs: 160,
    opacity: 0.4,
  },
  {
    id: 'wave-d',
    d: 'M -55 148 C 35 88, 95 208, 155 148 S 285 88, 345 148 S 475 208, 535 148 S 665 88, 725 148 S 855 208, 915 148 S 1045 88, 1065 148',
    strokeWidth: 3,
    durationMs: 2400,
    delayMs: 40,
    opacity: 0.65,
  },
  {
    id: 'wave-e',
    d: 'M -20 122 C 55 72, 105 172, 155 122 S 285 72, 335 122 S 465 172, 515 122 S 645 72, 695 122 S 825 172, 875 122 S 1005 72, 1040 122',
    strokeWidth: 2,
    durationMs: 2100,
    delayMs: 120,
    opacity: 0.5,
  },
  {
    id: 'wave-f-accent',
    d: 'M -48 106 C 22 72, 72 140, 122 106 S 222 72, 272 106 S 372 140, 422 106 S 522 72, 572 106 S 672 140, 722 106 S 822 72, 872 106 S 972 140, 1048 106',
    strokeWidth: 0.85,
    durationMs: 2800,
    delayMs: 200,
    opacity: 0.92,
    accent: true,
  },
  {
    id: 'wave-g-accent',
    d: 'M -65 140 C 10 108, 60 172, 110 140 S 210 108, 260 140 S 360 172, 410 140 S 510 108, 560 140 S 660 172, 710 140 S 810 108, 860 140 S 960 172, 1055 140',
    strokeWidth: 0.65,
    durationMs: 3000,
    delayMs: 320,
    opacity: 0.78,
    accent: true,
  },
] as const

type CenturyBridgeCollageMotionProps = {
  className?: string
}

export function CenturyBridgeCollageMotion({
  className,
}: CenturyBridgeCollageMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (media.matches) {
      hasPlayedRef.current = true
      setActive(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasPlayedRef.current) {
          hasPlayedRef.current = true
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn('century-bridge-motion', className)}
      data-visible={active ? 'true' : 'false'}
      aria-hidden
    >
      <svg
        className="century-bridge-motion__curves"
        viewBox="0 0 1000 220"
        preserveAspectRatio="none"
        aria-hidden
      >
        {WAVE_CURVES.map((curve) => (
          <path
            key={curve.id}
            className={cn(
              'century-bridge-motion__curve',
              'accent' in curve && curve.accent && 'century-bridge-motion__curve--accent'
            )}
            d={curve.d}
            fill="none"
            stroke="currentColor"
            strokeWidth={curve.strokeWidth}
            strokeLinecap="round"
            pathLength={1}
            style={
              {
                '--curve-delay': `${curve.delayMs}ms`,
                '--curve-duration': `${curve.durationMs}ms`,
                '--curve-opacity': curve.opacity,
              } as CSSProperties
            }
          />
        ))}
      </svg>

      <div className="century-bridge-motion__track">
        {COLLAGE_SLICES.map((slice, index) => (
          <div
            key={slice.id}
            className="century-bridge-motion__slice"
            style={
              {
                '--slice-bg': `url(${BRIDGE_COLLAGE_SRC})`,
                '--slice-position': slice.position,
                '--slice-rotate': `${slice.rotate}deg`,
                '--slice-offset-x': `${slice.offsetX}px`,
                '--slice-offset-y': `${slice.offsetY}px`,
                '--slice-delay': `${slice.delayMs}ms`,
                '--slice-z': slice.z,
                zIndex: slice.z,
              } as CSSProperties
            }
            data-slice-index={index}
          />
        ))}
      </div>
    </div>
  )
}
