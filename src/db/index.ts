import Dexie, { type Table } from 'dexie'
import type { Task, WeeklyReset, Bucket, Category } from '@/types'

class DumpinatorDB extends Dexie {
  tasks!: Table<Task>
  weeklyResets!: Table<WeeklyReset>

  constructor() {
    super('dumpinator-db')
    this.version(1).stores({
      tasks: 'id, bucket, status, isWeeklyPick, createdAt, [bucket+status]',
      weeklyResets: 'id, weekStart',
    })
  }
}

export const db = new DumpinatorDB()

function now() {
  return Date.now()
}

export async function addTask(text: string): Promise<void> {
  const task: Task = {
    id: crypto.randomUUID(),
    text,
    bucket: 'unsorted',
    category: null,
    status: 'active',
    isWeeklyPick: 0,
    subTasks: [],
    createdAt: now(),
    updatedAt: now(),
  }
  await db.tasks.add(task)
}

export async function updateTask(id: string, patch: Partial<Task>): Promise<void> {
  await db.tasks.update(id, { ...patch, updatedAt: now() })
}

export async function deleteTask(id: string): Promise<void> {
  await db.tasks.delete(id)
}

export async function sortTask(id: string, bucket: Bucket, category: Category): Promise<void> {
  await db.tasks.update(id, { bucket, category, updatedAt: now() })
}

export async function parkTask(id: string): Promise<void> {
  await db.tasks.update(id, { status: 'parked', isWeeklyPick: 0, updatedAt: now() })
}

export async function unparkTask(id: string): Promise<void> {
  await db.tasks.update(id, { status: 'active', bucket: 'unsorted', updatedAt: now() })
}

export async function setWeeklyPicks(ids: string[]): Promise<void> {
  await db.transaction('rw', db.tasks, async () => {
    await db.tasks.where('isWeeklyPick').equals(1).modify({ isWeeklyPick: 0 })
    for (const id of ids) {
      await db.tasks.update(id, { isWeeklyPick: 1, updatedAt: now() })
    }
  })
}

export async function markTaskDone(id: string): Promise<void> {
  await db.tasks.update(id, { status: 'done', isWeeklyPick: 0, updatedAt: now() })
}

export async function pushToNextWeek(id: string): Promise<void> {
  await db.tasks.update(id, { isWeeklyPick: 0, updatedAt: now() })
}

export async function addSubTask(taskId: string, text: string): Promise<void> {
  await db.transaction('rw', db.tasks, async () => {
    const task = await db.tasks.get(taskId)
    if (!task) return
    await db.tasks.update(taskId, {
      subTasks: [...task.subTasks, { id: crypto.randomUUID(), text, done: false }],
      updatedAt: now(),
    })
  })
}

export async function toggleSubTask(taskId: string, subTaskId: string): Promise<void> {
  await db.transaction('rw', db.tasks, async () => {
    const task = await db.tasks.get(taskId)
    if (!task) return
    await db.tasks.update(taskId, {
      subTasks: task.subTasks.map((st) =>
        st.id === subTaskId ? { ...st, done: !st.done } : st
      ),
      updatedAt: now(),
    })
  })
}

export async function deleteSubTask(taskId: string, subTaskId: string): Promise<void> {
  await db.transaction('rw', db.tasks, async () => {
    const task = await db.tasks.get(taskId)
    if (!task) return
    await db.tasks.update(taskId, {
      subTasks: task.subTasks.filter((st) => st.id !== subTaskId),
      updatedAt: now(),
    })
  })
}

export async function createWeeklyReset(weekStart: string): Promise<string> {
  const reset: WeeklyReset = {
    id: crypto.randomUUID(),
    weekStart,
    picks: [],
    reviewedAt: null,
  }
  await db.weeklyResets.add(reset)
  return reset.id
}
