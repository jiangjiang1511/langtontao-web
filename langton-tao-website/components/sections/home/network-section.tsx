import Link from 'next/link'
import { networkCities, networkStat } from '@/lib/content/home-sections'
import { SectionSurface, SectionTitle } from '@/components/layout/section-surface'

export function NetworkSection() {
  return (
    <SectionSurface id="network" theme="paper" aria-labelledby="network-title">
      <SectionTitle id="network-title" display>
        全球网络
      </SectionTitle>
      <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed text-[color:var(--section-muted)]">
        {networkStat}
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {networkCities.map((city) => (
          <span
            key={city}
            className="rounded-full border-2 border-pop-black bg-pop-white px-4 py-2 text-sm font-black text-pop-black"
          >
            {city}
          </span>
        ))}
      </div>
      <p className="mt-8">
        <Link
          href="/coffee#network"
          className="text-sm font-black text-pop-black underline-offset-4 hover:underline"
        >
          一体双跨网络 →
        </Link>
      </p>
    </SectionSurface>
  )
}
