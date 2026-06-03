import { useEffect, useRef } from 'react'
import { Trash2Icon } from 'lucide-react'
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
import { updateTask, deleteTask } from '@/db'
import { useUIStore } from '@/stores/uiStore'
import type { Task } from '@/types'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const editingTaskId = useUIStore((s) => s.editingTaskId)
  const setEditingTaskId = useUIStore((s) => s.setEditingTaskId)
  const inputRef = useRef<HTMLInputElement>(null)
  const isEditing = editingTaskId === task.id

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  function handleRowClick() {
    if (isEditing) return
    setEditingTaskId(task.id)
  }

  function handleSave() {
    if (!isEditing) return
    const text = inputRef.current?.value.trim()
    if (text && text !== task.text) void updateTask(task.id, { text })
    setEditingTaskId(null)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') e.currentTarget.blur()
    if (e.key === 'Escape') setEditingTaskId(null)
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={handleRowClick}
        onKeyDown={(e) => {
          if (!isEditing && (e.key === 'Enter' || e.key === ' ')) handleRowClick()
        }}
        className={[
          'flex items-start gap-3 px-4 group',
          'transition-all duration-[280ms] ease-things',
          isEditing
            ? 'py-4 bg-card shadow-focus rounded-lg mx-2 my-2 cursor-default'
            : 'py-3 cursor-pointer',
        ].join(' ')}
      >
        <div className="size-[18px] rounded-full border-[1.5px] border-muted-foreground shrink-0 mt-0.5" />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              defaultValue={task.text}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className="w-full text-heading text-foreground bg-transparent border-none outline-none font-sans"
            />
          ) : (
            <span className="text-body text-foreground">{task.text}</span>
          )}
        </div>

        <Dialog>
          <DialogTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Delete task"
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-[120ms]"
              />
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
              <DialogClose
                render={<Button variant="destructive" onClick={() => void deleteTask(task.id)} />}
              >
                Delete
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {!isEditing && <div className="h-px bg-border ml-[46px]" />}
    </>
  )
}
