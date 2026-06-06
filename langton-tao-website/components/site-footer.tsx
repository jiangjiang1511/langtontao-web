import Link from 'next/link'
import { footerSpotlightNav, siteNav } from '@/lib/site-nav'

export function SiteFooter() {
  return (
    <footer className="min-h-[320px] border-t-2 border-pop-black bg-pop-black text-pop-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 md:py-16 lg:px-8">
        <div>
          <p className="text-lg font-black">朗敦道</p>
          <p className="mt-3 max-w-[280px] text-sm font-bold leading-relaxed text-pop-white/80">
            为第二代华人财富传承提供系统解决方案
          </p>
        </div>
        <div>
          <p className="text-sm font-black text-pop-yellow">导航</p>
          <div className="mt-3 grid grid-cols-2 gap-x-8">
            <ul className="space-y-2">
              {siteNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-bold text-pop-white/80 hover:text-pop-yellow"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {footerSpotlightNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-bold text-pop-white/80 hover:text-pop-yellow"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p className="text-sm font-black text-pop-yellow">合规声明</p>
          <p className="mt-3 text-xs font-bold leading-relaxed text-pop-white/70">
            本站内容仅供教育与交流，不构成投资建议。
          </p>
        </div>
      </div>
      <div className="border-t-2 border-pop-white/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs font-bold text-pop-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 LANGTON TAO · ALL RIGHTS</p>
          <div className="flex gap-4">
            <span>Terms</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
