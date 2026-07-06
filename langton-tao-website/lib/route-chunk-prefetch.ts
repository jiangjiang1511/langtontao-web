const HERO_ONLY_IMPORTS: Record<string, () => Promise<unknown>> = {
  '/': () =>
    import('@/components/sections/langtontao/langtontao-hero-section'),
  '/tao': () =>
    import('@/components/sections/home-jarsy/home-jarsy-hero'),
  '/coffee': () =>
    import('@/components/sections/coffee2/coffee2-hero-section'),
  '/member': () =>
    import('@/components/sections/membership-v2/membership-v2-hero-section'),
}

const HERO_ROUTES = ['/', '/tao', '/coffee', '/member'] as const
const HERO_WARM_INTERVAL_MS = 150

const warmedHeroRoutes = new Set<string>()

export function warmOtherRouteHeroChunks(currentPathname: string) {
  const current = currentPathname.split('#')[0] || '/'
  const others = HERO_ROUTES.filter((route) => route !== current)

  let index = 0

  const warmNext = () => {
    if (index >= others.length) return

    const route = others[index]!
    const load = HERO_ONLY_IMPORTS[route]

    if (load && !warmedHeroRoutes.has(route)) {
      warmedHeroRoutes.add(route)
      void load().catch(() => {
        warmedHeroRoutes.delete(route)
      })
    }

    index += 1
    if (index < others.length) {
      window.setTimeout(warmNext, HERO_WARM_INTERVAL_MS)
    }
  }

  warmNext()
}
