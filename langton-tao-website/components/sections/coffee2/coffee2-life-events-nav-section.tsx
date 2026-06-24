'use client'

import { Coffee2LifeEventsNavGrid } from '@/components/sections/coffee2/coffee2-life-events-nav-grid'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2DisplayTypewriter } from '@/components/sections/coffee2/coffee2-display-typewriter'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  coffee2LifeEvents,
  coffee2LifeEventsSectionMeta,
} from '@/lib/content/coffee-manifesto'

export function Coffee2LifeEventsNavSection() {
  return (
    <section
      id="coffee-life-events"
      className="coffee2-life-events-nav scroll-mt-28 pt-6 pb-16 md:pt-8 md:pb-24"
      aria-labelledby="coffee2-life-events-nav-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2LifeEventsNavGrid events={coffee2LifeEvents} />

        <Coffee2Reveal className="coffee2-life-events-nav__header">
          <p className="c2-eyebrow">{coffee2LifeEventsSectionMeta.eyebrow}</p>
          <h2
            id="coffee2-life-events-nav-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            <Coffee2DisplayTypewriter
              text={coffee2LifeEventsSectionMeta.title}
              charStagger={110}
            />
          </h2>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-400 md:text-3xl">
            {coffee2LifeEventsSectionMeta.subtitle}
          </p>
          <div className="coffee2-life-events-nav__lead mt-6 space-y-4 text-base leading-relaxed text-zinc-600 md:text-lg">
            {coffee2LifeEventsSectionMeta.lead.split('\n\n').map((paragraph, index) => (
              <Coffee2AnnotatedText key={index} text={paragraph} />
            ))}
          </div>
        </Coffee2Reveal>
      </div>
    </section>
  )
}
