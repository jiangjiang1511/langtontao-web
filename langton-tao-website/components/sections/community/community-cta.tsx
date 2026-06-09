import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function CommunityCta({
  variant = 'light',
}: {
  variant?: 'light' | 'dark'
}) {
  return (
    <div
      className={cn(
        'mt-12 rounded-lg border-2 p-8 text-center shadow-pop-black',
        variant === 'dark'
          ? 'border-pop-yellow bg-pop-black'
          : 'border-pop-black bg-pop-paper'
      )}
    >
      <p
        className={cn(
          'text-lg font-black',
          variant === 'dark' ? 'text-pop-white' : 'text-pop-black'
        )}
      >
        找到适合你的会员档位
      </p>
      <Button variant="default" size="lg" className="mt-6" asChild>
        <Link href="/member2">了解会员</Link>
      </Button>
    </div>
  )
}
