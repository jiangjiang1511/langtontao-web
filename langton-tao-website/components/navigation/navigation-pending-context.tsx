'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'

type NavigationPendingContextValue = {
  pending: boolean
  setPending: (pending: boolean) => void
}

const NavigationPendingContext =
  createContext<NavigationPendingContextValue | null>(null)

export function NavigationPendingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [pending, setPending] = useState(false)

  useEffect(() => {
    setPending(false)
  }, [pathname])

  const value = useMemo(
    () => ({ pending, setPending }),
    [pending]
  )

  return (
    <NavigationPendingContext.Provider value={value}>
      {children}
      {pending ? (
        <div
          className="route-loading-progress pointer-events-none fixed inset-x-0 top-0 z-[100]"
          role="status"
          aria-live="polite"
          aria-label="页面加载中"
        >
          <div className="route-loading-progress__bar" />
        </div>
      ) : null}
    </NavigationPendingContext.Provider>
  )
}

export function useNavigationPending() {
  const context = useContext(NavigationPendingContext)
  if (!context) {
    throw new Error(
      'useNavigationPending must be used within NavigationPendingProvider'
    )
  }
  return context
}

export function useNavigationPendingOptional() {
  return useContext(NavigationPendingContext)
}
