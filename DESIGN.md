# Design notes

Direction: **Loud and flat** (tasteskill v2, seed 291383188), set for a brutalist, industrial brief.

**The idea.** Daniel's real work (raw documents in, structured answers out) runs the page. His name runs
across the first screen as one giant moving line over his portrait, and "What I do" is a working search
box that filters his capabilities with the same hybrid retrieval SenecaReader uses.

## Colour

Flat fields meet edge to edge: no gradients, shadows or hairlines.

| Token     | Hex       | Where                                      |
|-----------|-----------|--------------------------------------------|
| red       | `#dc1928` | hero, contact, footer (opens and closes)   |
| ink       | `#2a1110` | work                                       |
| mustard   | `#e0a912` | proof band; letters crossing the portrait  |
| bone      | `#e2dccf` | what I do, case-study body                 |
| maroon    | `#952625` | about                                      |
| slate     | `#4a6f84` | the button and the selected command row    |

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

All photographs and screenshots are Daniel's own (`public/img/`). About photos share one treatment:
greyscale multiplied over a rotating palette tint. Projects without screenshots (SenecaReader, the agent
platform, freelance work, OptiCloud) use flat drawings in `components/Stills.tsx` until real ones exist.

## Rules for future edits

No eyebrow labels, no 01/02/03 except real sequences, no gradients, no shadows at rest, no thin rules,
headlines two lines or fewer at every width. Check with the taste-skill `lint.mjs` and `inspect.mjs`.
