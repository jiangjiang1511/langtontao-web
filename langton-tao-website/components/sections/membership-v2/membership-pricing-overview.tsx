import { ContactTrigger } from '@/components/contact-trigger'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { MembershipJoinLink } from '@/components/sections/membership-v2/membership-join-link'
import {
  membershipBoardSection,
  membershipPricingOverview,
} from '@/lib/content/membership-v2'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const ctaBase =
  'w-full rounded-full border-0 font-semibold shadow-none hover:translate-y-0 hover:shadow-none'

export function MembershipPricingOverview() {
  return (
    <div
      id="tier-overview"
      className="scroll-mt-28 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {membershipPricingOverview.map((tier, index) => (
        <Coffee2Reveal
          key={tier.id}
          as="article"
          delay={80 + index * 90}
          className={cn(
            'flex h-full flex-col p-5 md:p-6',
              tier.mystery
                ? 'member-tier-board rounded-2xl border-2 border-jarsy-violet bg-pop-black text-pop-white shadow-[4px_4px_0_0_var(--jarsy-violet)]'
                : 'member-tier-card c2-card bg-white'
            )}
          >
            <p
              className={cn(
                'text-xs font-black uppercase tracking-widest',
                tier.mystery ? 'text-jarsy-violet' : 'text-zinc-500'
              )}
            >
              {tier.shortName}
            </p>
            <h3
              className={cn(
                'mt-2 text-lg font-black leading-tight md:text-xl',
                tier.mystery ? 'text-pop-white' : 'font-semibold text-zinc-950'
              )}
            >
              {tier.title}
            </h3>
            <p
              className={cn(
                'mt-2 text-sm leading-snug',
                tier.mystery ? 'font-bold text-pop-white/80' : 'text-zinc-600'
              )}
            >
              {tier.tagline}
            </p>

            {tier.mystery ? (
              <div className="relative mt-5 overflow-hidden rounded-xl border-2 border-jarsy-violet/40 px-4 py-6 text-center">
                <div
                  className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(139,92,246,0.15)_0px,rgba(139,92,246,0.15)_10px,transparent_10px,transparent_20px)]"
                  aria-hidden
                />
                <p className="relative z-10 text-xs font-black uppercase tracking-widest text-jarsy-violet">
                  邀请制
                </p>
                <p className="relative z-10 mt-2 text-sm font-bold text-pop-white/85">
                  {membershipBoardSection.mysteryCardHint}
                </p>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-4 text-center">
                <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                  预约了解
                </p>
                <p className="mt-1 text-base font-semibold text-zinc-950">
                  专属方案报价
                </p>
              </div>
            )}

            {tier.mystery ? (
              <ContactTrigger
                intent={tier.contactIntent}
                variant="default"
                size="lg"
                className={cn(
                  ctaBase,
                  'mt-4',
                  '!border-2 !border-pop-black !bg-jarsy-violet !font-black !text-pop-black hover:!-translate-y-0.5 hover:!bg-jarsy-violet hover:!shadow-[4px_4px_0_0_#09090b]'
                )}
              >
                私董会咨询
              </ContactTrigger>
            ) : (
              <MembershipJoinLink
                variant="dark"
                size="lg"
                className={cn(ctaBase, 'coffee2-cta-button mt-4')}
              />
            )}

            <ul className="mt-5 flex-1 space-y-2">
              {tier.includesLabel ? (
                <li>
                  <span
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs leading-snug md:text-sm',
                      tier.mystery
                        ? 'border border-jarsy-violet/40 bg-jarsy-violet/15 font-bold text-jarsy-violet'
                        : 'border border-zinc-200 bg-zinc-50 text-zinc-600'
                    )}
                  >
                    <Check
                      className={cn(
                        'h-4 w-4 shrink-0',
                        tier.mystery ? 'text-jarsy-violet' : 'text-zinc-500'
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
                    'flex gap-2 text-xs leading-snug md:text-sm',
                    tier.mystery
                      ? 'font-bold text-pop-white/90'
                      : 'text-zinc-700'
                  )}
                >
                  <Check
                    className={cn(
                      'mt-0.5 h-4 w-4 shrink-0',
                      tier.mystery ? 'text-jarsy-violet' : 'text-zinc-950'
                    )}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p
              className={cn(
                'mt-5 border-t pt-4 text-xs leading-relaxed',
                tier.mystery
                  ? 'border-pop-white/20 text-pop-white/70'
                  : 'border-zinc-200 text-zinc-500'
              )}
            >
              {tier.audience}
            </p>
        </Coffee2Reveal>
      ))}
    </div>
  )
}
