import Link from 'next/link'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import {
  langtontaoSuperheroJoinMeta,
  langtontaoSuperheroJoinSteps,
} from '@/lib/content/langtontao/langtontao-superhero-journey'

export function LangtontaoSuperheroJoin() {
  return (
    <div className="lt-superhero-join mt-16 md:mt-20">
      <LangtontaoSubsectionHeader
        eyebrow={langtontaoSuperheroJoinMeta.eyebrow}
        title={langtontaoSuperheroJoinMeta.title}
        lead={langtontaoSuperheroJoinMeta.lead}
        theme="superhero"
      />

      <div className="lt-superhero-join__body">
        <div className="lt-superhero-join__steps">
          {langtontaoSuperheroJoinSteps.map((step, index) => (
            <Coffee2Reveal
              key={step.id}
              delay={80 + index * 60}
              as="article"
              className="lt-superhero-join__step"
            >
              <div className="lt-superhero-join__step-main">
                <p className="c2-step-number">{step.number}.</p>
                <h4 className="lt-heading-l3 mt-3">{step.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base">
                  {step.summary}
                </p>
              </div>

              <div className="lt-superhero-join__step-detail">
                <p className="text-sm leading-relaxed text-zinc-700 md:text-base">{step.detail}</p>
              </div>
            </Coffee2Reveal>
          ))}
        </div>

        <Coffee2Reveal delay={200}>
          <div className="lt-superhero-join__cta">
            <Link href={langtontaoSuperheroJoinMeta.communityHref} className="coffee2-cta-button">
              探索社群活动 →
            </Link>
            <Link href={langtontaoSuperheroJoinMeta.memberHref} className="c2-btn-secondary">
              了解会员权益
            </Link>
          </div>
        </Coffee2Reveal>
      </div>
    </div>
  )
}
