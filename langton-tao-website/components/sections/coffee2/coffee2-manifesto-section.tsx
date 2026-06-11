import Link from 'next/link'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { coffee2Manifesto } from '@/lib/content/coffee-manifesto'

export function Coffee2ManifestoSection() {
  return (
    <section
      id="coffee-manifesto"
      className="scroll-mt-28 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="coffee2-manifesto-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <p className="c2-eyebrow">{coffee2Manifesto.eyebrow}</p>
          <h2
            id="coffee2-manifesto-title"
            className="c2-display mt-4 text-3xl text-zinc-950 md:text-5xl"
          >
            {coffee2Manifesto.title}
          </h2>
          <p className="mt-4 text-xl font-semibold text-zinc-700 md:text-2xl">
            {coffee2Manifesto.subtitle}
          </p>
        </Coffee2Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {coffee2Manifesto.paragraphs.map((paragraph, index) => (
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

        <Coffee2Reveal delay={220} className="mt-10">
          <Link href={coffee2Manifesto.cta.href} className="c2-btn-primary">
            {coffee2Manifesto.cta.label}
          </Link>
        </Coffee2Reveal>
      </div>
    </section>
  )
}
