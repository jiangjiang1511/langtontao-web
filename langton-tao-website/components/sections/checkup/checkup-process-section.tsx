import {
  checkupServiceProcess,
} from '@/lib/content/checkup-page'
import { SectionSurface, SectionTitle } from '@/components/layout/section-surface'

export function CheckupProcessSection() {
  return (
    <SectionSurface
      theme="paper"
      aria-labelledby="checkup-process-title"
    >
      <SectionTitle id="checkup-process-title">
        {checkupServiceProcess.title}
      </SectionTitle>
      <ol className="mt-10 space-y-4">
        {checkupServiceProcess.steps.map((step) => (
          <li
            key={step.step}
            className="flex flex-col gap-3 rounded-lg border-2 border-pop-black bg-pop-white p-4 shadow-pop-black sm:flex-row sm:items-start sm:gap-5 md:p-5"
          >
            <div className="flex shrink-0 items-center gap-3 sm:w-44">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-pop-black bg-pop-yellow text-sm font-black">
                {step.step}
              </span>
              <span className="rounded-full border-2 border-pop-black bg-pop-paper px-3 py-1 text-xs font-black uppercase tracking-wide text-pop-black">
                {step.label}
              </span>
            </div>
            <p className="text-sm font-bold leading-relaxed text-[color:var(--section-muted)] sm:pt-1">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </SectionSurface>
  )
}
