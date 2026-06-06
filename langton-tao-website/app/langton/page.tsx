import { LangtonBanner } from '@/components/sections/langton/langton-banner'
import {
  LangtonAboutSection,
  LangtonArchitectureSection,
  LangtonCtaSection,
  LangtonFeaturesSection,
  LangtonMissionSection,
  LangtonNetworkSection,
  LangtonProblemsSection,
  LangtonServeSection,
  LangtonToolsSection,
} from '@/components/sections/langton/langton-sections'
import { langtonMegaBanners } from '@/lib/content/langton-page'
import { SectionSurface } from '@/components/layout/section-surface'

export const metadata = {
  title: '朗敦道 | Langton Tao',
  description:
    '新型联合家族办公室（MFO）——为华人财富传承提供系统解决方案',
}

export default function LangtonPage() {
  const [mvv, tools, network, features] = langtonMegaBanners

  return (
    <>
      <SectionSurface theme="paper" className="pt-24 md:pt-28" narrow>
        <p className="text-eyebrow text-[color:var(--section-muted)]">朗敦道</p>
        <h1 className="text-display mt-4 text-4xl md:text-6xl">
          LangtonTAO VFO/MFO Leader in China
        </h1>
        <p className="mt-6 text-lg font-bold leading-relaxed">
          ——为华人财富传承提供系统解决方案
        </p>
        <p className="mt-4 text-base font-bold text-[color:var(--section-muted)]">
          人生认知定投计划，普通人的诚实投资学
        </p>
      </SectionSurface>

      <LangtonBanner
        id="banner-mvv"
        title={mvv.title}
        subtitle={mvv.subtitle}
        theme="dark"
      />
      <LangtonMissionSection />
      <LangtonAboutSection />
      <LangtonProblemsSection />
      <LangtonServeSection />

      <LangtonBanner
        id="banner-tools"
        title={tools.title}
        subtitle={tools.subtitle}
        theme="yellow"
      />
      <LangtonToolsSection />

      <LangtonBanner
        id="banner-network"
        title={network.title}
        subtitle={network.subtitle}
        theme="dark"
      />
      <LangtonNetworkSection />

      <LangtonBanner
        id="banner-features"
        title={features.title}
        subtitle={features.subtitle}
        theme="yellow"
      />
      <LangtonFeaturesSection />
      <LangtonArchitectureSection />
      <LangtonCtaSection />
    </>
  )
}
