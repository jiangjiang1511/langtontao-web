import type { Metadata } from 'next'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { networkColumns } from '@/lib/content/home-sections'
import {
  networkPageHero,
  networkSynergy,
  networkTeaser,
} from '@/lib/content/network-page'
import '@/styles/jarsy-v2.css'

export const metadata: Metadata = {
  title: '一体双跨 | 朗敦道 Langton Tao',
  description:
    '朗敦道一体双跨网络：内地顶层架构中枢与香港跨境交付节点协同，连接全球战略合作伙伴。',
}

export default function NetworkPage() {
  return (
    <div className="jarsy-v2-page bg-white text-zinc-950">
      <section
        className="relative overflow-hidden border-b border-zinc-200 bg-zinc-950 py-24 text-white md:py-32"
        aria-labelledby="network-page-title"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 0%, rgb(99 102 241 / 0.35) 0%, rgb(236 72 153 / 0.15) 45%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <JarsyReveal eager>
            <p className="c2-eyebrow text-zinc-400">{networkPageHero.eyebrow}</p>
          </JarsyReveal>
          <JarsyReveal eager delay={80}>
            <h1
              id="network-page-title"
              className="c2-display mt-4 text-4xl md:text-6xl lg:text-7xl"
            >
              {networkPageHero.title}
            </h1>
          </JarsyReveal>
          <JarsyReveal eager delay={160}>
            <Coffee2AnnotatedText
              text={networkPageHero.subtitle}
              className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg"
            />
          </JarsyReveal>
        </div>
      </section>

      <section
        className="border-b border-zinc-200 py-16 md:py-24"
        aria-labelledby="network-hubs-title"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <JarsyReveal>
            <h2 id="network-hubs-title" className="c2-display text-3xl md:text-4xl">
              双节点布局
            </h2>
          </JarsyReveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {networkTeaser.hubs.map((hub, index) => (
              <JarsyReveal key={hub.id} delay={index * 80}>
                <article
                  id={hub.id}
                  className="c2-card scroll-mt-24 border-l-4 border-l-jarsy-violet p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    {hub.label}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold md:text-3xl">
                    {hub.address}
                  </h3>
                  <Coffee2AnnotatedText
                    text={hub.summary}
                    className="mt-3 text-sm leading-relaxed text-zinc-600"
                  />
                </article>
              </JarsyReveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-b border-zinc-200 bg-zinc-50 py-16 md:py-24"
        aria-labelledby="network-partners-title"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <JarsyReveal>
            <h2
              id="network-partners-title"
              className="c2-display text-3xl md:text-4xl"
            >
              战略合作伙伴
            </h2>
          </JarsyReveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {networkColumns.map((col, index) => (
              <JarsyReveal key={col.title} delay={index * 80}>
                <div className="c2-card p-6">
                  <h3 className="text-lg font-semibold">{col.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {col.bullets.map((item) => (
                      <li key={item} className="text-sm text-zinc-600">
                        · <Coffee2AnnotatedText as="span" text={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </JarsyReveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 md:py-24"
        aria-labelledby="network-synergy-title"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <JarsyReveal>
            <div className="jarsy-glow rounded-2xl border border-zinc-200 bg-white p-8 md:p-10">
              <h2
                id="network-synergy-title"
                className="c2-display text-2xl md:text-4xl"
              >
                {networkSynergy.title}
              </h2>
              <Coffee2AnnotatedText
                text={networkSynergy.body}
                className="mt-4 text-base leading-relaxed text-zinc-600"
              />
            </div>
          </JarsyReveal>
        </div>
      </section>
    </div>
  )
}
