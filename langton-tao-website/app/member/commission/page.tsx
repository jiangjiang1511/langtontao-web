import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowLeft } from 'lucide-react'
import { MembershipCommissionCalculator } from '@/components/sections/membership-v2/membership-commission-calculator'
import '@/styles/jarsy-v2.css'
import '@/styles/membership-commission.css'

export const metadata: Metadata = {
  title: '渠道收益计算器 | 朗敦道 Langton Tao',
  description:
    '朗敦道 MFO 事业合伙人渠道收益试算：选择会员档位与分享产品，即时估算推荐渠道收益，并生成分享海报与二维码。',
}

export default function MemberCommissionPage() {
  return (
    <div className="commission-calculator-page jarsy-v2-page min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/member#commission-overview"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-jarsy-violet"
        >
          <ArrowLeft className="h-4 w-4" />
          返回会员页 · 渠道收益总览
        </Link>

        <Suspense
          fallback={
            <div className="mt-10 rounded-2xl border border-zinc-800 p-10 text-center text-zinc-400">
              加载计算器…
            </div>
          }
        >
          <MembershipCommissionCalculator standalone className="mt-8" />
        </Suspense>
      </div>
    </div>
  )
}
