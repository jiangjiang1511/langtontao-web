'use client'

import { useCallback, useMemo } from 'react'
import {
  cityTierOptions,
  educationPathOptions,
  urbanRuralOptions,
  type ChildCostInput,
  type ChildCostResult,
} from '@/lib/content/coffee-child-cost-page'
import { drawChildCostPoster } from '@/lib/child-cost/draw-poster'
import { buildChildCostShareUrl } from '@/lib/child-cost/share-url'
import { CostCalculatorShareActions } from '@/components/sections/coffee2/cost-calculator-share-actions'

type ChildCostShareActionsProps = {
  input: ChildCostInput
  result: ChildCostResult
}

function getOptionLabel<T extends string>(
  options: readonly { id: T; label: string }[],
  id: T
) {
  return options.find((opt) => opt.id === id)?.label ?? id
}

export function ChildCostShareActions({
  input,
  result,
}: ChildCostShareActionsProps) {
  const shareUrl = useMemo(() => buildChildCostShareUrl(input), [input])

  const onDrawPoster = useCallback(
    async (canvas: HTMLCanvasElement) => {
      await drawChildCostPoster(
        canvas,
        {
          monthlyTotal: result.monthlyTotal,
          cumulativeTotal: result.cumulativeTotal,
          cityLabel: getOptionLabel(cityTierOptions, input.cityTier),
          urbanRuralLabel: getOptionLabel(urbanRuralOptions, input.urbanRural),
          educationPathLabel: getOptionLabel(
            educationPathOptions,
            input.educationPath
          ),
        },
        shareUrl
      )
    },
    [input, result, shareUrl]
  )

  return (
    <CostCalculatorShareActions
      shareUrl={shareUrl}
      downloadName="langton-child-cost-calculator.png"
      dialogTitle="分享养娃费用海报"
      dialogHint="海报含二维码，扫码打开 /coffee#life-education 并带入当前选项与估算结果。"
      onDrawPoster={onDrawPoster}
    />
  )
}
