# Smart Todo App

A modern task manager built with React, TypeScript, and Vite. The app lets users add, edit, delete, complete, and reorder tasks while keeping state in local storage. It also includes a dark/light theme toggle and an animated background for a polished experience.

## Features

- Add tasks with a title and priority level (High / Medium / Low)
- Mark tasks as complete with a checkbox
- Edit task text and priority in a modal dialog
- Delete tasks with a single click
- Drag-and-drop task reordering
- Persist tasks in `localStorage`
- Dark/light theme toggle with persisted theme selection
- Animated star background using the included `GravityStarsBackground` component

## Project structure

- `src/App.tsx` — application shell and background animation wrapper
- `src/components/Todo.tsx` — main todo interface, task form, list rendering, edit modal, drag/drop, and theme logic
- `src/components/ui/` — reusable UI components such as `Button`, `Input`, `Select`, `Dialog`, `Checkbox`, and `Badge`
- `src/lib/functions.ts` — helper functions for local storage and task sorting
- `src/types.ts` — shared TypeScript types for tasks and priority values
- `src/assets/` — static assets used by the app

## Technologies used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI / Base UI components
- React Icons
- `localStorage` persistence

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal to use the app.

## Build for production

```bash
npm run build
```

## Notes

- Task data is stored in the browser, so tasks remain after refreshes on the same device/browser.
- Theme state is also stored in `localStorage`, allowing the selected mode to persist across reloads.
- Task priority sorting is handled when tasks are loaded from storage.

## Useful scripts

- `npm run dev` — start the development server
- `npm run build` — compile the app for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint checks
