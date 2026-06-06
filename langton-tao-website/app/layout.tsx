import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { ContactProvider } from '@/components/providers/contact-provider'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

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
        <ContactProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <Toaster position="top-center" richColors />
        </ContactProvider>
      </body>
    </html>
  )
}
