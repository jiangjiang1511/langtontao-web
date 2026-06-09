'use client'

import { MillionaireEventCard } from '@/components/sections/community/millionaire-event-card'
import {
  Eyebrow,
  SectionSurface,
  SectionTitle,
} from '@/components/layout/section-surface'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  filterMillionairePlanEvents,
  getMillionairePlanCategoryCounts,
  millionairePlanFilters,
  millionairePlanMeta,
  type MillionairePlanFilterId,
} from '@/lib/content/community-page'
import { cn } from '@/lib/utils'

const categoryLabels: Record<
  Exclude<MillionairePlanFilterId, 'upcoming'>,
  string
> = {
  'online-course': '线上课',
  salon: '财富沙龙',
  reading: '读书会',
}

export function MillionairePlanSection() {
  const counts = getMillionairePlanCategoryCounts()

  return (
    <SectionSurface
      id="millionaire-plan"
      theme="yellow"
      className="scroll-mt-20 border-t-2 border-pop-black"
      aria-labelledby="millionaire-title"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>{millionairePlanMeta.eyebrow}</Eyebrow>
          <SectionTitle id="millionaire-title" display className="mt-4">
            {millionairePlanMeta.title}
          </SectionTitle>
          <p className="mt-6 text-base font-bold leading-relaxed text-[color:var(--section-muted)] md:text-lg">
            {millionairePlanMeta.lead}
          </p>
        </div>

        <ul className="flex flex-wrap gap-3 lg:max-w-md lg:justify-end">
          {(
            Object.entries(categoryLabels) as [
              Exclude<MillionairePlanFilterId, 'upcoming'>,
              string,
            ][]
          ).map(([key, label]) => (
            <li
              key={key}
              className="rounded-lg border-2 border-pop-black bg-pop-white px-4 py-3 text-center shadow-pop-black"
            >
              <p className="text-2xl font-black leading-none text-pop-black">
                {counts[key]}
              </p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-pop-black/60">
                {label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 rounded-lg border-2 border-pop-black bg-pop-white p-5 shadow-pop-black md:p-8">
        <p className="sr-only" id="millionaire-events-heading">
          千万富翁养成计划活动列表
        </p>

        <Tabs defaultValue="upcoming" className="w-full">
          <div className="border-b-2 border-pop-black pb-4">
            <TabsList className="h-auto w-full flex-wrap justify-start gap-2 rounded-none bg-transparent p-0">
              {millionairePlanFilters.map((filter) => (
                <TabsTrigger
                  key={filter.id}
                  value={filter.id}
                  className={cn(
                    'rounded-none border-2 px-4 py-2 text-xs font-black uppercase tracking-wide shadow-none',
                    'data-[state=active]:border-pop-black data-[state=active]:bg-pop-black data-[state=active]:text-pop-yellow',
                    'data-[state=inactive]:border-transparent data-[state=inactive]:bg-transparent data-[state=inactive]:text-pop-black/60',
                    'data-[state=inactive]:hover:border-pop-black/20 data-[state=inactive]:hover:bg-pop-paper'
                  )}
                >
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {millionairePlanFilters.map((filter) => {
            const events = filterMillionairePlanEvents(
              filter.id as MillionairePlanFilterId
            )

            return (
              <TabsContent
                key={filter.id}
                value={filter.id}
                className="mt-8"
                aria-labelledby="millionaire-events-heading"
              >
                {events.length > 0 ? (
                  <ul className="grid gap-8 md:grid-cols-2 lg:gap-10">
                    {events.map((event) => (
                      <li key={event.id}>
                        <MillionaireEventCard event={event} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="rounded-lg border-2 border-dashed border-pop-black/25 bg-pop-paper px-6 py-12 text-center text-sm font-bold text-pop-black/60">
                    暂无活动，敬请期待
                  </p>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </SectionSurface>
  )
}
