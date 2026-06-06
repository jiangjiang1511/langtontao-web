'use client'

import { ContactTrigger } from '@/components/contact-trigger'

export function CommunityCta() {
  return (
    <div className="mt-12 rounded-xl border border-zinc-200 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-zinc-900">
        找到适合你的会员档位
      </p>
      <ContactTrigger intent="了解会员" className="mt-6">
        了解会员
      </ContactTrigger>
    </div>
  )
}
