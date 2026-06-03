import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="relative flex flex-col w-full max-w-md min-h-screen bg-background">
        <main className="flex-1 overflow-y-auto pb-20">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
