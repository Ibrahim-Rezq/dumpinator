import { useUnsortedTasks } from './useTasks'
import type { Task } from '@/types'

export function useSortQueue(): { queue: Task[]; current: Task | null } {
  const queue = useUnsortedTasks()
  return { queue, current: queue[0] ?? null }
}
