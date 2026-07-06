'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { onHeroDecorReady } from '@/lib/hero-ready'
import { LANGTONTAO_HERO_VIDEO_POSTER } from '@/lib/langtontao-hero-video-assets'

const LangtontaoHeroVideoBackground = dynamic(
  () =>
    import('@/components/sections/langtontao/langtontao-hero-video-background').then(
      (module) => ({ default: module.LangtontaoHeroVideoBackground })
    ),
  { ssr: false }
)

export function LangtontaoHeroVideoBackgroundLazy() {
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    let cancelled = false

    const cancelReady = onHeroDecorReady(() => {
      if (!cancelled) setShowVideo(true)
    })

    return () => {
      cancelled = true
      cancelReady()
    }
  }, [])

  if (!showVideo) {
    return (
      <div className="langtontao-hero__video-wrap" aria-hidden>
        <img
          src={LANGTONTAO_HERO_VIDEO_POSTER}
          alt=""
          className="langtontao-hero__video"
          decoding="async"
          fetchPriority="high"
        />
      </div>
    )
  }

  return <LangtontaoHeroVideoBackground />
}
