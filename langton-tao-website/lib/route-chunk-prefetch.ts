const ROUTE_WARM_IMPORTS: Record<string, Array<() => Promise<unknown>>> = {
  '/': [
    () =>
      import('@/components/sections/langtontao/langtontao-home-roots-section'),
    () =>
      import('@/components/sections/langtontao/langtontao-superhero-section'),
    () =>
      import('@/components/sections/langtontao/langtontao-checkup-major-section'),
  ],
  '/tao': [
    () =>
      import('@/components/sections/home-jarsy/home-jarsy-tao-framework-section'),
    () =>
      import('@/components/sections/home-jarsy/home-jarsy-deferred-stages'),
    () =>
      import('@/components/sections/home-jarsy/home-jarsy-stage-panel'),
  ],
  '/coffee': [
    () =>
      import('@/components/sections/coffee2/coffee2-life-events-content'),
    () =>
      import('@/components/sections/coffee2/coffee2-life-event-section'),
    () =>
      import('@/components/sections/coffee2/coffee2-join-band'),
  ],
  '/member': [
    () =>
      import('@/components/sections/membership-v2/membership-commission-section'),
    () =>
      import('@/components/sections/membership-v2/membership-benefit-bars'),
  ],
  '/faq': [],
}

const warmedRoutes = new Set<string>()

export function warmRouteChunks(pathname: string, limit = 3) {
  const path = pathname.split('#')[0] || '/'
  const imports = ROUTE_WARM_IMPORTS[path]
  if (!imports?.length) return

  const cacheKey = `${path}:${limit}`
  if (warmedRoutes.has(cacheKey)) return
  warmedRoutes.add(cacheKey)

  imports.slice(0, limit).forEach((load) => {
    void load().catch(() => {
      warmedRoutes.delete(cacheKey)
    })
  })
}

export function warmAdjacentRouteChunks(currentPathname: string) {
  const routes = ['/', '/tao', '/coffee', '/member']
  const current = currentPathname.split('#')[0] || '/'
  const index = routes.indexOf(current)

  if (index === -1) {
    warmRouteChunks('/tao', 2)
    return
  }

  const neighbors = [routes[index - 1], routes[index + 1]].filter(Boolean)
  neighbors.forEach((route) => warmRouteChunks(route!, 2))
}
