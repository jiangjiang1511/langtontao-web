import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import {
  englishPrograms,
  englishSectionMeta,
} from '@/lib/content/education2-page'
import type { EnglishProgramItem } from '@/lib/content/education-page'
import { cn } from '@/lib/utils'

function EnglishProgramItemCard({
  item,
  index,
}: {
  item: EnglishProgramItem
  index: number
}) {
  return (
    <JarsyReveal delay={index * 70} className="c2-card p-6 md:p-8">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        {item.layout === 'smartEnglish' ? 'AI · Smart English' : 'Program'}
      </p>
      <h4 className="mt-3 text-xl font-semibold text-zinc-950 md:text-2xl">
        {item.title}
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base">
        {item.summary}
      </p>
      {item.children?.length ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {item.children.map((child) => (
            <li
              key={child.id}
              className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
            >
              <p className="text-sm font-semibold text-zinc-950">{child.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                {child.summary}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </JarsyReveal>
  )
}

export function Education2EnglishSection() {
  return (
    <section
      id="english"
      className="scroll-mt-20 border-b border-zinc-200 bg-zinc-50/80 py-16 md:py-24"
      aria-labelledby="education2-english-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <JarsyReveal className="max-w-2xl">
          <p className="c2-eyebrow">{englishSectionMeta.eyebrow}</p>
          <h2
            id="education2-english-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            {englishSectionMeta.title}
          </h2>
          <p className="mt-4 text-xl font-semibold tracking-tight text-zinc-500 md:text-2xl">
            {englishSectionMeta.tagline}
          </p>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
            {englishSectionMeta.lead}
          </p>
        </JarsyReveal>

        <div className="mt-16 space-y-20 md:space-y-28">
          {englishPrograms.map((program, programIndex) => (
            <div
              key={program.id}
              id={program.id}
              className={cn(
                'scroll-mt-28 border-t border-zinc-200 pt-16 md:pt-20',
                programIndex === 0 && 'border-t-0 pt-0'
              )}
            >
              <JarsyReveal>
                <p className="c2-eyebrow">{program.sectionLabel}</p>
                <h3 className="c2-display mt-4 text-3xl text-zinc-950 md:text-4xl">
                  {program.planTitle}
                </h3>
                <p className="mt-3 text-lg text-zinc-500">{program.planTagline}</p>
              </JarsyReveal>

              <div className="mt-10 space-y-6">
                {program.items.map((item, itemIndex) => (
                  <EnglishProgramItemCard
                    key={item.id}
                    item={item}
                    index={programIndex * 3 + itemIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
