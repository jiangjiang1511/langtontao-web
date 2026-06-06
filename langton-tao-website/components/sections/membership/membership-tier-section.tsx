import { ContactTrigger } from '@/components/contact-trigger'
import { Eyebrow, SectionSurface } from '@/components/layout/section-surface'
import type { MembershipTier } from '@/lib/content/membership'
import { cn } from '@/lib/utils'

const tierThemes = ['paper', 'white', 'paper', 'dark'] as const

export function MembershipTierSection({
  tier,
  index,
}: {
  tier: MembershipTier
  index: number
}) {
  const headingId = `${tier.anchor}-heading`
  const theme = tierThemes[index] ?? 'paper'

  return (
    <SectionSurface
      id={tier.anchor}
      theme={theme}
      className={cn(index > 0 && 'border-t-2 border-pop-black')}
      aria-labelledby={headingId}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow>权益详情</Eyebrow>
        {tier.includesLabel ? (
          <span className="inline-block border-2 border-pop-black bg-pop-yellow px-3 py-1 text-xs font-black uppercase tracking-wide">
            {tier.includesLabel}
          </span>
        ) : null}
      </div>

      <h2
        id={headingId}
        className="text-display mt-4 text-[2rem] leading-[1.05] md:text-[2.75rem] lg:text-5xl"
      >
        {tier.title}
      </h2>
      <p className="mt-4 max-w-[720px] text-base font-bold leading-relaxed text-[color:var(--section-muted)] md:text-lg">
        {tier.tagline}
      </p>

      <div className="mt-10 space-y-8">
        {tier.groups.map((group) => (
          <div key={group.title}>
            <h3 className="border-l-4 border-pop-yellow pl-3 text-base font-black md:text-lg">
              {group.title}
            </h3>
            {group.items.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="inline-block border-2 border-pop-black bg-pop-white px-3 py-1.5 text-sm font-bold leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      <ContactTrigger
        intent={tier.contactIntent}
        variant="default"
        className="mt-10"
      >
        预约咨询
      </ContactTrigger>
    </SectionSurface>
  )
}
