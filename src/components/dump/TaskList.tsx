import { TaskCard } from './TaskCard'
import type { Task } from '@/types'

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-body text-muted-foreground text-center pt-16 px-4">
        Nothing here yet. Start typing above.
      </p>
    )
  }

  return (
    <div className="pb-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}
