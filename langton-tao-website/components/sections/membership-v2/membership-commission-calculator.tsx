'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Share2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { MembershipTierId } from '@/lib/content/membership'
import {
  membershipCommissionProducts,
  membershipCommissionTierLabels,
  membershipCommissionTierOrder,
  type CommissionProductId,
} from '@/lib/content/membership-commission'
import { calculateMembershipCommission } from '@/lib/membership/calculate-commission'
import { MembershipCommissionSharePanel } from '@/components/sections/membership-v2/membership-commission-share-panel'
import { cn } from '@/lib/utils'

const tierOptions = membershipCommissionTierOrder.map((id) => ({
  id,
  label: membershipCommissionTierLabels[id],
}))

const productOptions = membershipCommissionProducts.map((product) => ({
  id: product.id,
  label: product.name,
  referencePrice: product.referencePrice,
  priceLabel: product.priceLabel,
}))

type MembershipCommissionCalculatorProps = {
  standalone?: boolean
  className?: string
}

function parseTier(value: string | null): MembershipTierId {
  if (value === 'plus' || value === 'pro' || value === 'board') return value
  return 'member'
}

function parseProduct(value: string | null): CommissionProductId {
  const valid: CommissionProductId[] = [
    'member',
    'plus',
    'pro',
    'health-checkup',
    'smart-english',
    'board-referral',
  ]
  return valid.includes(value as CommissionProductId)
    ? (value as CommissionProductId)
    : 'member'
}

export function MembershipCommissionCalculator({
  standalone = false,
  className,
}: MembershipCommissionCalculatorProps) {
  const searchParams = useSearchParams()
  const [tierId, setTierId] = useState<MembershipTierId>('member')
  const [productId, setProductId] = useState<CommissionProductId>('member')
  const [orderAmount, setOrderAmount] = useState(9800)
  const [shareOpen, setShareOpen] = useState(false)

  useEffect(() => {
    setTierId(parseTier(searchParams.get('tier')))
    setProductId(parseProduct(searchParams.get('product')))
    const amount = Number(searchParams.get('amount'))
    if (Number.isFinite(amount) && amount > 0) {
      setOrderAmount(amount)
    }
  }, [searchParams])

  useEffect(() => {
    const product = productOptions.find((item) => item.id === productId)
    if (product) {
      setOrderAmount(product.referencePrice)
    }
  }, [productId])

  const result = useMemo(
    () => calculateMembershipCommission(tierId, productId, orderAmount),
    [tierId, productId, orderAmount]
  )

  const selectedProduct = productOptions.find((item) => item.id === productId)

  return (
    <div
      className={cn(
        !standalone &&
          'mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 text-white',
        className
      )}
    >
      {!standalone ? (
        <div className="border-b border-zinc-800 px-6 py-6 md:px-8 md:py-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            Commission Calculator
          </p>
          <h3 className="mt-2 text-2xl font-semibold md:text-3xl">
            一键试算 · 一键分享
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            选择档位与产品组合试算，并生成带二维码的分享海报，邀请同频伙伴一起加入。
          </p>
        </div>
      ) : null}

      <div
        className={cn(
          'commission-calculator',
          standalone && 'commission-calculator--standalone',
          !standalone && 'commission-calculator--embedded'
        )}
      >
      <div className="commission-calculator__glow" aria-hidden />
      <div className="commission-calculator__grid">
        <div className="commission-calculator__panel commission-calculator__panel--inputs">
          {standalone ? (
            <div className="commission-calculator__hero-copy">
              <p className="commission-calculator__eyebrow">
                <Sparkles className="h-4 w-4" aria-hidden />
                Langton MFO · Commission Lab
              </p>
              <h1 className="commission-calculator__title">渠道收益计算器</h1>
              <p className="commission-calculator__lead">
                选择会员档位与分享产品，输入预估成交额，即时查看占位渠道收益。正式费率以协议为准。
              </p>
            </div>
          ) : null}

          <div className="commission-calculator__fields">
            <label className="commission-calculator__field">
              <span className="commission-calculator__label">我的会员档位</span>
              <select
                className="commission-calculator__select"
                value={tierId}
                onChange={(event) =>
                  setTierId(event.target.value as MembershipTierId)
                }
              >
                {tierOptions.map((tier) => (
                  <option key={tier.id} value={tier.id}>
                    {tier.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="commission-calculator__field">
              <span className="commission-calculator__label">分享的产品</span>
              <select
                className="commission-calculator__select"
                value={productId}
                onChange={(event) =>
                  setProductId(event.target.value as CommissionProductId)
                }
              >
                {productOptions.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.label}
                  </option>
                ))}
              </select>
              {selectedProduct ? (
                <span className="commission-calculator__hint">
                  参考价 {selectedProduct.priceLabel}
                </span>
              ) : null}
            </label>

            <label className="commission-calculator__field">
              <span className="commission-calculator__label">
                预估成交额（元）
              </span>
              <input
                type="number"
                min={0}
                step={100}
                className="commission-calculator__input"
                value={orderAmount}
                onChange={(event) =>
                  setOrderAmount(Math.max(0, Number(event.target.value) || 0))
                }
              />
            </label>
          </div>

          {standalone ? (
            <div className="commission-calculator__actions">
              <Button
                type="button"
                variant="default"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => setShareOpen(true)}
              >
                <Share2 className="h-4 w-4" />
                生成分享海报
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/member#commission-overview">查看渠道收益总览表</Link>
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="default"
              size="lg"
              className="mt-6 w-full"
              onClick={() => setShareOpen(true)}
            >
              <Share2 className="h-4 w-4" />
              生成分享海报
            </Button>
          )}
        </div>

        <div className="commission-calculator__panel commission-calculator__panel--result">
          <p className="commission-calculator__result-label">预估渠道收益</p>
          <p
            className={cn(
              'commission-calculator__result-value',
              !result.eligible && 'commission-calculator__result-value--muted'
            )}
          >
            {result.formattedAmount}
          </p>
          <p className="commission-calculator__result-rule">{result.ruleLabel}</p>
          <p className="commission-calculator__result-breakdown">{result.breakdown}</p>

          <div className="commission-calculator__result-meta">
            <div>
              <span className="commission-calculator__meta-key">档位</span>
              <span className="commission-calculator__meta-val">
                {membershipCommissionTierLabels[tierId]}
              </span>
            </div>
            <div>
              <span className="commission-calculator__meta-key">产品</span>
              <span className="commission-calculator__meta-val">
                {selectedProduct?.label}
              </span>
            </div>
          </div>

          {!result.eligible ? (
            <p className="commission-calculator__disclaimer commission-calculator__disclaimer--warn">
              当前组合暂无占位渠道收益规则。Pro 与私董会可解锁更多产品与团队分润。
            </p>
          ) : (
            <p className="commission-calculator__disclaimer">
              占位估算，不构成结算承诺。实际渠道收益以 CRM 成交记录与签约协议为准。
            </p>
          )}
        </div>
      </div>
      </div>

      <MembershipCommissionSharePanel
        open={shareOpen}
        onOpenChange={setShareOpen}
        tierId={tierId}
        productId={productId}
        orderAmount={orderAmount}
        commissionAmount={result.amount}
      />
    </div>
  )
}
