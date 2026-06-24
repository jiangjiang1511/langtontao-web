'use client'

import { useState } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  LangtontaoMindmapNodeCard,
  LangtontaoWealthStructureChart,
  LangtontaoWealthTimeline,
} from '@/components/sections/langtontao/langtontao-mindmap-node-card'
import { LangtontaoChallengeCta } from '@/components/sections/langtontao/langtontao-challenge-cta'
import {
  langtontaoChaosChannels,
  langtontaoPanicNodes,
  langtontaoPanicWealthMeta,
  langtontaoWealthNodes,
} from '@/lib/content/langtontao/langtontao-panic-wealth'
import { cn } from '@/lib/utils'

type Tab = 'panic' | 'wealth'

export function LangtontaoPanicWealthSection() {
  const [tab, setTab] = useState<Tab>('panic')

  return (
    <section
      id="panic-wealth"
      className="lt-section lt-section--panic scroll-mt-28 border-b border-zinc-200 bg-zinc-50 py-16 md:py-24"
      aria-labelledby="panic-wealth-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <p className="c2-eyebrow">{langtontaoPanicWealthMeta.eyebrow}</p>
          <h2
            id="panic-wealth-title"
            className="c2-display mt-3 text-4xl text-zinc-950 md:text-5xl"
          >
            {langtontaoPanicWealthMeta.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {langtontaoPanicWealthMeta.lead}
          </p>
        </Coffee2Reveal>

        <div className="mt-8 flex gap-2">
          {(
            [
              { id: 'panic' as const, label: '何事惊慌' },
              { id: 'wealth' as const, label: '何为财富' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-bold transition-colors',
                tab === t.id
                  ? 'bg-zinc-950 text-white'
                  : 'bg-white text-zinc-600 ring-1 ring-zinc-200'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'panic' ? (
          <div className="mt-10 space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              {langtontaoPanicNodes
                .filter((n) => n.id !== 'chaos-channels')
                .map((node, index) => (
                  <LangtontaoMindmapNodeCard key={node.id} node={node} index={index} />
                ))}
            </div>
            <Coffee2Reveal>
              <div className="c2-card p-6">
                <h3 className="text-lg font-semibold text-zinc-950">
                  财富「凭空消失」的三条通道
                </h3>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {langtontaoChaosChannels.map((ch) => (
                    <div
                      key={ch.id}
                      className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                    >
                      <p className="font-semibold text-zinc-950">{ch.title}</p>
                      <p className="mt-1 text-sm text-zinc-600">{ch.body}</p>
                      <div className="mt-3">
                        <LangtontaoChallengeCta
                          challengeId={ch.id}
                          className="!min-w-0 !px-3 !py-1.5 !text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Coffee2Reveal>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              {langtontaoWealthNodes
                .filter((n) => !n.chartType)
                .map((node, index) => (
                  <LangtontaoMindmapNodeCard key={node.id} node={node} index={index} />
                ))}
            </div>
            <Coffee2Reveal>
              <div className="c2-card p-6">
                <h3 className="text-lg font-semibold text-zinc-950">系统升级五阶段</h3>
                <div className="mt-4">
                  <LangtontaoWealthTimeline />
                </div>
              </div>
            </Coffee2Reveal>
            <Coffee2Reveal delay={80}>
              <div className="c2-card p-6">
                <h3 className="text-lg font-semibold text-zinc-950">471 万亿结构</h3>
                <div className="mt-4">
                  <LangtontaoWealthStructureChart />
                </div>
              </div>
            </Coffee2Reveal>
            <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-4 text-center text-sm text-zinc-500">
              P(A|B) = P(B|A)P(A) / P(B) — 贝叶斯式加速：在模糊情境中不断修正先验
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
