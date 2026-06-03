import { Button } from '@/components/ui/button'

interface PickCounterProps {
  count: number
  max: number
  onConfirm: () => void
}

export function PickCounter({ count, max, onConfirm }: PickCounterProps) {
  return (
    <div className="sticky bottom-0 bg-card border-t border-border flex items-center justify-between gap-3 px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          {Array.from({ length: max }).map((_, i) => (
            <div
              key={i}
              className={[
                'size-2 rounded-full transition-colors duration-[200ms] ease-things',
                i < count ? 'bg-primary' : 'bg-border',
              ].join(' ')}
            />
          ))}
        </div>
        <span className="text-caption text-muted-foreground">{count} of {max} chosen</span>
      </div>

      {count === max && (
        <Button size="sm" onClick={onConfirm}>
          Lock In →
        </Button>
      )}
    </div>
  )
}
