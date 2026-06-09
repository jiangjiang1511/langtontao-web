import { ContactTrigger } from '@/components/contact-trigger'
import {
  membershipBoardSection,
  membershipPricingOverview,
} from '@/lib/content/membership-v2'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export function MembershipPricingOverview() {
  return (
    <div
      id="tier-overview"
      className="scroll-mt-24 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {membershipPricingOverview.map((tier) => (
        <article
          key={tier.id}
          className={cn(
            'flex flex-col rounded-lg border-2 p-5 md:p-6',
            tier.mystery
              ? 'border-pop-yellow bg-pop-black text-pop-white shadow-pop-yellow'
              : 'border-pop-black bg-pop-white shadow-pop-black'
          )}
        >
          <p
            className={cn(
              'text-xs font-black uppercase tracking-widest',
              tier.mystery ? 'text-pop-yellow' : 'text-pop-black/50'
            )}
          >
            {tier.shortName}
          </p>
          <h3
            className={cn(
              'mt-2 text-lg font-black leading-tight md:text-xl',
              tier.mystery && 'text-pop-white'
            )}
          >
            {tier.title}
          </h3>
          <p
            className={cn(
              'mt-2 text-sm font-bold leading-snug',
              tier.mystery ? 'text-pop-white/75' : 'text-pop-black/70'
            )}
          >
            {tier.tagline}
          </p>

          {tier.mystery ? (
            <div className="relative mt-5 overflow-hidden rounded-lg border-2 border-pop-yellow/40 px-4 py-6 text-center">
              <div
                className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,230,0,0.15)_0px,rgba(255,230,0,0.15)_10px,transparent_10px,transparent_20px)]"
                aria-hidden
              />
              <p className="relative z-10 text-xs font-black uppercase tracking-widest text-pop-yellow">
                邀请制
              </p>
              <p className="relative z-10 mt-2 text-sm font-bold text-pop-white/80">
                {membershipBoardSection.mysteryCardHint}
              </p>
            </div>
          ) : (
            <div className="mt-5 rounded-lg border-2 border-dashed border-pop-black/25 bg-pop-paper px-4 py-4 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-pop-black/50">
                预约了解
              </p>
              <p className="mt-1 text-base font-black text-pop-black">
                专属方案报价
              </p>
            </div>
          )}

          <ContactTrigger
            intent={tier.contactIntent}
            variant="default"
            size="lg"
            className="mt-4 w-full"
          >
            {tier.mystery ? '私董会咨询' : '预约咨询'}
          </ContactTrigger>

          <ul className="mt-5 flex-1 space-y-2">
            {tier.includesLabel ? (
              <li>
                <span
                  className={cn(
                    'inline-flex items-center gap-2 rounded border px-2 py-1 text-xs font-bold leading-snug md:text-sm',
                    tier.mystery
                      ? 'border-pop-yellow/40 bg-pop-yellow/15 text-pop-yellow'
                      : 'border-pop-black/25 bg-pop-paper text-pop-black/70'
                  )}
                >
                  <Check
                    className={cn(
                      'mt-0.5 h-4 w-4 shrink-0',
                      tier.mystery ? 'text-pop-yellow' : 'text-pop-black/50'
                    )}
                  />
                  {tier.includesLabel}
                </span>
              </li>
            ) : null}
            {tier.highlights.map((item) => (
              <li
                key={item}
                className={cn(
                  'flex gap-2 text-xs font-bold leading-snug md:text-sm',
                  tier.mystery ? 'text-pop-white/85' : 'text-pop-black/80'
                )}
              >
                <Check
                  className={cn(
                    'mt-0.5 h-4 w-4 shrink-0',
                    tier.mystery ? 'text-pop-yellow' : 'text-pop-black'
                  )}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p
            className={cn(
              'mt-5 border-t-2 pt-4 text-xs font-bold leading-relaxed',
              tier.mystery
                ? 'border-pop-white/20 text-pop-white/65'
                : 'border-pop-black/10 text-pop-black/60'
            )}
          >
            {tier.audience}
          </p>
        </article>
      ))}
    </div>
  )
}
