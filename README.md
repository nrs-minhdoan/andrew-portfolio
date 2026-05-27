# Andrew — Portfolio

A personal portfolio website built with Next.js (App Router), internationalized in English and Vietnamese, with a hardened security posture and a content-driven architecture.

## Tech Stack

| Area            | Technology                                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)                                                      |
| Language        | [TypeScript 5](https://www.typescriptlang.org/) (`strict` mode)                                                |
| UI runtime      | [React 19](https://react.dev/)                                                                                 |
| Styling         | [Tailwind CSS 4](https://tailwindcss.com/) + [Tamagui](https://tamagui.dev/) (via `react-native-web`)          |
| Animation       | [Framer Motion](https://www.framer.com/motion/)                                                                |
| i18n            | [next-intl](https://next-intl.dev/) (`en`, `vi`)                                                               |
| Theming         | [next-themes](https://github.com/pacocoursey/next-themes) (light/dark)                                         |
| Icons           | [lucide-react](https://lucide.dev/), [Simple Icons](https://simpleicons.org/), [Devicon](https://devicon.dev/) |
| Fonts           | [Geist](https://vercel.com/font)                                                                               |
| Lint / Format   | [Biome](https://biomejs.dev/)                                                                                  |
| Package manager | [pnpm](https://pnpm.io/) (enforced via `only-allow`)                                                           |

## Requirements

- Node.js `>= 20.18.0`
- pnpm `>= 10` (the project blocks `npm`/`yarn` via a `preinstall` hook)

## Getting Started

```bash
# install dependencies
pnpm install

# start dev server (http://localhost:3000)
pnpm dev

# production build
pnpm build

# run production server
pnpm start
```

## Scripts

| Script           | Purpose                        |
| ---------------- | ------------------------------ |
| `pnpm dev`       | Start the Next.js dev server   |
| `pnpm build`     | Production build               |
| `pnpm start`     | Serve the production build     |
| `pnpm lint`      | Run `next lint`                |
| `pnpm typecheck` | Type-check with `tsc --noEmit` |
| `pnpm audit:fix` | Fix dependency vulnerabilities |

## Project Structure

```
app/
  layout.tsx              # root layout
  [locale]/               # locale-scoped routes
    layout.tsx
    page.tsx
  globals.css
  sitemap.ts / robots.ts  # SEO endpoints
  icon.svg
components/
  sections/               # page sections (Hero, About, Projects, …)
  ui/                     # reusable primitives (Button, SpotlightCard, …)
  nav/                    # navigation controller
  seo/                    # structured data (JSON-LD)
data/                     # content source of truth (projects, companies, techs, …)
i18n/                     # next-intl routing, navigation, request config
messages/                 # en.json / vi.json translation catalogs
types/                    # shared TypeScript type declarations (.d.ts)
lib/                      # helpers
proxy.ts                  # next-intl middleware (locale routing)
next.config.ts            # Next config + security headers + CSP
tamagui.config.ts         # Tamagui setup
biome.json                # lint/format config
```

## Architecture Notes

- **Content-driven.** All portfolio content lives in `data/` as typed constants. UI components read from `data/` and render translated copy via `messages/`. Add or edit content in `data/`, not in JSX.
- **Internationalization.** Locales are `en` (default) and `vi` with `localePrefix: "as-needed"` — the default locale has no URL prefix. Routing config lives in `i18n/routing.ts`; the middleware is `proxy.ts`.
- **Security.** `next.config.ts` ships a strict Content-Security-Policy plus HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, and cross-origin isolation headers. Remote image hosts are allow-listed in `images.remotePatterns`.
- **Performance.** Turbopack dev/build, `optimizePackageImports` for `lucide-react` and `framer-motion`, AVIF/WebP image formats, `reactStrictMode`.

## Coding Rules & Conventions

### Tooling

- **Biome** is the single source of truth for formatting and linting (no Prettier/ESLint).
- Run `pnpm lint` and `pnpm typecheck` before committing.

### Formatting (enforced by Biome)

- 2-space indentation.
- Double quotes for strings.
- Always use semicolons.
- Max line width 100.
- `className` / `class` and `clsx`/`cn`/`cva`/`twMerge` arguments are auto-sorted (Tailwind class ordering).

### TypeScript

- `strict` mode is on — no implicit `any`, handle nullability.
- `allowJs: false` — TypeScript only, no plain JS source.
- Use the `@/*` path alias for absolute imports (e.g. `@/components/ui/Button`, `@/data/projects`).
- Shared types go in `types/*.d.ts`; reference them with `import type`.
- Prefer `as const` for static content objects (see `data/`).

### Components

- One component per file; PascalCase filenames matching the export.
- `components/sections/` for page sections, `components/ui/` for reusable primitives, `components/nav/` and `components/seo/` for their domains.
- Keep components presentational — pull content from `data/` and translations from `next-intl`, not hard-coded strings.

### Content & i18n

- Never hard-code user-facing copy in components. Add keys to `messages/en.json` and `messages/vi.json` (keep both in sync).
- Add structured portfolio data to `data/` with a matching type in `types/`.

### Security

- Do not add user-authored inline `<script>` tags — the production CSP only permits framework-emitted inline scripts.
- New external image/font/connect sources must be added to both the CSP and `images.remotePatterns` in `next.config.ts`.

### Git

- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`, …).
