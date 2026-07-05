import { Coffee2NetworkSection } from '@/components/sections/coffee2/coffee2-network-section'
import { Langton2HeroSection } from '@/components/sections/langton2/langton2-hero-section'
import { Langton2InterstitialBand } from '@/components/sections/langton2/langton2-interstitial-band'
import { Langton2SectionNav } from '@/components/sections/langton2/langton2-section-nav'
import {
  Langton2AboutSection,
  Langton2ArchitectureSection,
  Langton2FeaturesSection,
  Langton2JoinBand,
  Langton2MissionSection,
  Langton2ProblemsSection,
  Langton2ServeSection,
  Langton2ToolsSection,
} from '@/components/sections/langton2/langton2-sections'
import { langtonMegaBanners } from '@/lib/content/langton-page'
import '@/app/coffee/coffee.css'
import '@/styles/jarsy-v2.css'

export const metadata = {
  title: '朗敦道 | Langton Tao',
  description:
    '新型联合家族办公室（MFO）——为华人财富传承提供系统解决方案',
}

export default function LangtonPage() {
  const [mvv, tools, , features] = langtonMegaBanners

  return (
    <div className="jarsy-v2-page coffee2-page bg-white text-zinc-950">
      <Langton2HeroSection />
      <Langton2SectionNav />
      <Langton2InterstitialBand
        id="banner-mvv"
        title={mvv.title}
        subtitle={mvv.subtitle}
      />
      <Langton2MissionSection />
      <Langton2AboutSection />
      <Langton2ProblemsSection />
      <Langton2ServeSection />
      <Langton2InterstitialBand
        id="banner-tools"
        title={tools.title}
        subtitle={tools.subtitle}
      />
      <Langton2ToolsSection />
      <Langton2InterstitialBand
        id="banner-features"
        title={features.title}
        subtitle={features.subtitle}
      />
      <Langton2FeaturesSection />
      <Langton2ArchitectureSection />
      <Coffee2NetworkSection />
      <Langton2JoinBand />
    </div>
  )
}
