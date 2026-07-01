import type { Metadata } from 'next'
import { WealthCheckupDetailView } from '@/components/sections/wealth-checkup/wealth-checkup-detail-view'
import { wealthCheckupDetailMeta } from '@/lib/content/langtontao/wealth-checkup-detail-page'
import './wealth-checkup.css'

export const metadata: Metadata = {
  title: `${wealthCheckupDetailMeta.title} | 朗敦道 Langton Tao`,
  description: wealthCheckupDetailMeta.description,
}

export default function WealthCheckupPage() {
  return (
    <div className="bg-white text-zinc-950">
      <WealthCheckupDetailView />
    </div>
  )
}
