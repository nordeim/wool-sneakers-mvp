import { useRef } from 'react'
import { useUIStore } from '@/stores/ui'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { cn } from '@/lib/utils'

const sizes = [
  { eu: 36, uk: 3.5, usM: 4, usW: 5.5, cm: 22.5 },
  { eu: 37, uk: 4, usM: 4.5, usW: 6, cm: 23 },
  { eu: 38, uk: 5, usM: 5.5, usW: 7, cm: 24 },
  { eu: 39, uk: 5.5, usM: 6, usW: 7.5, cm: 24.5 },
  { eu: 40, uk: 6, usM: 6.5, usW: 8, cm: 25 },
  { eu: 41, uk: 7, usM: 7.5, usW: 9, cm: 25.5 },
  { eu: 42, uk: 7.5, usM: 8, usW: 9.5, cm: 26 },
  { eu: 43, uk: 8, usM: 8.5, usW: 10, cm: 26.5 },
  { eu: 44, uk: 9, usM: 9.5, usW: 11, cm: 27 },
  { eu: 45, uk: 9.5, usM: 10, usW: 11.5, cm: 27.5 },
  { eu: 46, uk: 10, usM: 10.5, usW: 12, cm: 28 },
] as const

export function SizeGuideModal() {
  const isOpen = useUIStore((s) => s.isSizeGuideOpen)
  const close = useUIStore((s) => s.closeSizeGuide)
  const modalRef = useRef<HTMLDivElement>(null)
  useFocusTrap(isOpen, modalRef)

  return (
    <div
      className={cn(
        'fixed inset-0 z-[400] transition-all duration-300',
        isOpen
          ? 'pointer-events-auto visible'
          : 'pointer-events-none invisible'
      )}
      role="dialog"
      aria-label="Size guide"
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          'absolute inset-0 bg-wool-900/40 backdrop-blur-sm transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={close}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div
          ref={modalRef}
          className={cn(
            'bg-warm-white rounded-2xl max-w-[600px] w-full max-h-[85vh] overflow-y-auto p-8 transition-all duration-300',
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-[1.5rem]">Size Guide</h2>
            <button
              onClick={close}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-oat-100"
              aria-label="Close size guide"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3D3835"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <p className="text-wool-300 text-sm mb-6">
            Our sneakers use EU sizing. If you're between sizes, we recommend
            going up half a size for a comfortable fit with wool socks.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-oat-200">
                  {['EU', 'UK', 'US Men', 'US Women', 'CM'].map((h) => (
                    <th
                      key={h}
                      className="font-accent text-[0.65rem] tracking-widest uppercase text-wool-300 py-3 px-2 text-left"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizes.map((row) => (
                  <tr key={row.eu} className="border-b border-oat-50">
                    <td className="font-accent font-medium py-2.5 px-2">
                      {row.eu}
                    </td>
                    <td className="text-wool-300 py-2.5 px-2">{row.uk}</td>
                    <td className="text-wool-300 py-2.5 px-2">{row.usM}</td>
                    <td className="text-wool-300 py-2.5 px-2">{row.usW}</td>
                    <td className="text-wool-300 py-2.5 px-2">{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-oat-50 rounded-lg">
            <p className="text-[0.8rem] text-wool-300">
              <strong className="text-wool-900">Need help?</strong> Chat with us
              at hello@mama.sg or visit our store at 28 Tiong Bahru Road.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
