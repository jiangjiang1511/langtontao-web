import Image from 'next/image'
import {
  superheroJourneyIntro,
  superheroPrograms,
} from '@/lib/content/community-page'
import {
  Eyebrow,
  SectionSurface,
  SectionTitle,
} from '@/components/layout/section-surface'
import { cn } from '@/lib/utils'

const contentThemes = ['paper', 'white', 'paper'] as const

export function SuperheroJourneySection() {
  return (
    <div id="superhero-journey" className="scroll-mt-20">
      <SectionSurface
        theme="paper"
        className="pt-24 md:pt-28"
        aria-labelledby="superhero-title"
      >
        <Eyebrow>{superheroJourneyIntro.eyebrow}</Eyebrow>
        <SectionTitle id="superhero-title" display>
          {superheroJourneyIntro.title}
        </SectionTitle>
        <p className="mt-6 max-w-3xl text-base font-bold leading-relaxed text-[color:var(--section-muted)] md:text-lg">
          {superheroJourneyIntro.lead}
        </p>
      </SectionSurface>

      {superheroPrograms.map((program, index) => (
        <article
          key={program.id}
          id={program.anchor}
          className="scroll-mt-24 border-t-2 border-pop-black"
          aria-labelledby={`${program.id}-title`}
        >
          <div className="relative aspect-[5/2] min-h-[220px] w-full border-b-2 border-pop-black md:min-h-[360px] lg:aspect-[21/9]">
            <div
              className={cn('absolute inset-0', program.imageClass)}
              aria-hidden
            />
            <Image
              src={program.imageSrc}
              alt={program.imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-pop-black/25" />
            <div className="absolute bottom-0 left-0 right-0 border-t-2 border-pop-black bg-pop-black/70 px-4 py-5 sm:px-6 md:px-8 lg:px-12">
              <p className="text-xs font-black uppercase tracking-widest text-pop-yellow">
                {program.subtitle}
              </p>
              <h3
                id={`${program.id}-title`}
                className="text-display mt-1 text-3xl text-pop-white md:text-5xl"
              >
                {program.title}
              </h3>
            </div>
          </div>

          <SectionSurface theme={contentThemes[index] ?? 'paper'}>
            <div className="mx-auto max-w-3xl">
              <p className="text-base font-bold leading-relaxed text-[color:var(--section-muted)] md:text-lg">
                {program.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {program.highlights.map((item) => (
                  <li key={item}>
                    <span className="inline-block rounded-full border-2 border-pop-black bg-pop-white px-4 py-2 text-sm font-black text-pop-black">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionSurface>
        </article>
      ))}
    </div>
  )
}
