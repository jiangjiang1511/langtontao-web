import { ContactTrigger } from '@/components/contact-trigger'
import { membershipBoardSection } from '@/lib/content/membership-v2'

const ctaClass =
  'rounded-full border-0 bg-white font-semibold text-zinc-950 shadow-none hover:bg-zinc-100 hover:translate-y-0 hover:shadow-none'

export function MembershipBoardSection() {
  return (
    <section
      id="tier-board"
      className="scroll-mt-28 border-b border-zinc-800 bg-zinc-950 py-16 text-white md:py-24"
      aria-labelledby="tier-board-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="c2-eyebrow text-zinc-500">{membershipBoardSection.eyebrow}</p>
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
        <p className="mt-4 max-w-[720px] text-base leading-relaxed text-zinc-400 md:text-lg">
          {membershipBoardSection.tagline}
        </p>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-8 md:p-12">
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

        <ContactTrigger
          intent={membershipBoardSection.contactIntent}
          variant="dark"
          size="lg"
          className={ctaClass}
        >
          预约咨询
        </ContactTrigger>
      </div>
    </section>
  )
}
