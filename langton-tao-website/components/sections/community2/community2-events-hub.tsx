'use client'

import { Community2EventCard } from '@/components/sections/community2/community2-event-card'
import { Community2Reveal } from '@/components/sections/community2/community2-reveal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  filterMillionairePlanEvents,
  getMillionairePlanCategoryCounts,
  millionairePlanFilters,
  millionairePlanMeta,
  type MillionairePlanFilterId,
} from '@/lib/content/community2-page'
import { cn } from '@/lib/utils'

const categoryLabels: Record<
  Exclude<MillionairePlanFilterId, 'upcoming'>,
  string
> = {
  'online-course': '线上课',
  salon: '财富沙龙',
  reading: '读书会',
}

export function Community2EventsHub() {
  const counts = getMillionairePlanCategoryCounts()

  return (
    <section
      id="millionaire-plan"
      className="scroll-mt-20 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="community2-events-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Community2Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="c2-eyebrow">{millionairePlanMeta.eyebrow}</p>
              <h2
                id="community2-events-title"
                className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
              >
                {millionairePlanMeta.title}
              </h2>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-400 md:text-3xl">
                财商认知定投
              </p>
              <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
                {millionairePlanMeta.lead}
              </p>
            </div>

            <ul className="flex flex-wrap gap-3 lg:max-w-md lg:justify-end">
              {(
                Object.entries(categoryLabels) as [
                  Exclude<MillionairePlanFilterId, 'upcoming'>,
                  string,
                ][]
              ).map(([key, label], index) => (
                <Community2Reveal
                  key={key}
                  as="li"
                  delay={index * 70}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-center"
                >
                  <p className="text-2xl font-semibold leading-none text-zinc-950">
                    {counts[key]}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                    {label}
                  </p>
                </Community2Reveal>
              ))}
            </ul>
          </div>
        </Community2Reveal>

        <Community2Reveal delay={120} className="mt-12">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 md:p-8">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="h-auto w-full flex-wrap justify-start gap-2 rounded-none bg-transparent p-0">
                {millionairePlanFilters.map((filter) => (
                  <TabsTrigger
                    key={filter.id}
                    value={filter.id}
                    className={cn(
                      'c2-tab-trigger rounded-full border border-transparent px-4 py-2 text-sm font-medium shadow-none',
                      'data-[state=active]:border-zinc-950 data-[state=active]:bg-zinc-950 data-[state=active]:text-white',
                      'data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:border-zinc-200 data-[state=inactive]:hover:bg-white'
                    )}
                  >
                    {filter.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {millionairePlanFilters.map((filter) => {
                const events = filterMillionairePlanEvents(
                  filter.id as MillionairePlanFilterId
                )

                return (
                  <TabsContent
                    key={filter.id}
                    value={filter.id}
                    className="mt-8"
                  >
                    {events.length > 0 ? (
                      <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
                        {events.map((event, eventIndex) => (
                          <Community2Reveal
                            key={event.id}
                            as="li"
                            delay={eventIndex * 60}
                          >
                            <Community2EventCard event={event} />
                          </Community2Reveal>
                        ))}
                      </ul>
                    ) : (
                      <p className="rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center text-sm text-zinc-500">
                        暂无活动，敬请期待
                      </p>
                    )}
                  </TabsContent>
                )
              })}
            </Tabs>
          </div>
        </Community2Reveal>
      </div>
    </section>
  )
}
