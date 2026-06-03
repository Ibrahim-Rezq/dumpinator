import { Progress } from '@/components/ui/progress'

interface SortProgressProps {
  total: number
  remaining: number
}

export function SortProgress({ total, remaining }: SortProgressProps) {
  const value = total === 0 ? 100 : Math.round(((total - remaining) / total) * 100)

  return (
    <div className="px-4 pt-4 pb-2">
      <div className="flex justify-between mb-2">
        <span className="text-caption-caps text-muted-foreground">Sorting</span>
        <span className="text-caption text-muted-foreground">{remaining} remaining</span>
      </div>
      <Progress value={value} aria-label="Sort progress" className="gap-0" />
    </div>
  )
}
