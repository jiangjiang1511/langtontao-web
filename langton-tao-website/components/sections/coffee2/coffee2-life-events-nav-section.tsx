import { Coffee2LifeEventsNavGrid } from '@/components/sections/coffee2/coffee2-life-events-nav-grid'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  coffee2LifeEvents,
  coffee2LifeEventsSectionMeta,
} from '@/lib/content/coffee-manifesto'

export function Coffee2LifeEventsNavSection() {
  return (
    <section
      id="coffee-life-events"
      className="coffee2-life-events-nav scroll-mt-28 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="coffee2-life-events-nav-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal className="coffee2-life-events-nav__header">
          <p className="c2-eyebrow">{coffee2LifeEventsSectionMeta.eyebrow}</p>
          <h2
            id="coffee2-life-events-nav-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            {coffee2LifeEventsSectionMeta.title}
          </h2>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-400 md:text-3xl">
            {coffee2LifeEventsSectionMeta.subtitle}
          </p>
        </Coffee2Reveal>

        <Coffee2LifeEventsNavGrid events={coffee2LifeEvents} />
      </div>
    </section>
  )
}
