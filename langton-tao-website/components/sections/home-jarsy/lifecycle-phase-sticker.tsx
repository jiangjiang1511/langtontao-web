type LifecyclePhaseStickerProps = {
  centerX: number
  label: string
  classPrefix: 'lifecycle-blueprint' | 'enterprise-lifecycle'
}

export function LifecyclePhaseSticker({
  centerX,
  label,
  classPrefix,
}: LifecyclePhaseStickerProps) {
  const isBlueprint = classPrefix === 'lifecycle-blueprint'
  const charWidth = isBlueprint ? 18 : 16
  const height = isBlueprint ? 32 : 28
  const width = label.length * charWidth + 32
  const textY = isBlueprint ? 20 : 18

  return (
    <g transform={`translate(${centerX - width / 2}, 8)`}>
      <rect
        width={width}
        height={height}
        rx={height / 2}
        className={`${classPrefix}__phase-sticker`}
      />
      <text
        x={width / 2}
        y={textY}
        className={`${classPrefix}__phase-sticker-text`}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  )
}
