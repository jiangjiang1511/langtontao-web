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
  langtonJoinBand,
} from '@/lib/content/langton-page'
import {
  featurePrograms,
  featureQuote,
  featureStats,
  tenetsAccordion,
  toolsCards,
} from '@/lib/content/home-sections'
import { HorizontalScroll } from '@/components/shared/horizontal-scroll'
import { ContactTrigger } from '@/components/contact-trigger'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2DisplayTypewriter } from '@/components/sections/coffee2/coffee2-display-typewriter'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

const aboutIcons: Record<string, LucideIcon> = {
  'life-events': Calendar,
  industries: Building2,
  exposure: Shield,
  assets: PieChart,
}

const problemAccents = [
  'border-l-amber-400',
  'border-l-sky-400',
  'border-l-emerald-400',
] as const

function Langton2SectionShell({
  id,
  className,
  children,
  'aria-labelledby': labelledBy,
}: {
  id: string
  className?: string
  children: ReactNode
  'aria-labelledby'?: string
}) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-28 border-b border-zinc-200 py-16 md:py-24', className)}
      aria-labelledby={labelledBy}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

export function Langton2MissionSection() {
  return (
    <Langton2SectionShell id="mission" aria-labelledby="mission-title">
      <Coffee2Reveal>
        <p className="c2-eyebrow">{missionContent.eyebrow}</p>
        <h2
          id="mission-title"
          className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
        >
          <Coffee2DisplayTypewriter text={missionContent.title} charStagger={80} />
        </h2>
        <Coffee2AnnotatedText
          text={missionContent.body}
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg"
        />
      </Coffee2Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {missionContent.values.map((v, i) => (
          <Coffee2Reveal key={v.label} delay={80 + i * 60}>
            <div className="c2-card min-h-[120px] p-5 md:p-6">
              <p className="text-sm font-bold text-zinc-950">{v.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{v.text}</p>
            </div>
          </Coffee2Reveal>
        ))}
      </div>
    </Langton2SectionShell>
  )
}

export function Langton2AboutSection() {
  return (
    <Langton2SectionShell
      id="about"
      className="bg-zinc-50"
      aria-labelledby="about-title"
    >
      <Coffee2Reveal>
        <p className="c2-eyebrow">{aboutLead.eyebrow}</p>
        <h2
          id="about-title"
          className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
        >
          {aboutLead.title}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
          {aboutLead.lead}
        </p>
      </Coffee2Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aboutModules.map((mod, i) => {
          const Icon = aboutIcons[mod.id] ?? Calendar
          return (
            <Coffee2Reveal key={mod.id} delay={60 + i * 50}>
              <div className="c2-card flex min-h-[160px] flex-col p-5 md:p-6">
                <Icon className="h-8 w-8 text-zinc-950" strokeWidth={1.75} />
                <h3 className="mt-4 text-base font-bold text-zinc-950">{mod.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{mod.summary}</p>
              </div>
            </Coffee2Reveal>
          )
        })}
      </div>
    </Langton2SectionShell>
  )
}

export function Langton2ProblemsSection() {
  return (
    <Langton2SectionShell id="problems" aria-labelledby="problems-title">
      <Coffee2Reveal>
        <p className="c2-eyebrow">我们解决什么问题</p>
        <h2
          id="problems-title"
          className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
        >
          财富 · 关系 · 选择
        </h2>
      </Coffee2Reveal>
      <HorizontalScroll className="mt-10 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
        {problemCards.map((card, i) => (
          <article
            key={card.title}
            className={cn(
              'c2-card w-[85vw] shrink-0 snap-center border-l-4 p-6 md:w-auto',
              problemAccents[i % problemAccents.length]
            )}
          >
            <h3 className="text-lg font-bold text-zinc-950">{card.title}</h3>
            <ul className="mt-4 space-y-2">
              {card.bullets.map((b) => (
                <li key={b} className="text-sm text-zinc-600">
                  · {b}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </HorizontalScroll>
    </Langton2SectionShell>
  )
}

export function Langton2ServeSection() {
  return (
    <section
      id="serve"
      className="scroll-mt-28 border-b border-zinc-800 bg-zinc-950 py-16 text-center md:py-20"
      aria-labelledby="serve-title"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <h2
            id="serve-title"
            className="c2-display text-3xl text-white md:text-4xl lg:text-5xl"
          >
            {serveContent.title}
          </h2>
          <p className="mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-zinc-300 md:text-xl">
            {serveContent.quote}
          </p>
          <ContactTrigger
            variant="outline"
            className="mt-8 border-zinc-400 text-white hover:bg-white/10"
          >
            预约咨询
          </ContactTrigger>
        </Coffee2Reveal>
      </div>
    </section>
  )
}

export function Langton2ToolsSection() {
  return (
    <Langton2SectionShell
      id="tools"
      className="bg-zinc-50"
      aria-labelledby="tools-title"
    >
      <Coffee2Reveal>
        <p className="c2-eyebrow">{toolsIntro.eyebrow}</p>
        <h2
          id="tools-title"
          className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
        >
          {toolsIntro.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base">
          {toolsIntro.sub}
        </p>
      </Coffee2Reveal>
      <HorizontalScroll className="mt-10">
        {toolsCards.map((card) => (
          <article
            key={card.title}
            className="c2-card h-[220px] w-[300px] shrink-0 snap-start p-5 md:w-[340px]"
          >
            <div className="h-1 w-12 rounded-full bg-zinc-950" />
            <h3 className="mt-4 text-base font-bold text-zinc-950">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{card.description}</p>
          </article>
        ))}
      </HorizontalScroll>
    </Langton2SectionShell>
  )
}

export function Langton2FeaturesSection() {
  return (
    <Langton2SectionShell id="features" aria-labelledby="features-title">
      <Coffee2Reveal>
        <p className="c2-eyebrow">{featuresIntro.eyebrow}</p>
        <h2
          id="features-title"
          className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
        >
          {featuresIntro.title}
        </h2>
      </Coffee2Reveal>
      <div className="mt-10 grid grid-cols-3 gap-4">
        {featureStats.map((s, i) => (
          <Coffee2Reveal key={s.label} delay={i * 50}>
            <div className="c2-card p-4 text-center md:p-5">
              <p className="c2-display text-2xl text-zinc-950 md:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-zinc-500">
                <Coffee2AnnotatedText as="span" text={s.label} />
              </p>
            </div>
          </Coffee2Reveal>
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {featurePrograms.map((p, i) => (
          <Coffee2Reveal key={p.title} delay={80 + i * 60}>
            <div className="c2-card p-5 md:p-6">
              <h3 className="font-bold text-zinc-950">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{p.description}</p>
            </div>
          </Coffee2Reveal>
        ))}
      </div>
      <Coffee2Reveal delay={120} className="mt-10">
        <blockquote className="border-l-4 border-zinc-950 pl-6 text-base italic leading-relaxed text-zinc-700 md:text-lg">
          <Coffee2AnnotatedText as="span" text={featureQuote} />
        </blockquote>
      </Coffee2Reveal>
      <Accordion type="single" collapsible defaultValue="tenet-0" className="mt-8">
        {tenetsAccordion.map((item, i) => (
          <AccordionItem key={item.title} value={`tenet-${i}`}>
            <AccordionTrigger className="text-left font-bold text-zinc-950">
              朗敦道十纲 · {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-zinc-600">{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Langton2SectionShell>
  )
}

export function Langton2ArchitectureSection() {
  return (
    <Langton2SectionShell
      id="architecture"
      className="bg-zinc-50"
      aria-labelledby="architecture-title"
    >
      <Coffee2Reveal>
        <p className="c2-eyebrow">{architectureContent.eyebrow}</p>
        <h2
          id="architecture-title"
          className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
        >
          {architectureContent.title}
        </h2>
      </Coffee2Reveal>
      <div className="mx-auto mt-10 flex h-[320px] max-w-[900px] items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white md:h-[400px]">
        <p className="text-sm text-zinc-500">
          组织架构图占位 — 可替换为 SVG/图片
        </p>
      </div>
      <p className="mt-4 text-center text-sm text-zinc-500">
        {architectureContent.caption}
      </p>
    </Langton2SectionShell>
  )
}

export function Langton2JoinBand() {
  return (
    <section
      className="border-b border-zinc-200 bg-zinc-950 py-20 md:py-28"
      aria-labelledby="langton2-join-band-title"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <p
            id="langton2-join-band-title"
            className="c2-display text-3xl text-white md:text-5xl lg:text-6xl"
          >
            <Coffee2DisplayTypewriter
              text={langtonJoinBand.statement}
              charStagger={65}
            />
          </p>
        </Coffee2Reveal>
        <Coffee2Reveal delay={100} className="c2-reveal-fade">
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {langtonJoinBand.tagline}
          </p>
        </Coffee2Reveal>
        <Coffee2Reveal delay={180} className="c2-reveal-fade">
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ContactTrigger size="lg" className="c2-btn-cta-emphasis">
              {langtonJoinBand.contactLabel}
            </ContactTrigger>
            <Link
              href={langtonJoinBand.ctaHref}
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-600 px-8 text-base font-bold text-white transition-colors hover:border-zinc-400 hover:bg-white/5"
            >
              {langtonJoinBand.ctaLabel}
            </Link>
          </div>
        </Coffee2Reveal>
      </div>
    </section>
  )
}
