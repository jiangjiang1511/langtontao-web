'use client'

import { useEffect, useState } from 'react'
import { LangtontaoWishlistFlashcardDeck } from '@/components/sections/langtontao/langtontao-wishlist-flashcard-deck'
import { LangtontaoWishlistResults } from '@/components/sections/langtontao/langtontao-wishlist-results'
import { WishlistTopicWindows } from '@/components/sections/langtontao/langtontao-wishlist-topic-windows'
import { flattenToDiscoveredWaypoints } from '@/lib/content/langtontao/langtontao-wishlist-timeline'
import type { WishlistAnswers } from '@/lib/content/langtontao/langtontao-wishlist-survey'
import { readWishlistFromUrl, WISHLIST_ANCHOR_ID } from '@/lib/langtontao/wishlist-share'

export function LangtontaoDecadeWishlistBook() {
  const [sharedAnswers, setSharedAnswers] = useState<WishlistAnswers | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const fromUrl = readWishlistFromUrl()
    if (fromUrl) setSharedAnswers(fromUrl)
    setHydrated(true)
  }, [])

  const handleRestartFromShare = () => {
    setSharedAnswers(null)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.delete('wl')
      url.hash = `#${WISHLIST_ANCHOR_ID}`
      window.history.replaceState(null, '', url.toString())
    }
  }

  if (!hydrated) return null

  if (sharedAnswers) {
    return (
      <div id={WISHLIST_ANCHOR_ID} className="scroll-mt-28">
        <div className="lt-wishlist-survey mx-auto w-full max-w-lg">
          <WishlistTopicWindows items={flattenToDiscoveredWaypoints()} />
          <div className="mt-8">
            <LangtontaoWishlistResults
              answers={sharedAnswers}
              onRestart={handleRestartFromShare}
              readOnly
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id={WISHLIST_ANCHOR_ID} className="scroll-mt-28">
      <LangtontaoWishlistFlashcardDeck />
    </div>
  )
}
