export type Bucket = 'must' | 'should' | 'want' | 'unsorted'
export type Category = 'work' | 'code' | 'school' | 'personal' | null
export type TaskStatus = 'active' | 'done' | 'parked'

export interface SubTask {
  id: string
  text: string
  done: boolean
}

export interface Task {
  id: string
  text: string
  bucket: Bucket
  category: Category
  status: TaskStatus
  isWeeklyPick: 0 | 1
  subTasks: SubTask[]
  createdAt: number
  updatedAt: number
}

export interface WeeklyReset {
  id: string
  weekStart: string
  picks: string[]
  reviewedAt: number | null
}
