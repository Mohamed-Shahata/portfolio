# Mohamed Shehata — Portfolio

Personal developer portfolio built with Next.js 16 (App Router) and React 19. Showcases full-stack and backend projects with a bilingual, RTL-ready interface.

## Features

- Bilingual UI (English / Arabic) with full RTL support, toggled via `LocaleProvider`
- Fully translated project detail pages (`/projects/[slug]`) — labels and project content localized per language
- Static generation (`generateStaticParams`) for all project pages
- Sections: Hero, What I Build, Process, Architecture, Featured Projects, Tech Stack, Testimonials, FAQ, Contact
- Animated UI built with Framer Motion + Tailwind CSS v4

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** lucide-react

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Project Structure

```
app/                  # App Router pages (home, project details, sitemap, robots)
components/
  layout/              # Navbar, Footer
  sections/            # Homepage sections + ProjectDetail
  ui/                  # Reusable UI primitives (cards, badges, buttons...)
lib/
  i18n/                # Locale context + translations (en/ar)
  projects-data.ts     # Project data (English + Arabic fields)
```

## Localization

- `lib/i18n/translations.ts` — static UI strings for both locales.
- `lib/projects-data.ts` — each project has an `ar` field with the Arabic version of its content; `getLocalizedProject()` merges the right fields based on the active locale.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — run ESLint
