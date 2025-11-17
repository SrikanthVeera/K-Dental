import { Minus, Plus } from 'lucide-react'
import { cn } from '@/utils/cn'

type Props = {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  className?: string
}

export default function Quantity({ value, onChange, min = 1, max = 99, className }: Props) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))
  return (
    <div className={cn('flex items-center border border-border rounded-lg overflow-hidden', className)}>
      <button type="button" onClick={dec} className="px-2 py-1 hover:bg-muted">
        <Minus className="w-4 h-4" />
      </button>
      <div className="w-10 text-center text-sm">{value}</div>
      <button type="button" onClick={inc} className="px-2 py-1 hover:bg-muted">
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
