# Design notes

Direction: **Loud and flat** (tasteskill v2, seed 291383188), set for a brutalist, industrial brief.

**The idea.** The first screen pairs the name, set huge, with a geometric panel of flat colour blocks.
Every block carries a real fact: the teaching photo, first place at IEEEXtreme, Charter's six MCP servers
behind one runtime, the 70-member chapter, the freelance results. "What I do" is a working search box
that filters Daniel's capabilities with in-browser hybrid retrieval.

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

- Signature: on load the name rises out of a mask and the hero blocks wipe open one after another.
- Shapes in the hero drift slightly toward the cursor; the dashed ring turns; the agent graph pulses.
- The proof band moves only with the scroll.
- Sections enter part by part (heading, text, pictures), 70–90ms apart, once.
- Everything stops under `prefers-reduced-motion`.

## Pictures

All photographs and screenshots are Daniel's own (`public/img/`), shown as taken with no filters.
PACO images come from his Behance project. Projects without screenshots (the agent platform,
freelance work, OptiCloud) use flat drawings in `components/Stills.tsx` until real ones exist.

## Rules for future edits

No eyebrow labels, no 01/02/03 except real sequences, no gradients, no shadows at rest, no thin rules,
headlines two lines or fewer at every width. Check with the taste-skill `lint.mjs` and `inspect.mjs`.
