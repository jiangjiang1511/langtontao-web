import type { Metadata } from 'next'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { networkColumns } from '@/lib/content/home-sections'
import {
  networkPageHero,
  networkSynergy,
  networkTeaser,
} from '@/lib/content/network-page'
import {
  Eyebrow,
  SectionSurface,
  SectionTitle,
} from '@/components/layout/section-surface'

export const metadata: Metadata = {
  title: '一体双跨 | 朗敦道 Langton Tao',
  description:
    '朗敦道一体双跨网络：内地顶层架构中枢与香港跨境交付节点协同，连接全球战略合作伙伴。',
}

export default function NetworkPage() {
  return (
    <>
      <SectionSurface
        theme="dark"
        className="pt-24 md:pt-28"
        aria-labelledby="network-page-title"
      >
        <Eyebrow>{networkPageHero.eyebrow}</Eyebrow>
        <SectionTitle id="network-page-title" display>
          {networkPageHero.title}
        </SectionTitle>
        <Coffee2AnnotatedText
          text={networkPageHero.subtitle}
          className="mt-6 max-w-2xl text-base font-bold leading-relaxed text-[color:var(--section-muted)] md:text-lg"
        />
      </SectionSurface>

      <SectionSurface theme="paper" aria-labelledby="network-hubs-title">
        <SectionTitle id="network-hubs-title">双节点布局</SectionTitle>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {networkTeaser.hubs.map((hub) => (
            <article
              key={hub.id}
              id={hub.id}
              className="scroll-mt-24 rounded-lg border-2 border-pop-black border-l-4 border-l-pop-yellow bg-pop-white p-6"
            >
              <p className="text-xs font-black uppercase tracking-widest text-pop-black/50">
                {hub.label}
              </p>
              <h3 className="mt-2 text-2xl font-black md:text-3xl">
                {hub.address}
              </h3>
              <Coffee2AnnotatedText
                text={hub.summary}
                className="mt-3 text-sm font-bold leading-relaxed text-pop-black/70"
              />
            </article>
          ))}
        </div>
      </SectionSurface>

      <SectionSurface theme="white" aria-labelledby="network-partners-title">
        <SectionTitle id="network-partners-title">战略合作伙伴</SectionTitle>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {networkColumns.map((col) => (
            <div
              key={col.title}
              className="rounded-lg border-2 border-pop-black bg-pop-paper p-6"
            >
              <h3 className="text-lg font-black">{col.title}</h3>
              <ul className="mt-4 space-y-2">
                {col.bullets.map((item) => (
                  <li
                    key={item}
                    className="text-sm font-bold text-[color:var(--section-muted)]"
                  >
                    · <Coffee2AnnotatedText as="span" text={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionSurface>

      <SectionSurface theme="yellow" narrow aria-labelledby="network-synergy-title">
        <div className="border-2 border-pop-black p-8 md:p-10">
          <h2
            id="network-synergy-title"
            className="text-display text-2xl md:text-4xl"
          >
            {networkSynergy.title}
          </h2>
          <Coffee2AnnotatedText
            text={networkSynergy.body}
            className="mt-4 text-base font-bold leading-relaxed text-pop-black/80"
          />
        </div>
      </SectionSurface>
    </>
  )
}
