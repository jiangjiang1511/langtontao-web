import { cn } from '@/lib/utils'

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id?: string
  narrow?: boolean
}

export function Section({ id, narrow, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-20 py-16 md:py-24', className)}
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

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
      {children}
    </p>
  )
}

export function SectionTitle({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <h2
      id={id}
      className={cn(
        'mt-3 text-2xl font-semibold tracking-tight text-zinc-900 md:text-4xl',
        className
      )}
    >
      {children}
    </h2>
  )
}
