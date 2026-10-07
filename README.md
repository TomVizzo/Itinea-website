# Itinea Viajes

Static, mobile-first landing page for Itinea Viajes. This repository is intentionally frontend-only: the contact actions lead to the verified Instagram profile, and the site has no store, backend, booking form, analytics, or third-party runtime dependency.

## Run locally

From this directory, start a static server:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Before production

- Replace the concept image at `images/patagonia-tulips.webp` with a photo approved by Itinea. The image is generated for this visual proposal and is not documentary photography of a specific trip.
- Set the production domain and add canonical URL plus absolute `og:url` and `og:image` metadata once the domain is known.
- Confirm the exact permitted wording around `Legajo N.º 21064` before making legal or licensing claims.
- Confirm all final copy and imagery with the client.

## Project-local Codex skills

The `.agents/skills` folder contains project-local skills for frontend design, web-interface review, copy editing, conversion optimization, and optional scroll-led storytelling. See `AGENTS.md` for when each should be used. The Vercel `web-design-guidelines` retrieval instruction is adapted to the `web__run` tool available in Codex.
