import { useRef } from 'react'
import { addSubTask } from '@/db'

interface AddSubTaskInputProps {
  taskId: string
}

export function AddSubTaskInput({ taskId }: AddSubTaskInputProps) {
  const ref = useRef<HTMLInputElement>(null)

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    const text = ref.current?.value.trim()
    if (!text) return
    void addSubTask(taskId, text)
    if (ref.current) ref.current.value = ''
  }

  return (
    <input
      ref={ref}
      type="text"
      placeholder="Add step (keep under 15 min)…"
      onKeyDown={handleKeyDown}
      className="w-full text-[13px] text-muted-foreground bg-transparent border-none border-t border-border pt-2 outline-none font-sans placeholder:text-muted-foreground/50"
    />
  )
}
