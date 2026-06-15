'use client'

import { useState } from 'react'
import { Coffee2CollaborationCta } from '@/components/sections/coffee2/coffee2-collaboration-cta'
import { Coffee2ManifestoPanel } from '@/components/sections/coffee2/coffee2-manifesto-panel'
import { Coffee2TenetDetailDialog } from '@/components/sections/coffee2/coffee2-tenet-detail-dialog'
import { Coffee2TenTopicsPanel } from '@/components/sections/coffee2/coffee2-ten-topics-panel'
import type { Coffee2Tenet } from '@/lib/content/coffee-manifesto'

export function Coffee2CollaborationSection() {
  const [selectedTenet, setSelectedTenet] = useState<Coffee2Tenet | null>(null)

  return (
    <section
      id="coffee-collaboration"
      className="coffee2-collaboration scroll-mt-28 border-b border-zinc-200 py-16 md:py-24"
      aria-label="联动十日谈与十纲"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="coffee2-backed-stack">
          <div id="coffee-manifesto" aria-labelledby="coffee2-manifesto-panel-title">
            <Coffee2ManifestoPanel />
          </div>
          <div id="coffee-ten-topics" aria-labelledby="coffee2-ten-topics-panel-title">
            <Coffee2TenTopicsPanel onSelect={setSelectedTenet} />
          </div>
        </div>
        <Coffee2CollaborationCta />
      </div>

      <Coffee2TenetDetailDialog
        tenet={selectedTenet}
        onClose={() => setSelectedTenet(null)}
      />
    </section>
  )
}
