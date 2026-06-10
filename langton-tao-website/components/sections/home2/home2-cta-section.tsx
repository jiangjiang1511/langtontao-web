import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Home2CtaSection() {
  return (
    <section className="border-t border-zinc-200 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <Button
          size="lg"
          asChild
          className="rounded-full bg-white text-zinc-950 hover:bg-zinc-100"
        >
          <Link href="/member">加入我们</Link>
        </Button>
      </div>
    </section>
  )
}
