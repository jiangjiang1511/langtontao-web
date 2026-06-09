import type { BookshelfPhase } from '@/lib/content/bookshelf'
import { cn } from '@/lib/utils'

const phaseStyles: Record<
  BookshelfPhase,
  { bg: string; accent: string; stripe: string }
> = {
  awakening: {
    bg: 'bg-pop-yellow',
    accent: 'text-pop-black',
    stripe: 'bg-pop-black',
  },
  foundation: {
    bg: 'bg-pop-paper',
    accent: 'text-pop-black',
    stripe: 'bg-pop-yellow',
  },
  weapon: {
    bg: 'bg-pop-black',
    accent: 'text-pop-white',
    stripe: 'bg-pop-yellow',
  },
  dragon: {
    bg: 'bg-pop-yellow',
    accent: 'text-pop-black',
    stripe: 'bg-pop-white',
  },
}

export function BookCoverFallback({
  title,
  author,
  phase,
  className,
}: {
  title: string
  author: string
  phase: BookshelfPhase
  className?: string
}) {
  const style = phaseStyles[phase]

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col justify-between border-2 border-pop-black p-3',
        style.bg,
        style.accent,
        className
      )}
      aria-hidden
    >
      <div className={cn('h-1.5 w-10', style.stripe)} />
      <div>
        <p className="text-[11px] font-black uppercase leading-tight tracking-wide">
          {title}
        </p>
        <p className="mt-2 text-[10px] font-bold opacity-80">{author}</p>
      </div>
      <div className={cn('h-1.5 w-full', style.stripe)} />
    </div>
  )
}
