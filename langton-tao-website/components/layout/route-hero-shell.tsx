export type RouteHeroShellVariant = 'home' | 'tao' | 'coffee' | 'member'

type RouteHeroShellProps = {
  variant: RouteHeroShellVariant
}

function HeroSkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={`route-hero-shell__bar rounded-lg bg-zinc-100 ${className ?? ''}`}
      aria-hidden
    />
  )
}

export function RouteHeroShell({ variant }: RouteHeroShellProps) {
  return (
    <div
      className={`route-hero-shell route-hero-shell--${variant} jarsy-v2-page bg-white text-zinc-950`}
      role="status"
      aria-live="polite"
      aria-label="页面加载中"
    >
      <section className="route-hero-shell__section relative scroll-mt-20 overflow-hidden border-b border-zinc-200">
        <div className="route-hero-shell__content mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col px-4 pb-16 pt-28 sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:pb-24 md:pt-32 lg:px-8">
          {variant === 'home' || variant === 'member' ? (
            <HeroSkeletonBar className="route-hero-shell__media mx-auto mb-8 aspect-square w-[min(100%,clamp(18rem,62vw,42rem))] rounded-2xl" />
          ) : null}

          {variant === 'coffee' ? (
            <HeroSkeletonBar className="mx-auto mb-6 h-12 w-[min(100%,14rem)] md:h-14 md:w-[18rem]" />
          ) : null}

          <div className="route-hero-shell__copy mx-auto w-full max-w-3xl text-center">
            <HeroSkeletonBar className="mx-auto h-10 w-3/4 md:h-12" />
            <HeroSkeletonBar className="mx-auto mt-4 h-8 w-2/3 md:h-10" />
            <HeroSkeletonBar className="mx-auto mt-6 h-5 w-full max-w-xl" />
            <HeroSkeletonBar className="mx-auto mt-3 h-5 w-5/6 max-w-lg" />
          </div>

          {variant === 'tao' ? (
            <div className="route-hero-shell__spacer mt-auto min-h-[clamp(10rem,32vh,22rem)]" aria-hidden />
          ) : null}

          <HeroSkeletonBar className="mx-auto mt-10 h-11 w-36 rounded-full" />
        </div>
      </section>
    </div>
  )
}
