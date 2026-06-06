import Link from 'next/link'
import { ContactTrigger } from '@/components/contact-trigger'
import { Button } from '@/components/ui/button'
import { membershipTiers } from '@/lib/content/membership'

export function MembershipTierLadder() {
  return (
    <div
      id="tier-ladder"
      className="scroll-mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {membershipTiers.map((tier) => (
        <article
          key={tier.id}
          className="pop-card flex min-h-[260px] flex-col rounded-lg border-2 border-pop-black border-l-4 border-l-pop-yellow bg-pop-white p-6 text-pop-black shadow-pop-black"
        >
          {tier.includesLabel ? (
            <span className="mb-3 inline-block w-fit border-2 border-pop-black bg-pop-yellow px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
              {tier.includesLabel}
            </span>
          ) : (
            <div className="mb-3 h-6" aria-hidden />
          )}

          <h3 className="text-lg font-black leading-tight md:text-xl">
            {tier.title}
          </h3>
          <p className="mt-2 flex-1 text-sm font-bold leading-relaxed text-pop-black/75">
            {tier.tagline}
          </p>
          <p className="mt-3 text-[11px] font-black uppercase tracking-widest text-pop-black/50">
            {tier.benefitCount} 大权益模块
          </p>

          <div className="mt-5 flex flex-col gap-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={`#${tier.anchor}`}>了解详情 ↓</Link>
            </Button>
            <ContactTrigger
              intent={tier.contactIntent}
              variant="default"
              size="sm"
              className="w-full"
            >
              预约咨询
            </ContactTrigger>
          </div>
        </article>
      ))}
    </div>
  )
}
