'use client'

import { useCallback, useState } from 'react'
import type { CSSProperties } from 'react'
import { Coffee2AnnotatedCopyBlock } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoBeautifulPhilosophyModal } from '@/components/sections/langtontao/langtontao-beautiful-philosophy-modal'
import { toAnnotatedCopyBlock } from '@/lib/content/coffee-glossary'
import {
  langtontaoBeautifulPhilosophyPillars,
  type BeautifulPhilosophyPillar,
} from '@/lib/content/langtontao/langtontao-beautiful-business'

export function LangtontaoBeautifulPhilosophyGrid() {
  const [activePillar, setActivePillar] = useState<BeautifulPhilosophyPillar | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleSelect = useCallback((pillar: BeautifulPhilosophyPillar) => {
    setActivePillar(pillar)
    setModalOpen(true)
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    setModalOpen(open)
    if (!open) setActivePillar(null)
  }, [])

  return (
    <>
      <ul className="lt-beautiful-philosophy-grid">
        {langtontaoBeautifulPhilosophyPillars.map((pillar, index) => (
          <li key={pillar.id}>
            <Coffee2Reveal delay={index * 60}>
              <button
                type="button"
                className="lt-beautiful-philosophy-card group block h-full w-full text-left"
                style={
                  {
                    '--philosophy-bg': pillar.surface.background,
                    '--philosophy-accent': pillar.surface.accent,
                    '--philosophy-fg': pillar.surface.foreground,
                    '--philosophy-muted': pillar.surface.muted,
                  } as CSSProperties
                }
                onClick={() => handleSelect(pillar)}
                aria-haspopup="dialog"
              >
                <div className="lt-beautiful-philosophy-card__surface">
                  <span className="lt-beautiful-philosophy-card__number">{pillar.number}</span>
                  <h4 className="lt-beautiful-philosophy-card__title">{pillar.title}</h4>
                  <Coffee2AnnotatedCopyBlock
                    block={toAnnotatedCopyBlock(pillar.summary)}
                    className="lt-beautiful-philosophy-card__description"
                    as="span"
                  />
                  <span className="lt-beautiful-philosophy-card__cta" aria-hidden>
                    探索
                  </span>
                </div>
              </button>
            </Coffee2Reveal>
          </li>
        ))}
      </ul>

      <LangtontaoBeautifulPhilosophyModal
        pillar={activePillar}
        open={modalOpen}
        onOpenChange={handleOpenChange}
      />
    </>
  )
}
