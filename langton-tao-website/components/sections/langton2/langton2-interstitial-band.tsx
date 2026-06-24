import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'

type Langton2InterstitialBandProps = {
  id?: string
  title: string
  subtitle: string
}

export function Langton2InterstitialBand({
  id,
  title,
  subtitle,
}: Langton2InterstitialBandProps) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-y border-zinc-800 bg-zinc-950 py-12 md:py-16"
      aria-label={title}
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Coffee2Reveal eager>
          <p className="c2-eyebrow text-zinc-500">{subtitle}</p>
          <h2 className="c2-display mt-3 text-2xl text-white md:text-4xl lg:text-5xl">
            {title}
          </h2>
        </Coffee2Reveal>
      </div>
    </section>
  )
}
