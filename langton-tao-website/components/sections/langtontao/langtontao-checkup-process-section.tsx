import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import { checkupServiceProcess } from '@/lib/content/checkup-page'

export function LangtontaoCheckupProcessSection() {
  const midpoint = Math.ceil(checkupServiceProcess.steps.length / 2)
  const columns = [
    checkupServiceProcess.steps.slice(0, midpoint),
    checkupServiceProcess.steps.slice(midpoint),
  ]

  return (
    <section
      id="checkup-process"
      className="lt-checkup-process scroll-mt-28"
      aria-labelledby="langtontao-checkup-process-title"
    >
      <LangtontaoSubsectionHeader
        id="langtontao-checkup-process-title"
        eyebrow="Process"
        title={checkupServiceProcess.title}
        theme="checkup"
        align="center"
      />

      <div className="lt-checkup-process__columns">
        {columns.map((columnSteps, columnIndex) => (
          <ol key={columnIndex} className="lt-checkup-process__timeline">
            {columnSteps.map((step, index) => (
              <Coffee2Reveal
                key={step.step}
                delay={60 + (columnIndex * midpoint + index) * 35}
                as="li"
                className="lt-checkup-process__step"
              >
                <div className="lt-checkup-process__marker" aria-hidden />
                <div className="lt-checkup-process__content">
                  <div className="lt-checkup-process__meta">
                    <span className="lt-checkup-process__number">
                      {String(step.step).padStart(2, '0')}
                    </span>
                    <span className="lt-checkup-process__label">{step.label}</span>
                  </div>
                  <p className="lt-checkup-process__description">{step.description}</p>
                </div>
              </Coffee2Reveal>
            ))}
          </ol>
        ))}
      </div>
    </section>
  )
}
