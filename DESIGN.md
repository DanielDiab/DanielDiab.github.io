# Design notes

Subject: Daniel builds retrieval and agent systems over messy institutional documents.
Audience: recruiters and technical leads first, small-business owners second.
The page's job: prove he ships systems that hold up, and make it easy to get in touch.

## The one bold thing

The hero canvas: the cursor is a query and its top-k chunks connect. It is the only ambient motion on the site.
The ⌘K search is the second memorable moment, and it only moves when someone opens it.
Everything else stays quiet: no card grids, no decorative numbering, no entrance animations.

## Color

One OKLCH hue (`--h`, default 268) generates every token, so the hue dial can regenerate the palette live.
Approximate hex at the default hue:

| Token    | Light     | Role                                   |
|----------|-----------|----------------------------------------|
| bg       | #f6f6fb   | page                                   |
| ink      | #191b2b   | text                                   |
| muted    | #5f6276   | secondary text                         |
| line     | #d9dae6   | rules between rows                     |
| accent   | #4a3fe0   | links, the query marker, focus         |

The accent never colors a single word in a headline. It marks things you can act on and things the retriever selected.

## Type

Two families, clearly distinct:
- **Bricolage Grotesque** for everything people read. Its optical-size axis lets the same family run from 96px headlines (tight, opsz 96) to 18px body (opsz 14).
- **JetBrains Mono** only where the content is code: tool names, retrieval traces, repo names, scores. Never for labels.

Scale (Elements of Typographic Style): 14 · 18 · 21 · 24 · 36 · 48 · 72 · 96 px.
Sentence case everywhere. No uppercase tracked eyebrows. Body lines stay under 70 characters.

## Layout

Left-aligned, two columns. The section heading itself sits in a sticky left column, so there is no separate label above it.

```
| Work                  | SenecaReader                        2026 |
| Systems people use,   | Agentic RAG platform, Uniandes           |
| and the decisions     | Turns decades of Council minutes…        |
| behind them.          | In daily use · Python, LangGraph         |
|                       |------------------------------------------|
| (sticky)              | Connected agent platform            2026 |
```

Results and numbers live inside the work rows they belong to, not in a separate stat strip.
Rules (hairlines) separate rows; borders and fills are reserved for the one callout per case study and the search dialog.

## Rules for future edits

- Numbers only mark real sequences (the SenecaReader pipeline).
- No arrows appended to link text; links are underlined or the whole row is the target.
- Motion answers a user action, except the hero canvas.
