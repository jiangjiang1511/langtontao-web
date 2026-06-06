import Image from 'next/image'
import { cn } from '@/lib/utils'

const clipStyle = {
  clipPath:
    'polygon(12% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 82%, 12% 68%, 0% 50%, 12% 32%, 0% 18%, 12% 0%)',
} as const

export function HeroImageFrame({
  className,
  variant = 'default',
}: {
  className?: string
  variant?: 'default' | 'background'
}) {
  const isBackground = variant === 'background'

  return (
    <div className={className} aria-hidden={isBackground}>
      <div
        className={cn(
          'relative w-full',
          isBackground
            ? 'aspect-[3/4] opacity-35'
            : 'aspect-[4/5] max-w-[520px] border-2 border-pop-black lg:ml-auto lg:aspect-[3/4]'
        )}
        style={{
          ...clipStyle,
          boxShadow: isBackground ? undefined : '6px 6px 0 0 #000',
        }}
      >
        <div className="absolute inset-0 bg-pop-paper">
          <Image
            src="/hero/placeholder.svg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 75vw, 520px"
          />
        </div>
      </div>
    </div>
  )
}
