import { Button } from '@/components/ui/button'
import { useDoneTasks } from '@/hooks/useTasks'

interface ResetStep1ReviewProps {
  onNext: () => void
}

export function ResetStep1Review({ onNext }: ResetStep1ReviewProps) {
  const doneTasks = useDoneTasks()

  return (
    <div className="px-4">
      <h2 className="text-display-md text-foreground mb-2">What got done ✅</h2>
      <p className="text-body text-muted-foreground mb-6">
        {doneTasks.length === 0
          ? "Nothing marked done — that's okay."
          : `You completed ${doneTasks.length} task${doneTasks.length !== 1 ? 's' : ''}.`}
      </p>

      <div className="space-y-0">
        {doneTasks.slice(0, 5).map((task) => (
          <div key={task.id} className="flex gap-3 py-3 border-b border-border last:border-0">
            <span className="text-[18px] shrink-0">✅</span>
            <span className="text-body text-muted-foreground">{task.text}</span>
          </div>
        ))}
      </div>

      <Button className="w-full mt-8" size="lg" onClick={onNext}>
        Continue →
      </Button>
    </div>
  )
}
