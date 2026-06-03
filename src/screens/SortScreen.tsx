import { useRef, useState } from 'react'
import { useSortQueue } from '@/hooks/useSortQueue'
import { sortTask, parkTask } from '@/db'
import { SortProgress } from '@/components/sort/SortProgress'
import { SortCard } from '@/components/sort/SortCard'
import { BucketButtons } from '@/components/sort/BucketButtons'
import { CategoryPicker } from '@/components/sort/CategoryPicker'
import { SortComplete } from '@/components/sort/SortComplete'
import type { Bucket, Category } from '@/types'

export function SortScreen() {
  const { queue, current } = useSortQueue()
  const [pendingBucket, setPendingBucket] = useState<Exclude<Bucket, 'unsorted'> | null>(null)

  // Capture the total on first render so the progress bar doesn't shrink its denominator.
  const initialTotalRef = useRef<number | null>(null)
  if (initialTotalRef.current === null && queue.length > 0) {
    initialTotalRef.current = queue.length
  }
  const initialTotal = initialTotalRef.current ?? queue.length
  const remaining = queue.length

  async function handleBucketSelect(bucket: Exclude<Bucket, 'unsorted'> | 'park') {
    if (!current) return
    if (bucket === 'park') {
      await parkTask(current.id)
      // parkTask removes the task from the unsorted live query; queue[0] auto-advances.
      return
    }
    setPendingBucket(bucket)
  }

  async function handleCategorySelect(category: Category) {
    if (!current || !pendingBucket) return
    // sortTask changes the bucket, removing the task from the unsorted live query.
    // queue[0] auto-becomes the next task — no cursor needed.
    await sortTask(current.id, pendingBucket, category)
    setPendingBucket(null)
  }

  if (queue.length === 0 && initialTotalRef.current === null) {
    return (
      <div className="px-4 pt-4">
        <h1 className="text-display-lg text-foreground mb-4">Sort</h1>
        <p className="text-body text-muted-foreground text-center pt-12">
          No unsorted tasks. Add some from the Dump tab first.
        </p>
      </div>
    )
  }

  if (!current) return <SortComplete />

  return (
    <div>
      <div className="px-4 pt-4 pb-1">
        <h1 className="text-display-lg text-foreground">Sort</h1>
      </div>

      <SortProgress total={initialTotal} remaining={remaining} />
      <SortCard task={current} />

      <div className="py-4">
        <p className="text-caption-caps text-muted-foreground text-center mb-4">
          Where does this belong?
        </p>
        <BucketButtons onSelect={handleBucketSelect} />
      </div>

      {pendingBucket && <CategoryPicker onSelect={handleCategorySelect} />}
    </div>
  )
}
