import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { MembershipJoinLink } from '@/components/sections/membership-v2/membership-join-link'
import { membershipBoardSection } from '@/lib/content/membership-v2'

export function MembershipBoardSection() {
  return (
    <section
      className="member-section member-section--board scroll-mt-28 border-b border-zinc-800 bg-zinc-950 py-16 text-white md:py-24"
      aria-labelledby="tier-board-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <p className="c2-eyebrow text-zinc-500">
              {membershipBoardSection.eyebrow}
            </p>
            <span className="c2-chip border-zinc-700 bg-zinc-900 text-zinc-300">
              {membershipBoardSection.includesLabel}
            </span>
          </div>

          <h2
            id="tier-board-heading"
            className="c2-display mt-4 text-4xl text-white md:text-5xl"
          >
            {membershipBoardSection.title}
          </h2>
        </Coffee2Reveal>

        <Coffee2Reveal delay={100} className="c2-reveal-fade">
          <p className="mt-4 max-w-[720px] text-base leading-relaxed text-zinc-400 md:text-lg">
            {membershipBoardSection.tagline}
          </p>
        </Coffee2Reveal>

        <Coffee2Reveal delay={180}>
          <div className="member-board-mystery relative mt-10 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-8 md:p-12">
            <div
              className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_12px,transparent_12px,transparent_24px)]"
              aria-hidden
            />
            <div className="relative z-10 max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
                {membershipBoardSection.mysteryEyebrow}
              </p>
              <p className="mt-4 text-base leading-relaxed text-zinc-300 md:text-lg">
                {membershipBoardSection.mysteryLead}
              </p>
            </div>
          </div>
        </Coffee2Reveal>

        <Coffee2Reveal delay={260} className="c2-reveal-fade">
          <div className="member-board-cta-wrap">
            <MembershipJoinLink
              variant="dark"
              size="lg"
              className="c2-btn-cta-emphasis"
            />
          </div>
        </Coffee2Reveal>
      </div>
    </section>
  )
}
