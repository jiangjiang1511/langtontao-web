import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { ContactProvider } from '@/components/providers/contact-provider'
import { GlossaryProvider } from '@/components/providers/glossary-provider'
import { StripCursorBrowserRefs } from '@/components/dev/strip-cursor-browser-refs'
import { ViewportDebugBadge } from '@/components/dev/viewport-debug-badge'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import './globals.css'
import './glossary.css'

export const metadata: Metadata = {
  title: '朗敦道 Langton Tao | VFO/MFO Leader in China',
  description: '为第二代华人财富传承提供系统解决方案',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">
        <StripCursorBrowserRefs />
        <ContactProvider>
          <GlossaryProvider>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <Toaster position="top-center" richColors />
            {process.env.NODE_ENV === 'development' ? (
              <ViewportDebugBadge />
            ) : null}
          </GlossaryProvider>
        </ContactProvider>
      </body>
    </html>
  )
}
