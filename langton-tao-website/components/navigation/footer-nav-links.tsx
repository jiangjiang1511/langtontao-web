'use client'

import { NavigationLink } from '@/components/navigation/navigation-link'
import { footerSiteNav, footerSpotlightNav } from '@/lib/site-nav'

export function FooterNavLinks() {
  return (
    <div className="mt-3 grid grid-cols-2 gap-x-8">
      <ul className="space-y-2">
        {footerSiteNav.map((item) => (
          <li key={item.href}>
            <NavigationLink
              href={item.href}
              prefetch
              className="text-sm font-bold text-pop-white/80 hover:text-pop-yellow"
            >
              {item.label}
            </NavigationLink>
          </li>
        ))}
      </ul>
      <ul className="space-y-2">
        {footerSpotlightNav.map((item) => (
          <li key={item.href}>
            <NavigationLink
              href={item.href}
              prefetch
              className="text-sm font-bold text-pop-white/80 hover:text-pop-yellow"
            >
              {item.label}
            </NavigationLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
