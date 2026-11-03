# Design notes

Direction: **Loud and flat** (tasteskill v2, seed 291383188), set for a brutalist, industrial brief.

**The idea.** Daniel's real work (raw documents in, structured answers out) runs the page. His name runs
across the first screen as one giant moving line over his portrait, and "What I do" is a working search
box that filters his capabilities.

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

- Signature: the name line runs at a constant 40px/s; a mustard copy is clipped to the portrait.
- The proof band moves only with the scroll.
- Sections enter part by part (heading, text, pictures), 70–90ms apart, once.
- Pictures open from a mask; the hero portrait drifts slowly.
- Everything stops under `prefers-reduced-motion`.

## Pictures

All photographs and screenshots are Daniel's own (`public/img/`), shown as taken with no filters.
PACO images come from his Behance project. Projects without screenshots (the agent platform,
freelance work, OptiCloud) use flat drawings in `components/Stills.tsx` until real ones exist.

## Rules for future edits

No eyebrow labels, no 01/02/03 except real sequences, no gradients, no shadows at rest, no thin rules,
headlines two lines or fewer at every width. Check with the taste-skill `lint.mjs` and `inspect.mjs`.
