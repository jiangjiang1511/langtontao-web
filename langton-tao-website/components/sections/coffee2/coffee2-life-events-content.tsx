'use client'

import { useEffect } from 'react'
import { Coffee2LifeEventSection } from '@/components/sections/coffee2/coffee2-life-event-section'
import { coffee2LifeEvents } from '@/lib/content/coffee-manifesto'

export function Coffee2LifeEventsContent() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return

    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [])

  return (
    <div id="coffee-life-events-content">
      {coffee2LifeEvents.map((event, index) => (
        <Coffee2LifeEventSection key={event.id} event={event} index={index} />
      ))}
    </div>
  )
}
