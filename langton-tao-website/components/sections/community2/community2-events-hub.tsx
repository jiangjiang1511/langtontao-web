'use client'

import { Coffee2DisplayTypewriter } from '@/components/sections/coffee2/coffee2-display-typewriter'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Community2EventCard } from '@/components/sections/community2/community2-event-card'
import { Community2Reveal } from '@/components/sections/community2/community2-reveal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { coffee2EventsMeta } from '@/lib/content/coffee2-page'
import {
  filterMillionairePlanEvents,
  millionairePlanFilters,
  type MillionairePlanFilterId,
} from '@/lib/content/community2-page'
import { cn } from '@/lib/utils'

export function Community2EventsHub() {
  return (
    <section
      id="millionaire-plan"
      className="scroll-mt-20 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="community2-events-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Community2Reveal className="max-w-2xl">
          <p className="c2-eyebrow">{coffee2EventsMeta.eyebrow}</p>
          <h2
            id="community2-events-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            <Coffee2DisplayTypewriter
              text={coffee2EventsMeta.title}
              charStagger={120}
            />
          </h2>
          <Coffee2AnnotatedText
            text={coffee2EventsMeta.tagline}
            className="mt-4 text-xl font-semibold tracking-tight text-zinc-500 md:text-2xl"
          />
          <Coffee2AnnotatedText
            text={coffee2EventsMeta.lead}
            className="mt-4 text-base leading-relaxed text-zinc-600 md:text-lg"
          />
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
                      <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
                        {events.map((event) => (
                          <li key={event.id}>
                            <Community2EventCard event={event} />
                          </li>
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

            <div className="mt-10 flex justify-center border-t border-zinc-200 pt-10">
              <a
                href={coffee2EventsMeta.moreEventsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="coffee2-cta-button"
              >
                {coffee2EventsMeta.moreEventsLabel}
              </a>
            </div>
          </div>
        </Community2Reveal>
      </div>
    </section>
  )
}
