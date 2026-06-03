import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db'
import type { Task } from '@/types'

export function useTasks(): Task[] {
  return useLiveQuery(() => db.tasks.orderBy('createdAt').toArray()) ?? []
}

export function useUnsortedTasks(): Task[] {
  return (
    useLiveQuery(() =>
      db.tasks
        .where('[bucket+status]')
        .equals(['unsorted', 'active'])
        .sortBy('createdAt')
    ) ?? []
  )
}

export function useTasksByBucket(bucket: Task['bucket']): Task[] {
  return (
    useLiveQuery(() =>
      db.tasks
        .where('[bucket+status]')
        .equals([bucket, 'active'])
        .sortBy('createdAt')
    ) ?? []
  )
}

export function useDoneTasks(): Task[] {
  return useLiveQuery(() => db.tasks.where('status').equals('done').sortBy('updatedAt')) ?? []
}

export function useParkedTasks(): Task[] {
  return useLiveQuery(() => db.tasks.where('status').equals('parked').sortBy('updatedAt')) ?? []
}
