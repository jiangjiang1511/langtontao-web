import { CommunityCta } from '@/components/sections/community/community-cta'
import { MembershipPricingOverview } from '@/components/sections/membership-v2/membership-pricing-overview'
import {
  Eyebrow,
  SectionSurface,
  SectionTitle,
} from '@/components/layout/section-surface'
import { communityMembershipMeta } from '@/lib/content/community-page'

export function CommunityMembershipSection() {
  return (
    <SectionSurface
      id="membership-tiers"
      theme="dark"
      className="scroll-mt-20 border-t-2 border-pop-black"
      aria-labelledby="membership-tiers-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow className="text-pop-yellow">
          {communityMembershipMeta.eyebrow}
        </Eyebrow>
        <SectionTitle
          id="membership-tiers-heading"
          display
          className="mt-4 text-pop-white"
        >
          {communityMembershipMeta.title}
        </SectionTitle>
        <p className="mt-6 text-base font-bold leading-relaxed text-[color:var(--section-muted)] md:text-lg">
          {communityMembershipMeta.lead}
        </p>
      </div>

      <div className="mt-12 rounded-lg border-2 border-pop-yellow/40 bg-pop-black p-6 md:p-8">
        <MembershipPricingOverview />
      </div>

      <CommunityCta variant="dark" />
    </SectionSurface>
  )
}
