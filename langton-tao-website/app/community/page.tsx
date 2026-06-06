import { MembershipTiers } from '@/components/sections/community/membership-tiers'
import { CommunityCta } from '@/components/sections/community/community-cta'
import { Section, SectionTitle } from '@/components/layout/section'

export default function CommunityPage() {
  return (
    <>
      <Section
        id="superhero-journey"
        aria-labelledby="superhero-title"
        className="pt-24"
      >
        <SectionTitle id="superhero-title">超级英雄探索之旅</SectionTitle>
        <p className="mt-3 text-lg text-zinc-600">麦理浩径</p>
        <p className="mt-6 max-w-2xl leading-relaxed text-zinc-600">
          户外具身认知项目：在徒步与挑战中沉淀家族同频成长路径。每月可选参与，
          与社群成员共同完成身体与认知的双重定投。
        </p>
      </Section>

      <Section
        id="millionaire-plan"
        aria-labelledby="millionaire-title"
        className="bg-zinc-50"
      >
        <SectionTitle id="millionaire-title">千万富翁养成计划</SectionTitle>
        <p className="mt-6 text-zinc-600">
          认知、线上课、沙龙、读书会、社群活动
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {['认知', '线上课', '沙龙', '读书会', '社群活动'].map((item) => (
            <li
              key={item}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700"
            >
              {item}
            </li>
          ))}
        </ul>
        <MembershipTiers />
        <CommunityCta />
      </Section>
    </>
  )
}
