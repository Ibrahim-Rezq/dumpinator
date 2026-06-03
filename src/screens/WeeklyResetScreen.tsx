import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/uiStore'
import { ResetStep1Review } from '@/components/reset/ResetStep1Review'
import { ResetStep2Carry } from '@/components/reset/ResetStep2Carry'
import { ResetStep3Pick } from '@/components/reset/ResetStep3Pick'

const STEPS = ['Review', 'Carry over', 'Pick 3'] as const

export function WeeklyResetScreen() {
  const resetStep = useUIStore((s) => s.resetStep)
  const setResetStep = useUIStore((s) => s.setResetStep)

  return (
    <div>
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-display-lg text-foreground mb-4">Weekly Reset</h1>

        <div className="flex items-center gap-2">
          {STEPS.map((label, i) => {
            const step = (i + 1) as 1 | 2 | 3
            const active = resetStep === step
            const done = resetStep > step

            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={cn(
                    'size-6 rounded-full border-[1.5px] flex items-center justify-center text-caption font-semibold',
                    'transition-all duration-[200ms] ease-things',
                    done  && 'border-primary bg-primary text-white',
                    active && 'border-primary bg-brand-tint text-primary',
                    !done && !active && 'border-border text-muted-foreground'
                  )}
                >
                  {done ? '✓' : step}
                </div>
                <span className={cn('text-[12px]', active ? 'text-foreground font-semibold' : 'text-muted-foreground')}>
                  {label}
                </span>
                {i < STEPS.length - 1 && <div className="w-4 h-px bg-border" />}
              </div>
            )
          })}
        </div>
      </div>

      {resetStep === 1 && <ResetStep1Review onNext={() => setResetStep(2)} />}
      {resetStep === 2 && <ResetStep2Carry onNext={() => setResetStep(3)} />}
      {resetStep === 3 && <ResetStep3Pick />}
    </div>
  )
}
