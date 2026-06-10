'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { siteNav } from '@/lib/site-nav'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 h-16 border-b-2 border-pop-black bg-pop-white/90 backdrop-blur-md md:h-[72px]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-black tracking-tight text-pop-black"
        >
          朗敦道
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="主导航">
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-bold text-pop-black/70 transition-colors hover:text-pop-black',
                pathname === item.href &&
                  'text-pop-black underline decoration-pop-yellow decoration-4 underline-offset-4'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button size="default" asChild>
            <Link href="/member">加入我们</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t-2 border-pop-black bg-pop-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="移动端导航">
            {siteNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'text-base font-bold text-pop-black',
                  pathname === item.href && 'underline decoration-pop-yellow decoration-4'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button className="mt-2 w-full" size="lg" asChild>
              <Link href="/member" onClick={() => setMobileOpen(false)}>
                加入我们
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
