# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (Vite HMR)
npm run build     # tsc -b && vite build
npm run lint      # eslint
npm run preview   # preview production build locally
```

## Architecture

Dumpinator is an ADHD brain-dump task manager — a fully local, offline-capable mobile-first PWA. There is **no backend**. All data lives in the browser (IndexedDB via Dexie, settings in localStorage).

**Stack:** Vite 8 · React 19 · TypeScript 6 · Tailwind v4 · shadcn/ui (base-nova style) · `@base-ui/react` · Zustand 5 · Dexie 4 · React Router v7 · `vite-plugin-pwa`

### User flow
```
Dump → Sort → Pick 3 → Focus  (weekly cycle via WeeklyReset)
```

### File layout
```
src/
  db/index.ts          — all Dexie schema + every DB mutation function
  types/index.ts        — Task, SubTask, WeeklyReset, Bucket, Category, TaskStatus
  stores/              — Zustand: uiStore (ephemeral), settingsStore (persisted to localStorage)
  hooks/               — Dexie live-query hooks (useTasks*, useWeeklyReset, etc.)
  screens/             — 7 route-level pages (lazy loaded): Dump, Sort, Pick, Focus, AllTasks, Parked, WeeklyReset
  components/          — feature-grouped subcomponents: dump/, sort/, pick/, focus/, reset/, layout/, ui/
```

### Data model key points
- `Task.bucket`: `'unsorted' | 'must' | 'should' | 'want'`
- `Task.status`: `'active' | 'done' | 'parked'`
- `Task.isWeeklyPick`: **`0 | 1` (not boolean)** — IndexedDB cannot index booleans; using `number` is required for the Dexie compound index `[bucket+status]` and single index `isWeeklyPick` to work
- All DB mutations live exclusively in `src/db/index.ts`; screens/components call those exported functions

### Routing
`HashRouter` is required for the PWA (`start_url: '/#/'`). All 7 screens are lazily imported in `App.tsx`.

### UI rules
- Use **Tailwind classes + shadcn components** (Button, Card, Dialog, etc.) — never inline `style={{...}}` unless the value is dynamic and can't be expressed as a static token (e.g. `env(safe-area-inset-bottom)`)
- Use `cn()` from `@/lib/utils` for class merging
- **`@base-ui/react` API differs from Radix**: uses `render` prop instead of `asChild`; state attributes are `data-open`, `data-checked`, etc. (not `data-state="open"`)
- shadcn CLI places components at `@/` root — always move them into `src/components/ui/` after `npx shadcn add`

### Design system (Things-inspired)
Design tokens are defined in `src/index.css` under `@theme inline`. Typography utilities are also defined there:

| Class | Size / Weight |
|---|---|
| `.text-display-lg` | 28px / 700 |
| `.text-display-md` | 22px / 700 |
| `.text-heading` | 17px / 600 |
| `.text-body` | 14px / 400 |
| `.text-body-medium` | 14px / 500 |
| `.text-caption` | 11px / 400 |
| `.text-caption-caps` | 11px / 600 uppercase |

Key color tokens: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `text-primary` — all map to the Things palette defined in `src/index.css`. Full spec in `things_design_system.md`.

Primary easing: `--ease-things: cubic-bezier(0.2, 0.8, 0.2, 1)`.
