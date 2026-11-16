# Livestack (`@livestack/site`)

![Theme preview](https://lexingtonthemes.com/OpenGraph/navy/twitter.png)


## Links
- **Theme specs:** https://lexingtonthemes.com/templates/navy  
- **Documentation:** https://lexingtonthemes.com/documentation  
- **Changelog:** https://lexingtonthemes.com/changelog/navy  
- **Support:** https://lexingtonthemes.com/legal/support/  
- **Get the bundle:** https://lexingtonthemes.com  

## Requirements
- Node.js 22.12 or newer (required by Astro 7)
- npm

## Environment variables

Copy `.env.example` to `.env` and set `FORMGONG_ACCESS_KEY` (FormGong dashboard). Required for `npm run dev` and `npm run build` so `/conversemos` can submit the contact form. Set the same variable in your deploy environment (e.g. CI secrets).

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Install dependencies                             |
| `npm run dev`          | Start local dev server                           |
| `npm run build`        | Build production site to `./dist/`               |
| `npm run preview`     | Preview the production build locally             |
| `npm run astro ...`    | Run Astro CLI commands                           |
| `npm run astro --help` | Get help using the Astro CLI                     |
