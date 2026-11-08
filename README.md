# danieldiab.github.io

Personal portfolio of Daniel Diab, built with Next.js (static export) and deployed to GitHub Pages.

**Live:** https://danieldiab.github.io

## What's in it

- **A guided home page in six chapters:** Intro, Skills, Community, Path, Work, Contact, with a header that
  shows where you are and how far along. See `DESIGN.md`.
- **A kinetic name:** TikTok Sans with its width and weight axes reacting to the pointer.
- **Skill map:** every skill points to the projects that prove it, in both directions.
- **IEEE Computer Society Uniandes, told as a sequence:** steps scroll past a pinned photo frame.
- **What I do:** a working command list. Typing filters it with an in-browser hybrid retriever (input guardrail, BM25, concept vectors, reciprocal rank fusion). `⌘K` jumps to it.
- **Exhibition room:** a Three.js room where each project is a monitor on a plinth; click one to open its panel.
- **Case studies** at `/work/[slug]/`, generated from `lib/content.ts`.
- **GitHub section** in the Work panel, fetched from the GitHub API at build time. Coursework repos are hidden by the pattern in `lib/github.ts`.

## Replace pictures

Photos and screenshots live in `public/img/`. Projects without screenshots use drawings from `components/Stills.tsx`; add an `image` (and optional `gallery`) to the project in `lib/content.ts` to replace one.

## Edit content

Everything the site says lives in `lib/content.ts`. The search index is built from the same file.
Which projects each skill points to is set in `skillGroups`; the Community story is `chapterStory`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `out/` to GitHub Pages. It also rebuilds weekly so the GitHub section stays current.
In the repo settings, **Pages → Source** must be set to **GitHub Actions**.
