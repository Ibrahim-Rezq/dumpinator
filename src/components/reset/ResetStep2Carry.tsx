import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useWeeklyPicks } from '@/hooks/useWeeklyPicks'
import { parkTask, updateTask } from '@/db'
import type { Task } from '@/types'

interface ResetStep2CarryProps {
  onNext: () => void
}

export function ResetStep2Carry({ onNext }: ResetStep2CarryProps) {
  const live = useWeeklyPicks()
  // Snapshot on first render so cards don't vanish while the user is deciding.
  const [unfinished] = useState<Task[]>(() => live.filter((t) => t.status === 'active'))
  const [handled, setHandled] = useState<Set<string>>(new Set())

  const remaining = unfinished.filter((t) => !handled.has(t.id))

  async function handleKeep(id: string) {
    await updateTask(id, { isWeeklyPick: 0 })
    setHandled((prev) => new Set(prev).add(id))
  }

  async function handlePark(id: string) {
    await parkTask(id)
    setHandled((prev) => new Set(prev).add(id))
  }

  return (
    <div className="px-4">
      <h2 className="text-display-md text-foreground mb-2">Unfinished tasks</h2>
      <p className="text-body text-muted-foreground mb-6">
        {unfinished.length === 0
          ? 'All finished — great week!'
          : `${remaining.length} left to decide`}
      </p>

      <div className="space-y-2.5">
        {unfinished.map((task) => {
          const done = handled.has(task.id)
          return (
            <Card key={task.id} className={`shadow-popover border-0 transition-opacity duration-200 ${done ? 'opacity-40' : ''}`}>
              <CardContent className="py-4">
                <p className="text-body text-foreground mb-3">{task.text}</p>
                {!done && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => void handleKeep(task.id)}>
                      Keep in pool
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground" onClick={() => void handlePark(task.id)}>
                      Park it
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Button
        className="w-full mt-8"
        size="lg"
        variant={remaining.length === 0 ? 'default' : 'outline'}
        onClick={onNext}
      >
        Pick new 3 →
      </Button>
    </div>
  )
}
