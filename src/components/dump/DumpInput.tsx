import { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { addTask } from '@/db'

export function DumpInput() {
  const ref = useRef<HTMLInputElement>(null)

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    const text = ref.current?.value.trim()
    if (!text || !ref.current) return
    // Clear immediately so rapid Enter doesn't double-submit.
    // Restore the text if the write fails so nothing is lost.
    ref.current.value = ''
    try {
      await addTask(text)
    } catch {
      if (ref.current) ref.current.value = text
    }
  }

  return (
    <div className="sticky top-0 z-10 px-4 py-3 bg-background">
      <Input
        ref={ref}
        type="text"
        placeholder="What's on your mind?"
        onKeyDown={handleKeyDown}
        autoFocus
        className="text-heading bg-card h-12 focus-visible:ring-primary/30 placeholder:text-muted-foreground/60"
      />
    </div>
  )
}
