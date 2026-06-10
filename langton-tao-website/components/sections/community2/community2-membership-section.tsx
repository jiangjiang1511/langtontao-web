import Link from 'next/link'
import { ContactTrigger } from '@/components/contact-trigger'
import { Community2Reveal } from '@/components/sections/community2/community2-reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  community2Faq,
  community2MembershipDetails,
  communityMembershipMeta,
} from '@/lib/content/community2-page'
import { membershipPricingOverview } from '@/lib/content/membership-v2'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export function Community2MembershipSection() {
  return (
    <section
      id="membership-tiers"
      className="scroll-mt-20 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="community2-membership-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Community2Reveal className="max-w-2xl">
          <p className="c2-eyebrow">{communityMembershipMeta.eyebrow}</p>
          <h2
            id="community2-membership-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            {communityMembershipMeta.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
            {communityMembershipMeta.lead}
          </p>
        </Community2Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {membershipPricingOverview.map((tier, index) => (
            <Community2Reveal
              key={tier.id}
              as="article"
              delay={index * 70}
              className={cn(
                'c2-card flex flex-col p-5 md:p-6',
                tier.mystery && 'border-zinc-950 bg-zinc-950 text-white'
              )}
            >
              <p
                className={cn(
                  'text-xs font-medium uppercase tracking-widest',
                  tier.mystery ? 'text-zinc-400' : 'text-zinc-500'
                )}
              >
                {tier.shortName}
              </p>
              <h3
                className={cn(
                  'mt-2 text-lg font-semibold leading-tight md:text-xl',
                  tier.mystery ? 'text-white' : 'text-zinc-950'
                )}
              >
                {tier.title}
              </h3>
              <p
                className={cn(
                  'mt-2 text-sm leading-relaxed',
                  tier.mystery ? 'text-zinc-400' : 'text-zinc-600'
                )}
              >
                {tier.tagline}
              </p>

              {tier.includesLabel ? (
                <p
                  className={cn(
                    'mt-4 text-xs font-medium',
                    tier.mystery ? 'text-zinc-500' : 'text-zinc-400'
                  )}
                >
                  {tier.includesLabel}
                </p>
              ) : null}

              <ul className="mt-4 flex-1 space-y-2">
                {tier.highlights.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      'flex items-start gap-2 text-sm leading-relaxed',
                      tier.mystery ? 'text-zinc-300' : 'text-zinc-600'
                    )}
                  >
                    <Check
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0',
                        tier.mystery ? 'text-zinc-400' : 'text-zinc-400'
                      )}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <ContactTrigger
                intent={tier.contactIntent}
                className={cn(
                  'mt-6 w-full rounded-full px-4 py-2.5 text-sm font-semibold transition-colors',
                  tier.mystery
                    ? 'bg-white text-zinc-950 hover:bg-zinc-100'
                    : 'border border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50'
                )}
              >
                {tier.mystery ? '私董会咨询' : '预约咨询'}
              </ContactTrigger>
            </Community2Reveal>
          ))}
        </div>

        <Community2Reveal delay={120} className="mt-16">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-zinc-950">
              {community2MembershipDetails.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {community2MembershipDetails.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-sm leading-relaxed text-zinc-600"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </Community2Reveal>

        <Community2Reveal delay={160} className="mt-16">
          <p className="c2-eyebrow">FAQ</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
            常见问题
          </h3>
          <Accordion type="single" collapsible className="mt-8">
            {community2Faq.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-zinc-200"
              >
                <AccordionTrigger className="c2-faq-trigger text-base md:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="c2-faq-content">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Community2Reveal>

        <Community2Reveal delay={200} className="mt-12 text-center">
          <Link href="/member" className="c2-btn-primary">
            了解会员详情
          </Link>
        </Community2Reveal>
      </div>
    </section>
  )
}
