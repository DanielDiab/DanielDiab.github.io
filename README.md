# danieldiab.github.io

Personal portfolio of Daniel Diab, built with Next.js (static export) and deployed to GitHub Pages.

**Live:** https://danieldiab.github.io

## What's in it

- **Ask my portfolio (⌘K):** a hybrid retriever that runs in the browser: input guardrail, BM25 keyword search, concept-vector search and reciprocal rank fusion. Same pattern as SenecaReader, with no model and no API.
- **One-hue OKLCH design system:** every color derives from `--h`. The hue dial in the nav regenerates the palette live.
- **Embedding-field hero:** a canvas where the cursor acts as the query and its top-k nearest chunks connect.
- **Case studies** at `/work/[slug]/`, generated from `lib/content.ts`.
- **GitHub section** fetched from the GitHub API at build time. Coursework repos are hidden by the pattern in `lib/github.ts`.

## Edit content

Everything the site says lives in `lib/content.ts`. The search index is built from the same file.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `out/` to GitHub Pages. It also rebuilds weekly so the GitHub section stays current.
In the repo settings, **Pages → Source** must be set to **GitHub Actions**.
