import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-wool-900 text-warm-white hover:bg-wool-700',
  secondary:
    'bg-transparent text-wool-900 border border-fog-200 hover:border-wool-500 hover:bg-oat-50',
  ghost:
    'bg-white/15 text-warm-white border border-white/25 backdrop-blur-sm hover:bg-white/25',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  outline:
    'bg-transparent text-wool-500 border border-fog-200 hover:border-oat-400 hover:text-wool-900',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-[0.7rem]',
  md: 'px-8 py-3.5 text-[0.8rem]',
  lg: 'px-10 py-4 text-[0.85rem]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full',
          'font-accent font-medium uppercase tracking-[0.08em]',
          'transition-all duration-300 ease-out',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          variantStyles[variant],
          sizeStyles[size],
          isLoading && 'opacity-70 cursor-wait',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >n              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'
