import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db'
import { getWeekStartISO } from '@/lib/dates'
import { useSettingsStore } from '@/stores/settingsStore'
import type { WeeklyReset } from '@/types'

export function useWeeklyReset(): WeeklyReset | null {
  const weekStartDay = useSettingsStore((s) => s.weekStartDay)
  const weekStart = getWeekStartISO(weekStartDay)
  return (
    useLiveQuery(
      () => db.weeklyResets.where('weekStart').equals(weekStart).first(),
      [weekStart]
    ) ?? null
  )
}
