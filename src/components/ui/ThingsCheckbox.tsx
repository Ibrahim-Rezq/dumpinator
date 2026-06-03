import { cn } from '@/lib/utils'

interface ThingsCheckboxProps {
  checked: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

export function ThingsCheckbox({
  checked,
  onChange,
  disabled,
  className,
  'aria-label': ariaLabel,
}: ThingsCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel ?? 'Mark task complete'}
      disabled={disabled ?? !onChange}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'size-[18px] shrink-0 rounded-full border-[1.5px] flex items-center justify-center',
        'transition-all duration-[120ms]',
        'focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2',
        'disabled:cursor-default',
        checked
          ? 'border-primary bg-primary'
          : 'border-muted-foreground bg-transparent enabled:hover:border-primary enabled:hover:bg-brand-tint',
        className
      )}
    >
      {checked && (
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          style={{ animation: 'thingsCheckScale 120ms cubic-bezier(0.34,1.56,0.64,1) forwards' }}
        >
          <path
            d="M1 3.5L3.8 6.5L9 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}
