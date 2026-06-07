import { useState } from 'react'
import { ArchiveIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ThingsCheckbox } from '@/components/ui/ThingsCheckbox'
import { SubTaskProgressPill } from '@/components/ui/SubTaskProgressPill'
import { SubTaskList } from '@/components/focus/SubTaskList'
import { useTasksByBucket, useDoneTasks } from '@/hooks/useTasks'
import { markTaskDone, parkTask } from '@/db'
import type { Bucket, Task } from '@/types'

function ActiveTaskRow({ task }: { task: Task }) {
  const [expanded, setExpanded] = useState(false)
  const hasSubTasks = task.subTasks.length > 0

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-3">
        <ThingsCheckbox
          checked={false}
          onChange={() => void markTaskDone(task.id)}
          aria-label={`Mark "${task.text}" complete`}
        />
        <span className="flex-1 text-body text-foreground">{task.text}</span>
        {task.category && (
          <Badge variant="secondary" className="text-caption shrink-0">{task.category}</Badge>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Park task"
          onClick={() => void parkTask(task.id)}
          className="text-muted-foreground shrink-0"
        >
          <ArchiveIcon />
        </Button>
      </div>

      {hasSubTasks && (
        <div className="ml-[30px]">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-left"
          >
            <SubTaskProgressPill subTasks={task.subTasks} />
          </button>
          {expanded && (
            <SubTaskList taskId={task.id} subTasks={task.subTasks} />
          )}
        </div>
      )}
    </div>
  )
}

function DoneTaskRow({ task }: { task: Task }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <ThingsCheckbox
        checked
        aria-label={`"${task.text}" (completed)`}
      />
      <span className="flex-1 text-body text-muted-foreground line-through">{task.text}</span>
    </div>
  )
}

function BucketTabContent({ bucket }: { bucket: Bucket }) {
  const tasks = useTasksByBucket(bucket)
  if (tasks.length === 0) {
    return <p className="text-body text-muted-foreground text-center py-12 px-4">Nothing here.</p>
  }
  return (
    <div>
      {tasks.map((task, i) => (
        <div key={task.id}>
          <ActiveTaskRow task={task} />
          {i < tasks.length - 1 && <Separator className="ml-[46px]" />}
        </div>
      ))}
    </div>
  )
}

function DoneTabContent() {
  const tasks = useDoneTasks()
  if (tasks.length === 0) {
    return <p className="text-body text-muted-foreground text-center py-12 px-4">Nothing completed yet.</p>
  }
  return (
    <div>
      {tasks.map((task, i) => (
        <div key={task.id}>
          <DoneTaskRow task={task} />
          {i < tasks.length - 1 && <Separator className="ml-[46px]" />}
        </div>
      ))}
    </div>
  )
}

export function AllTasksScreen() {
  return (
    <div>
      <div className="px-4 pt-4 pb-0">
        <h1 className="text-display-lg text-foreground mb-4">All Tasks</h1>
      </div>

      <Tabs defaultValue="must">
        <div className="px-4 border-b border-border">
          <TabsList variant="line" className="w-full justify-start h-auto pb-0 rounded-none">
            <TabsTrigger value="must">Must</TabsTrigger>
            <TabsTrigger value="should">Should</TabsTrigger>
            <TabsTrigger value="want">Want</TabsTrigger>
            <TabsTrigger value="done">Done</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="must"><BucketTabContent bucket="must" /></TabsContent>
        <TabsContent value="should"><BucketTabContent bucket="should" /></TabsContent>
        <TabsContent value="want"><BucketTabContent bucket="want" /></TabsContent>
        <TabsContent value="done"><DoneTabContent /></TabsContent>
      </Tabs>
    </div>
  )
}
