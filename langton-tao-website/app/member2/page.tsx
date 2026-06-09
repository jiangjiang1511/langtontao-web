import type { Metadata } from 'next'
import { MembershipBenefitBars } from '@/components/sections/membership-v2/membership-benefit-bars'
import { MembershipBoardSection } from '@/components/sections/membership-v2/membership-board-section'
import { MembershipComparisonTable } from '@/components/sections/membership-v2/membership-comparison-table'
import { MembershipPricingOverview } from '@/components/sections/membership-v2/membership-pricing-overview'
import { SectionSurface, SectionTitle } from '@/components/layout/section-surface'
import { Button } from '@/components/ui/button'
import { membershipV2Hero } from '@/lib/content/membership-v2'

export const metadata: Metadata = {
  title: '会员体系 | 朗敦道 Langton Tao',
  description:
    '消费Cosco，家办好事多。开启人生认知定投，掌握普通人的投资学，推开门打开更大的世界。',
}

export default function Member2Page() {
  return (
    <>
      <SectionSurface
        theme="paper"
        className="pt-24 md:pt-28"
        aria-labelledby="member2-hero-title"
      >
        <article className="mx-auto max-w-3xl overflow-hidden rounded-lg border-2 border-pop-black bg-pop-white shadow-pop-black">
          <header className="border-b-2 border-pop-black bg-pop-black px-6 py-4 md:px-10 md:py-5">
            <p className="text-center text-sm font-black leading-snug text-pop-yellow md:text-base">
              {membershipV2Hero.slogan}
            </p>
          </header>

          <div className="px-6 py-8 text-center md:px-12 md:py-12">
            <p className="inline-block border-b-2 border-pop-yellow pb-2 text-sm font-black uppercase tracking-[0.28em] text-pop-black md:text-base">
              {membershipV2Hero.eyebrow}
            </p>

            <h1
              id="member2-hero-title"
              className="text-display mx-auto mt-8 flex flex-col gap-4 md:mt-10 md:gap-6 lg:gap-7"
            >
              {membershipV2Hero.titleLines.map((line) => (
                <span
                  key={line}
                  className="block text-[2rem] leading-[1.1] md:text-[2.75rem] lg:text-[3.25rem]"
                >
                  {line}
                </span>
              ))}
            </h1>

            <div className="mx-auto mt-8 max-w-xl border-t-2 border-pop-black/10 pt-8 md:mt-10">
              <p className="bg-pop-yellow/40 px-4 py-3 text-base font-black leading-snug text-pop-black md:text-lg">
                {membershipV2Hero.subtitle}
              </p>
            </div>
          </div>
        </article>
      </SectionSurface>

      <SectionSurface theme="white" aria-labelledby="tier-overview-heading">
        <p className="sr-only" id="tier-overview-heading">
          会员档位总览
        </p>
        <MembershipPricingOverview />
      </SectionSurface>

      <SectionSurface theme="paper" aria-labelledby="tier-benefits-heading">
        <p className="sr-only" id="tier-benefits-heading">
          权益详情
        </p>
        <MembershipBenefitBars />
      </SectionSurface>

      <SectionSurface theme="white" aria-labelledby="plan-compare">
        <MembershipComparisonTable />
      </SectionSurface>

      <SectionSurface theme="paper" narrow className="py-8 md:py-10">
        <p className="text-center text-xs font-bold text-[color:var(--section-muted)]">
          {membershipV2Hero.disclaimer}
        </p>
      </SectionSurface>

      <MembershipBoardSection />

      <SectionSurface theme="yellow" narrow className="text-center">
        <SectionTitle display>找到适合你的会员档位</SectionTitle>
        <p className="mt-4 text-sm font-bold text-pop-black/70">
          预约咨询，我们将根据家族阶段推荐会员、Plus、Pro 或私董会方案。
        </p>
        <Button variant="dark" size="lg" className="mt-8" asChild>
          <a href="#tier-overview">开启会员之旅</a>
        </Button>
      </SectionSurface>
    </>
  )
}
