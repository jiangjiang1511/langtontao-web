'use client'

import type { Coffee2Tenet } from '@/lib/content/coffee-manifesto'
import { cn } from '@/lib/utils'

type Coffee2TenetMarqueeCardProps = {
  tenet: Coffee2Tenet
  onSelect: (tenet: Coffee2Tenet) => void
  className?: string
}

function formatCardSummary(summary: Coffee2Tenet['cardSummary']) {
  if (typeof summary === 'string') return [summary]
  return [...summary]
}

export function Coffee2TenetMarqueeCard({
  tenet,
  onSelect,
  className,
}: Coffee2TenetMarqueeCardProps) {
  const lines = formatCardSummary(tenet.cardSummary)

  return (
    <button
      type="button"
      className={cn('coffee2-tenet-card', className)}
      onClick={() => onSelect(tenet)}
      aria-label={`${tenet.number} ${tenet.title}，查看详细说明`}
    >
      <div className="coffee2-tenet-card__head">
        <div className="coffee2-tenet-card__lead">
          <span className="coffee2-tenet-card__number">{tenet.number}</span>
          <p className="coffee2-tenet-card__title">{tenet.title}</p>
        </div>
        <span className="coffee2-tenet-card__verse">{tenet.verseLine}</span>
      </div>
      <div className="coffee2-tenet-card__summary">
        {lines.length > 2 ? (
          <p className="coffee2-tenet-card__summary-line">{lines.join(' · ')}</p>
        ) : (
          lines.map((line) => (
            <p key={line} className="coffee2-tenet-card__summary-line">
              {line}
            </p>
          ))
        )}
      </div>
    </button>
  )
}
