import { Button } from '@/components/ui/button'
import type { Bucket } from '@/types'

interface BucketButtonsProps {
  onSelect: (bucket: Exclude<Bucket, 'unsorted'> | 'park') => void
}

const BUCKETS = [
  { value: 'must',   label: 'Must',   emoji: '🔴', labelClass: 'text-danger' },
  { value: 'should', label: 'Should', emoji: '🟡', labelClass: 'text-warning' },
  { value: 'want',   label: 'Want',   emoji: '🟢', labelClass: 'text-success-green' },
  { value: 'park',   label: 'Park',   emoji: '⏸',  labelClass: 'text-muted-foreground' },
] as const

export function BucketButtons({ onSelect }: BucketButtonsProps) {
  return (
    <div className="grid grid-cols-4 gap-2.5 px-4">
      {BUCKETS.map(({ value, label, emoji, labelClass }) => (
        <Button
          key={value}
          variant="outline"
          onClick={() => onSelect(value)}
          className="flex-col h-auto gap-1.5 py-3.5 shadow-popover active:scale-95 transition-transform duration-[120ms]"
        >
          <span className="text-xl">{emoji}</span>
          <span className={`text-caption-caps ${labelClass}`}>{label}</span>
        </Button>
      ))}
    </div>
  )
}
