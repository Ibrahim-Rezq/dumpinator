import { useLocation, useNavigate } from 'react-router-dom'
import { InboxIcon, ArrowUpDownIcon, StarIcon, ListIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { path: '/',      label: 'Dump',  Icon: InboxIcon },
  { path: '/sort',  label: 'Sort',  Icon: ArrowUpDownIcon },
  { path: '/focus', label: 'Focus', Icon: StarIcon },
  { path: '/all',   label: 'All',   Icon: ListIcon },
]

export function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div
        className="w-full max-w-md flex items-center bg-card border-t border-border"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {tabs.map(({ path, label, Icon }) => {
          const active = pathname === path
          return (
            <button
              key={path}
              type="button"
              onClick={() => navigate(path)}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 py-3 transition-colors duration-150',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon size={22} strokeWidth={active ? 2 : 1.5} />
              <span className={cn('text-caption', active ? 'font-semibold' : 'font-normal')}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
