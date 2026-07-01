'use client'

import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import { LangtontaoTopicGrid } from '@/components/sections/langtontao/langtontao-topic-grid'
import { LangtontaoTopicRowGrid } from '@/components/sections/langtontao/langtontao-topic-row-grid'
import {
  langtontaoPanicChannelTopics,
  langtontaoPanicCoreTopics,
} from '@/lib/content/langtontao/langtontao-panic-topics'
import {
  langtontaoPanicMeta,
  langtontaoWealthMeta,
} from '@/lib/content/langtontao/langtontao-panic-wealth'
import { langtontaoWealthTopicZones } from '@/lib/content/langtontao/langtontao-wealth-topics'

export function LangtontaoPanicWealthContent() {
  return (
    <div id="panic-wealth" className="scroll-mt-28">
      <section id="panic">
        <LangtontaoSubsectionHeader
          eyebrow={langtontaoPanicMeta.eyebrow}
          title={langtontaoPanicMeta.title}
          lead={langtontaoPanicMeta.lead}
          theme="home"
        />

        <LangtontaoTopicGrid topics={langtontaoPanicCoreTopics} className="mt-10" />
        <LangtontaoTopicRowGrid
          topics={langtontaoPanicChannelTopics}
          ariaLabel="财富消失的三条通道"
          className="mt-14"
        />
      </section>

      <div className="mt-16 border-t border-zinc-200 pt-16">
        <section id="wealth">
          <LangtontaoSubsectionHeader
            eyebrow={langtontaoWealthMeta.eyebrow}
            title={langtontaoWealthMeta.title}
            lead={langtontaoWealthMeta.lead}
            theme="home"
          />

          <div className="mt-10 space-y-12">
            {langtontaoWealthTopicZones.map((zone) => (
              <LangtontaoTopicGrid key={zone.id} zone={zone} topics={zone.topics} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
