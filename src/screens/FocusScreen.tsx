import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FocusCard } from '@/components/focus/FocusCard'
import { useWeeklyPicks } from '@/hooks/useWeeklyPicks'

export function FocusScreen() {
  const picks = useWeeklyPicks()
  const navigate = useNavigate()

  return (
    <div>
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-display-lg text-foreground">Focus</h1>
        <p className="text-caption text-muted-foreground mt-1">
          {picks.length === 0
            ? 'No picks yet this week.'
            : `${picks.length} task${picks.length !== 1 ? 's' : ''} this week`}
        </p>
      </div>

      {picks.length === 0 ? (
        <div className="flex flex-col items-center gap-6 px-8 py-12">
          <p className="text-body text-muted-foreground text-center">
            Sort your tasks, then pick 3 to focus on this week.
          </p>
          <Button onClick={() => navigate('/pick')}>Pick 3 now</Button>
        </div>
      ) : (
        <div className="pt-2">
          {picks.map((task) => (
            <FocusCard key={task.id} task={task} />
          ))}
          <div className="text-center py-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/reset')} className="text-muted-foreground">
              Weekly reset →
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
