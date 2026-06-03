export function getWeekStart(date: Date, weekStartDay: number): Date {
  const d = new Date(date)
  const diff = (d.getDay() - weekStartDay + 7) % 7
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

// Builds YYYY-MM-DD from local date components to avoid UTC midnight drift.
export function getWeekStartISO(weekStartDay: number): string {
  const d = getWeekStart(new Date(), weekStartDay)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
