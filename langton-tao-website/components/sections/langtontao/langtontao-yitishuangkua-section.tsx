import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoYitishuangkuaCta } from '@/components/sections/langtontao/langtontao-yitishuangkua-cta'
import { LangtontaoMajorSectionShell } from '@/components/sections/langtontao/langtontao-major-section-shell'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import { getLangtontaoMajorSection } from '@/lib/content/langtontao/langtontao-major-sections'
import {
  langtontaoHongKongMeta,
  langtontaoHongKongNarrative,
  langtontaoYitishuangkua,
} from '@/lib/content/langtontao/langtontao-hong-kong'

export function LangtontaoYitishuangkuaSection() {
  const meta = getLangtontaoMajorSection('yitishuangkua')
  if (!meta) return null

  return (
    <LangtontaoMajorSectionShell meta={meta}>
      <LangtontaoSubsectionHeader
        eyebrow={langtontaoHongKongMeta.eyebrow}
        title={langtontaoHongKongNarrative.title}
        lead={langtontaoHongKongNarrative.body}
        theme="network"
      />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {langtontaoHongKongNarrative.advantages.map((item, index) => (
          <Coffee2Reveal
            key={item.id}
            delay={80 + index * 50}
            as="li"
            className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5"
          >
            <p className="font-semibold text-jarsy-violet">{item.title}</p>
            <p className="mt-2 text-sm text-zinc-400">{item.body}</p>
          </Coffee2Reveal>
        ))}
      </ul>

      <Coffee2Reveal delay={160}>
        <div className="mt-16 border-t border-zinc-800 pt-12">
          <LangtontaoSubsectionHeader
            eyebrow={langtontaoYitishuangkua.eyebrow}
            title={langtontaoYitishuangkua.title}
            lead={langtontaoYitishuangkua.definition}
            theme="network"
          />
          <p className="mt-2 max-w-3xl text-lg text-zinc-400">{langtontaoYitishuangkua.subtitle}</p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {[langtontaoYitishuangkua.mainland, langtontaoYitishuangkua.hongkong].map((hub) => (
              <article
                key={hub.id}
                className="rounded-xl border border-zinc-700 bg-zinc-900 p-5"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  {hub.label}
                </p>
                <h4 className="lt-heading-l3 mt-2 text-white">{hub.address}</h4>
                <p className="mt-2 text-sm text-zinc-400">{hub.summary}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-jarsy-violet/30 bg-jarsy-violet/5 p-5">
            <h4 className="lt-heading-l3 text-jarsy-violet">{langtontaoYitishuangkua.synergyTitle}</h4>
            <p className="mt-2 text-sm text-zinc-400">{langtontaoYitishuangkua.synergyBody}</p>
          </div>

          <ul className="mt-8 space-y-2">
            {langtontaoYitishuangkua.deliveryMap.map((row) => (
              <li
                key={row.business}
                className="flex flex-col gap-1 border-b border-zinc-800 py-3 text-sm sm:flex-row sm:justify-between"
              >
                <span className="font-medium text-zinc-300">{row.business}</span>
                <span className="text-zinc-500">{row.node}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center">
            <LangtontaoYitishuangkuaCta cta={langtontaoYitishuangkua.cta} />
          </div>
        </div>
      </Coffee2Reveal>
    </LangtontaoMajorSectionShell>
  )
}
