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
            className="block font-["Space_Grotesk",sans-serif] text-[0.7rem] uppercase tracking-widest text-[#8C8580] mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-5 py-3.5 rounded-full',
            'bg-white/10 border border-[#C5C0B8]',
            'text-[#3D3835] font-["DM_Sans",sans-serif] text-[0.9rem]',
            'placeholder:text-[#B5AFA9]',
            'transition-colors duration-300',
            'focus:border-[#C5B49A] focus:outline-none',
            error && 'border-red-400 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-red-500 text-xs font-["Space_Grotesk",sans-serif]">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
