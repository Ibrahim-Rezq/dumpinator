import { useEffect, useRef, useState } from 'react'
import { CheckIcon, ListIcon, ArrowRightIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { markTaskDone, pushToNextWeek } from '@/db'
import { SubTaskList } from './SubTaskList'
import type { Bucket, Task } from '@/types'
import { cn } from '@/lib/utils'

interface FocusCardProps {
  task: Task
}

const BUCKET_LABEL_CLASS: Record<Exclude<Bucket, 'unsorted'>, string> = {
  must:   'text-danger',
  should: 'text-warning',
  want:   'text-success-green',
}

export function FocusCard({ task }: FocusCardProps) {
  const [showSubTasks, setShowSubTasks] = useState(false)
  const [completing, setCompleting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  useEffect(() => {
    if (task.status === 'done' && !completing) {
      setCompleting(true)
      timerRef.current = setTimeout(() => void markTaskDone(task.id), 350)
    }
  }, [task.status, task.id, completing])

  function handleDone() {
    if (completing) return
    setCompleting(true)
    timerRef.current = setTimeout(() => void markTaskDone(task.id), 350)
  }

  const bucketLabelClass = task.bucket !== 'unsorted' ? BUCKET_LABEL_CLASS[task.bucket] : undefined

  return (
    <Card
      className={cn(
        'mx-4 mb-3 shadow-focus border-0 transition-all duration-[320ms] ease-things',
        completing && 'opacity-0 scale-95'
      )}
    >
      <CardHeader className="pb-0 gap-2">
        {bucketLabelClass && (
          <span className={cn('text-caption-caps', bucketLabelClass)}>{task.bucket}</span>
        )}
        {task.category && (
          <Badge variant="secondary" className="text-caption w-fit">{task.category}</Badge>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-heading text-foreground mb-4">{task.text}</p>

        {showSubTasks && (
          <SubTaskList taskId={task.id} subTasks={task.subTasks} />
        )}

        <div className="flex gap-2 mt-4">
          <Button className="flex-1" onClick={handleDone} disabled={completing}>
            <CheckIcon />
            Done
          </Button>
          <Button
            variant={showSubTasks ? 'default' : 'outline'}
            size="icon"
            onClick={() => setShowSubTasks((v) => !v)}
            aria-label="Break into steps"
            aria-pressed={showSubTasks}
          >
            <ListIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => void pushToNextWeek(task.id)}
            aria-label="Push to next week"
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
