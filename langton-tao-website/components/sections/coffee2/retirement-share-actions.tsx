'use client'

import { useCallback, useMemo } from 'react'
import {
  cityTierOptions,
  homeCareLevelOptions,
  homeCaregiverOptions,
  institutionalCareLevelOptions,
  institutionalTypeOptions,
  retirementSectionMeta,
  type HomeCareInput,
  type InstitutionalCareInput,
  type RetirementCostResult,
} from '@/lib/content/coffee-retirement-page'
import { drawRetirementPoster } from '@/lib/retirement/draw-poster'
import {
  buildRetirementShareUrl,
  type RetirementCalculatorMode,
} from '@/lib/retirement/share-url'
import { CostCalculatorShareActions } from '@/components/sections/coffee2/cost-calculator-share-actions'

type RetirementShareActionsProps = {
  mode: RetirementCalculatorMode
  homeInput: HomeCareInput
  institutionalInput: InstitutionalCareInput
  result: RetirementCostResult
}

function getOptionLabel<T extends string>(
  options: readonly { id: T; label: string }[],
  id: T
) {
  return options.find((opt) => opt.id === id)?.label ?? id
}

export function RetirementShareActions({
  mode,
  homeInput,
  institutionalInput,
  result,
}: RetirementShareActionsProps) {
  const shareUrl = useMemo(
    () => buildRetirementShareUrl(mode, homeInput, institutionalInput),
    [mode, homeInput, institutionalInput]
  )

  const modeLabel =
    mode === 'home'
      ? retirementSectionMeta.homeTab
      : retirementSectionMeta.institutionalTab

  const detailLabel =
    mode === 'home'
      ? `${getOptionLabel(homeCareLevelOptions, homeInput.careLevel)} · ${getOptionLabel(homeCaregiverOptions, homeInput.caregiver)}`
      : `${getOptionLabel(institutionalTypeOptions, institutionalInput.institutionType)} · ${getOptionLabel(institutionalCareLevelOptions, institutionalInput.careLevel)}`

  const cityTier =
    mode === 'home' ? homeInput.cityTier : institutionalInput.cityTier

  const onDrawPoster = useCallback(
    async (canvas: HTMLCanvasElement) => {
      await drawRetirementPoster(
        canvas,
        {
          mode,
          modeLabel,
          monthlyTotal: result.monthlyTotal,
          lifetimeExposure: result.lifetimeExposure,
          planningYears: result.planningYears,
          cityLabel: getOptionLabel(cityTierOptions, cityTier),
          detailLabel,
        },
        shareUrl
      )
    },
    [mode, modeLabel, result, cityTier, detailLabel, shareUrl]
  )

  return (
    <CostCalculatorShareActions
      shareUrl={shareUrl}
      downloadName={`langton-retirement-${mode}-calculator.png`}
      dialogTitle="分享养老费用海报"
      dialogHint="海报含二维码，扫码打开 /coffee#life-retirement 并带入当前选项与估算结果。"
      onDrawPoster={onDrawPoster}
    />
  )
}
