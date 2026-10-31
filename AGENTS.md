# AGENTS.md

Single-page marketing site (Indonesian) for a home-care service in Yogyakarta. Vite + React 19 + react-router-dom 7 + Tailwind CSS 4, plain JSX (no TypeScript), shadcn-style components.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # production build to dist/
npm run preview  # serve dist/
```

There are no test, lint, typecheck, or format scripts and no test files. Verify changes with `npm run build` and by checking the page in a browser. Do not invent test commands.

## Content lives in one file

All copy, prices, services, testimonials, nav links, WhatsApp number/message, address, hours, and map embed are in `src/data/site.js`. Components import from it. Change contact/price data there, never inline in a component. Always build WhatsApp URLs with `waLink()` (links use `target="_blank" rel="noreferrer"`).

## Structure

- `src/main.jsx` → `BrowserRouter` + `App`.
- `src/App.jsx` → Navbar, routes, Footer, floating WhatsApp button; `*` redirects to `/`.
- `src/pages/Home.jsx` composes the sections: Hero, Services, Satisfaction, Contact.
- Each section component owns one `<section id="...">`. Those ids (`#beranda`, `#layanan`, `#kepuasan`, `#kontak`) must stay in sync with `navLinks` in `site.js`.
- There is no backend, API, or env var. Site is fully static.

## UI conventions

- `@` alias points to `src` (`vite.config.js`); existing primitives use `@/lib/utils`, project-relative imports use `../`.
- `src/components/ui/*.jsx` are shadcn primitives; `src/components/ui.jsx` holds shared helpers (`container` class, `SectionHeading`, `WhatsAppIcon`). Reuse these instead of new wrappers. `components.json` has `tsx: false` — add `.jsx`, not `.tsx`.
- Tailwind v4 is CSS-first: no `tailwind.config.js`. Theme tokens (`--color-primary`, radii, font) are defined in `@theme` in `src/index.css`. Edit tokens there; never add a JS Tailwind config.
- Styling in practice is sky/slate utility classes plus occasional semantic tokens; match the surrounding component rather than restyling.
- Motion utilities and `prefers-reduced-motion` overrides live in `src/index.css`; keep reduced-motion behavior when adding animation.

## Content and accessibility rules to preserve

- User-facing text is Indonesian, tone informal "Anda"; `index.html` has `lang="id"`, title, and meta description that should stay accurate.
- Sections use `scroll-mt-24` so fixed-navbar anchors land correctly.
- Decorative icons get `aria-hidden="true"`, images need real `alt` text, interactive icon-only links need `aria-label`. Keep the skip link (`#konten`) in `App.jsx`.

## Assets

Images are static files in `public/images/` referenced by absolute path (`/images/...`); `dist/` is build output — never edit it by hand, regenerate with `npm run build`.
