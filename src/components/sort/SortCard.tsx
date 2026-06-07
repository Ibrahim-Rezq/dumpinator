import { Card, CardContent } from '@/components/ui/card'
import { SubTaskProgressPill } from '@/components/ui/SubTaskProgressPill'
import type { Task } from '@/types'

interface SortCardProps {
  task: Task
}

export function SortCard({ task }: SortCardProps) {
  return (
    <Card className="mx-4 my-6 shadow-focus border-0">
      <CardContent className="py-8 px-6">
        <p className="text-display-md text-foreground">{task.text}</p>
        {task.subTasks.length > 0 && (
          <div className="mt-2">
            <SubTaskProgressPill subTasks={task.subTasks} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
