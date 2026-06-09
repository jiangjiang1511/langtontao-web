'use client'

import { ContactTrigger } from '@/components/contact-trigger'
import {
  Eyebrow,
  SectionSurface,
  SectionTitle,
} from '@/components/layout/section-surface'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  englishOfferings,
  englishSectionMeta,
  type EnglishOffering,
} from '@/lib/content/education-page'
import { cn } from '@/lib/utils'

function EnglishPreviewPanel({ offering }: { offering: EnglishOffering }) {
  return (
    <div className="rounded-lg border-2 border-pop-black bg-pop-white p-5 shadow-pop-black md:p-8">
      <h3 className="text-lg font-black text-pop-black md:text-xl">
        {offering.title}
      </h3>
      <p className="mt-2 text-sm font-bold leading-relaxed text-[color:var(--section-muted)]">
        {offering.summary}
      </p>

      {offering.previewType === 'timeline' ? (
        <ol className="mt-6 space-y-3">
          {offering.previewItems.map((item, index) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-pop-black text-xs font-black',
                  index === 0
                    ? 'bg-pop-yellow text-pop-black'
                    : 'bg-pop-paper text-pop-black/70'
                )}
              >
                {index + 1}
              </span>
              <div
                className={cn(
                  'flex-1 rounded-lg border-2 px-4 py-3',
                  index === 0
                    ? 'border-pop-yellow bg-pop-yellow/20'
                    : 'border-pop-black/15 bg-pop-paper'
                )}
              >
                <p className="text-sm font-black text-pop-black">{item}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {offering.previewType === 'skills' ? (
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {offering.previewItems.map((item, index) => (
              <span
                key={item}
                className={cn(
                  'rounded-full border-2 px-4 py-2 text-xs font-black',
                  index === 0
                    ? 'border-pop-black bg-pop-yellow text-pop-black'
                    : 'border-pop-black/30 bg-pop-paper text-pop-black/80'
                )}
              >
                {item}
              </span>
            ))}
          </div>
          {offering.previewMeta?.map((meta) => (
            <div
              key={meta.label}
              className="rounded-lg border-2 border-dashed border-pop-black/25 bg-pop-paper px-4 py-3"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-pop-black/50">
                {meta.label}
              </p>
              <p className="mt-1 text-sm font-black text-pop-black">
                {meta.value}
              </p>
            </div>
          ))}
          <div className="space-y-3 pt-2">
            {offering.previewItems.slice(0, 3).map((item, index) => (
              <div key={item}>
                <div className="mb-1 flex justify-between text-xs font-bold text-pop-black/70">
                  <span>{item}</span>
                  <span>{[72, 58, 45][index]}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full border border-pop-black/20 bg-pop-paper">
                  <div
                    className="h-full rounded-full bg-pop-yellow"
                    style={{ width: `${[72, 58, 45][index]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {offering.previewType === 'pathways' ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {offering.previewItems.map((item, index) => (
            <div
              key={item}
              className={cn(
                'rounded-lg border-2 p-4',
                index === 0
                  ? 'border-pop-black bg-pop-yellow shadow-pop-black'
                  : 'border-pop-black/25 bg-pop-paper'
              )}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-pop-black/50">
                路径 {index + 1}
              </p>
              <p className="mt-2 text-sm font-black text-pop-black">{item}</p>
            </div>
          ))}
          {offering.previewMeta?.map((meta) => (
            <div
              key={meta.label}
              className="rounded-lg border-2 border-pop-black/25 bg-pop-paper p-4 sm:col-span-2"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-pop-black/50">
                {meta.label}
              </p>
              <p className="mt-2 text-sm font-black text-pop-black">
                {meta.value}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <ContactTrigger
        intent={`英语 · ${offering.title}`}
        variant="default"
        size="lg"
        className="mt-8 w-full sm:w-auto"
      >
        预约咨询
      </ContactTrigger>
    </div>
  )
}

export function EnglishShowcaseSection() {
  return (
    <SectionSurface
      id="english"
      theme="white"
      aria-labelledby="english-title"
    >
      <Eyebrow>{englishSectionMeta.eyebrow}</Eyebrow>
      <SectionTitle id="english-title" display>
        {englishSectionMeta.title}
      </SectionTitle>
      <p className="mt-6 max-w-2xl text-base font-bold leading-relaxed text-[color:var(--section-muted)] md:text-lg">
        {englishSectionMeta.tagline}
      </p>
      <p className="mt-3 text-sm font-bold text-[color:var(--section-muted)]">
        {englishSectionMeta.note}
      </p>

      <h3 className="mt-12 text-xl font-black text-pop-black md:text-2xl">
        {englishSectionMeta.showcaseHeading}
      </h3>

      <Tabs
        defaultValue={englishOfferings[0].id}
        className="mt-8 lg:grid lg:grid-cols-[minmax(280px,360px)_1fr] lg:items-start lg:gap-8"
      >
        <TabsList className="flex h-auto w-full flex-col gap-3 rounded-none bg-transparent p-0 lg:sticky lg:top-24">
          {englishOfferings.map((offering) => (
            <TabsTrigger
              key={offering.id}
              value={offering.id}
              className={cn(
                'flex w-full flex-col items-start gap-2 rounded-lg border-2 px-4 py-4 text-left shadow-none',
                'data-[state=active]:border-pop-black data-[state=active]:bg-pop-black data-[state=active]:text-pop-yellow',
                'data-[state=inactive]:border-pop-black/25 data-[state=inactive]:bg-pop-paper data-[state=inactive]:text-pop-black',
                'data-[state=inactive]:hover:border-pop-black/50'
              )}
            >
              <span className="text-display text-3xl leading-none opacity-80">
                {offering.number}
              </span>
              <span className="text-base font-black">{offering.title}</span>
              <span className="text-xs font-bold leading-snug opacity-80">
                {offering.summary}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6 lg:mt-0">
          {englishOfferings.map((offering) => (
            <TabsContent
              key={offering.id}
              value={offering.id}
              className="mt-0 focus-visible:outline-none"
            >
              <EnglishPreviewPanel offering={offering} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </SectionSurface>
  )
}
