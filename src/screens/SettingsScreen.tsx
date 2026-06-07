import { useEffect, useRef, useState } from 'react'
import { db, importAllData } from '@/db'
import { useSettingsStore } from '@/stores/settingsStore'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import type { Task, WeeklyReset } from '@/types'

interface ExportData {
  version: 1
  exportedAt: number
  tasks: Task[]
  weeklyResets: WeeklyReset[]
  settings: {
    weekStartDay: 0 | 1 | 2 | 3 | 4 | 5 | 6
    lastResetAt: number | null
  }
}

const VALID_BUCKETS = new Set(['unsorted', 'must', 'should', 'want'])
const VALID_STATUSES = new Set(['active', 'done', 'parked'])
const VALID_CATEGORIES = new Set(['work', 'code', 'school', 'personal'])

function isValidExportData(data: unknown): data is ExportData {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>
  if (d.version !== 1) return false
  if (typeof d.exportedAt !== 'number') return false
  if (!Array.isArray(d.tasks)) return false
  if (!Array.isArray(d.weeklyResets)) return false
  if (!d.settings || typeof d.settings !== 'object') return false
  const s = d.settings as Record<string, unknown>
  if (typeof s.weekStartDay !== 'number' || s.weekStartDay < 0 || s.weekStartDay > 6) return false
  if (s.lastResetAt !== null && typeof s.lastResetAt !== 'number') return false

  for (const task of d.tasks as unknown[]) {
    if (!task || typeof task !== 'object') return false
    const t = task as Record<string, unknown>
    if (
      typeof t.id !== 'string' ||
      typeof t.text !== 'string' ||
      !VALID_BUCKETS.has(t.bucket as string) ||
      !VALID_STATUSES.has(t.status as string) ||
      (t.category !== null && !VALID_CATEGORIES.has(t.category as string)) ||
      !Array.isArray(t.subTasks) ||
      typeof t.createdAt !== 'number' ||
      typeof t.updatedAt !== 'number' ||
      (t.isWeeklyPick !== 0 && t.isWeeklyPick !== 1)
    ) return false
    for (const st of t.subTasks as unknown[]) {
      if (!st || typeof st !== 'object') return false
      const sub = st as Record<string, unknown>
      if (typeof sub.id !== 'string' || typeof sub.text !== 'string' || typeof sub.done !== 'boolean') return false
    }
  }

  for (const reset of d.weeklyResets as unknown[]) {
    if (!reset || typeof reset !== 'object') return false
    const r = reset as Record<string, unknown>
    if (
      typeof r.id !== 'string' ||
      typeof r.weekStart !== 'string' ||
      !Array.isArray(r.picks) ||
      (r.reviewedAt !== null && typeof r.reviewedAt !== 'number')
    ) return false
    for (const pick of r.picks as unknown[]) {
      if (typeof pick !== 'string') return false
    }
  }

  return true
}

export function SettingsScreen() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [pendingData, setPendingData] = useState<ExportData | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => () => clearTimeout(successTimerRef.current), [])

  async function handleExport() {
    setExportError(null)
    try {
      const [tasks, weeklyResets] = await Promise.all([
        db.tasks.toArray(),
        db.weeklyResets.toArray(),
      ])
      const { weekStartDay, lastResetAt } = useSettingsStore.getState()
      const data: ExportData = {
        version: 1,
        exportedAt: Date.now(),
        tasks,
        weeklyResets,
        settings: { weekStartDay, lastResetAt },
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `dumpinator-export-${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(a)
      a.click()
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 0)
    } catch {
      setExportError('Failed to export data. Try again.')
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setImportError(null)
    setSuccess(false)
    try {
      const text = await file.text()
      const parsed: unknown = JSON.parse(text)
      if (!isValidExportData(parsed)) {
        setImportError('Invalid file format. Make sure you selected a Dumpinator export file.')
        return
      }
      setPendingData(parsed)
      setDialogOpen(true)
    } catch {
      setImportError('Failed to read file. Make sure it is valid JSON.')
    }
  }

  async function handleConfirmImport() {
    if (!pendingData) return
    try {
      await importAllData(pendingData.tasks, pendingData.weeklyResets)
      useSettingsStore.setState({
        weekStartDay: pendingData.settings.weekStartDay,
        lastResetAt: pendingData.settings.lastResetAt,
      })
      clearTimeout(successTimerRef.current)
      setSuccess(true)
      successTimerRef.current = setTimeout(() => setSuccess(false), 3000)
    } catch {
      setImportError('Import failed while writing to the database. Try again.')
    } finally {
      setPendingData(null)
      setDialogOpen(false)
    }
  }

  return (
    <div className="px-4 pt-4 pb-6">
      <h1 className="text-display-lg text-foreground mb-6">Settings</h1>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <p className="text-caption-caps text-muted-foreground px-4 pt-3 pb-2">Data Management</p>

        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1">
            <p className="text-body-medium text-foreground">Export Data</p>
            <p className="text-caption text-muted-foreground mt-0.5">
              Download a full backup of your tasks and settings.
            </p>
            {exportError && <p className="text-caption text-destructive mt-1">{exportError}</p>}
          </div>
          <Button variant="outline" size="sm" onClick={() => void handleExport()}>
            Export JSON
          </Button>
        </div>

        <div className="h-px bg-border mx-4" />

        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1">
            <p className="text-body-medium text-foreground">Import Data</p>
            <p className="text-caption text-muted-foreground mt-0.5">
              Replace all current data with a JSON backup.
            </p>
            {importError && <p className="text-caption text-destructive mt-1">{importError}</p>}
            {success && <p className="text-caption text-success-green mt-1">Data imported successfully.</p>}
          </div>
          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
            Import JSON
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileChange}
      />

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setPendingData(null)
        }}
      >
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Replace all data?</DialogTitle>
            <DialogDescription>
              This will permanently overwrite all your current tasks, weekly resets, and settings
              with the contents of the imported file. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button variant="destructive" onClick={() => void handleConfirmImport()}>
              Replace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
