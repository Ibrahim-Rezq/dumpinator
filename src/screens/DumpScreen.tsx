import { DumpInput } from '@/components/dump/DumpInput'
import { TaskList } from '@/components/dump/TaskList'
import { useUnsortedTasks } from '@/hooks/useTasks'

export function DumpScreen() {
  const tasks = useUnsortedTasks()

  return (
    <>
      <div className="px-4 pt-4 pb-1">
        <h1 className="text-display-lg text-foreground">Brain Dump</h1>
        <p className="text-caption text-muted-foreground mt-1">
          {tasks.length === 0 ? 'Empty your mind.' : `${tasks.length} unsorted`}
        </p>
      </div>

      <DumpInput />
      <TaskList tasks={tasks} />
    </>
  )
}
