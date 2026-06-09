import type { Metadata } from 'next'
import { CommunityMembershipSection } from '@/components/sections/community/community-membership-section'
import { MillionairePlanSection } from '@/components/sections/community/millionaire-plan-section'
import { SuperheroJourneySection } from '@/components/sections/community/superhero-journey-section'

export const metadata: Metadata = {
  title: '社群 | 朗敦道 Langton Tao',
  description:
    '超级英雄探索之旅、千万富翁养成计划——朗敦道社群的具身认知与财商定投入口。',
}

export default function CommunityPage() {
  return (
    <>
      <SuperheroJourneySection />

      <MillionairePlanSection />

      <CommunityMembershipSection />
    </>
  )
}
