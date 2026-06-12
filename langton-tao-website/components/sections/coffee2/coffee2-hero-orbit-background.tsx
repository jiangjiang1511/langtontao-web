import Image from 'next/image'
import type { ReactNode } from 'react'
import {
  COFFEE2_HERO_ORBIT,
  coffee2HeroOrbitRings,
  type OrbitRingDecoration,
} from '@/lib/content/coffee2-hero-orbit'

const { center, viewBoxSize } = COFFEE2_HERO_ORBIT

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  }
}

function RingTicks({
  radius,
  count,
  tickLen = 3.5,
  accentEvery,
}: {
  radius: number
  count: number
  tickLen?: number
  accentEvery?: number
}) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => {
        const angle = (360 / count) * index
        const outer = polarToCartesian(center, center, radius + tickLen, angle)
        const inner = polarToCartesian(center, center, radius - tickLen, angle)
        const isAccent = accentEvery ? index % accentEvery === 0 : false

        return (
          <line
            key={index}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            className={isAccent ? 'coffee2-hero-orbit__tick-accent' : undefined}
          />
        )
      })}
    </>
  )
}

function OrbitFlippedText({
  x,
  y,
  className,
  textAnchor = 'middle',
  children,
}: {
  x: number
  y: number
  className?: string
  textAnchor?: 'start' | 'middle' | 'end'
  children: ReactNode
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      dominantBaseline="middle"
      transform={`rotate(180 ${x} ${y})`}
      className={className}
    >
      {children}
    </text>
  )
}

function RingDecoration({
  decoration,
  radius,
  annotation,
  annotationAngle = 0,
}: {
  decoration: OrbitRingDecoration
  radius: number
  annotation: string
  annotationAngle?: number
}) {
  const top = polarToCartesian(center, center, radius, 0)
  const right = polarToCartesian(center, center, radius, 90)
  const annotPos = polarToCartesian(
    center,
    center,
    decoration === 'dashed' ? radius + 12 : radius,
    annotationAngle
  )

  switch (decoration) {
    case 'crosshair': {
      const arm = 10
      const annotX = top.x + 14
      const annotY = top.y - 8
      return (
        <g className="coffee2-hero-orbit__decor">
          <line
            x1={top.x - arm}
            y1={top.y}
            x2={top.x + arm}
            y2={top.y}
          />
          <line
            x1={top.x}
            y1={top.y - arm}
            x2={top.x}
            y2={top.y + arm}
          />
          <OrbitFlippedText
            x={annotX}
            y={annotY}
            className="coffee2-hero-orbit__annotation"
          >
            {annotation}
          </OrbitFlippedText>
        </g>
      )
    }
    case 'accentTicks':
      return (
        <g className="coffee2-hero-orbit__decor">
          <OrbitFlippedText
            x={right.x + 8}
            y={right.y + 4}
            textAnchor="start"
            className="coffee2-hero-orbit__annotation coffee2-hero-orbit__annotation--accent"
          >
            {annotation}
          </OrbitFlippedText>
        </g>
      )
    case 'dashed':
      return (
        <g className="coffee2-hero-orbit__decor">
          <circle
            cx={center}
            cy={center}
            r={radius - 6}
            fill="none"
            className="coffee2-hero-orbit__inner-dashed"
          />
          <OrbitFlippedText
            x={annotPos.x}
            y={annotPos.y}
            className="coffee2-hero-orbit__annotation"
          >
            {annotation}
          </OrbitFlippedText>
        </g>
      )
    case 'dimension': {
      const left = polarToCartesian(center, center, radius, 210)
      const dimRight = polarToCartesian(center, center, radius, 330)
      const annotX = center
      const annotY = center + radius + 18
      return (
        <g className="coffee2-hero-orbit__decor">
          <line
            x1={left.x}
            y1={left.y}
            x2={dimRight.x}
            y2={dimRight.y}
            className="coffee2-hero-orbit__dimension"
          />
          <polygon
            points={`${left.x},${left.y} ${left.x + 4},${left.y - 3} ${left.x + 4},${left.y + 3}`}
            className="coffee2-hero-orbit__dimension-arrow"
          />
          <polygon
            points={`${dimRight.x},${dimRight.y} ${dimRight.x - 4},${dimRight.y - 3} ${dimRight.x - 4},${dimRight.y + 3}`}
            className="coffee2-hero-orbit__dimension-arrow"
          />
          <OrbitFlippedText
            x={annotX}
            y={annotY}
            className="coffee2-hero-orbit__annotation"
          >
            {annotation}
          </OrbitFlippedText>
        </g>
      )
    }
    case 'coordinates':
      return (
        <g className="coffee2-hero-orbit__decor">
          <rect
            x={right.x - 4}
            y={right.y - 4}
            width={8}
            height={8}
            transform={`rotate(45 ${right.x} ${right.y})`}
            className="coffee2-hero-orbit__hatch"
          />
          <OrbitFlippedText
            x={right.x + 12}
            y={right.y + 18}
            textAnchor="start"
            className="coffee2-hero-orbit__annotation coffee2-hero-orbit__annotation--muted"
          >
            {annotation}
          </OrbitFlippedText>
        </g>
      )
    default:
      return null
  }
}

function OrbitRing({
  id,
  label,
  radius,
  staticRotate,
  dasharray,
  tickCount,
  decoration,
  annotation,
  labelAngle = 0,
  annotationAngle = 0,
}: (typeof coffee2HeroOrbitRings)[number] & {
  annotationAngle?: number
  labelAngle?: number
}) {
  const node = polarToCartesian(center, center, radius, labelAngle)
  const labelPos = polarToCartesian(center, center, radius + 16, labelAngle)

  return (
    <g
      className={`coffee2-hero-orbit__ring coffee2-hero-orbit__ring--${id}`}
      style={{ ['--ring-static-rotate' as string]: `${staticRotate}deg` }}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        className="coffee2-hero-orbit__arc"
        strokeDasharray={dasharray}
      />

      <RingTicks
        radius={radius}
        count={tickCount}
        accentEvery={decoration === 'accentTicks' ? 5 : undefined}
      />

      <RingDecoration
        decoration={decoration}
        radius={radius}
        annotation={annotation}
        annotationAngle={annotationAngle}
      />

      <g className="coffee2-hero-orbit__node">
        <circle cx={node.x} cy={node.y} r={4.5} />
        <circle cx={node.x} cy={node.y} r={1.5} className="coffee2-hero-orbit__node-core" />
      </g>

      <OrbitFlippedText
        x={labelPos.x}
        y={labelPos.y}
        className="coffee2-hero-orbit__label"
      >
        {label}
      </OrbitFlippedText>
    </g>
  )
}

export function Coffee2HeroOrbitBackground() {
  return (
    <div className="coffee2-hero-orbit" aria-hidden="true">
      <div className="coffee2-hero-orbit__stage">
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="coffee2-hero-orbit__svg"
          role="presentation"
        >
          <g className="coffee2-hero-orbit__guides">
            <line
              x1={center}
              y1={24}
              x2={center}
              y2={viewBoxSize - 24}
              className="coffee2-hero-orbit__axis"
            />
            <line
              x1={24}
              y1={center}
              x2={viewBoxSize - 24}
              y2={center}
              className="coffee2-hero-orbit__axis"
            />
          </g>

          {coffee2HeroOrbitRings.map((ring) => (
            <OrbitRing key={ring.id} {...ring} />
          ))}
        </svg>

        <div className="coffee2-hero-orbit__coffee">
          <Image
            src={COFFEE2_HERO_ORBIT.coffeeSrc}
            alt=""
            width={480}
            height={480}
            priority
            className="coffee2-hero-orbit__coffee-image"
          />
        </div>
      </div>
    </div>
  )
}
