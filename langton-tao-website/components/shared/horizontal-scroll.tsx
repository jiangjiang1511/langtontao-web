import { cn } from '@/lib/utils'

export function HorizontalScroll({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        '-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-thin sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8',
        className
      )}
    >
      {children}
    </div>
  )
}
