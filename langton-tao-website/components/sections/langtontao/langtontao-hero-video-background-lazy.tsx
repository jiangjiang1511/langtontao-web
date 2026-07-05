'use client'

import dynamic from 'next/dynamic'

export const LangtontaoHeroVideoBackgroundLazy = dynamic(
  () =>
    import('@/components/sections/langtontao/langtontao-hero-video-background').then(
      (module) => ({ default: module.LangtontaoHeroVideoBackground })
    ),
  { ssr: false }
)
