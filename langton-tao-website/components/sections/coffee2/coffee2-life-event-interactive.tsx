'use client'

import dynamic from 'next/dynamic'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2TopicSubsection } from '@/components/sections/coffee2/coffee2-topic-subsection'
import { SectionLoadingFallback } from '@/components/shared/section-loading-fallback'
import type { Coffee2LifeEventId } from '@/lib/content/coffee-manifesto'
import { coffee2LifeEventTopicIds } from '@/lib/content/coffee2-page'

const AssetClassesVennSection = dynamic(
  () =>
    import('@/components/sections/coffee2/asset-classes-venn-section').then(
      (module) => ({ default: module.AssetClassesVennSection })
    ),
  { loading: () => <SectionLoadingFallback label="加载资产象限…" /> }
)

const LegacySection = dynamic(
  () =>
    import('@/components/sections/coffee2/legacy-section').then((module) => ({
      default: module.LegacySection,
    })),
  { loading: () => <SectionLoadingFallback label="加载传承…" /> }
)

const AllianceSurveySection = dynamic(
  () =>
    import('@/components/sections/coffee2/alliance-survey-section').then(
      (module) => ({ default: module.AllianceSurveySection })
    ),
  { loading: () => <SectionLoadingFallback label="加载联盟…" /> }
)

const RetirementSection = dynamic(
  () =>
    import('@/components/sections/coffee2/retirement-section').then(
      (module) => ({ default: module.RetirementSection })
    ),
  { loading: () => <SectionLoadingFallback label="加载养老…" /> }
)

const EducationSection = dynamic(
  () =>
    import('@/components/sections/coffee2/education-section').then(
      (module) => ({ default: module.EducationSection })
    ),
  { loading: () => <SectionLoadingFallback label="加载教育…" /> }
)

type Coffee2LifeEventInteractiveProps = {
  eventId: Coffee2LifeEventId
}

export function Coffee2LifeEventInteractive({
  eventId,
}: Coffee2LifeEventInteractiveProps) {
  const nestedTopicIds = coffee2LifeEventTopicIds[eventId] ?? []

  if (eventId === 'life-living') {
    return (
      <>
        <div className="mt-16 md:mt-24 lg:mt-32">
          <AssetClassesVennSection />
        </div>
        <div className="coffee2-living-topics mt-16 md:mt-24 lg:mt-32">
          {nestedTopicIds.map((topicId) => (
            <Coffee2TopicSubsection key={topicId} topicId={topicId} />
          ))}
        </div>
      </>
    )
  }

  if (eventId === 'life-legacy') {
    return <LegacySection />
  }

  if (eventId === 'life-alliance') {
    return <AllianceSurveySection />
  }

  if (eventId === 'life-retirement') {
    return <RetirementSection />
  }

  if (eventId === 'life-education') {
    return <EducationSection />
  }

  return (
    <Coffee2Reveal delay={80} className="mt-10">
      <div className="c2-debt-empty mx-auto max-w-2xl px-8 py-16 text-center md:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          Coming Soon
        </p>
        <p className="mt-4 text-lg font-medium text-zinc-600">内容待补充</p>
      </div>
    </Coffee2Reveal>
  )
}
