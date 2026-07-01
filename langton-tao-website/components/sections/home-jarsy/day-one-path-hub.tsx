'use client'

import { useCallback, useEffect, useState } from 'react'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { DayOnePathStepRail } from '@/components/sections/home-jarsy/day-one-path-step-rail'
import { DayOneTopicCard } from '@/components/sections/home-jarsy/day-one-topic-card'
import { DayOneTopicModal } from '@/components/sections/home-jarsy/day-one-topic-modal'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import type { NarrativeBubble, NarrativePathStep, NarrativeSubsection } from '@/lib/content/narrative-bubble'
import {
  getPathHubMatrixItems,
  getPathHubStageLead,
  subsectionToCardBubble,
  type PathHubVariant,
} from '@/lib/content/path-hub-matrix'
import { dayOneAccentMap } from '@/lib/content/day-one-narrative'
import { cn } from '@/lib/utils'

const AUTO_ADVANCE_MS = 8000

type DayOnePathHubProps = {
  steps: NarrativePathStep[]
  accentMap?: Record<string, string>
  tablistLabel?: string
  hubVariant?: PathHubVariant
}

export function DayOnePathHub({
  steps,
  accentMap,
  tablistLabel = '五步路径',
  hubVariant = 'default',
}: DayOnePathHubProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeBubble, setActiveBubble] = useState<NarrativeBubble | null>(null)
  const [activeSubsection, setActiveSubsection] = useState<NarrativeSubsection | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalAccentId, setModalAccentId] = useState<string | undefined>()
  const { ref, visible } = useCenterZoneVisible<HTMLDivElement>()

  const activeStep = steps[activeIndex] ?? steps[0]
  const isSubsectionMatrix = hubVariant === 'subsection-matrix'

  const handleBubbleSelect = useCallback((bubble: NarrativeBubble) => {
    setActiveBubble(bubble)
    setActiveSubsection(null)
    setModalAccentId(bubble.id)
    setModalOpen(true)
  }, [])

  const handleSubsectionSelect = useCallback(
    (subsection: NarrativeSubsection, parentBubble: NarrativeBubble) => {
      setActiveSubsection(subsection)
      setActiveBubble(null)
      setModalAccentId(subsection.id ?? parentBubble.id)
      setModalOpen(true)
    },
    []
  )

  const handleModalOpenChange = useCallback((open: boolean) => {
    setModalOpen(open)
    if (!open) {
      setActiveBubble(null)
      setActiveSubsection(null)
      setModalAccentId(undefined)
    }
  }, [])

  const handleStepSelect = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  useEffect(() => {
    if (modalOpen || steps.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % steps.length)
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(timer)
  }, [modalOpen, steps.length])

  if (!activeStep || steps.length === 0) return null

  return (
    <div ref={ref} className="day-one-path-hub mt-12 md:mt-16">
      <div className="day-one-path-hub__shell">
        <div className="day-one-path-hub__layout">
          <DayOnePathStepRail
            steps={steps}
            activeIndex={activeIndex}
            onSelect={handleStepSelect}
            tablistLabel={tablistLabel}
            hubVariant={hubVariant}
          />

          <div className="day-one-path-hub__stage-stack">
            {steps.map((step, stepIndex) => {
              const isActive = stepIndex === activeIndex
              const stageLead = getPathHubStageLead(step, hubVariant)
              const matrixItems = getPathHubMatrixItems(step, hubVariant)

              return (
                <div
                  key={step.id}
                  id={`day-one-path-panel-${step.id}`}
                  role="tabpanel"
                  aria-labelledby={`day-one-path-tab-${step.id}`}
                  aria-hidden={!isActive}
                  className={cn(
                    'day-one-path-hub__stage',
                    isActive
                      ? 'day-one-path-hub__stage--active'
                      : 'day-one-path-hub__stage--inactive'
                  )}
                  {...(!isActive ? { inert: true } : {})}
                >
                  <div className="day-one-path-hub__intro">
                    <h4 className="day-one-path-hub__stage-title">{step.title}</h4>
                    {stageLead ? (
                      <Coffee2AnnotatedText
                        text={stageLead}
                        className="day-one-path-hub__stage-lead"
                        as="p"
                      />
                    ) : null}
                  </div>

                  <ul className="day-one-path-hub__matrix">
                    {matrixItems.map((item, index) => {
                      const cardBubble =
                        item.type === 'subsection'
                          ? subsectionToCardBubble(item.subsection, item.parentBubble)
                          : item.bubble

                      return (
                        <li key={item.id} className="day-one-path-hub__matrix-cell">
                          <DayOneTopicCard
                            bubble={cardBubble}
                            index={stepIndex * 10 + index}
                            motionIndex={index + 1}
                            motionTotal={matrixItems.length + 1}
                            visible={visible && isActive}
                            variant="compact"
                            showSummary
                            onSelect={() => {
                              if (item.type === 'subsection') {
                                handleSubsectionSelect(item.subsection, item.parentBubble)
                              } else {
                                handleBubbleSelect(item.bubble)
                              }
                            }}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <DayOneTopicModal
        bubble={activeBubble}
        subsection={activeSubsection}
        accentMap={accentMap ?? dayOneAccentMap}
        accentId={modalAccentId}
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
      />
    </div>
  )
}
