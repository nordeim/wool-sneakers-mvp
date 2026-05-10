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
        'font-["Space_Grotesk",sans-serif] text-[0.6rem] font-semibold uppercase tracking-widest',
        variant === 'default' && 'bg-[#F7F4F0] text-[#3D3835]',
        variant === 'exclusive' && 'bg-[#3D3835] text-[#F7F4F0]',
        className
      )}
    >
      {children}
    </span>
  )
}
