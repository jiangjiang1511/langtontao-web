import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PillLinkProps = {
  href: string
  children: React.ReactNode
  variant?: 'dark' | 'yellow' | 'outline'
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
        'inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5',
        variant === 'dark' &&
          'border-pop-black bg-pop-black text-pop-white shadow-pop-black',
        variant === 'yellow' &&
          'border-pop-black bg-pop-yellow text-pop-black shadow-pop-black',
        variant === 'outline' &&
          'border-pop-black bg-pop-white text-pop-black',
        className
      )}
    >
      {children}
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pop-white text-pop-black">
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  )
}
