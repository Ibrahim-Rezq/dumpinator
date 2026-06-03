import { SubTaskItem } from './SubTaskItem'
import { AddSubTaskInput } from './AddSubTaskInput'
import type { SubTask } from '@/types'

interface SubTaskListProps {
  taskId: string
  subTasks: SubTask[]
}

export function SubTaskList({ taskId, subTasks }: SubTaskListProps) {
  return (
    <div className="mt-3 pt-1 border-t border-border">
      {subTasks.map((st) => (
        <SubTaskItem key={st.id} taskId={taskId} subTask={st} />
      ))}
      <AddSubTaskInput taskId={taskId} />
    </div>
  )
}
