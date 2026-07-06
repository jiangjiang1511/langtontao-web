import { LangtontaoHeroMotion } from '@/components/sections/langtontao/langtontao-hero-motion'
import { LangtontaoHeroVideoBackgroundLazy } from '@/components/sections/langtontao/langtontao-hero-video-background-lazy'

export function LangtontaoHeroSection() {
  return (
    <section
      id="langtontao-hero"
      className="langtontao-hero langtontao-hero--video relative scroll-mt-20 overflow-hidden border-b border-zinc-200"
      aria-labelledby="langtontao-hero-title"
    >
      <div className="langtontao-hero__inner relative z-10 mx-auto flex max-w-7xl flex-col px-4 text-center sm:px-6 lg:px-8">
        <div className="langtontao-hero__upper" aria-hidden>
          <LangtontaoHeroVideoBackgroundLazy />
        </div>

        <LangtontaoHeroMotion />
      </div>
    </section>
  )
}
