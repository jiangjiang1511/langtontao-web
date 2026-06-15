'use client'

import { Coffee2LifeEventCard } from '@/components/sections/coffee2/coffee2-life-event-card'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import type { Coffee2LifeEvent } from '@/lib/content/coffee-manifesto'

type Coffee2LifeEventsNavGridProps = {
  events: readonly Coffee2LifeEvent[]
}

export function Coffee2LifeEventsNavGrid({ events }: Coffee2LifeEventsNavGridProps) {
  const row1 = events.slice(0, 3)
  const row2 = events.slice(3, 5)

  return (
    <div id="coffee-life-events-nav-grid" className="coffee2-life-events-nav__grid">
      <div className="coffee2-life-events-nav__row coffee2-life-events-nav__row--3">
        {row1.map((event, index) => (
          <Coffee2Reveal
            key={event.number}
            delay={index * 90}
            className="coffee2-life-events-nav__cell"
          >
            <Coffee2LifeEventCard event={event} href={`#${event.id}`} />
          </Coffee2Reveal>
        ))}
      </div>
      <div className="coffee2-life-events-nav__row coffee2-life-events-nav__row--2">
        {row2.map((event, index) => (
          <Coffee2Reveal
            key={event.number}
            delay={(index + 3) * 90}
            className="coffee2-life-events-nav__cell"
          >
            <Coffee2LifeEventCard event={event} href={`#${event.id}`} />
          </Coffee2Reveal>
        ))}
      </div>
    </div>
  )
}
