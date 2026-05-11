import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useUIStore } from '@/stores/ui'
import { cn } from '@/lib/utils'

const DISMISS_MS = 4000

export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts)

  return (
    <div
      className="fixed bottom-6 right-6 z-[500] flex flex-col gap-3"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </div>
  )
}

function ToastItem({
  id,
  message,
  type,
}: {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}) {
  const remove = useUIStore((s) => s.removeToast)

  useEffect(() => {
    const t = setTimeout(() => remove(id), DISMISS_MS)
    return () => clearTimeout(t)
  }, [id, remove])

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg',
        'font-accent text-sm tracking-wide',
        'animate-[fade-in-up_500ms_ease-out_forwards]',
        type === 'success' && 'bg-wool-900 text-warm-white',
        type === 'error' && 'bg-red-600 text-white',
        type === 'info' && 'bg-oat-200 text-wool-900'
      )}
      role="alert"
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={() => remove(id)}
        className="p-1 hover:opacity-70 transition-opacity"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  )
}
