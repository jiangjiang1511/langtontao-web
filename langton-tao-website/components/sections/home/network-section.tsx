import Link from 'next/link'
import { networkTeaser } from '@/lib/content/network-page'
import { Eyebrow, SectionSurface, SectionTitle } from '@/components/layout/section-surface'
import { PillLink } from '@/components/ui/pill-link'

export function NetworkSection() {
  return (
    <SectionSurface id="network" theme="paper" aria-labelledby="network-title">
      <Eyebrow>{networkTeaser.eyebrow}</Eyebrow>
      <SectionTitle id="network-title" display>
        {networkTeaser.title}
      </SectionTitle>
      <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed text-[color:var(--section-muted)]">
        {networkTeaser.subtitle}
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {networkTeaser.hubs.map((hub) => (
          <Link
            key={hub.id}
            href={networkTeaser.ctaHref}
            className="pop-card group rounded-lg border-2 border-pop-black bg-pop-white p-6 shadow-pop-black transition-transform hover:-translate-y-1"
          >
            <p className="text-xs font-black uppercase tracking-widest text-pop-black/50">
              {hub.label}
            </p>
            <p className="mt-2 text-xl font-black text-pop-black md:text-2xl">
              {hub.address}
            </p>
            <p className="mt-3 text-sm font-bold leading-relaxed text-pop-black/70">
              {hub.summary}
            </p>
            <span className="mt-4 inline-block text-sm font-black text-pop-black group-hover:underline">
              查看详情 →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <PillLink href={networkTeaser.ctaHref} variant="outline">
          {networkTeaser.ctaLabel}
        </PillLink>
      </div>
    </SectionSurface>
  )
}
