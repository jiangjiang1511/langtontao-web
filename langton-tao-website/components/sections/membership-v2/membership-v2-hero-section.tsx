import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2TypewriterReveal } from '@/components/sections/coffee2/coffee2-typewriter-reveal'
import { LangtontaoHeroVideoBackground } from '@/components/sections/langtontao/langtontao-hero-video-background'
import { membershipV2Hero } from '@/lib/content/membership-v2'

export function MembershipV2HeroSection() {
  const [titleMain, titleSub] = membershipV2Hero.titleLines

  return (
    <section
      id="member-hero"
      className="langtontao-hero langtontao-hero--video relative scroll-mt-28 overflow-hidden border-b border-zinc-200"
      aria-labelledby="member-hero-title"
    >
      <div className="langtontao-hero__inner relative z-10 mx-auto flex max-w-7xl flex-col px-4 text-center sm:px-6 lg:px-8">
        <div className="langtontao-hero__upper" aria-hidden>
          <LangtontaoHeroVideoBackground />
        </div>

        <div className="langtontao-hero__headline w-full max-w-3xl">
          <Coffee2Reveal eager delay={200}>
            <p className="c2-eyebrow">{membershipV2Hero.eyebrow}</p>
          </Coffee2Reveal>

          <Coffee2Reveal eager delay={360}>
            <p className="mt-4 text-sm font-semibold tracking-wide text-zinc-500 md:text-base">
              {membershipV2Hero.slogan}
            </p>
          </Coffee2Reveal>

          <h1 id="member-hero-title" className="langtontao-hero__title mt-6 md:mt-8">
            <Coffee2Reveal
              eager
              delay={520}
              as="span"
              className="langtontao-hero__title-main c2-display block text-zinc-950"
            >
              {titleMain}
            </Coffee2Reveal>
          </h1>
        </div>

        <div className="langtontao-hero__lower">
          <Coffee2TypewriterReveal
            eager
            baseDelay={880}
            charStagger={120}
            className="langtontao-hero__title-sub c2-display mx-auto block max-w-3xl text-zinc-700"
            text={titleSub}
          />

          <Coffee2Reveal eager delay={680} className="langtontao-hero__lead mt-6 w-full max-w-2xl">
            <p className="langtontao-hero__lead-text text-base leading-relaxed text-zinc-600 md:text-lg">
              {membershipV2Hero.subtitle}
            </p>
          </Coffee2Reveal>
        </div>
      </div>
    </section>
  )
}
