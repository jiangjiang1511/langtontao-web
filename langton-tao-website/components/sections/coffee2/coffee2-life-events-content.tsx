'use client'

import { useEffect } from 'react'
import { Coffee2LifeEventSection } from '@/components/sections/coffee2/coffee2-life-event-section'
import {
  DeferredMount,
  type MountStrategy,
} from '@/components/shared/deferred-mount'
import { coffee2LifeEvents } from '@/lib/content/coffee-manifesto'
import { sectionMinHeight } from '@/lib/deferred-mount-heights'

function getLifeEventMountConfig(index: number): {
  mountStrategy: MountStrategy
  idleStaggerIndex?: number
} {
  if (index === 0) return { mountStrategy: 'immediate' }
  if (index === 1) return { mountStrategy: 'idle', idleStaggerIndex: 0 }
  if (index === 2) return { mountStrategy: 'idle', idleStaggerIndex: 1 }
  return { mountStrategy: 'lazy' }
}

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
      {coffee2LifeEvents.map((event, index) => {
        const mountConfig = getLifeEventMountConfig(index)

        return (
          <DeferredMount
            key={event.id}
            anchorId={event.id}
            minHeight={sectionMinHeight(event.id)}
            mountStrategy={mountConfig.mountStrategy}
            idleStaggerIndex={mountConfig.idleStaggerIndex}
          >
            <Coffee2LifeEventSection event={event} index={index} />
          </DeferredMount>
        )
      })}
    </div>
  )
}
