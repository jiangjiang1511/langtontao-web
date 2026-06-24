import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { langtontaoOpportunityNeeds } from '@/lib/content/langtontao/langtontao-why-mfo'

export function LangtontaoOpportunityNeeds() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h3 className="text-lg font-semibold text-zinc-950">机会</h3>
        <ul className="mt-4 space-y-3">
          {langtontaoOpportunityNeeds.opportunities.map((item, index) => (
            <Coffee2Reveal key={item.id} delay={index * 60} as="li">
              <li className="c2-card p-4">
                <p className="font-semibold text-zinc-950">{item.title}</p>
                <p className="mt-1 text-sm text-zinc-600">{item.body}</p>
              </li>
            </Coffee2Reveal>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-zinc-950">需求</h3>
        <ul className="mt-4 space-y-3">
          {langtontaoOpportunityNeeds.needs.map((item, index) => (
            <Coffee2Reveal key={item.id} delay={index * 60} as="li">
              <li className="c2-card p-4">
                <p className="font-semibold text-zinc-950">{item.title}</p>
                <ul className="mt-2 space-y-1">
                  {item.bullets.map((b) => (
                    <li key={b} className="text-sm text-zinc-600">
                      · {b}
                    </li>
                  ))}
                </ul>
              </li>
            </Coffee2Reveal>
          ))}
        </ul>
        <p className="mt-6 text-sm italic text-zinc-500">
          {langtontaoOpportunityNeeds.serveQuote}
        </p>
      </div>
    </div>
  )
}
