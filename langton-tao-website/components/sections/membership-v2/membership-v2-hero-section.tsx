import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { membershipV2Hero } from '@/lib/content/membership-v2'

export function MembershipV2HeroSection() {
  return (
    <section
      id="member-hero"
      className="scroll-mt-28 border-b border-zinc-200"
      aria-labelledby="member-hero-title"
    >
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col items-center justify-end px-4 pb-16 pt-28 text-center sm:px-6 md:pb-24 md:pt-32 lg:px-8">
        <JarsyReveal eager delay={0}>
          <p className="c2-eyebrow">{membershipV2Hero.eyebrow}</p>
        </JarsyReveal>

        <JarsyReveal eager delay={60}>
          <p className="mt-4 text-sm font-semibold tracking-wide text-zinc-500 md:text-base">
            {membershipV2Hero.slogan}
          </p>
        </JarsyReveal>

        <JarsyReveal eager delay={120} className="mt-8 w-full overflow-hidden">
          {membershipV2Hero.titleLines.map((line) => (
            <p
              key={line}
              className="c2-display text-[clamp(2rem,7vw,5.5rem)] text-zinc-950"
              aria-hidden
            >
              {line}
            </p>
          ))}
        </JarsyReveal>

        <h1 id="member-hero-title" className="sr-only">
          {membershipV2Hero.titleLines.join('')}
        </h1>

        <JarsyReveal eager delay={200}>
          <p className="mx-auto mt-8 max-w-xl text-lg font-semibold text-zinc-800 md:text-xl">
            {membershipV2Hero.subtitle}
          </p>
        </JarsyReveal>
      </div>
    </section>
  )
}
