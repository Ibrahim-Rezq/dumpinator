import type { SubTask } from '@/types'

interface SubTaskProgressPillProps {
  subTasks: SubTask[]
}

export function SubTaskProgressPill({ subTasks }: SubTaskProgressPillProps) {
  if (subTasks.length === 0) return null
  const done = subTasks.filter((st) => st.done).length
  const total = subTasks.length
  const label = done === 0 ? `${total} steps` : `${done} / ${total} steps`
  return <span className="text-caption text-muted-foreground">{label}</span>
}
