import { SectionSurface } from '@/components/layout/section-surface'

type LangtonBannerProps = {
  title: string
  subtitle: string
  theme?: 'dark' | 'yellow' | 'paper'
  id?: string
}

export function LangtonBanner({
  title,
  subtitle,
  theme = 'dark',
  id,
}: LangtonBannerProps) {
  return (
    <SectionSurface
      id={id}
      theme={theme}
      className="py-12 md:py-16"
      aria-label={title}
    >
      <h2 className="text-display text-3xl uppercase md:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-4 text-sm font-bold uppercase tracking-widest text-[color:var(--section-muted)]">
        {subtitle}
      </p>
    </SectionSurface>
  )
}
