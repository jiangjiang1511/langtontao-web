import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PillLinkProps = {
  href: string
  children: React.ReactNode
  variant?: 'dark' | 'gradient' | 'outline'
  className?: string
}

export function PillLink({
  href,
  children,
  variant = 'dark',
  className,
}: PillLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5',
        variant === 'dark' &&
          'bg-zinc-950 text-white shadow-[var(--jarsy-glow)]',
        variant === 'gradient' &&
          'bg-[image:var(--jarsy-gradient)] text-white shadow-[var(--jarsy-glow)]',
        variant === 'outline' &&
          'border border-zinc-200 bg-white text-zinc-950 hover:shadow-[var(--jarsy-glow)]',
        className
      )}
    >
      {children}
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  )
}
