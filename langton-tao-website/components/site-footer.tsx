import { FooterNavLinks } from '@/components/navigation/footer-nav-links'

export function SiteFooter() {
  return (
    <footer className="min-h-[320px] border-t border-zinc-800 bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 md:py-16 lg:px-8">
        <div>
          <p className="text-lg font-semibold">朗敦道</p>
          <p className="mt-3 max-w-[280px] text-sm font-medium leading-relaxed text-zinc-400">
            为第二代华人财富传承提供系统解决方案
          </p>
        </div>
        <div>
          <p className="jarsy-gradient-text text-sm font-semibold">导航</p>
          <FooterNavLinks />
        </div>
        <div>
          <p className="jarsy-gradient-text text-sm font-semibold">合规声明</p>
          <p className="mt-3 text-xs font-medium leading-relaxed text-zinc-500">
            本站内容仅供教育与交流，不构成投资建议。
          </p>
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs font-medium text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1">
            <p>© 2026 LANGTON TAO · ALL RIGHTS</p>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300"
            >
              粤ICP备2025467350号-1
            </a>
          </div>
          <div className="flex gap-4">
            <span>Terms</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
