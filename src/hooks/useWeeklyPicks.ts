import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db'
import type { Task } from '@/types'

export function useWeeklyPicks(): Task[] {
  return (
    useLiveQuery(() => db.tasks.where('isWeeklyPick').equals(1).toArray()) ?? []
  )
}
