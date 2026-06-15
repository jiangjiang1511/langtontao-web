import Image from 'next/image'
import { cn } from '@/lib/utils'

type Coffee2BackedLogoCardProps = {
  src: string
  alt: string
  width: number
  height: number
  variant?: 'light' | 'dark'
  className?: string
}

export function Coffee2BackedLogoCard({
  src,
  alt,
  width,
  height,
  variant = 'light',
  className,
}: Coffee2BackedLogoCardProps) {
  return (
    <div
      className={cn(
        'coffee2-backed-logo-card',
        variant === 'dark' && 'coffee2-backed-logo-card--dark',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="coffee2-backed-logo-card__image"
      />
    </div>
  )
}
