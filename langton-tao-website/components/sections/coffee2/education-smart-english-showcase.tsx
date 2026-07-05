'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  smartEnglishCaseStats,
  smartEnglishCoverage,
  smartEnglishDualEngine,
  smartEnglishFeatures,
  smartEnglishLearningZones,
  smartEnglishMeta,
} from '@/lib/content/smart-english'

export function EducationSmartEnglishShowcase() {
  return (
    <Coffee2Reveal delay={60}>
      <article
        id="coffee-smart-english"
        className="education-smart-english c2-pop-panel scroll-mt-24"
        aria-labelledby="coffee-smart-english-title"
      >
        <p className="c2-pop-stamp">{smartEnglishMeta.eyebrow}</p>
        <p className="education-smart-english__brand mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
          {smartEnglishMeta.brandLine}
        </p>
        <h4
          id="coffee-smart-english-title"
          className="education-smart-english__title mt-2 text-2xl font-black tracking-tight text-zinc-950 md:text-3xl"
        >
          {smartEnglishMeta.title}
        </h4>
        <p className="education-smart-english__tagline mt-3 text-base font-bold text-zinc-900 md:text-lg">
          {smartEnglishMeta.tagline}
        </p>
        <p className="education-smart-english__lead mt-3 text-sm leading-relaxed text-zinc-600 md:text-base">
          {smartEnglishMeta.lead}
        </p>

        <div className="mt-8 space-y-4">
          {smartEnglishMeta.philosophy.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-sm leading-relaxed text-zinc-600"
            >
              {paragraph}
            </p>
          ))}
          <div className="education-smart-english__callout mt-6 rounded-lg border-2 border-zinc-950 bg-[#fffef2] px-4 py-4 shadow-[3px_3px_0_0_var(--jarsy-violet)]">
            <p className="text-sm font-bold text-zinc-950">
              {smartEnglishMeta.parentCallout.question}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {smartEnglishMeta.parentCallout.response}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {smartEnglishDualEngine.map((engine) => (
            <div
              key={engine.id}
              className="rounded-lg border-2 border-zinc-950 bg-white p-5 shadow-[2px_2px_0_0_var(--jarsy-violet)]"
            >
              <h5 className="text-base font-bold text-zinc-950">{engine.title}</h5>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {engine.summary}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            三大特点
          </h5>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {smartEnglishFeatures.map((feature) => (
              <li
                key={feature.id}
                className="rounded-lg border-2 border-zinc-200 bg-zinc-50/80 p-4"
              >
                <p className="text-sm font-bold text-zinc-950">{feature.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                  {feature.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            阶梯学习模块
          </h5>
          <Accordion
            type="single"
            collapsible
            defaultValue={smartEnglishLearningZones[0].id}
            className="mt-4 rounded-lg border-2 border-zinc-950 bg-white px-4"
          >
            {smartEnglishLearningZones.map((zone) => (
              <AccordionItem key={zone.id} value={zone.id}>
                <AccordionTrigger className="text-sm font-bold text-zinc-950">
                  {zone.label}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pb-2">
                    {zone.modules.map((module) => (
                      <span
                        key={module}
                        className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-800"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10">
          <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            提分案例
          </h5>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {smartEnglishCaseStats.map((stat) => (
              <li
                key={stat.id}
                className="rounded-lg border-2 border-zinc-950 bg-zinc-950 p-4 text-white"
              >
                <p className="text-xl font-black text-[var(--jarsy-violet)] md:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            覆盖范围
          </h5>
          <div className="mt-4 flex flex-wrap gap-2">
            {smartEnglishCoverage.map((item) => (
              <span
                key={item}
                className="rounded-full border-2 border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Coffee2Reveal>
  )
}
