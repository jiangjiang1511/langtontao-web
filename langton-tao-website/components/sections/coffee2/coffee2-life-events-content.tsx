'use client'

import { useEffect } from 'react'
import { Coffee2LifeEventSection } from '@/components/sections/coffee2/coffee2-life-event-section'
import { DeferredMount } from '@/components/shared/deferred-mount'
import { coffee2LifeEvents } from '@/lib/content/coffee-manifesto'
import { sectionMinHeight } from '@/lib/deferred-mount-heights'

export function Coffee2LifeEventsContent() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return

    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    })
  }, [])

  return (
    <div id="coffee-life-events-content">
      {coffee2LifeEvents.map((event, index) => (
        <DeferredMount
          key={event.id}
          anchorId={event.id}
          minHeight={sectionMinHeight(event.id)}
          mountStrategy="lazy"
        >
          <Coffee2LifeEventSection event={event} index={index} />
        </DeferredMount>
      ))}
    </div>
  )
}
