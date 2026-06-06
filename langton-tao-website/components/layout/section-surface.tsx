import { cn } from '@/lib/utils'

export type SectionTheme = 'dark' | 'light' | 'paper' | 'white' | 'yellow'

type SectionSurfaceProps = React.HTMLAttributes<HTMLElement> & {
  id?: string
  theme?: SectionTheme
  narrow?: boolean
}

export function SectionSurface({
  id,
  theme = 'paper',
  narrow,
  className,
  children,
  ...props
}: SectionSurfaceProps) {
  return (
    <section
      id={id}
      data-theme={theme}
      className={cn(
        'section-surface scroll-mt-20 py-16 md:py-24',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          narrow ? 'max-w-[720px]' : 'max-w-7xl'
        )}
      >
        {children}
      </div>
    </section>
  )
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'text-eyebrow text-[color:var(--section-muted)]',
        className
      )}
    >
      {children}
    </p>
  )
}

export function SectionTitle({
  children,
  className,
  id,
  display,
}: {
  children: React.ReactNode
  className?: string
  id?: string
  display?: boolean
}) {
  return (
    <h2
      id={id}
      className={cn(
        display
          ? 'text-display mt-4 text-4xl uppercase md:text-5xl lg:text-6xl'
          : 'mt-3 text-2xl font-bold tracking-tight md:text-4xl',
        'text-[color:var(--section-fg)]',
        className
      )}
    >
      {children}
    </h2>
  )
}
