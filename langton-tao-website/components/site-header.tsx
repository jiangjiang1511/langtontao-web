'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavigationLink } from '@/components/navigation/navigation-link'
import { siteNav, aboutLangtonPageEnabled } from '@/lib/site-nav'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

function isNavActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const logoHref = aboutLangtonPageEnabled ? '/langton' : '/langtontao'

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4 sm:px-6">
      <div className="pointer-events-auto w-fit max-w-[calc(100vw-2rem)]">
        <div className="site-header-capsule flex h-12 items-center justify-between gap-1.5 rounded-full border border-zinc-200/80 bg-white/95 px-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md md:h-14 md:gap-3 md:px-4">
          <NavigationLink
            href={logoHref}
            prefetch
            className="flex shrink-0 items-center overflow-hidden rounded-full border-2 border-pop-black transition-all hover:-translate-y-0.5 hover:shadow-pop-yellow active:scale-[0.98]"
            aria-label={aboutLangtonPageEnabled ? '关于朗敦道' : '朗敦道'}
          >
            <Image
              src="/assets/LLT-logo.jpg"
              alt=""
              width={36}
              height={36}
              className="h-8 w-8 rounded-full object-cover md:h-9 md:w-9"
              priority
            />
          </NavigationLink>

          <nav
            className="hidden items-center gap-4 md:flex lg:gap-5"
            aria-label="主导航"
          >
            {siteNav.map((item) => (
              <NavigationLink
                key={item.href}
                href={item.href}
                prefetch
                className={cn(
                  'whitespace-nowrap transition-colors',
                  item.featured
                    ? 'text-base font-black text-zinc-950 md:text-lg'
                    : 'text-sm font-bold text-zinc-600 hover:text-zinc-950',
                  isNavActive(pathname, item.href) &&
                    (item.featured
                      ? 'underline decoration-pop-yellow decoration-4 underline-offset-4'
                      : 'text-zinc-950 underline decoration-zinc-300 decoration-2 underline-offset-4')
                )}
              >
                {item.label}
              </NavigationLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1 md:gap-2">
            <Button
              size="sm"
              className="hidden rounded-full px-4 md:inline-flex"
              asChild
            >
              <NavigationLink href="/member" prefetch>
                加入我们
              </NavigationLink>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="site-header-capsule mt-2 rounded-2xl border border-zinc-200/80 bg-white/95 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden">
            <nav className="flex flex-col gap-3" aria-label="移动端导航">
              {siteNav.map((item) => (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  prefetch
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'font-bold text-zinc-950',
                    item.featured ? 'text-lg font-black' : 'text-base',
                    isNavActive(pathname, item.href) &&
                      'underline decoration-pop-yellow decoration-4'
                  )}
                >
                  {item.label}
                </NavigationLink>
              ))}
              <Button className="mt-1 w-full rounded-full" size="lg" asChild>
                <NavigationLink
                  href="/member"
                  prefetch
                  onClick={() => setMobileOpen(false)}
                >
                  加入我们
                </NavigationLink>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
