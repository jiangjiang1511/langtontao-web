'use client'

import Link from 'next/link'
import {
  Calendar,
  Building2,
  PieChart,
  Shield,
  type LucideIcon,
} from 'lucide-react'
import { aboutModules } from '@/lib/content/about-modules'
import {
  architectureContent,
  featuresIntro,
  missionContent,
  aboutLead,
  problemCards,
  serveContent,
  toolsIntro,
  networkIntro,
} from '@/lib/content/langton-page'
import {
  featurePrograms,
  featureQuote,
  featureStats,
  networkColumns,
  tenetsAccordion,
  toolsCards,
} from '@/lib/content/home-sections'
import { HorizontalScroll } from '@/components/shared/horizontal-scroll'
import { ContactTrigger } from '@/components/contact-trigger'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Eyebrow, SectionSurface, SectionTitle } from '@/components/layout/section-surface'

const aboutIcons: Record<string, LucideIcon> = {
  'life-events': Calendar,
  industries: Building2,
  exposure: Shield,
  assets: PieChart,
}

export function LangtonMissionSection() {
  return (
    <SectionSurface id="mission" theme="white" aria-labelledby="mission-title">
      <Eyebrow>{missionContent.eyebrow}</Eyebrow>
      <SectionTitle id="mission-title" display>
        {missionContent.title}
      </SectionTitle>
      <p className="mt-6 max-w-2xl text-base font-bold leading-relaxed text-[color:var(--section-muted)]">
        {missionContent.body}
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {missionContent.values.map((v) => (
          <div
            key={v.label}
            className="pop-card min-h-[120px] rounded-lg border-2 border-pop-black bg-pop-paper p-5"
          >
            <p className="text-sm font-black text-pop-black">{v.label}</p>
            <p className="mt-2 text-sm font-bold leading-relaxed text-[color:var(--section-muted)]">
              {v.text}
            </p>
          </div>
        ))}
      </div>
    </SectionSurface>
  )
}

export function LangtonAboutSection() {
  return (
    <SectionSurface id="about" theme="paper" aria-labelledby="about-title">
      <Eyebrow>{aboutLead.eyebrow}</Eyebrow>
      <SectionTitle id="about-title" display>
        {aboutLead.title}
      </SectionTitle>
      <p className="mt-6 max-w-2xl text-base font-bold leading-relaxed">
        {aboutLead.lead}
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aboutModules.map((mod) => {
          const Icon = aboutIcons[mod.id] ?? Calendar
          return (
            <div
              key={mod.id}
              className="pop-card flex min-h-[160px] flex-col rounded-lg border-2 border-pop-black bg-pop-white p-5"
            >
              <Icon className="h-8 w-8 text-pop-black" strokeWidth={2} />
              <h3 className="mt-4 text-base font-black">{mod.title}</h3>
              <p className="mt-2 text-sm font-bold leading-relaxed text-[color:var(--section-muted)]">
                {mod.summary}
              </p>
            </div>
          )
        })}
      </div>
    </SectionSurface>
  )
}

export function LangtonProblemsSection() {
  return (
    <SectionSurface id="problems" theme="white" aria-labelledby="problems-title">
      <Eyebrow>我们解决什么问题</Eyebrow>
      <SectionTitle id="problems-title" display>
        财富 · 关系 · 选择
      </SectionTitle>
      <HorizontalScroll className="mt-10 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
        {problemCards.map((card) => (
          <article
            key={card.title}
            className="w-[85vw] shrink-0 snap-center rounded-lg border-2 border-l-[6px] border-pop-black border-l-pop-yellow bg-pop-white p-6 md:w-auto"
          >
            <h3 className="text-lg font-black">{card.title}</h3>
            <ul className="mt-4 space-y-2">
              {card.bullets.map((b) => (
                <li
                  key={b}
                  className="text-sm font-bold text-[color:var(--section-muted)]"
                >
                  · {b}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </HorizontalScroll>
    </SectionSurface>
  )
}

export function LangtonServeSection() {
  return (
    <SectionSurface
      id="serve"
      theme="dark"
      narrow
      aria-labelledby="serve-title"
      className="text-center"
    >
      <SectionTitle id="serve-title" display className="text-pop-white">
        {serveContent.title}
      </SectionTitle>
      <p className="mx-auto mt-6 max-w-[640px] text-lg font-bold leading-relaxed text-pop-white/90 md:text-xl">
        {serveContent.quote}
      </p>
      <ContactTrigger variant="outline" className="mt-8 border-pop-white text-pop-white hover:bg-pop-white/10">
        预约咨询
      </ContactTrigger>
    </SectionSurface>
  )
}

export function LangtonToolsSection() {
  return (
    <SectionSurface id="tools" theme="paper" aria-labelledby="tools-title">
      <Eyebrow>{toolsIntro.eyebrow}</Eyebrow>
      <SectionTitle id="tools-title" display>
        {toolsIntro.title}
      </SectionTitle>
      <p className="mt-4 max-w-2xl text-sm font-bold text-[color:var(--section-muted)]">
        {toolsIntro.sub}
      </p>
      <HorizontalScroll className="mt-10">
        {toolsCards.map((card) => (
          <article
            key={card.title}
            className="pop-card h-[220px] w-[300px] shrink-0 snap-start rounded-lg border-2 border-pop-black bg-pop-white p-5 md:w-[340px]"
          >
            <div className="h-1 w-12 rounded-full bg-pop-yellow" />
            <h3 className="mt-4 text-base font-black">{card.title}</h3>
            <p className="mt-3 text-sm font-bold leading-relaxed text-[color:var(--section-muted)]">
              {card.description}
            </p>
          </article>
        ))}
      </HorizontalScroll>
    </SectionSurface>
  )
}

export function LangtonNetworkSection() {
  return (
    <SectionSurface id="network" theme="white" aria-labelledby="network-title">
      <Eyebrow>{networkIntro.eyebrow}</Eyebrow>
      <SectionTitle id="network-title" display>
        {networkIntro.title}
      </SectionTitle>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {networkColumns.map((col) => (
          <div
            key={col.title}
            className="rounded-lg border-2 border-pop-black bg-pop-paper p-6"
          >
            <h3 className="text-lg font-black">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.bullets.map((b) => (
                <li
                  key={b}
                  className="text-sm font-bold text-[color:var(--section-muted)]"
                >
                  · {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 flex h-16 flex-wrap items-center gap-4 opacity-70 grayscale">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 rounded border-2 border-pop-black bg-pop-paper"
          />
        ))}
      </div>
    </SectionSurface>
  )
}

export function LangtonFeaturesSection() {
  return (
    <SectionSurface id="features" theme="paper" aria-labelledby="features-title">
      <Eyebrow>{featuresIntro.eyebrow}</Eyebrow>
      <SectionTitle id="features-title" display>
        {featuresIntro.title}
      </SectionTitle>
      <div className="mt-10 grid grid-cols-3 gap-4">
        {featureStats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border-2 border-pop-black bg-pop-white p-4 text-center"
          >
            <p className="text-display text-2xl md:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs font-bold text-[color:var(--section-muted)]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {featurePrograms.map((p) => (
          <div
            key={p.title}
            className="pop-card rounded-lg border-2 border-pop-black bg-pop-white p-5"
          >
            <h3 className="font-black">{p.title}</h3>
            <p className="mt-2 text-sm font-bold text-[color:var(--section-muted)]">
              {p.description}
            </p>
          </div>
        ))}
      </div>
      <blockquote className="mt-10 border-l-4 border-pop-yellow pl-6 text-base font-bold italic leading-relaxed md:text-lg">
        {featureQuote}
      </blockquote>
      <Accordion type="single" collapsible defaultValue="tenet-0" className="mt-8">
        {tenetsAccordion.map((item, i) => (
          <AccordionItem key={item.title} value={`tenet-${i}`}>
            <AccordionTrigger>
              朗敦道十纲 · {item.title}
            </AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionSurface>
  )
}

export function LangtonArchitectureSection() {
  return (
    <SectionSurface
      id="architecture"
      theme="white"
      aria-labelledby="architecture-title"
    >
      <Eyebrow>{architectureContent.eyebrow}</Eyebrow>
      <SectionTitle id="architecture-title" display>
        {architectureContent.title}
      </SectionTitle>
      <div className="mx-auto mt-10 flex h-[320px] max-w-[900px] items-center justify-center rounded-lg border-2 border-dashed border-pop-black bg-pop-paper md:h-[400px]">
        <p className="text-sm font-bold text-[color:var(--section-muted)]">
          组织架构图占位 — 可替换为 SVG/图片
        </p>
      </div>
      <p className="mt-4 text-center text-sm font-bold text-[color:var(--section-muted)]">
        {architectureContent.caption}
      </p>
    </SectionSurface>
  )
}

export function LangtonCtaSection() {
  return (
    <SectionSurface
      id="cta"
      theme="yellow"
      narrow
      className="text-center"
      aria-labelledby="langton-cta-title"
    >
      <SectionTitle id="langton-cta-title" display>
        开启你的家族传承系统
      </SectionTitle>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ContactTrigger size="lg">预约咨询</ContactTrigger>
        <Link
          href="/community"
          className="inline-flex h-12 items-center justify-center rounded-full border-2 border-pop-black bg-pop-white px-8 text-base font-bold"
        >
          了解会员
        </Link>
      </div>
    </SectionSurface>
  )
}
