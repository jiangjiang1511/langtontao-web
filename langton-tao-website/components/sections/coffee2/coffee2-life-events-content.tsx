'use client'

import { useEffect } from 'react'
import { Coffee2LifeEventSection } from '@/components/sections/coffee2/coffee2-life-event-section'
import { DeferredMount } from '@/components/shared/deferred-mount'
import { coffee2LifeEvents } from '@/lib/content/coffee-manifesto'
import { sectionMinHeight } from '@/lib/deferred-mount-heights'
import '@/app/coffee/coffee-interactive.css'
import '@/app/coffee/debt-section.css'
import '@/app/coffee/alliance-section.css'
import '@/app/coffee/retirement-section.css'
import '@/app/coffee/invest-modules.css'
import '@/app/coffee/education-section.css'
import '@/app/coffee/child-cost-section.css'
import '@/app/coffee/legacy-section.css'

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
