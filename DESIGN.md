# Design notes

Direction: **Loud and flat** (tasteskill v2, seed 291383188), set for a brutalist, industrial brief.

**The idea.** The home page has two chapters. First, an about page: name, portrait, talks and workshops,
the IEEE Computer Society Uniandes chapter Daniel leads, experience and every certification with its ID
and verification link. Then the exhibition room: every project is a monitor on a
concrete plinth (Three.js). Hover lifts a monitor, click opens its panel. A dock of four sections (Work,
What I do, About, Contact) opens panels over the room, and the URL hash names the open panel, so
/#charter or /#about open straight to it. Case-study pages at /work/[slug]/ keep the full story for
sharing and search. Photos and screenshots always show at their natural aspect ratio, never cropped.

## Colour

A Japandi / Edo palette chosen by Daniel: named Japanese colours, flat fields edge to edge, no gradients, shadows or hairlines.

| Token  | Hex       | Name                 | Where                                        |
|--------|-----------|----------------------|----------------------------------------------|
| indigo | `#2d4351` | ai-iro               | hero, contact, footer; selected command row  |
| ink    | `#1b1b1b` | sumi-iro             | work; text                                   |
| gold   | `#cda247` | yamabuki             | the button, proof band, letters over the photo |
| brown  | `#362a20` | kogecha              | about                                        |
| bone   | `#e1d8c9` | kinari               | what I do, case-study body                   |
| white  | `#f6f3ec` | gofun                | text on dark fields                          |

## Type

One family: **TikTok Sans** (variable). Display is weight 800 at `font-stretch: 150%`, uppercase,
leading 0.88. Text is normal width, 16–19px. JetBrains Mono appears only inside `<code>`.
Six sizes: 16 / 19 / 26 / 76 / 130 px, plus the 216px hero line.

## Motion

- Signature: the room leans toward the cursor and sways slowly; hovered monitors lift and turn.
- Panels slide in from the right; with a panel open the room recentres in the space left.
- Case-study sections enter part by part, once.
- Everything stops under `prefers-reduced-motion`.

## Pictures

All photographs and screenshots are Daniel's own (`public/img/`), shown as taken with no filters.
PACO images come from his Behance project. Projects without screenshots (the agent platform,
freelance work, OptiCloud) use flat drawings in `components/Stills.tsx` until real ones exist.

## Rules for future edits

No eyebrow labels, no 01/02/03 except real sequences, no gradients, no shadows at rest, no thin rules,
headlines two lines or fewer at every width. Check with the taste-skill `lint.mjs` and `inspect.mjs`.
