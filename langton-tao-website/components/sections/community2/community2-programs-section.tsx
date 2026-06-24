import Image from 'next/image'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Community2ProgramGallery } from '@/components/sections/community2/community2-program-gallery'
import { Community2Reveal } from '@/components/sections/community2/community2-reveal'
import {
  community2Process,
  community2Programs,
} from '@/lib/content/community2-page'
import { cn } from '@/lib/utils'

export function Community2ProgramsSection() {
  return (
    <section
      id="superhero-programs"
      className="scroll-mt-20 overflow-x-clip border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="community2-process-title"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Community2Reveal className="max-w-3xl">
          <p className="c2-eyebrow">Superhero Journey</p>
          <h2
            id="community2-process-title"
            className="c2-display break-words text-[clamp(2rem,7vw,3.75rem)] text-zinc-950 md:text-5xl lg:text-6xl"
          >
            {community2Process.titleLines[0]}
            <br />
            {community2Process.titleLines[1]}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {community2Process.subtitle}
          </p>
        </Community2Reveal>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {community2Programs.map((program, index) => (
            <Community2Reveal
              key={program.id}
              as="article"
              id={program.anchor}
              className="scroll-mt-28 min-w-0"
              delay={index * 80}
              aria-labelledby={`${program.id}-title`}
            >
              <div
                className={cn(
                  'grid min-w-0 items-start gap-8 lg:grid-cols-2 lg:gap-16',
                  index % 2 === 1 && 'lg:[&>*:first-child]:order-2'
                )}
              >
                <div className="c2-card min-w-0 max-w-full overflow-hidden">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={program.coverSrc}
                      alt={program.coverAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                  <div className="p-5 sm:p-6 md:p-8">
                    <p className="c2-eyebrow">{program.subtitle}</p>
                    <h3
                      id={`${program.id}-title`}
                      className="mt-3 break-words text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl md:text-3xl"
                    >
                      {program.title}
                    </h3>
                    <Coffee2AnnotatedText
                      text={program.description}
                      className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base"
                    />
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {program.highlights.map((item) => (
                        <li
                          key={item}
                          className="max-w-full rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium leading-snug text-zinc-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="min-w-0 max-w-full">
                  <p className="c2-eyebrow">Gallery</p>
                  <Community2ProgramGallery
                    programTitle={program.title}
                    gallery={program.gallery}
                  />
                </div>
              </div>
            </Community2Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
