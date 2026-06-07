import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'

const DumpScreen        = lazy(() => import('@/screens/DumpScreen').then((m) => ({ default: m.DumpScreen })))
const SortScreen        = lazy(() => import('@/screens/SortScreen').then((m) => ({ default: m.SortScreen })))
const PickScreen        = lazy(() => import('@/screens/PickScreen').then((m) => ({ default: m.PickScreen })))
const FocusScreen       = lazy(() => import('@/screens/FocusScreen').then((m) => ({ default: m.FocusScreen })))
const AllTasksScreen    = lazy(() => import('@/screens/AllTasksScreen').then((m) => ({ default: m.AllTasksScreen })))
const ParkedScreen      = lazy(() => import('@/screens/ParkedScreen').then((m) => ({ default: m.ParkedScreen })))
const WeeklyResetScreen = lazy(() => import('@/screens/WeeklyResetScreen').then((m) => ({ default: m.WeeklyResetScreen })))
const SettingsScreen    = lazy(() => import('@/screens/SettingsScreen').then((m) => ({ default: m.SettingsScreen })))

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Suspense><DumpScreen /></Suspense>} />
          <Route path="sort"  element={<Suspense><SortScreen /></Suspense>} />
          <Route path="pick"  element={<Suspense><PickScreen /></Suspense>} />
          <Route path="focus" element={<Suspense><FocusScreen /></Suspense>} />
          <Route path="all"   element={<Suspense><AllTasksScreen /></Suspense>} />
          <Route path="parked" element={<Suspense><ParkedScreen /></Suspense>} />
          <Route path="reset"    element={<Suspense><WeeklyResetScreen /></Suspense>} />
          <Route path="settings" element={<Suspense><SettingsScreen /></Suspense>} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
