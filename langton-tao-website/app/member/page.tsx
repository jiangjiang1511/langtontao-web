import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactTrigger } from '@/components/contact-trigger'
import { MembershipTierLadder } from '@/components/sections/membership/membership-tier-ladder'
import { MembershipTierSection } from '@/components/sections/membership/membership-tier-section'
import {
  Eyebrow,
  SectionSurface,
  SectionTitle,
} from '@/components/layout/section-surface'
import { Button } from '@/components/ui/button'
import {
  membershipCta,
  membershipHero,
  membershipTiers,
} from '@/lib/content/membership'

export const metadata: Metadata = {
  title: '会员及私董会 | 朗敦道 Langton Tao',
  description:
    '朗敦道 MFO 会员体系：从认知定投到财富大健康体检、数字资产与私董会圈层，递进式权益陪伴家族传承。',
}

export default function MemberPage() {
  return (
    <>
      <SectionSurface
        id="member-hero"
        theme="dark"
        className="flex min-h-[60vh] flex-col justify-center pt-24 md:min-h-[70vh] md:pt-28"
        aria-labelledby="member-hero-heading"
      >
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>{membershipHero.eyebrow}</Eyebrow>
          <h1
            id="member-hero-heading"
            className="text-display mt-4 text-4xl md:text-5xl lg:text-6xl"
          >
            {membershipHero.title}
          </h1>
          <p className="mt-6 text-base font-bold leading-relaxed text-[color:var(--section-muted)] md:text-lg">
            {membershipHero.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ContactTrigger
              intent={membershipHero.contactIntent}
              size="lg"
              variant="default"
            >
              预约咨询
            </ContactTrigger>
            <Button variant="outline" size="lg" asChild>
              <Link href="#tier-ladder">查看权益档位</Link>
            </Button>
          </div>
        </div>
      </SectionSurface>

      <SectionSurface theme="paper" aria-labelledby="tier-ladder-heading">
        <Eyebrow>权益档位</Eyebrow>
        <SectionTitle id="tier-ladder-heading" display>
          四层递进，陪伴你的家族传承
        </SectionTitle>
        <p className="mt-4 max-w-[640px] text-base font-bold leading-relaxed text-[color:var(--section-muted)]">
          从生态入局到私董会圈层，每一档都在上一层权益之上叠加更深度的陪跑与资源。
        </p>
        <div className="mt-10">
          <MembershipTierLadder />
        </div>
      </SectionSurface>

      {membershipTiers.map((tier, index) => (
        <MembershipTierSection key={tier.id} tier={tier} index={index} />
      ))}

      <SectionSurface
        id="member-cta"
        theme="yellow"
        narrow
        aria-labelledby="member-cta-heading"
      >
        <div className="border-2 border-pop-black p-10 text-center">
          <SectionTitle id="member-cta-heading" display>
            {membershipCta.title}
          </SectionTitle>
          <ContactTrigger
            intent={membershipCta.contactIntent}
            size="lg"
            variant="dark"
            className="mt-8"
          >
            预约咨询
          </ContactTrigger>
        </div>
      </SectionSurface>
    </>
  )
}
