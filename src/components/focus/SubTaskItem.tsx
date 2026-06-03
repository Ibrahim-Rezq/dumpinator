import { ThingsCheckbox } from '@/components/ui/ThingsCheckbox'
import { toggleSubTask } from '@/db'
import type { SubTask } from '@/types'

interface SubTaskItemProps {
  taskId: string
  subTask: SubTask
}

export function SubTaskItem({ taskId, subTask }: SubTaskItemProps) {
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <ThingsCheckbox
        checked={subTask.done}
        onChange={() => void toggleSubTask(taskId, subTask.id)}
        aria-label={`Mark "${subTask.text}" complete`}
      />
      <span
        className={[
          'text-[13px] leading-[18px] transition-all duration-[200ms]',
          subTask.done ? 'text-muted-foreground line-through' : 'text-muted-foreground',
        ].join(' ')}
      >
        {subTask.text}
      </span>
    </div>
  )
}
