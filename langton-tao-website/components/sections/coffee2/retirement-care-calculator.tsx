'use client'

import { useMemo } from 'react'
import {
  chronicDiseaseOptions,
  cityTierOptions,
  homeCareLevelOptions,
  homeCaregiverOptions,
  homeMealOptions,
  homeRetrofitOptions,
  institutionalCareLevelOptions,
  institutionalRoomOptions,
  institutionalTypeOptions,
  ltcInsuranceOptions,
  medicalAddonOptions,
  retirementPlanningYearOptions,
  retirementSectionMeta,
  type HomeCareInput,
  type InstitutionalCareInput,
} from '@/lib/content/coffee-retirement-page'
import { calculateHomeCareCost } from '@/lib/retirement/calculate-home-care-cost'
import { calculateInstitutionalCareCost } from '@/lib/retirement/calculate-institutional-care-cost'
import { formatCny } from '@/lib/retirement/cost-benchmarks'
import type { RetirementCalculatorMode } from '@/lib/retirement/share-url'
import { RetirementCostFishbone } from '@/components/sections/coffee2/retirement-cost-fishbone'
import { RetirementShareActions } from '@/components/sections/coffee2/retirement-share-actions'
import { cn } from '@/lib/utils'

type FieldProps<T extends string> = {
  label: string
  value: T
  options: readonly { id: T; label: string }[]
  onChange: (value: T) => void
}

function OptionButtonField<T extends string>({
  label,
  value,
  options,
  onChange,
}: FieldProps<T>) {
  return (
    <div className="retirement-calc__field" role="group" aria-label={label}>
      <span className="retirement-calc__label">{label}</span>
      <div className="retirement-calc__option-pills">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={cn(
              'retirement-calc__option-pill',
              value === opt.id && 'retirement-calc__option-pill--active'
            )}
            aria-pressed={value === opt.id}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

type RetirementCareCalculatorProps = {
  mode: RetirementCalculatorMode
  homeInput: HomeCareInput
  institutionalInput: InstitutionalCareInput
  onHomeInputChange: (input: HomeCareInput) => void
  onInstitutionalInputChange: (input: InstitutionalCareInput) => void
  className?: string
}

export function RetirementCareCalculator({
  mode,
  homeInput,
  institutionalInput,
  onHomeInputChange,
  onInstitutionalInputChange,
  className,
}: RetirementCareCalculatorProps) {
  const planningYears =
    mode === 'home' ? homeInput.planningYears : institutionalInput.planningYears

  const setPlanningYears = (years: number) => {
    if (mode === 'home') {
      onHomeInputChange({ ...homeInput, planningYears: years })
    } else {
      onInstitutionalInputChange({
        ...institutionalInput,
        planningYears: years,
      })
    }
  }

  const result = useMemo(() => {
    return mode === 'home'
      ? calculateHomeCareCost(homeInput)
      : calculateInstitutionalCareCost(institutionalInput)
  }, [mode, homeInput, institutionalInput])

  const updateHome = <K extends keyof HomeCareInput>(
    key: K,
    value: HomeCareInput[K]
  ) => onHomeInputChange({ ...homeInput, [key]: value })

  const updateInst = <K extends keyof InstitutionalCareInput>(
    key: K,
    value: InstitutionalCareInput[K]
  ) => onInstitutionalInputChange({ ...institutionalInput, [key]: value })

  return (
    <div className={cn('retirement-calc', className)}>
      <div className="retirement-calc__grid">
        <div className="retirement-calc__panel retirement-calc__panel--inputs">
          <div className="retirement-calc__fields">
            <OptionButtonField
              label="所在城市"
              value={mode === 'home' ? homeInput.cityTier : institutionalInput.cityTier}
              options={cityTierOptions}
              onChange={(v) =>
                mode === 'home'
                  ? updateHome('cityTier', v)
                  : updateInst('cityTier', v)
              }
            />

            {mode === 'home' ? (
              <>
                <OptionButtonField
                  label="护理等级"
                  value={homeInput.careLevel}
                  options={homeCareLevelOptions}
                  onChange={(v) => updateHome('careLevel', v)}
                />
                <OptionButtonField
                  label="照护来源"
                  value={homeInput.caregiver}
                  options={homeCaregiverOptions}
                  onChange={(v) => updateHome('caregiver', v)}
                />
                <OptionButtonField
                  label="适老化改造"
                  value={homeInput.retrofit}
                  options={homeRetrofitOptions}
                  onChange={(v) => updateHome('retrofit', v)}
                />
                <OptionButtonField
                  label="餐饮方式"
                  value={homeInput.meal}
                  options={homeMealOptions}
                  onChange={(v) => updateHome('meal', v)}
                />
              </>
            ) : (
              <>
                <OptionButtonField
                  label="机构档次"
                  value={institutionalInput.institutionType}
                  options={institutionalTypeOptions}
                  onChange={(v) => updateInst('institutionType', v)}
                />
                <OptionButtonField
                  label="护理等级"
                  value={institutionalInput.careLevel}
                  options={institutionalCareLevelOptions}
                  onChange={(v) => updateInst('careLevel', v)}
                />
                <OptionButtonField
                  label="房型"
                  value={institutionalInput.roomType}
                  options={institutionalRoomOptions}
                  onChange={(v) => updateInst('roomType', v)}
                />
                <OptionButtonField
                  label="医疗配置"
                  value={institutionalInput.medicalAddon}
                  options={medicalAddonOptions}
                  onChange={(v) => updateInst('medicalAddon', v)}
                />
              </>
            )}

            <OptionButtonField
              label="慢性病"
              value={
                mode === 'home'
                  ? homeInput.chronicDisease
                  : institutionalInput.chronicDisease
              }
              options={chronicDiseaseOptions}
              onChange={(v) =>
                mode === 'home'
                  ? updateHome('chronicDisease', v)
                  : updateInst('chronicDisease', v)
              }
            />

            <OptionButtonField
              label="长护险"
              value={
                mode === 'home'
                  ? homeInput.ltcInsurance
                  : institutionalInput.ltcInsurance
              }
              options={ltcInsuranceOptions}
              onChange={(v) =>
                mode === 'home'
                  ? updateHome('ltcInsurance', v)
                  : updateInst('ltcInsurance', v)
              }
            />

            <div className="retirement-calc__field">
              <span className="retirement-calc__label">
                {retirementSectionMeta.planningYearsLabel}
              </span>
              <div className="retirement-calc__year-pills">
                {retirementPlanningYearOptions.map((years) => (
                  <button
                    key={years}
                    type="button"
                    className={cn(
                      'retirement-calc__year-pill',
                      planningYears === years &&
                        'retirement-calc__year-pill--active'
                    )}
                    onClick={() => setPlanningYears(years)}
                  >
                    {years} 年
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="retirement-calc__panel retirement-calc__panel--result">
          <p className="retirement-calc__result-label">
            {retirementSectionMeta.monthlyLabel}
          </p>
          <p className="retirement-calc__result-value">
            {formatCny(result.monthlyTotal)}
            <span className="retirement-calc__result-unit">/ 月</span>
          </p>

          <p className="retirement-calc__lifetime-label">
            {retirementSectionMeta.lifetimeLabel}（{planningYears} 年）
          </p>
          <p className="retirement-calc__lifetime-value">
            {formatCny(result.lifetimeExposure)}
          </p>

          <RetirementCostFishbone
            monthlyTotal={result.monthlyTotal}
            branches={result.branches}
            className="mt-6"
          />

          <RetirementShareActions
            mode={mode}
            homeInput={homeInput}
            institutionalInput={institutionalInput}
            result={result}
          />

          {result.notes.length > 0 ? (
            <ul className="retirement-calc__notes">
              {result.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <p className="retirement-calc__disclaimer">
        {retirementSectionMeta.calcDisclaimer}
      </p>
    </div>
  )
}
