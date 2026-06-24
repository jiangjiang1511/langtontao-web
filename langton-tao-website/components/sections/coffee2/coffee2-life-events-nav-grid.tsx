'use client'

import { Coffee2LifeEventCard } from '@/components/sections/coffee2/coffee2-life-event-card'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import type { Coffee2LifeEvent } from '@/lib/content/coffee-manifesto'

type Coffee2LifeEventsNavGridProps = {
  events: readonly Coffee2LifeEvent[]
}

export function Coffee2LifeEventsNavGrid({ events }: Coffee2LifeEventsNavGridProps) {
  return (
    <div id="coffee-life-events-nav-grid" className="coffee2-life-events-nav__grid">
      {events.map((event, index) => (
        <Coffee2Reveal
          key={event.number}
          delay={index * 90}
          className="coffee2-life-events-nav__cell"
        >
          <Coffee2LifeEventCard event={event} href={`#${event.id}`} />
        </Coffee2Reveal>
      ))}
    </div>
  )
}
