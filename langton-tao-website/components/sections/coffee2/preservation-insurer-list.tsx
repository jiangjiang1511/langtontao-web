'use client'

import { useRef, type CSSProperties } from 'react'
import type { CoffeePreservationInsurer } from '@/lib/content/coffee-preservation-insurers'
import { useAutoScrollLoop } from '@/hooks/use-auto-scroll-loop'
import { useMediaQuery } from '@/hooks/use-media-query'

type PreservationInsurerListProps = {
  insurers: readonly CoffeePreservationInsurer[]
  activeId: string | null
  onSelect: (id: string) => void
}

type InsurerListItemProps = {
  insurer: CoffeePreservationInsurer
  index: number
  isActive: boolean
  isClone?: boolean
  onSelect: (id: string) => void
}

function InsurerListItem({
  insurer,
  index,
  isActive,
  isClone = false,
  onSelect,
}: InsurerListItemProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isClone ? undefined : isActive}
      aria-hidden={isClone || undefined}
      tabIndex={isClone ? -1 : undefined}
      className="cg-list-item pi-list-item"
      data-active={isActive}
      style={{ '--cg-accent': '#ffe600' } as CSSProperties}
      onClick={() => onSelect(insurer.id)}
    >
      <span className="cg-list-item-accent" aria-hidden />
      <span className="cg-list-item-index">{String(index + 1).padStart(2, '0')}</span>
      <span className="pi-list-item-name">{insurer.name}</span>
      <span className="pi-list-item-tagline">{insurer.buyerTag}</span>
    </button>
  )
}

export function PreservationInsurerList({
  insurers,
  activeId,
  onSelect,
}: PreservationInsurerListProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const axis = isDesktop ? 'y' : 'x'

  useAutoScrollLoop(listRef, { axis, speed: 0.28, loop: true })

  return (
    <div className="cg-list-shell pi-list-shell">
      <div
        ref={listRef}
        className="cg-list cg-list--auto-scroll"
        role="listbox"
        aria-label="合作保司列表"
      >
        {insurers.map((insurer, index) => (
          <InsurerListItem
            key={insurer.id}
            insurer={insurer}
            index={index}
            isActive={insurer.id === activeId}
            onSelect={onSelect}
          />
        ))}
        {insurers.map((insurer, index) => (
          <InsurerListItem
            key={`clone-${insurer.id}`}
            insurer={insurer}
            index={index}
            isActive={insurer.id === activeId}
            isClone
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}
