'use client'

import { membershipTiers } from '@/lib/content/membership'
import { ContactTrigger } from '@/components/contact-trigger'

export function MembershipTiers() {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {membershipTiers.map((tier) => (
        <article
          key={tier.id}
          id={tier.anchor}
          className="scroll-mt-24 rounded-xl border border-zinc-200 bg-white p-6"
        >
          <h3 className="text-lg font-semibold text-zinc-900">{tier.title}</h3>
          <p className="mt-2 text-sm text-zinc-600">{tier.tagline}</p>
          {tier.includesLabel && (
            <p className="mt-2 text-xs text-zinc-500">{tier.includesLabel}</p>
          )}
          <ul className="mt-4 space-y-3">
            {tier.groups.map((group) => (
              <li key={group.title}>
                <p className="text-sm font-medium text-zinc-800">
                  {group.title}
                </p>
                {group.items.length > 0 && (
                  <ul className="mt-1 space-y-1">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-xs leading-relaxed text-zinc-600"
                      >
                        · {item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <ContactTrigger
            intent={tier.contactIntent}
            variant="outline"
            size="sm"
            className="mt-6"
          >
            咨询 {tier.title}
          </ContactTrigger>
        </article>
      ))}
    </div>
  )
}
