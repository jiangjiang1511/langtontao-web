'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { LangtontaoYitishuangkuaCta } from '@/lib/content/langtontao/langtontao-hong-kong'
import { cn } from '@/lib/utils'

type LangtontaoYitishuangkuaCtaProps = {
  cta: LangtontaoYitishuangkuaCta
  className?: string
}

function isComingSoonCta(
  cta: LangtontaoYitishuangkuaCta
): cta is Extract<LangtontaoYitishuangkuaCta, { comingSoon: true }> {
  return 'comingSoon' in cta && cta.comingSoon === true
}

export function LangtontaoYitishuangkuaCta({ cta, className }: LangtontaoYitishuangkuaCtaProps) {
  const [open, setOpen] = useState(false)

  if (isComingSoonCta(cta)) {
    return (
      <>
        <button
          type="button"
          className={cn('c2-btn-cta-emphasis inline-flex', className)}
          onClick={() => setOpen(true)}
        >
          {cta.label}
        </button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>敬请期待</DialogTitle>
            </DialogHeader>
            <p className="text-sm leading-relaxed text-zinc-600">
              香港全球资产配置沙龙报名通道即将开放，请稍后再试。
            </p>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <Link href={cta.href} className={cn('c2-btn-cta-emphasis inline-flex', className)}>
      {cta.label}
    </Link>
  )
}
