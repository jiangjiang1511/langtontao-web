import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pop-black disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'rounded-full border-2 border-pop-black bg-pop-yellow text-pop-black hover:-translate-y-0.5 hover:shadow-pop-black',
        dark: 'rounded-full border-2 border-pop-black bg-pop-black text-pop-white hover:-translate-y-0.5 hover:shadow-pop-yellow',
        outline:
          'rounded-full border-2 border-pop-black bg-pop-white text-pop-black hover:-translate-y-0.5',
        ghost: 'rounded-lg hover:bg-pop-paper',
        link: 'text-pop-black underline-offset-4 hover:underline',
        pop: 'rounded-lg border-2 border-pop-black bg-pop-white text-pop-black shadow-pop-black hover:-translate-y-0.5',
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
