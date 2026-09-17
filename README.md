# Kings Theatre Web Experience

A static, interactive front-end styled as a vintage King’s Theatre ticket and cinema experience. The site combines period-inspired typography, ticket stubs, paper and book animations, advertisements, sound effects, show listings, a concessions menu, and a client-side seat-selection form.

## Pages

- `index.html` — the home ticket with theatre information, advertisements, and navigation stubs.
- `shows.html` — a static table of shows, dates, and venues.
- `shop.html` — clickable concessions with a client-side running total.
- `ticket.html` — name/show fields, generated seats, random occupied seats, and a `$5` per-selected-seat total.
- `about.html` — visual references and design credit.

## Interaction model

`script.js` loads page fragments into the current `<page>` element when a ticket stub is opened. It also controls the cut/page sound effects, optional background music, ticket-signing animation, seat generation and selection, and shop totals. `style.css` provides the custom layout, fonts, transitions, book/ticket animations, theatre seats, and responsive image layout.

The ticket fields, seat choices, signing state, and shop total are browser-only state. There is no checkout endpoint, reservation persistence, authentication, or server-side validation.

## Run locally

This is a static site and has no build step or package manager. Serve the repository with a static HTTP server so relative pages, media, and dynamically fetched HTML load correctly:

```bash
python -m http.server 8000
```

Open <http://localhost:8000/>.

## Assets

The `content/` directory contains banners, images, reference material, and sounds. Local font files are included at the repository root. The page also links to external reference and author URLs.

## Status

This project is a front-end/demo experience, not a production ticketing system. No automated tests, CI workflow, package manifest, backend, or license file was found in the inspected repository.
