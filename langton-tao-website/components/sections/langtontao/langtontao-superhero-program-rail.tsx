'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import type { LangtontaoSuperheroCoreProgram } from '@/lib/content/langtontao/langtontao-superhero-journey'
import { cn } from '@/lib/utils'
import { scrollChildWithinContainer } from '@/lib/utils/scroll-child-within-container'

type LangtontaoSuperheroProgramRailProps = {
  programs: readonly LangtontaoSuperheroCoreProgram[]
  activeId: string
  advanceMs?: number
  onSelect: (id: string) => void
}

export function LangtontaoSuperheroProgramRail({
  programs,
  activeId,
  advanceMs = 8000,
  onSelect,
}: LangtontaoSuperheroProgramRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const activeTabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const tab = activeTabRef.current
    if (!track || !tab) return
    scrollChildWithinContainer(track, tab)
  }, [activeId])

  return (
    <aside className="lt-superhero-program-hub__rail">
      <div
        ref={trackRef}
        className="lt-superhero-program-hub__rail-track"
        role="tablist"
        aria-label="超级英雄之旅核心路径"
        style={{ '--lt-superhero-advance-ms': `${advanceMs}ms` } as CSSProperties}
      >
        {programs.map((program) => {
          const selected = program.id === activeId
          return (
            <button
              key={program.id}
              ref={selected ? activeTabRef : null}
              type="button"
              role="tab"
              id={`superhero-tab-${program.id}`}
              aria-selected={selected}
              aria-controls={`superhero-panel-${program.id}`}
              data-selected={selected ? 'true' : 'false'}
              className={cn('lt-superhero-program-hub__tab', selected && 'is-active')}
              style={{ '--lt-superhero-accent': program.accent } as CSSProperties}
              onClick={() => onSelect(program.id)}
            >
              {selected ? (
                <span
                  key={program.id}
                  className="lt-superhero-program-hub__tab-progress"
                  aria-hidden
                />
              ) : null}
              <span className="lt-superhero-program-hub__tab-hook">{program.hook}</span>
              <span className="lt-superhero-program-hub__tab-title">{program.title}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
