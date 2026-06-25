'use client'

import { useMemo, useCallback, useState } from 'react'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { WealthTopicModal } from '@/components/sections/coffee2/wealth-topic-modal'
import { WealthTopicZone } from '@/components/sections/coffee2/wealth-topic-zone'
import {
  wealthNarrativeRoot,
  wealthNarrativeSectionMeta,
  type WealthNarrativeNode,
} from '@/lib/content/coffee-wealth-narrative'
import { canOpenWealthTopicModal } from '@/lib/content/wealth-topic-utils'

export const WEALTH_REVEAL_STAGGER_MS = 140

type WealthRevealSchedule = {
  header: {
    eyebrow: number
    title: number
    lead: number
  }
  zones: Array<{
    id: string
    header: number
    cards: Array<{ id: string; delay: number }>
  }>
}

function buildWealthRevealSchedule(zones: WealthNarrativeNode[]): WealthRevealSchedule {
  let step = 0
  const next = () => step++ * WEALTH_REVEAL_STAGGER_MS

  return {
    header: {
      eyebrow: next(),
      title: next(),
      lead: next(),
    },
    zones: zones.map((zone) => ({
      id: zone.id,
      header: next(),
      cards: (zone.children ?? []).map((child) => ({
        id: child.id,
        delay: next(),
      })),
    })),
  }
}

export function WealthAccumulationExplorer() {
  const [activeNode, setActiveNode] = useState<WealthNarrativeNode | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const zones = wealthNarrativeRoot.children ?? []
  const revealSchedule = useMemo(() => buildWealthRevealSchedule(zones), [zones])

  const handleTopicClick = useCallback((node: WealthNarrativeNode) => {
    if (!canOpenWealthTopicModal(node)) return
    if (modalOpen && activeNode?.id === node.id) return
    setActiveNode(node)
    setModalOpen(true)
  }, [modalOpen, activeNode?.id])

  const handleModalOpenChange = useCallback((open: boolean) => {
    setModalOpen(open)
    if (!open) setActiveNode(null)
  }, [])

  return (
    <section
      className="invest-wealth-section"
      aria-labelledby="invest-wealth-title"
    >
      <header className="invest-wealth-section__header">
        <Coffee2Reveal delay={revealSchedule.header.eyebrow} className="invest-wealth-reveal">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {wealthNarrativeSectionMeta.eyebrow}
          </p>
        </Coffee2Reveal>

        <Coffee2Reveal delay={revealSchedule.header.title} className="invest-wealth-reveal">
          <h3
            id="invest-wealth-title"
            className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl"
          >
            {wealthNarrativeSectionMeta.title}
          </h3>
        </Coffee2Reveal>

        <Coffee2Reveal delay={revealSchedule.header.lead} className="invest-wealth-reveal">
          <Coffee2AnnotatedText
            text={wealthNarrativeSectionMeta.lead}
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base"
          />
        </Coffee2Reveal>
      </header>

      <div className="invest-wealth-zones">
        {zones.map((zone) => {
          const zoneSchedule = revealSchedule.zones.find((item) => item.id === zone.id)
          if (!zoneSchedule) return null

          const cardDelays = Object.fromEntries(
            zoneSchedule.cards.map((card) => [card.id, card.delay])
          )

          return (
            <WealthTopicZone
              key={zone.id}
              zone={zone}
              headerDelay={zoneSchedule.header}
              cardDelays={cardDelays}
              onTopicClick={handleTopicClick}
            />
          )
        })}
      </div>

      <WealthTopicModal
        node={activeNode}
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
      />
    </section>
  )
}
