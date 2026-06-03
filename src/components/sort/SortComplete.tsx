import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function SortComplete() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center px-8 py-16 gap-4">
      <span className="text-5xl">✅</span>
      <h2 className="text-display-md text-foreground text-center">All sorted!</h2>
      <p className="text-body text-muted-foreground text-center">
        Now pick your 3 for this week.
      </p>
      <Button
        size="lg"
        className="mt-2 px-8"
        onClick={() => navigate('/pick')}
      >
        Pick 3 →
      </Button>
    </div>
  )
}
