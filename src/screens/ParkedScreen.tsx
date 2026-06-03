import { ArchiveRestoreIcon, Trash2Icon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useParkedTasks } from '@/hooks/useTasks'
import { unparkTask, deleteTask } from '@/db'
import type { Task } from '@/types'

function ParkedTaskRow({ task }: { task: Task }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="flex-1 text-body text-muted-foreground">{task.text}</span>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Unpark task"
        onClick={() => void unparkTask(task.id)}
        className="text-primary shrink-0"
      >
        <ArchiveRestoreIcon />
      </Button>

      <Dialog>
        <DialogTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Delete task" className="text-muted-foreground shrink-0" />
          }
        >
          <Trash2Icon />
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete task?</DialogTitle>
            <DialogDescription>"{task.text}"</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <DialogClose render={<Button variant="destructive" onClick={() => void deleteTask(task.id)} />}>
              Delete
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function ParkedScreen() {
  const tasks = useParkedTasks()

  return (
    <div>
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-display-lg text-foreground">Parked</h1>
        <p className="text-caption text-muted-foreground mt-1">
          Someday / maybe — out of sight, not forgotten.
        </p>
      </div>

      {tasks.length === 0 ? (
        <p className="text-body text-muted-foreground text-center py-12 px-4">Nothing parked.</p>
      ) : (
        <div className="pt-2">
          {tasks.map((task, i) => (
            <div key={task.id}>
              <ParkedTaskRow task={task} />
              {i < tasks.length - 1 && <div className="h-px bg-border mx-4" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
