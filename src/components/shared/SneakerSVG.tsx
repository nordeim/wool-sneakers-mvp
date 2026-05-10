import { cn } from '@/lib/utils'

interface SneakerSVGProps {
  accentColor?: string
  className?: string
  variant?: 'low' | 'mid' | 'high' | 'slip-on'
}

export function SneakerSVG({
  accentColor = '#3D3835',
  className,
  variant = 'low',
}: SneakerSVGProps) {
  const offsetMap: Record<string, number> = {
    low: 0,
    mid: 20,
    high: 40,
    'slip-on': -5,
  }
  const offset = offsetMap[variant] ?? 0
  const viewH = 180 + offset

  return (
    <svg
      viewBox={`0 0 320 ${viewH}`}
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-auto', className)}
      aria-hidden="true"
      role="presentation"
    >
      <path
        d={`M45 ${140 + offset} L290 ${140 + offset}`}
        stroke={accentColor}
        strokeWidth="2"
        fill="none"
      />
      <path
        d={`M45 ${140 + offset} C45 ${145 + offset} 47 ${150 + offset} 52 ${152 + offset} L280 ${152 + offset} C286 ${152 + offset} 290 ${148 + offset} 290 ${140 + offset}`}
        stroke={accentColor}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d={`M45 ${140 + offset} C45 ${105 + offset} 40 ${92 + offset} 65 ${80 + offset} L120 ${66 + offset} C145 ${60 + offset} 175 ${58 + offset} 200 ${64 + offset} L245 ${78 + offset} C268 ${85 + offset} 280 ${100 + offset} 285 ${116 + offset} L290 ${140 + offset}`}
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {variant !== 'slip-on' && (
        <path
          d={`M200 ${64 + offset} C212 ${46 + offset} 240 ${40 + offset} 258 ${52 + offset}`}
          stroke={accentColor}
          strokeWidth="1.2"
          fill="none"
        />
      )}
      <circle cx="145" cy={62 + offset} r="2.5" fill={accentColor} opacity="0.2" />
      <circle cx="170" cy={60 + offset} r="2.5" fill={accentColor} opacity="0.2" />
      <circle cx="195" cy={61 + offset} r="2.5" fill={accentColor} opacity="0.2" />
      <path
        d={`M65 ${80 + offset} C60 ${68 + offset} 62 ${56 + offset} 75 ${48 + offset}`}
        stroke={accentColor}
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />
      {variant === 'slip-on' && (
        <path
          d={`M120 ${72 + offset} Q170 ${66 + offset} 210 ${72 + offset}`}
          stroke={accentColor}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      )}
    </svg>
  )
}
