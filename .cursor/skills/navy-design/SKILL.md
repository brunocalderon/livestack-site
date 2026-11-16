---
name: navy-design
description: Navy's design system - typography, color, grid, components and the gradient shader. Use whenever creating or modifying UI in this theme (new pages, sections, components) so the result matches Navy's visual language.
---

# Navy design system

Navy is an uptime monitoring theme with a calm engineering-brochure voice: a
light lavender-white ground, deep indigo ink, one ultramarine accent and a
grainy navy gradient shader that hangs over the heroes. Layouts sit on a
12-column grid with a side label column. New UI must be indistinguishable
from the existing pages.

## Design personality

- Light and quiet: large regular-weight headings, plenty of air (`py-24`
  sections), colour used in blocks rather than sprinkled.
- One signature effect: the `GradientShader`. Everything else is flat.
- Square everything except buttons and inputs.
- No icons as decoration, no shapes, no widgets, no badges. Labels are text.

## Typography

One family, **Switzer** from Fontshare (loaded in
`src/components/fundations/head/Fonts.astro`), set as `--font-sans` in
`src/styles/global.css`. No monospace anywhere. Never introduce another font.

Always use the `Text` component (`@/components/fundations/elements/Text.astro`)
with its tags (`a`, `p`, `em`, `span`, `small`, `strong`, `blockquote`, `h1`
to `h6`). Any other element (`div`, `dt`, `dd`, `li`, `figcaption`) is the
plain tag with classes. Variants: `displayXS` to `display6XL`, `textXS` to
`textXL`.

- Display variants are `font-normal`. Headings stay regular weight; key words
  go in `<em>`, which `global.css` sets to italic semibold on `h1` and `h2`:
  `Pricing that <em>grows</em> with your stack`.
- Hero title: `tag="h1" variant="displayLG"` with `tracking-tight
  text-balance`. Section heading: `tag="h2" variant="displayMD"`.
- Card titles: `textBase font-medium`; supporting copy `textSM
  text-muted-foreground` with `mt-1`.
- Small labels (tags, dates, kinds): `textXS uppercase text-muted-foreground`.
- Big numbers: `display3XL`, with units (`s`, `+`) in `text-primary`.
- `text-balance` on headings, `text-pretty` on paragraphs (on block tags; it
  does nothing on inline spans).

## Color system

Semantic tokens only, in oklch in `src/styles/colors.css`. `/system/colors`
shows every token. No raw palettes, no hex in markup.

- Ground and ink: `background` (lavender white), `foreground` (indigo ink),
  `muted-foreground`, `faint-foreground`.
- Fills and lines: `muted` (light panels, muted button, table stripes),
  `border` (every hairline), `input`.
- Accent: `primary` ultramarine with `primary-foreground`. The accent button,
  checks, uptime bars, focus rings and highlighted units. `primary-highlight`
  is the lit top of the accent button.
- Inverse: `inverse` navy with `inverse-foreground` white. Dark panels and the
  default button; `inverse-highlight` is the default button's lit top.
- Tints: `mist`, `lilac`, `frost`, for stat cards and quote panels, always
  with ink text.

Card rows cycle grounds in this order: `bg-inverse`, `bg-primary`,
`bg-lilac`, `bg-muted`. White text at `/75` for supporting copy on the two
dark grounds, ink and muted ink on the light ones.

## Grid and layout

- `Wrapper variant="standard"` (`max-w-340 mx-auto px-8`) is the only page
  container; `variant="prose"` styles markdown bodies.
- The site grid lives in `src/components/fundations/containers/grid.ts`:
  `grid` (`lg:grid-cols-12 lg:gap-x-8`), `sideCol` (3), `mainCol` (9),
  `mainStart` (`lg:col-start-4`). Content starts at column 4.
- `LabeledGrid` (`fundations/containers/LabeledGrid.astro`) opens most
  sections: `label="Network"` renders `/// Network` in the side column, the
  default slot fills the main column, and the `full` slot spans all twelve
  columns underneath (tables, card rows, image grids).
- Heroes never use the side label: their content sits on `mainCol mainStart`.
- Secondary labels (group names, dates, categories) go inside the main
  column, never in the side column.
- `<section>` only takes ground classes (`bg-*`, `relative`,
  `overflow-hidden`); spacing and layout go on the Wrapper or an inner div.
- No arbitrary values (`[...]`), no `text-right`, no `@apply`, no `mb-*`.

## Gradient shader

`src/components/assets/GradientShader.astro` is a WebGL canvas: a navy arch
with an ultramarine rim melting into lavender, slowly drifting, with film
grain. It bulges softly away from the mouse pointer (mouse only, off for
reduced motion) and only animates while on screen.

- Default: hangs from the top (gradient heroes, the auth panel, the 404).
- `flip`: rises from the bottom (the footer).
- `band`: a tilted wave across the middle that fades to the page at both
  edges (`landing/GradientBand.astro`, between sections, no content).

Always put the matching CSS fallback behind it: `.arch-gradient`,
`.arch-gradient-flip` or `.band-gradient` from `global.css`. Gradient heroes
follow one recipe:

```astro
<section class="relative overflow-hidden">
  <div aria-hidden="true" class="absolute inset-0 arch-gradient"></div>
  <GradientShader class="absolute inset-0 size-full" />
  <div data-nav-dark aria-hidden="true" class="absolute inset-x-0 top-0 h-120"></div>
  <Wrapper variant="standard" class="relative flex flex-col justify-center pt-32 pb-24 min-h-160">
    ...white h1 on mainCol mainStart...
  </Wrapper>
</section>
```

The page passes `navTone="dark"` to `BaseLayout`, and `data-nav-dark` marks
where the navigation turns transparent with white links.

## Components

- **Button** (`fundations/elements/Button.astro`): `default` (navy),
  `accent` (ultramarine), `muted` (light), `none`. Each has a subtle
  top-to-bottom gradient and a layered edge from the `shadow-button-*`
  tokens. Hover brightens. Focus is a soft `ring-3 ring-primary/30`, keyboard
  only. Sizes `xxs` to `xl`; `xxs` and `xs` are `rounded-md`, the rest
  `rounded-lg`. Width is per call site (`w-fit`, `w-full`). Only one accent
  button per group (the popular plan, the main call to action).
- **CtaPanel** (`fundations/containers/CtaPanel.astro`): every in-page call to
  action. Full width, heading and text on the left, actions on the right,
  `tone` `inverse`, `primary`, `lilac` or `muted`. No grid inside.
- **Card rows**: gapless, `flex flex-col p-6 gap-24 lg:gap-62` (see
  `landing/Industrias.astro`), a small uppercase tag on top, a `textBase
  font-medium` title and `textSM mt-1` text at the bottom.
- **Hairline grids**: parent `border-t border-l border-border`, each item
  `border-b border-r border-border`, so empty cells never show a fill.
- **Lists**: hairline rows (`py-5 border-b border-border`).
- **ArrowLink** for text links with a chevron; **Logo** for the uppercase
  wordmark.
- Inputs: `h-10 px-3 text-sm rounded-lg bg-background ring-1 ring-inset
  ring-border focus:ring-2 focus:ring-primary` (see `forms/Contact.astro`).
- Icons live in `fundations/icons/`; only the ones in use ship.
- **System pages** (`/system/*`) render `components/system/`. Add new
  tokens or variants there too.
- **Smooth scroll**: Lenis from `fundations/scripts/SmoothScroll.astro` in
  `BaseLayout` (off for reduced motion). Inner scroll areas get
  `data-lenis-prevent`.

## Corners, borders, shadows

- Radius only on buttons and inputs. Cards, panels, images and tables are
  square.
- Borders are 1px `border-border` hairlines.
- Shadows only on buttons (`shadow-button-*`).
- No dark mode.

## Voice and copy

Plain, confident product copy for engineers who hold the pager: "Teams that
sleep through the night", "The network behind every check". No jokes, no
exclamation marks, no emoji, no em dashes or middle dots. People get
Spanish, Nordic or Italian names. External links are `#_`, placeholder
emails end in `.test`.

## Quality check before finishing

1. Tokens, grid and spacing match a sibling section.
2. Headings use `Text` variants with `<em>` key words; buttons use `Button`.
3. Reads correctly at `sm`, `md` and `lg`.
4. No new dependencies, no unused imports or icons, minimal diff.
