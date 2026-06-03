import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SettingsState {
  weekStartDay: 0 | 1 | 2 | 3 | 4 | 5 | 6
  lastResetAt: number | null
  setWeekStartDay: (day: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void
  setLastResetAt: (ts: number) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      weekStartDay: 0,
      lastResetAt: null,
      setWeekStartDay: (day) => set({ weekStartDay: day }),
      setLastResetAt: (ts) => set({ lastResetAt: ts }),
    }),
    {
      name: 'dumpinator-settings',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
)
