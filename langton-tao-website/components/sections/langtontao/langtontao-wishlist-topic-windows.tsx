'use client'

import { LangtontaoChallengeCta } from '@/components/sections/langtontao/langtontao-challenge-cta'
import {
  getTopicPhilosophy,
  type WishlistDiscoveredWaypoint,
} from '@/lib/content/langtontao/langtontao-wishlist-timeline'

export type DiscoveredWaypoint = WishlistDiscoveredWaypoint

type WishlistTopicWindowsProps = {
  items: DiscoveredWaypoint[]
}

export function WishlistTopicWindows({ items }: WishlistTopicWindowsProps) {
  if (items.length === 0) return null

  return (
    <div className="lt-wishlist-topic-matrix" aria-label="途经关注点窗口">
      {items.map((item) => {
        const primaryTopicId = item.topicIds[0]
        if (!primaryTopicId) return null

        const philosophy = getTopicPhilosophy(primaryTopicId)

        return (
          <details
            key={item.waypointId}
            className="lt-wishlist-topic-window lt-wishlist-topic-window--enter group"
          >
            <summary className="lt-wishlist-topic-window__summary">
              <p className="lt-wishlist-topic-window__label">途经关注点</p>
              <h4 className="lt-wishlist-topic-window__title">{item.label}</h4>
              <p className="lt-wishlist-topic-window__teaser">{item.teaser}</p>
            </summary>
            <div className="lt-wishlist-topic-window__body">
              {philosophy ? (
                <p className="lt-wishlist-topic-window__philosophy">{philosophy}</p>
              ) : null}
              <div className="lt-wishlist-topic-window__cta">
                <LangtontaoChallengeCta
                  challengeId={primaryTopicId}
                  label="查看方案 →"
                  className="!px-3 !py-1.5 text-xs"
                />
              </div>
            </div>
          </details>
        )
      })}
    </div>
  )
}
