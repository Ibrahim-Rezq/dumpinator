import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { BucketColumn } from '@/components/pick/BucketColumn'
import { db, setWeeklyPicks, createWeeklyReset } from '@/db'
import { useUIStore } from '@/stores/uiStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { getWeekStartISO } from '@/lib/dates'

const MAX_PICKS = 3

export function ResetStep3Pick() {
  const navigate = useNavigate()
  const weekStartDay = useSettingsStore((s) => s.weekStartDay)
  const setLastResetAt = useSettingsStore((s) => s.setLastResetAt)
  const setResetStep = useUIStore((s) => s.setResetStep)
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set())
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
      const weekStart = getWeekStartISO(weekStartDay)
      const existing = await db.weeklyResets.where('weekStart').equals(weekStart).first()
      if (!existing) await createWeeklyReset(weekStart)
      await setWeeklyPicks([...selectedIds])
      setLastResetAt(Date.now())
      setResetStep(1) // reset wizard so it starts fresh next time
      navigate('/focus')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pb-20">
      <div className="px-4 pb-4">
        <h2 className="text-display-md text-foreground mb-1">Pick 3 for this week</h2>
        <p className="text-caption text-muted-foreground">{selectedIds.size} of {MAX_PICKS} chosen</p>
      </div>

      <BucketColumn bucket="must"   selectedIds={selectedIds} maxReached={selectedIds.size >= MAX_PICKS} onToggle={handleToggle} />
      <BucketColumn bucket="should" selectedIds={selectedIds} maxReached={selectedIds.size >= MAX_PICKS} onToggle={handleToggle} />
      <BucketColumn bucket="want"   selectedIds={selectedIds} maxReached={selectedIds.size >= MAX_PICKS} onToggle={handleToggle} />

      {selectedIds.size === MAX_PICKS && (
        <div className="px-4 mt-4">
          <Button className="w-full" size="lg" disabled={submitting} onClick={() => void handleConfirm()}>
            {submitting ? 'Saving…' : 'Start the week →'}
          </Button>
        </div>
      )}
    </div>
  )
}
