import { Button, type ButtonProps } from '@/components/ui/button'
import {
  membershipJoinHref,
  membershipJoinLabel,
} from '@/lib/content/membership-v2'

type MembershipJoinLinkProps = Omit<ButtonProps, 'asChild' | 'onClick'> & {
  label?: string
}

export function MembershipJoinLink({
  className,
  variant = 'dark',
  size = 'default',
  label = membershipJoinLabel,
  children,
  ...props
}: MembershipJoinLinkProps) {
  const text = children ?? label

  return (
    <Button asChild variant={variant} size={size} className={className} {...props}>
      <a
        href={membershipJoinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${text}：打开小程序会员页`}
      >
        {text}
      </a>
    </Button>
  )
}
