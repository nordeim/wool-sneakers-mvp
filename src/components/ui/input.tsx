import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-accent text-[0.7rem] uppercase tracking-widest text-wool-300 mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-5 py-3.5 rounded-full',
            'bg-white/10 border border-fog-200',
            'text-wool-900 font-body text-[0.9rem]',
            'placeholder:text-wool-100',
            'transition-colors duration-300',
            'focus:border-oat-400 focus:outline-hidden',
            error && 'border-red-400 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-red-500 text-xs font-accent">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
