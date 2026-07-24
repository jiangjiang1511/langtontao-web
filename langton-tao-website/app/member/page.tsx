import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { DeferredMount } from '@/components/shared/deferred-mount'
import { SectionLoadingFallback } from '@/components/shared/section-loading-fallback'
import { sectionMinHeight } from '@/lib/deferred-mount-heights'
import { MembershipPricingOverview } from '@/components/sections/membership-v2/membership-pricing-overview'
import { MembershipV2HeroSection } from '@/components/sections/membership-v2/membership-v2-hero-section'
import { membershipV2Hero } from '@/lib/content/membership-v2'
import '@/app/coffee/coffee.css'
import '@/styles/jarsy-v2.css'
import './member-page.css'
import '@/styles/membership-commission.css'

export const metadata: Metadata = {
  title: '加入我们 | 朗敦道 Langton Tao',
  description:
    '消费Cosco，家办好事多。开启人生认知定投，掌握普通人的投资学，推开门打开更大的世界。',
}

const MembershipCommissionSection = dynamic(
  () =>
    import('@/components/sections/membership-v2/membership-commission-section').then(
      (module) => ({ default: module.MembershipCommissionSection })
    ),
  { loading: () => <SectionLoadingFallback label="加载渠道收益…" /> }
)

const MembershipBenefitBars = dynamic(
  () =>
    import('@/components/sections/membership-v2/membership-benefit-bars').then(
      (module) => ({ default: module.MembershipBenefitBars })
    ),
  { loading: () => <SectionLoadingFallback label="加载权益详情…" /> }
)

const MembershipComparisonTable = dynamic(
  () =>
    import('@/components/sections/membership-v2/membership-comparison-table').then(
      (module) => ({ default: module.MembershipComparisonTable })
    ),
  { loading: () => <SectionLoadingFallback label="加载计划对比…" /> }
)

const MembershipBoardSection = dynamic(
  () =>
    import('@/components/sections/membership-v2/membership-board-section').then(
      (module) => ({ default: module.MembershipBoardSection })
    ),
  { loading: () => <SectionLoadingFallback label="加载私董会…" /> }
)

export default function MemberPage() {
  return (
    <div className="jarsy-v2-page coffee2-page member-page bg-white text-zinc-950">
      <MembershipV2HeroSection />

      <DeferredMount
        anchorId="member-pricing"
        minHeight={sectionMinHeight('member-pricing')}
        mountStrategy="idle"
        idleStaggerIndex={0}
      >
        <section
          className="member-section member-section--pricing border-b border-zinc-200 py-16 md:py-24"
          aria-labelledby="tier-overview-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="sr-only" id="tier-overview-heading">
              会员档位总览
            </p>
            <MembershipPricingOverview />
          </div>
        </section>
      </DeferredMount>

      <DeferredMount
        anchorId="commission-overview"
        minHeight={sectionMinHeight('commission-overview')}
        mountStrategy="lazy"
      >
        <MembershipCommissionSection />
      </DeferredMount>

      <DeferredMount
        anchorId="tier-benefits"
        minHeight={sectionMinHeight('tier-benefits')}
        mountStrategy="lazy"
      >
        <section
          className="member-section member-section--benefits border-b border-zinc-200 bg-zinc-50 py-12 md:py-16"
          aria-labelledby="tier-benefits-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="sr-only" id="tier-benefits-heading">
              权益详情
            </p>
            <MembershipBenefitBars />
          </div>
        </section>
      </DeferredMount>

      <DeferredMount
        anchorId="plan-compare"
        minHeight={sectionMinHeight('plan-compare')}
        mountStrategy="lazy"
      >
        <section
          className="member-section member-section--compare border-b border-zinc-200 py-16 md:py-24"
          aria-labelledby="plan-compare"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MembershipComparisonTable />
          </div>
        </section>
      </DeferredMount>

      <section className="member-section member-section--disclaimer border-b border-zinc-200 py-10 md:py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="member-disclaimer text-xs font-medium leading-relaxed text-zinc-500 md:text-sm">
            {membershipV2Hero.disclaimer}
          </p>
        </div>
      </section>

      <DeferredMount
        anchorId="tier-board"
        minHeight={sectionMinHeight('tier-board')}
        mountStrategy="lazy"
      >
        <MembershipBoardSection />
      </DeferredMount>
    </div>
  )
}
