import { ContactTrigger } from '@/components/contact-trigger'

export function Home2CtaSection() {
  return (
    <section className="border-t border-zinc-200 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <ContactTrigger
          size="lg"
          intent="了解服务"
          className="rounded-full bg-white text-zinc-950 hover:bg-zinc-100"
        >
          预约咨询
        </ContactTrigger>
      </div>
    </section>
  )
}
