# danieldiab.github.io

Personal portfolio of Daniel Diab, built with Next.js (static export) and deployed to GitHub Pages.

**Live:** https://danieldiab.github.io

## What's in it

- **Brutalist, industrial design:** flat fields of post red, ink, mustard, bone and maroon, TikTok Sans stretched wide. See `DESIGN.md`.
- **Hero:** the name runs edge to edge as one giant moving line over a portrait; the letters turn mustard as they cross it.
- **What I do:** a working command list. Typing filters it with an in-browser hybrid retriever (input guardrail, BM25, concept vectors, reciprocal rank fusion), the same pattern as SenecaReader. `⌘K` jumps to it.
- **Work wall** linking to case studies at `/work/[slug]/`, generated from `lib/content.ts`.
- **GitHub section** fetched from the GitHub API at build time. Coursework repos are hidden by the pattern in `lib/github.ts`.

## Replace pictures

Photos and screenshots live in `public/img/`. Projects without screenshots use drawings from `components/Stills.tsx`; add an `image` (and optional `gallery`) to the project in `lib/content.ts` to replace one.

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
