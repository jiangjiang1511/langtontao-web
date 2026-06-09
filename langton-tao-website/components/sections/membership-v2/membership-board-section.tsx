import { ContactTrigger } from '@/components/contact-trigger'
import { membershipBoardSection } from '@/lib/content/membership-v2'
import { Eyebrow, SectionSurface } from '@/components/layout/section-surface'

export function MembershipBoardSection() {
  return (
    <SectionSurface
      id="tier-board"
      theme="dark"
      className="border-t-2 border-pop-black"
      aria-labelledby="tier-board-heading"
    >
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow>{membershipBoardSection.eyebrow}</Eyebrow>
        <span className="inline-block border-2 border-pop-yellow bg-pop-yellow px-3 py-1 text-xs font-black uppercase tracking-wide text-pop-black">
          {membershipBoardSection.includesLabel}
        </span>
      </div>

      <h2
        id="tier-board-heading"
        className="text-display mt-4 text-[2rem] leading-[1.05] md:text-[2.75rem] lg:text-5xl"
      >
        {membershipBoardSection.title}
      </h2>
      <p className="mt-4 max-w-[720px] text-base font-bold leading-relaxed text-[color:var(--section-muted)] md:text-lg">
        {membershipBoardSection.tagline}
      </p>

      <div className="relative mt-10 overflow-hidden rounded-lg border-2 border-pop-yellow bg-pop-black p-8 md:p-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,230,0,0.12)_0px,rgba(255,230,0,0.12)_12px,transparent_12px,transparent_24px)]"
          aria-hidden
        />
        <div className="relative z-10 max-w-xl">
          <p className="text-sm font-black uppercase tracking-widest text-pop-yellow">
            {membershipBoardSection.mysteryEyebrow}
          </p>
          <p className="mt-4 text-base font-bold leading-relaxed text-pop-white/85 md:text-lg">
            {membershipBoardSection.mysteryLead}
          </p>
        </div>
      </div>

      <ContactTrigger
        intent={membershipBoardSection.contactIntent}
        variant="default"
        size="lg"
        className="mt-10"
      >
        预约咨询
      </ContactTrigger>
    </SectionSurface>
  )
}
