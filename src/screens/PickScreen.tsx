import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { BucketColumn } from '@/components/pick/BucketColumn'
import { PickCounter } from '@/components/pick/PickCounter'
import { setWeeklyPicks } from '@/db'

const MAX_PICKS = 3

export function PickScreen() {
  const navigate = useNavigate()
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set())
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function handleToggle(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else if (next.size < MAX_PICKS) next.add(id)
      return next
    })
  }

  async function handleConfirm() {
    if (submitting) return
    setSubmitting(true)
    try {
      await setWeeklyPicks([...selectedIds])
      setConfirmOpen(false)
      navigate('/focus')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-display-lg text-foreground">Pick 3</h1>
        <p className="text-caption text-muted-foreground mt-1">
          Choose exactly 3 tasks for this week.
        </p>
      </div>

      <div className="flex-1 pt-2">
        <BucketColumn bucket="must"   selectedIds={selectedIds} maxReached={selectedIds.size >= MAX_PICKS} onToggle={handleToggle} />
        <BucketColumn bucket="should" selectedIds={selectedIds} maxReached={selectedIds.size >= MAX_PICKS} onToggle={handleToggle} />
        <BucketColumn bucket="want"   selectedIds={selectedIds} maxReached={selectedIds.size >= MAX_PICKS} onToggle={handleToggle} />
      </div>

      <PickCounter count={selectedIds.size} max={MAX_PICKS} onConfirm={() => setConfirmOpen(true)} />

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Lock in these 3 tasks?</DialogTitle>
            <DialogDescription>
              They'll appear on your Focus Board for the week.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" disabled={submitting} />}>Cancel</DialogClose>
            <Button disabled={submitting} onClick={() => void handleConfirm()}>
              {submitting ? 'Saving…' : 'Lock In'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
