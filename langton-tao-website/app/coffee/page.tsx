import { TopicCardHashScrollHost } from '@/hooks/use-topic-card-hash-scroll'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Coffee2HeroSection } from '@/components/sections/coffee2/coffee2-hero-section'
import { Coffee2LifeEventsStickyNav } from '@/components/sections/coffee2/coffee2-life-events-sticky-nav'
import { Coffee2LifeEventsNavSection } from '@/components/sections/coffee2/coffee2-life-events-nav-section'
import { DeferredMount } from '@/components/shared/deferred-mount'
import { SectionLoadingFallback } from '@/components/shared/section-loading-fallback'
import { sectionMinHeight } from '@/lib/deferred-mount-heights'
import './coffee.css'

export const metadata: Metadata = {
  title: '熊比特咖啡 | 朗敦道 Langton Tao',
  description:
    '熊比特：聊聊人生大事。联动十日谈，用十杯咖啡参透十个人生话题；在周期认知之上诚实拆解投资、保全、化债与传承。',
}

const Coffee2LifeEventsContent = dynamic(
  () =>
    import('@/components/sections/coffee2/coffee2-life-events-content').then(
      (module) => ({ default: module.Coffee2LifeEventsContent })
    ),
  {
    loading: () => (
      <SectionLoadingFallback label="加载人生大事…" />
    ),
  }
)

const Coffee2JoinBand = dynamic(
  () =>
    import('@/components/sections/coffee2/coffee2-join-band').then((module) => ({
      default: module.Coffee2JoinBand,
    })),
  { loading: () => <SectionLoadingFallback /> }
)

const Coffee2PillarsSection = dynamic(
  () =>
    import('@/components/sections/coffee2/coffee2-pillars-section').then(
      (module) => ({ default: module.Coffee2PillarsSection })
    ),
  { loading: () => <SectionLoadingFallback /> }
)

const Coffee2ManifestoGallerySection = dynamic(
  () =>
    import('@/components/sections/coffee2/coffee2-manifesto-gallery-section').then(
      (module) => ({ default: module.Coffee2ManifestoGallerySection })
    ),
  { loading: () => <SectionLoadingFallback /> }
)

const Education2ReadingSection = dynamic(
  () =>
    import('@/components/sections/education2/education2-reading-section').then(
      (module) => ({ default: module.Education2ReadingSection })
    ),
  { loading: () => <SectionLoadingFallback /> }
)

const Community2EventsHub = dynamic(
  () =>
    import('@/components/sections/community2/community2-events-hub').then(
      (module) => ({ default: module.Community2EventsHub })
    ),
  { loading: () => <SectionLoadingFallback /> }
)

const Coffee2CollaborationSection = dynamic(
  () =>
    import('@/components/sections/coffee2/coffee2-collaboration-section').then(
      (module) => ({ default: module.Coffee2CollaborationSection })
    ),
  { loading: () => <SectionLoadingFallback /> }
)

export default function CoffeePage() {
  return (
    <div className="jarsy-v2-page coffee2-page bg-white text-zinc-950">
      <TopicCardHashScrollHost />
      <Coffee2LifeEventsStickyNav />
      <Coffee2HeroSection />

      <DeferredMount
        anchorId="coffee-life-events-nav"
        minHeight={sectionMinHeight('coffee-life-events-nav')}
        mountStrategy="idle"
        idleStaggerIndex={0}
      >
        <Coffee2LifeEventsNavSection />
      </DeferredMount>

      <DeferredMount
        anchorId="coffee-life-events-content"
        minHeight={sectionMinHeight('coffee-life-events-content')}
        mountStrategy="idle"
        idleStaggerIndex={0}
      >
        <Coffee2LifeEventsContent />
      </DeferredMount>

      <DeferredMount minHeight={sectionMinHeight('coffee-join-band')} mountStrategy="lazy">
        <Coffee2JoinBand />
      </DeferredMount>

      <DeferredMount minHeight={sectionMinHeight('coffee-pillars')} mountStrategy="lazy">
        <Coffee2PillarsSection />
      </DeferredMount>

      <DeferredMount minHeight={sectionMinHeight('coffee-manifesto')} mountStrategy="lazy">
        <Coffee2ManifestoGallerySection />
      </DeferredMount>

      <DeferredMount minHeight={sectionMinHeight('coffee-reading')} mountStrategy="lazy">
        <Education2ReadingSection />
      </DeferredMount>

      <DeferredMount minHeight={sectionMinHeight('coffee-events')} mountStrategy="lazy">
        <Community2EventsHub />
      </DeferredMount>

      <DeferredMount minHeight={sectionMinHeight('coffee-collaboration')} mountStrategy="lazy">
        <Coffee2CollaborationSection />
      </DeferredMount>
    </div>
  )
}
