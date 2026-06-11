import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { coffee2Cycles } from '@/lib/content/coffee-manifesto'

export function Coffee2CyclesSection() {
  return (
    <section
      id="coffee-cycles"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-50 py-16 md:py-24"
      aria-labelledby="coffee2-cycles-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <p className="c2-eyebrow">{coffee2Cycles.eyebrow}</p>
          <h2
            id="coffee2-cycles-title"
            className="c2-display mt-4 text-3xl text-zinc-950 md:text-4xl"
          >
            {coffee2Cycles.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {coffee2Cycles.lead}
          </p>
        </Coffee2Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {coffee2Cycles.items.map((cycle, index) => (
            <Coffee2Reveal
              key={cycle.id}
              delay={index * 100}
              className="c2-card p-6 md:p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-black text-zinc-950">
                  {cycle.title}
                </h3>
                <span className="shrink-0 text-sm font-bold text-zinc-400">
                  {cycle.duration}
                </span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                {cycle.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {cycle.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </Coffee2Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
