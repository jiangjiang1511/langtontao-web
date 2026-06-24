import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { langtontaoBeautifulPillars } from '@/lib/content/langtontao/langtontao-beautiful-business'
import { cn } from '@/lib/utils'

export function LangtontaoBeautifulPillars() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {langtontaoBeautifulPillars.map((pillar, index) => (
        <Coffee2Reveal key={pillar.id} delay={60 + index * 50} as="li">
          <li
            className={cn(
              'lt-pillar-card rounded-2xl border p-5',
              pillar.highlight
                ? 'lt-pillar-card--highlight border-violet-300 bg-violet-950 text-white'
                : 'c2-card bg-white'
            )}
          >
            <h3
              className={cn(
                'font-semibold',
                pillar.highlight ? 'text-white' : 'text-zinc-950'
              )}
            >
              {pillar.title}
            </h3>
            <p
              className={cn(
                'mt-2 text-sm leading-relaxed',
                pillar.highlight ? 'text-violet-200' : 'text-zinc-600'
              )}
            >
              {pillar.summary}
            </p>
          </li>
        </Coffee2Reveal>
      ))}
    </ul>
  )
}
