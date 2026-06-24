'use client'

import { retirementSectionMeta } from '@/lib/content/coffee-retirement-page'
import { getTriggeredStings } from '@/lib/content/coffee-retirement-survey-feedback'
import type { RetirementSoulSurveyAnswers } from '@/lib/content/coffee-retirement-page'
import { cn } from '@/lib/utils'

type RetirementSoulSurveyResultsCardProps = {
  answers: RetirementSoulSurveyAnswers
  onContinue: () => void
}

export function RetirementSoulSurveyResultsCard({
  answers,
  onContinue,
}: RetirementSoulSurveyResultsCardProps) {
  const stings = getTriggeredStings(answers)

  return (
    <div className="retirement-chart-card__inner flex h-full min-h-0 flex-col">
      <div className="retirement-chart-card__stripe retirement-chart-card__stripe--results shrink-0">
        <span className="retirement-chart-card__angle">
          {retirementSectionMeta.soulResultsEyebrow}
        </span>
      </div>

      <div className="retirement-chart-card__body flex min-h-0 flex-1 flex-col p-5 md:p-6">
        <h4 className="text-lg font-semibold leading-snug text-zinc-950 md:text-xl">
          {retirementSectionMeta.soulResultsTitle}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          {retirementSectionMeta.soulResultsLead}
        </p>

        <ul className="retirement-soul-results mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto">
          {stings.length > 0 ? (
            stings.map((item) => (
              <li
                key={item.prompt}
                className={cn(
                  'retirement-soul-results__item rounded-xl border-2 p-4',
                  item.angle === 'langton'
                    ? 'border-amber-300 bg-amber-50/80'
                    : 'border-zinc-200 bg-zinc-50/80'
                )}
              >
                <p className="text-xs font-semibold text-zinc-500">
                  {item.angle === 'langton' ? '灵魂视角' : '常见视角'}
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-800">
                  {item.prompt}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {item.sting}
                </p>
              </li>
            ))
          ) : (
            <li className="rounded-xl border-2 border-emerald-200 bg-emerald-50/60 p-4 text-sm leading-relaxed text-emerald-900">
              你的点选显示敞口相对清晰——仍值得定期年检：长寿与购买力，是同一枚硬币的两面。
            </li>
          )}
        </ul>

        <div className="retirement-chart-card__footer mt-4 shrink-0 border-t border-amber-100 pt-4">
          <button
            type="button"
            className="retirement-chart-card__primary-btn w-full rounded-lg border-2 py-2.5 text-sm font-semibold"
            onClick={onContinue}
          >
            {retirementSectionMeta.soulResultsContinueLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
