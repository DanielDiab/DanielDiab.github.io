# Design notes

Direction: **Loud and flat** (tasteskill v2, seed 291383188), set for a brutalist, industrial brief.

**The idea.** The home page is a guided tour in six chapters, numbered because they are a real
sequence, with a fixed header that names the chapter you're in and a gold bar for how far along you are.

1. **Intro.** The name fills the screen in TikTok Sans with its width and weight axes live: letters near the
   pointer condense and darken, and without a pointer a slow wave runs through them. The portrait sits
   inside the second line. One sentence with a rotating ending, four proof figures, a scroll cue.
2. **Skills.** A scroll-driven marquee of every skill, then the skill map: each skill points to the projects
   that prove it. Point at a skill and those projects light up; point at a project and its skills light up.
   Until someone touches it, the map walks through a few skills by itself. Below it, the searchable
   "What I do" list and the live agent trace.
3. **Community.** IEEE Computer Society Uniandes: the figures, then the story as a sequence. Steps scroll past
   a pinned frame and each one wipes in its photo. Then the talks and events.
4. **Path.** Experience as a timeline whose bar fills as you scroll, education beside it, and every
   certification in tabs by issuer, with IDs and verification links.
5. **Work.** A gold band leads into the exhibition room (Three.js): five projects, each a monitor on a
   plinth. Hover lifts a monitor, click opens its panel. The dock (Work, What I do, About, Contact) only
   appears inside the room. The URL hash names the open panel, so /#charter opens straight to it.
6. **Contact.** The question, the address as one large link, copy and profile buttons.

A short curtain plays once per visit (a counter to 100, then it lifts). On mouse and trackpad a gold ring
trails the pointer and says "Open" over monitors and "View" over project cards. Case-study pages at
/work/[slug]/ keep the full story for sharing and search.

**Projects on display.** Five: Kith, Charter, CHRO/MATIC, Stochastic and PACO. The Uniandes agent platform is parked
(`parkedProjects` in `lib/content.ts`) until its contract allows screenshots and figures; the role stays in the timeline.
OptiCloud (a course project) and the freelance work (a job, not a project) were taken off the wall; the
freelance results live in the Experience timeline.

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

- Signatures: the breathing name, and the room that leans toward the cursor while hovered monitors lift.
- Scroll drives the name apart as you leave the intro, the marquee rows, the timeline bar and the Work band
  (`components/fx/ScrollFX.tsx` writes each `[data-progress]` element's progress into `--p`).
- Headings rise word by word out of a mask; blocks rise or slide in once.
- Panels slide in from the right; with a panel open the room recentres in the space left.
- Everything stops under `prefers-reduced-motion`: no curtain, no cursor, no scroll effects, all content shown.

## Pictures

All photographs and screenshots are Daniel's own (`public/img/`), shown as taken with no filters.
The one deliberate crop is the portrait inside the name.
PACO images come from his Behance project. Projects without screenshots (the agent platform,
freelance work, OptiCloud) use flat drawings in `components/Stills.tsx` until real ones exist.

## Rules for future edits

No 01/02/03 except real sequences (the chapters are one), no gradients, no shadows at rest,
display headlines two lines or fewer at desktop widths. Chapter layouts and motion live in `app/experience.css`. Check with the taste-skill `lint.mjs` and `inspect.mjs`.
