import { LangtontaoHeroVideoBackgroundLazy } from '@/components/sections/langtontao/langtontao-hero-video-background-lazy'
import { MembershipV2HeroMotion } from '@/components/sections/membership-v2/membership-v2-hero-motion'

export function MembershipV2HeroSection() {
  return (
    <section
      id="member-hero"
      className="langtontao-hero langtontao-hero--video langtontao-hero--member relative scroll-mt-28 overflow-hidden border-b border-zinc-200"
      aria-labelledby="member-hero-title"
    >
      <div className="langtontao-hero__inner relative z-10 mx-auto flex max-w-7xl flex-col px-4 text-center sm:px-6 lg:px-8">
        <div className="langtontao-hero__upper" aria-hidden>
          <LangtontaoHeroVideoBackgroundLazy />
        </div>

        <MembershipV2HeroMotion />
      </div>
    </section>
  )
}
