'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { ContactDialog } from '@/components/contact-dialog'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/hebi', label: '何必家办' },
  { href: '/heyi', label: '何以为家' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 h-[64px] border-b border-[#E8E4DE] bg-[#FAF8F5]/80 backdrop-blur-md md:h-[72px]">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Wordmark */}
        <Link href="/" className="font-serif text-[20px] font-semibold text-foreground">
          朗敦道
        </Link>

        {/* Center nav - hidden on mobile */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="主导航">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative py-1 text-[15px] text-foreground transition-colors hover:text-accent',
                pathname === link.href &&
                  'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-accent'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ContactDialog>
            <Button className="hidden h-[40px] bg-primary px-5 text-[14px] text-primary-foreground hover:bg-primary/90 md:inline-flex">
              预约咨询
            </Button>
          </ContactDialog>

          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="打开菜单"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="right" className="w-[300px] bg-background p-6">
              <SheetTitle className="sr-only">导航菜单</SheetTitle>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[20px] font-semibold">朗敦道</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                    aria-label="关闭菜单"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-4" aria-label="移动端导航">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'py-2 text-[17px] text-foreground transition-colors hover:text-accent',
                        pathname === link.href && 'text-accent'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <ContactDialog>
                  <Button className="h-[48px] w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    预约咨询
                  </Button>
                </ContactDialog>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
