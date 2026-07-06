'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { LANGTONTAO_HERO_VIDEO_POSTER } from '@/components/sections/langtontao/langtontao-hero-video-background'
import { onCurrentHeroReady } from '@/lib/hero-ready'

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

    const cancelReady = onCurrentHeroReady(() => {
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
        />
      </div>
    )
  }

  return <LangtontaoHeroVideoBackground />
}
