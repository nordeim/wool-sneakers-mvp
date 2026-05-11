import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'exclusive'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'absolute top-3 left-3 z-[2] px-2.5 py-1 rounded-full',
        'font-accent text-[0.6rem] font-semibold uppercase tracking-widest',
        variant === 'default' && 'bg-warm-white text-wool-900',
        variant === 'exclusive' && 'bg-wool-900 text-warm-white',
        className
      )}
    >
      {children}
    </span>
  )
}
