import { create } from 'zustand'

interface UIState {
  resetStep: 1 | 2 | 3
  editingTaskId: string | null
  setResetStep: (step: 1 | 2 | 3) => void
  setEditingTaskId: (id: string | null) => void
}

export const useUIStore = create<UIState>()((set) => ({
  resetStep: 1,
  editingTaskId: null,
  setResetStep: (step) => set({ resetStep: step }),
  setEditingTaskId: (id) => set({ editingTaskId: id }),
}))
