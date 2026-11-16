# AGENTS.md — Livestack (`@livestack/site`)

**Design rules:** [.cursor/skills/navy-design/SKILL.md](./.cursor/skills/navy-design/SKILL.md) - read before creating or changing any UI.  

**Navy** is a multipage Astro marketing/product site template from [Lexington Themes](https://lexingtonthemes.com/), shown as an uptime monitoring and status page product: landing, pricing, about, contact, sign in and sign up, a design-system showcase under `/system/*`, plus blog, changelog, customer stories, integrations, team, help center and legal pages. The look is a light lavender-white ground with indigo ink, one ultramarine accent and a grainy WebGL gradient shader on the heroes, on a 12-column grid with side labels.

## Tech stack

| Area | Details |
|------|---------|
| **Framework** | Astro `^7.4.12` |
| **Styling** | Tailwind CSS `^4.3.5` via `@tailwindcss/vite` `^4.3.5` in `astro.config.mjs`; fonts, display sizes and shadows in `src/styles/global.css` (`@theme`); semantic colour tokens in `src/styles/colors.css`. |
| **MDX** | `@astrojs/mdx` `^8.1.6` |
| **RSS / sitemap** | `@astrojs/rss` `^4.0.19`, `@astrojs/sitemap` `^3.7.5` |
| **SEO components** | `@lexingtonthemes/seo` `^0.4.0` (`AstroSeo` in `src/components/fundations/head/Seo.astro`) |
| **Tailwind plugins (deps)** | `@tailwindcss/forms` `^0.5.11`, `@tailwindcss/typography` `^0.5.20`, `tailwind-scrollbar-hide` `^4.0.0` (wired in `global.css` via `@plugin`). |
| **Smooth scroll** | `lenis` `^1.3.27`, started in `src/components/fundations/scripts/SmoothScroll.astro` from `BaseLayout`. |
| **Aliases** | `@/*` → `src/*` (`tsconfig.json`) |

There is no `tailwind.config.*`: Tailwind 4 is configured CSS-first in `global.css`.

## Folder map

| Path | Role |
|------|------|
| `src/pages/` | File-based routes: home, pricing, about, forms, `/system/*`, blog/changelog/customers/helpcenter/integrations/team hubs + `[...slug]` detail routes, `infopages/[...slug]`, `rss.xml.js`. |
| `src/layouts/` | `BaseLayout.astro` (shell), plus `BlogLayout`, `ChangeLogLayout`, `CustomersLayout`, `HelpcenterLayout`, `InfoPagesLayout`, `IntegrationsLayout`, `TeamLayout`. |
| `src/components/` | One folder of section components per page (`landing/`, `pricing/`, `about/`, `status/`, `security/`, `blog/`, `changelog/` …), `global/Navigation.astro` & `Footer.astro`, `assets/` (`GradientShader`, `Logo`), **`fundations/`** (head, elements, containers with `grid.ts`, `LabeledGrid` and `CtaPanel`, icons, scripts; keep this folder name as-is). |
| `src/content/` | Markdown for all collections (see below). |
| `src/styles/` | `global.css`, `colors.css` (semantic colour tokens). |
| `src/images/` | **Primary assets** (blog images, customer and integration logos, team and about photos). |
| `public/` | **Not present in this repo.** |

## Content collections (`src/content.config.ts`)

Loader: `glob` with `**/*.md` per folder. Export name → collection id used in `getCollection(...)`.

Images in frontmatter are objects `{ url, alt }` where `url` is an Astro `image()` (so it is optimised and must point at a real file). Existing entries use `/src/images/...` paths.

### `posts` → folder `src/content/posts/`

- **Required:** `title`, `pubDate` (coerced date), `description`, `team`, `image` `{ url, alt }`, `tags` (string array).
- **Template:** copy structure from `src/content/posts/5.md`.

### `changelog` → `src/content/changelog/`

- **Required:** `page`, `description`, `pubDate`.
- **Template:** `src/content/changelog/1.md`.

### `infopages` → `src/content/infopages/`

- **Required:** `page`, `pubDate`.
- **Template:** `src/content/infopages/terms.md`.

### `customers` → `src/content/customers/`

- **Required:** `customer`, `challengesAndSolutions` (array of `{ title, content }`), `results` (string array), `about`, `details` (record string→string), `logo` `{ url, alt }`.
- **Optional:** `ctaTitle`, `testimonial`, `partnership`.
- **Template:** `src/content/customers/1.md`.

### `integrations` → `src/content/integrations/`

- **Required:** `email`, `integration`, `description`, `permissions` (string array), `details` (array of `{ title, value, url? }`), `logo` `{ url, alt }`, `tags` (string array).
- **Template:** `src/content/integrations/1.md`.

### `helpcenter` → `src/content/helpcenter/`

- **Required:** `title`, `intro`.
- **Template:** `src/content/helpcenter/1.md`.

### `team` → `src/content/team/`

- **Required:** `name`, `image` `{ url, alt }`.
- **Optional:** `bio`, `role`, `socials` `{ twitter?, website?, linkedin?, email? }`.
- **Template:** `src/content/team/carmen-vidal.md`.

## Routing conventions

- **Slash URLs** match `src/pages/` structure. Examples: `/` (`index.astro`), `/pricing`, `/about`, `/forms/contact`, `/system/overview`, `/404`.
- **Section hubs:** `/blog/home`, `/changelog/home`, `/customers/home`, `/helpcenter/home`, `/integrations/home`, `/team/home`.
- **Dynamic entries:** `[...slug].astro` under each section; **`slug` = content entry `id`** (typically the Markdown filename without extension). Examples:
  - Post: `/blog/posts/5`
  - Changelog: `/changelog/1`
  - Customer: `/customers/1`
  - Integration: `/integrations/1`
  - Team: `/team/carmen-vidal`
  - Help center: `/helpcenter/1`
  - Legal/info: `/infopages/terms`, `/infopages/privacy`
- **Blog tags:** `/blog/tags` (index), `/blog/tags/[tag]` where `tag` is the exact tag string from frontmatter.

- **RSS:** `/rss.xml` is generated by `src/pages/rss.xml.js` from the `posts` content collection via `getCollection`, linking to `/blog/posts/{id}/`.

## Customization

- **Site URL:** `site` in `astro.config.mjs` (production: `https://withlivestack.com`). Align with **RSS** (`context.site`) and **sitemap**; `Astro.site` in `Seo.astro` builds canonical and `og:image` absolute URLs.
- **Global SEO placeholders:** `src/components/fundations/head/Seo.astro` — replace demo title/description/canonical/OG/Twitter with real values or wire per-page props if you extend the pattern.
- **Brand (colors, type, shadows):** colours in `src/styles/colors.css` (`--color-background`, `--color-foreground`, `--color-primary`, ...); fonts, display sizes and the button shadows in the `src/styles/global.css` `@theme` block.
- **Gradient shader:** `src/components/assets/GradientShader.astro` reads the colour tokens, so a rebrand in `colors.css` recolours it. It has three shapes (default arch from the top, `flip` from the bottom, `band` across the middle), each with a CSS fallback in `global.css` (`.arch-gradient`, `.arch-gradient-flip`, `.band-gradient`). Pages with a gradient hero pass `navTone="dark"` to `BaseLayout`.
- **Grid:** `src/components/fundations/containers/grid.ts` holds the 12-column split (3 side, 9 main) used by the navigation, heroes and `LabeledGrid`.
- **Shell:** `src/layouts/BaseLayout.astro` imports `global.css`, `BaseHead`, `Navigation`, `Footer`, `SmoothScroll`; supports `hideNav`, `hideFooter` and `navTone`.
- **System pages:** `src/pages/system/*` render components from `src/components/system/` (`Header`, `Row`, `ButtonRows`, `Overview`, `Colors`, `Typography`, `Buttons`, `Links`).
- **Head chunk:** `src/components/fundations/head/BaseHead.astro` composes Seo, Meta, Fonts, Favicons.

## Git commits

When the user asks to commit (or uses **`/git-commit`**), create **Conventional Commits**:

1. Inspect `git status`, then `git diff --staged` (or `git diff` if nothing staged).
2. Stage only relevant files; never commit secrets (`.env`, credentials, keys).
3. **Bump semver** in `package.json` (`version`, currently `MAJOR.MINOR.PATCH`) on every commit, then run `npm install` so `package-lock.json` stays in sync. Use [SemVer](https://semver.org/) from the staged changes and commit type:
   - **MAJOR** — `BREAKING CHANGE` in the body/footer, or a commit type/scope suffix `!` (breaking API or behaviour).
   - **MINOR** — `feat` (new user-facing capability, section, integration, or notable product copy).
   - **PATCH** — everything else that ships (`fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `build`, `ci`, dependency bumps, content tweaks).
   When a commit mixes types, use the **highest** applicable bump.
4. Write `type[scope]: description` in imperative mood (`feat`, `fix`, `docs`, `chore`, etc.).
5. Commit with a HEREDOC for multi-line bodies when needed; include the version bump in the same commit (stage `package.json` and `package-lock.json`).
6. Do not amend, skip hooks, or force-push `main` unless the user explicitly asks.

Follow the full workflow in the agent skill **git-commit** (Conventional Commits spec, breaking-change footers, safety rules).

## Release

When the user sends **`release`** in chat (or asks to release), run this end-to-end workflow:

1. **Bump semver** in `package.json` using the rules in **Git commits** (step 3). If there are uncommitted changes, choose the bump from the full diff; if the tree is already clean, bump **PATCH** unless the user specifies otherwise.
2. **Create one or more commits** — stage all intended changes (including `package.json` and `package-lock.json` after `npm install`), split into logical Conventional Commits when the diff is large, and **include the version bump in the final commit** of the release (or a dedicated `chore(release): vX.Y.Z` commit if that is clearer).
3. **Push to `main`** — `git push origin main` (or `git push -u origin HEAD` when upstream is missing). Warn before any force-push; do not force-push `main` unless the user explicitly asks.

Do not release with unstaged secrets (`.env`, credentials). Verify `git status` is clean after push.

## Commands

From `README.md` (Node.js 22.12+, npm):

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server |
| `npm run build` | Production build → `./dist/` |
| `npm run preview` | Preview production build |
| `npm run astro ...` | Astro CLI |

## Guardrails

- **Do not rename** `src/components/fundations/` (`fundations` spelling is intentional and referenced across imports).
- **Schemas:** Changing Zod fields in `src/content.config.ts` requires updating every layout/page that reads `entry.data` and existing Markdown.
- Prefer **minimal diffs** and patterns already used in sibling files.
- **Dependencies:** only add what you truly need; don’t assume packages exist beyond `package.json`.

## Lexington Themes links (from README)

- Theme: https://lexingtonthemes.com/templates/navy  
- Documentation: https://lexingtonthemes.com/documentation  
- Changelog: https://lexingtonthemes.com/changelog/navy  
- Support: https://lexingtonthemes.com/legal/support/  

## Learned User Preferences

- When dependencies change, keep the Tech stack table and Node requirement in AGENTS.md aligned with `package.json` and `README.md`.
- Bump npm dependencies to the latest versions when asked; pin or add `overrides` only when install or build hits peer conflicts.
- Temporarily hide nav chrome with a flag instead of deleting markup (`navMinimal` on `BaseLayout` / `minimal` on `Navigation.astro`, which toggles `showMenu`).
- Landing/marketing copy for Livestack is in Spanish; keep Navy emphasis patterns (`<em>` on key words).
- SEO title, description, and absolute OG/Twitter URLs must use the `site` value in `astro.config.mjs` (`https://withlivestack.com`), not template or stray domain placeholders.

## Learned Workspace Facts

- This repo rebrands the Lexington **Navy** Astro template for **Livestack** (`livestack-site`).
- Brand logo asset: `src/images/brand/livestack-logo.png`, rendered via `src/components/assets/Logo.astro` with `tone` (`adaptive` | `light` | `dark`) and default nav height `h-10`.
- Home uses the full nav (`navMinimal` default); set `navMinimal` on `BaseLayout` for logo-only chrome (e.g. `404.astro`). Spanish nav links and the Conversemos CTA live in `Navigation.astro`.
- Public routes at launch: `/`, `/conversemos`, and `/404`; other Navy template pages sit under `src/pages/_disabled/` (underscore-prefixed, not routed).
- Contact page is `/conversemos` via `src/components/forms/Conversemos.astro`, not the disabled template `/forms/contact` route.
- Spanish Livestack hero copy and CTA live in `src/components/landing/Hero.astro`; the outcomes band copy and stat cards are in `src/components/landing/Logos.astro` (`showQuoteCards = false` hides quote cards for now).
- Share metadata uses `public/og-image.jpg` (from hero `GradientShader` capture) plus favicon/manifest assets in `public/`.
