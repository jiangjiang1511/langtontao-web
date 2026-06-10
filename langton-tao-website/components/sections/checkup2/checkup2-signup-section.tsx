import { ContactTrigger } from '@/components/contact-trigger'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { checkupSignup } from '@/lib/content/checkup2-page'

export function Checkup2SignupSection() {
  return (
    <section
      className="border-b border-zinc-200 bg-zinc-950 py-20 md:py-28"
      aria-labelledby="checkup2-signup-title"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <JarsyReveal>
          <p className="c2-eyebrow text-zinc-500">{checkupSignup.eyebrow}</p>
          <h2
            id="checkup2-signup-title"
            className="c2-display mt-4 text-3xl text-white md:text-5xl"
          >
            {checkupSignup.title}
          </h2>
        </JarsyReveal>
        <JarsyReveal delay={100} className="c2-reveal-fade">
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {checkupSignup.lead}
          </p>
        </JarsyReveal>
        <JarsyReveal delay={180} className="c2-reveal-fade">
          <ContactTrigger
            intent={checkupSignup.contactIntent}
            className="c2-btn-cta-emphasis mt-10"
          >
            {checkupSignup.ctaLabel}
          </ContactTrigger>
        </JarsyReveal>
      </div>
    </section>
  )
}
