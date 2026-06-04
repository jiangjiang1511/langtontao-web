import Link from 'next/link'

const footerLinks = [
  { href: '/', label: '首页' },
  { href: '/hebi', label: '何必家办' },
  { href: '/heyi', label: '何以为家' },
]

export function SiteFooter() {
  return (
    <footer className="min-h-[320px] bg-primary py-12 text-white/80 md:py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Col 1: Logo & tagline */}
          <div className="space-y-4">
            <Link href="/" className="font-serif text-[24px] font-semibold text-white">
              朗敦道
            </Link>
            <p className="max-w-[280px] text-[14px] leading-relaxed text-white/70">
              为第二代华人财富传承提供系统解决方案
            </p>
          </div>

          {/* Col 2: Links */}
          <div>
            <h3 className="mb-4 text-[14px] font-semibold uppercase tracking-wider text-white">
              导航
            </h3>
            <nav className="flex flex-col gap-3" aria-label="页脚导航">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Compliance */}
          <div>
            <h3 className="mb-4 text-[14px] font-semibold uppercase tracking-wider text-white">
              合规声明
            </h3>
            <p className="max-w-[280px] text-[12px] leading-relaxed text-white/60">
              本站内容仅供教育与交流，不构成投资建议。
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-[13px] text-white/50">© 2026 朗敦道</p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-[13px] text-white/50 transition-colors hover:text-white/70"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-[13px] text-white/50 transition-colors hover:text-white/70"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
