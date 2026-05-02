# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # run ESLint (eslint.config.mjs, Next.js core-web-vitals + TypeScript rules)
```

There are no tests in this project.

## Architecture

Single-page portfolio built with **Next.js 16 / React 19** using the App Router. The entire UI lives in a single route (`src/app/page.tsx`) — a `'use client'` component that renders four full-width sections: Hero, Profile, Works, Contact. Navigation is in-page smooth-scroll via `react-scroll` `<Link>` / `<Element>` pairs.

### Provider tree

`layout.tsx` → `Providers` (`src/app/providers.tsx`) wraps everything in:
- `AppRouterCacheProvider` (MUI SSR cache for App Router, v15 API)
- `ThemeProvider` with the custom theme from `src/app/themes/theme.ts`
- `CssBaseline`
- Vercel `<Analytics />`

### Styling

MUI v9 + Emotion. Custom theme sets `primary: #00ffff`, `secondary: #6c757d`, `fontFamily: Roboto`. Use MUI `sx` prop or `styled()` for all styling — there is no Tailwind or CSS Modules (only `globals.css` and a mostly-empty `page.module.css`).

### Data

Content is stored as plain TypeScript arrays in `src/app/data/`:
- `worksData.ts` — exports `works: Work[]`; each entry has title, description paragraphs, technologies string, optional GitHub/public/slide URLs, and an `imageList` of imported image paths
- `hobbyData.ts` — hobby entries

Images are imported at the top of the data files (e.g., `import foo from '/img/works/foo.png'`) and stored in `public/img/` (sub-dirs: `works/`, `profile/`, `common/`).

### Path alias

`@/*` resolves to `./src/*` (configured in `tsconfig.json`).

### Key components

- `WorkItem` / `WorkItemDialog` — card + modal for each portfolio work entry
- `SkillBar` / `SkillSet` — skill visualization
- `HobbyItem` — hobby card
- `UrlBox` — reusable link button (GitHub, live site, slides)
- `LineComponent` — decorative divider

To add a new work: add an entry to `works` in `src/app/data/worksData.ts` and place images under `public/img/works/`.
