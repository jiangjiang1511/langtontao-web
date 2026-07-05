import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jarsy-violet disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'rounded-full border-0 bg-[image:var(--jarsy-gradient)] text-white shadow-[var(--jarsy-glow)] hover:-translate-y-0.5 hover:brightness-105',
        dark: 'rounded-full border-0 bg-zinc-950 text-white hover:-translate-y-0.5 hover:shadow-[var(--jarsy-glow)]',
        outline:
          'rounded-full border border-zinc-200 bg-white text-zinc-950 hover:-translate-y-0.5 hover:border-jarsy-violet/40 hover:shadow-[var(--jarsy-glow)]',
        ghost: 'rounded-lg hover:bg-zinc-100',
        link: 'text-zinc-950 underline-offset-4 hover:underline',
        pop: 'rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm hover:-translate-y-0.5 hover:shadow-[var(--jarsy-glow)]',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
