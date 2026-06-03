import { Badge } from '@/components/ui/badge'
import { useTasksByBucket } from '@/hooks/useTasks'
import type { Bucket, Task } from '@/types'
import { cn } from '@/lib/utils'

const bucketLabel: Record<Bucket, string> = {
  must: 'Must', should: 'Should', want: 'Want', unsorted: 'Unsorted',
}

const bucketLabelClass: Record<Bucket, string> = {
  must: 'text-danger', should: 'text-warning', want: 'text-success-green', unsorted: 'text-muted-foreground',
}

interface BucketColumnProps {
  bucket: Bucket
  selectedIds: ReadonlySet<string>
  maxReached: boolean
  onToggle: (id: string) => void
}

export function BucketColumn({ bucket, selectedIds, maxReached, onToggle }: BucketColumnProps) {
  const tasks = useTasksByBucket(bucket)
  if (tasks.length === 0) return null

  return (
    <section className="mb-6">
      <h3 className={cn('text-caption-caps px-4 mb-2', bucketLabelClass[bucket])}>
        {bucketLabel[bucket]}
      </h3>
      {tasks.map((task: Task) => {
        const selected = selectedIds.has(task.id)
        const disabled = !selected && maxReached
        return (
          <button
            key={task.id}
            type="button"
            role="checkbox"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onToggle(task.id)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left disabled:opacity-40 transition-opacity"
          >
            {/* custom circle indicator — NOT a nested interactive element */}
            <div
              aria-hidden="true"
              className={cn(
                'size-[18px] shrink-0 rounded-full border-[1.5px] flex items-center justify-center',
                'transition-all duration-[120ms]',
                selected
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground bg-transparent'
              )}
            >
              {selected && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 3.5L3.8 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className={cn('flex-1 text-body', selected ? 'text-foreground font-medium' : 'text-muted-foreground')}>
              {task.text}
            </span>
            {task.category && (
              <Badge variant="secondary" className="text-caption shrink-0">{task.category}</Badge>
            )}
          </button>
        )
      })}
    </section>
  )
}
