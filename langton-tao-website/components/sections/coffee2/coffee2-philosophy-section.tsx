import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { coffee2Philosophy } from '@/lib/content/coffee2-page'

export function Coffee2PhilosophySection() {
  return (
    <section
      className="border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="coffee2-philosophy-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal className="max-w-3xl">
          <p className="c2-eyebrow">Schumpeter · Dialogue</p>
          <h2
            id="coffee2-philosophy-title"
            className="c2-display mt-4 text-3xl text-zinc-950 md:text-4xl"
          >
            创造性破坏与诚实交谈
          </h2>
        </Coffee2Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12">
          {coffee2Philosophy.paragraphs.map((paragraph, index) => (
            <Coffee2Reveal
              key={paragraph.slice(0, 24)}
              delay={index * 100}
              className="c2-card p-6 md:p-8"
            >
              <p className="text-base leading-relaxed text-zinc-600 md:text-lg">
                {paragraph}
              </p>
            </Coffee2Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
