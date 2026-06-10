import { ContactTrigger } from '@/components/contact-trigger'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { faq2Contact } from '@/lib/content/faq2-page'

export function Faq2ContactSection() {
  return (
    <section
      className="border-b border-zinc-200 bg-zinc-950 py-20 md:py-28"
      aria-labelledby="faq2-contact-title"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <JarsyReveal>
          <h2
            id="faq2-contact-title"
            className="c2-display text-3xl text-white md:text-5xl"
          >
            {faq2Contact.title}
          </h2>
        </JarsyReveal>
        <JarsyReveal delay={100} className="c2-reveal-fade">
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {faq2Contact.lead}
          </p>
        </JarsyReveal>
        <JarsyReveal delay={180} className="c2-reveal-fade">
          <ContactTrigger className="c2-btn-cta-emphasis mt-10">
            {faq2Contact.ctaLabel}
          </ContactTrigger>
        </JarsyReveal>
      </div>
    </section>
  )
}
