# Dumpinator

An ADHD brain-dump task manager. Everything in your head goes in, three things come out.

Task lists have a known failure mode: you write down forty things, feel organized for a day, then stop opening the app because the list got too heavy to look at. Dumpinator is built around that failure mode instead of pretending it doesn't happen.

Try it: [dumpinator.vercel.app](https://dumpinator.vercel.app)

## How it works

The week runs in a loop:

1. **Dump.** Empty your head. No sorting, no priorities, just get it all out.
2. **Sort.** Each task goes into one of three buckets: must, should, or want.
3. **Pick.** Choose three tasks for the week. Only three.
4. **Focus.** Work from a screen that shows your picks and nothing else.

At the end of the week there's a reset. Done tasks get archived, stale ones can be parked, and the loop starts again. Parked tasks stay out of sight until you decide they matter again.

## Local only

There's no backend and no account. All data lives in your browser: tasks in IndexedDB, settings in localStorage. It's an installable PWA and works offline. Nothing leaves your device.

## Running it

```bash
npm install
npm run dev
```

`npm run build` for a production build, `npm run preview` to check it locally.

## Stack

Vite, React 19, TypeScript, Tailwind v4, shadcn/ui, Zustand, Dexie over IndexedDB, React Router.
