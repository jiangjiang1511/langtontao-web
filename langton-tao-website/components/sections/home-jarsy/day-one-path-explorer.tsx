'use client'

import { useCallback, useState } from 'react'
import { DayOnePathFootprint } from '@/components/sections/home-jarsy/day-one-path-footprint'
import { DayOnePathHub } from '@/components/sections/home-jarsy/day-one-path-hub'
import { DayOnePathSerpentineConnector } from '@/components/sections/home-jarsy/day-one-path-serpentine-connector'
import { DayOnePathStepZone } from '@/components/sections/home-jarsy/day-one-path-step-zone'
import { useCenterZoneVisible } from '@/components/sections/home-jarsy/use-center-zone-visible'
import { DayOneTopicModal } from '@/components/sections/home-jarsy/day-one-topic-modal'
import type { NarrativeBubble, NarrativePathStep } from '@/lib/content/narrative-bubble'
import type { PathHubVariant } from '@/lib/content/path-hub-matrix'
import { dayOneAccentMap } from '@/lib/content/day-one-narrative'
import { cn } from '@/lib/utils'

type DayOnePathLayout = 'stack' | 'serpentine' | 'hub'

type SerpentineStepRowProps = {
  step: NarrativePathStep
  stepIndex: number
  align: 'start' | 'end'
  connectorFirst: boolean
  prevAlign: 'start' | 'end'
  onTopicSelect: (bubble: NarrativeBubble) => void
}

function SerpentineStepRow({
  step,
  stepIndex,
  align,
  connectorFirst,
  prevAlign,
  onTopicSelect,
}: SerpentineStepRowProps) {
  const { ref, visible } = useCenterZoneVisible<HTMLDivElement>()
  const titleId = `day-one-path-step-${step.id}`

  return (
    <div
      ref={ref}
      className={cn(
        'day-one-path__step-block',
        align === 'start'
          ? 'day-one-path__step-block--align-start'
          : 'day-one-path__step-block--align-end'
      )}
    >
      <section
        className="day-one-path-step day-one-path-step--compact"
        aria-labelledby={titleId}
      >
        <DayOnePathStepZone
          step={step}
          stepIndex={stepIndex}
          layout="serpentine"
          align={align}
          zonePart="header"
          visible={visible}
          onTopicSelect={onTopicSelect}
        />
        <div
          className={cn(
            'day-one-path__row',
            connectorFirst
              ? 'day-one-path__row--connector-start'
              : 'day-one-path__row--connector-end'
          )}
        >
          {connectorFirst ? (
            <DayOnePathSerpentineConnector
              fromAlign={prevAlign}
              stepIndex={stepIndex - 1}
            />
          ) : null}
          <DayOnePathStepZone
            step={step}
            stepIndex={stepIndex}
            layout="serpentine"
            align={align}
            zonePart="topics"
            visible={visible}
            onTopicSelect={onTopicSelect}
          />
          {!connectorFirst ? (
            <DayOnePathSerpentineConnector
              fromAlign={prevAlign}
              stepIndex={stepIndex - 1}
            />
          ) : null}
        </div>
      </section>
    </div>
  )
}

type DayOnePathExplorerProps = {
  steps: NarrativePathStep[]
  accentMap?: Record<string, string>
  layout?: DayOnePathLayout
  tablistLabel?: string
  hubVariant?: PathHubVariant
}

export function DayOnePathExplorer({
  steps,
  accentMap,
  layout = 'hub',
  tablistLabel,
  hubVariant = 'default',
}: DayOnePathExplorerProps) {
  const [activeBubble, setActiveBubble] = useState<NarrativeBubble | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const isSerpentine = layout === 'serpentine'
  const isHub = layout === 'hub'

  const handleTopicSelect = useCallback((bubble: NarrativeBubble) => {
    setActiveBubble(bubble)
    setModalOpen(true)
  }, [])

  const handleModalOpenChange = useCallback((open: boolean) => {
    setModalOpen(open)
    if (!open) setActiveBubble(null)
  }, [])

  if (isHub) {
    return (
      <DayOnePathHub
        steps={steps}
        accentMap={accentMap}
        tablistLabel={tablistLabel}
        hubVariant={hubVariant}
      />
    )
  }

  return (
    <div
      className={cn(
        'day-one-path mt-12 md:mt-16',
        isSerpentine && 'day-one-path--serpentine'
      )}
    >
      <div className="day-one-path__steps">
        {steps.map((step, stepIndex) => {
          const align = stepIndex % 2 === 0 ? 'start' : 'end'

          if (!isSerpentine) {
            return (
              <div key={step.id} className="day-one-path__segment">
                <DayOnePathStepZone
                  step={step}
                  stepIndex={stepIndex}
                  layout={layout}
                  align={align}
                  onTopicSelect={handleTopicSelect}
                />
                {stepIndex < steps.length - 1 ? (
                  <DayOnePathFootprint stepIndex={stepIndex} />
                ) : null}
              </div>
            )
          }

          if (stepIndex === 0) {
            return (
              <div
                key={step.id}
                className="day-one-path__segment day-one-path__segment--standalone day-one-path__segment--start"
              >
                <DayOnePathStepZone
                  step={step}
                  stepIndex={stepIndex}
                  layout={layout}
                  align="start"
                  onTopicSelect={handleTopicSelect}
                />
              </div>
            )
          }

          const prevAlign = stepIndex % 2 === 1 ? 'start' : 'end'
          const connectorFirst = prevAlign === 'start'

          return (
            <SerpentineStepRow
              key={step.id}
              step={step}
              stepIndex={stepIndex}
              align={align}
              connectorFirst={connectorFirst}
              prevAlign={prevAlign}
              onTopicSelect={handleTopicSelect}
            />
          )
        })}
      </div>

      <DayOneTopicModal
        bubble={activeBubble}
        accentMap={accentMap ?? dayOneAccentMap}
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
      />
    </div>
  )
}
