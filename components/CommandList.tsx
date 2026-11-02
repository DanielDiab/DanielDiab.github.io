"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { capabilities } from "@/lib/content";
import { buildCapabilityDocs, createIndex, type Trace } from "@/lib/search";

// What I do, set as a command menu. Typing runs a small hybrid retriever:
// input guardrail, BM25 keyword search, concept search, reciprocal rank fusion. No API.
export default function CommandList() {
  const search = useMemo(() => createIndex(buildCapabilityDocs()), []);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(capabilities[0].key);
  const input = useRef<HTMLInputElement>(null);

  const trace: Trace | null = q.trim() ? search(q) : null;
  const rows = !trace ? capabilities : trace.blocked ? [] : trace.fused.map((h) => capabilities.find((c) => c.key === h.doc.id)!).filter(Boolean);
  const current = rows.find((r) => r.key === sel) ?? rows[0];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        input.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        input.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const move = (d: number) => {
    if (!rows.length) return;
    const i = Math.max(0, rows.findIndex((r) => r.key === current?.key));
    const n = rows[(i + d + rows.length) % rows.length];
    setSel(n.key);
    document.getElementById(`cmd-${n.key}`)?.focus();
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (/^[a-z]$/i.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const hit = rows.find((r) => r.key === e.key.toUpperCase());
      if (hit) { setSel(hit.key); document.getElementById(`cmd-${hit.key}`)?.focus(); }
    }
  };

  return (
    <div data-ui>
      <label htmlFor="cmd-input" className="sr">Search what I do</label>
      <input
        id="cmd-input" ref={input} className="cmd-input" type="search" autoComplete="off" spellCheck={false}
        placeholder="Search what I do"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); move(rows[0]?.key === current?.key ? 0 : 1); document.getElementById(`cmd-${current?.key}`)?.focus(); } }}
        aria-controls="cmd-list"
      />
      <div className="cmd-list" id="cmd-list" role="listbox" aria-label="What I do" onKeyDown={onListKey}>
        {rows.map((c) => {
          const on = c.key === current?.key;
          return (
            <div key={c.key}>
              <button
                id={`cmd-${c.key}`} type="button" role="option" aria-selected={on} className="cmd-row"
                tabIndex={on ? 0 : -1}
                onMouseEnter={() => setSel(c.key)} onFocus={() => setSel(c.key)} onClick={() => setSel(c.key)}
              >
                <span className="cmd-row-top">
                  <span className="cmd-name">{c.name}</span>
                  <span className="keycap" aria-hidden="true">{c.key}</span>
                </span>
                {on && (
                  <span className="cmd-detail">
                    <span>{c.body}</span>
                  </span>
                )}
              </button>
              {on && (
                <p className="cmd-detail" style={{ padding: "0 14px 14px 24px", marginTop: 0, background: "var(--slate)", color: "var(--white)" }}>
                  <span>Done before: {c.proof}.</span>
                  <Link href={c.href} style={{ color: "var(--white)", fontWeight: 700 }}>Read the case study</Link>
                </p>
              )}
            </div>
          );
        })}
        {trace?.blocked === "injection" && <p className="cmd-empty" role="status">The input guardrail stopped that. It reads like an instruction, not a question. Try &ldquo;documents&rdquo; or &ldquo;sales&rdquo;.</p>}
        {trace?.blocked === "off-topic" && <p className="cmd-empty" role="status">Nothing I do matches that, so I won&apos;t pretend. Try &ldquo;PDF&rdquo;, &ldquo;AWS&rdquo; or &ldquo;costs&rdquo;.</p>}
      </div>
      <p className="cmd-trace" aria-live="polite">
        {trace && !trace.blocked
          ? <>Ranked in {trace.ms.toFixed(1)} ms: {trace.keyword.length} keyword hits, {trace.concept.length} concept hits{trace.concepts.length ? ` (${trace.concepts.join(", ")})` : ""}, fused by reciprocal rank. Runs in your browser.</>
          : <>Type anything, in English or Spanish. It filters with the kind of hybrid retrieval I build for clients, in your browser. <kbd>⌘K</kbd> jumps here.</>}
      </p>
    </div>
  );
}
