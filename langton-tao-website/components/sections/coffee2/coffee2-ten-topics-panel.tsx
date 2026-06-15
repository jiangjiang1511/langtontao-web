'use client'

import { Coffee2BackedPanel } from '@/components/sections/coffee2/coffee2-backed-panel'
import { Coffee2TenetsMarquee } from '@/components/sections/coffee2/coffee2-tenets-marquee'
import {
  coffee2TenTopics,
  coffee2TenTopicsPanelTitle,
  type Coffee2Tenet,
} from '@/lib/content/coffee-manifesto'

type Coffee2TenTopicsPanelProps = {
  onSelect: (tenet: Coffee2Tenet) => void
}

export function Coffee2TenTopicsPanel({ onSelect }: Coffee2TenTopicsPanelProps) {
  return (
    <Coffee2BackedPanel
      title={coffee2TenTopicsPanelTitle}
      ariaLabelledBy="coffee2-ten-topics-panel-title"
      revealDelay={80}
      stackPosition="middle"
    >
      <Coffee2TenetsMarquee tenets={coffee2TenTopics} onSelect={onSelect} />
    </Coffee2BackedPanel>
  )
}
