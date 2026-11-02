"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { buildDocs, createIndex, type Trace } from "@/lib/search";

const SUGGESTIONS = [
  "What have you built with LangGraph?",
  "Can you automate my sales follow-ups?",
  "How do you keep LLM costs down?",
  "Where are you based?",
  "¿Trabajas con documentos PDF?",
];

export function openAsk(q?: string) {
  window.dispatchEvent(new CustomEvent("ask:open", { detail: q ?? "" }));
}

export function AskButton({ className = "icon-btn", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => openAsk()} aria-haspopup="dialog">
      {children ?? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <span className="ask-label">Ask my portfolio</span>
          <span className="kbd">⌘K</span>
        </>
      )}
    </button>
  );
}

export default function AskPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [trace, setTrace] = useState<Trace | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const search = useMemo(() => createIndex(buildDocs()), []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      lastFocus.current = document.activeElement as HTMLElement;
      const preset = (e as CustomEvent<string>).detail;
      setOpen(true);
      if (preset) { setQ(preset); setTrace(search(preset)); }
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => { if (!o) lastFocus.current = document.activeElement as HTMLElement; return !o; }); }
    };
    window.addEventListener("ask:open", onOpen);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("ask:open", onOpen); window.removeEventListener("keydown", onKey); };
  }, [search]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => input.current?.focus(), 10);
    } else {
      document.body.style.overflow = "";
      lastFocus.current?.focus?.();
    }
  }, [open]);

  const close = () => setOpen(false);
  const run = (value: string) => { setQ(value); setTrace(value.trim() ? search(value) : null); };

  if (!open) return null;

  const top = trace?.fused[0];
  const maxK = trace?.keyword[0]?.score || 1;

  return (
    <div className="ask-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="ask" role="dialog" aria-modal="true" aria-label="Ask my portfolio" onKeyDown={(e) => { if (e.key === "Escape") close(); }}>
        <form className="ask-top" onSubmit={(e) => { e.preventDefault(); if (top) { router.push(top.doc.href); close(); } }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ color: "var(--accent)" }}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <label htmlFor="ask-input" className="skip">Question</label>
          <input id="ask-input" ref={input} value={q} onChange={(e) => run(e.target.value)} placeholder="Ask about my work, services or background…" autoComplete="off" spellCheck={false} />
          <button type="button" className="kbd" onClick={close} aria-label="Close" style={{ cursor: "pointer" }}>esc</button>
        </form>

        <div className="ask-body" aria-live="polite">
          {!trace && (
            <>
              <p className="muted">This runs the same retrieval pattern as SenecaReader, in your browser: an input guardrail, keyword search, concept search, and a fused ranking. No model, no API.</p>
              <div className="suggest">
                {SUGGESTIONS.map((s) => <button key={s} type="button" onClick={() => run(s)}>{s}</button>)}
              </div>
            </>
          )}

          {trace?.blocked === "injection" && (
            <div className="answer refuse"><p><b>Input guardrail stopped that.</b> It reads like an instruction to change how this search behaves. Ask about Daniel&apos;s projects, services or background instead.</p></div>
          )}
          {trace?.blocked === "off-topic" && (
            <div className="answer refuse"><p><b>Nothing in this portfolio covers that, so I won&apos;t guess.</b> Try asking about projects, AI agents, automation, costs, or where Daniel is based.</p></div>
          )}

          {trace && !trace.blocked && top && (
            <>
              <div className="answer">
                <p className="label" style={{ marginBottom: 8 }}>Best match · {top.doc.title}</p>
                <p>{top.doc.answer}</p>
              </div>
              <div className="hits">
                {trace.fused.map((h) => (
                  <Link key={h.doc.id} href={h.doc.href} className="hit" onClick={close}>
                    <span><b>{h.doc.title}</b> <span className="mono">· {h.doc.kind}</span></span>
                    <span className="mono">rrf {h.score.toFixed(4)} →</span>
                  </Link>
                ))}
              </div>
            </>
          )}

          {trace && trace.blocked !== "empty" && (
            <details className="trace" open>
              <summary><span>retrieval trace</span><span>{trace.ms.toFixed(1)} ms</span></summary>
              <div className="trace-row g"><span>guardrail</span><span>{trace.blocked === "injection" ? "input · blocked: instruction pattern" : "input · passed"}</span></div>
              <div className="trace-row"><span>concepts</span><span>{trace.concepts.length ? trace.concepts.join(", ") : "none matched"}</span></div>
              <div className="trace-row"><span>keyword</span><span>{trace.keyword.length ? trace.keyword.slice(0, 3).map((h) => (
                <span key={h.doc.id} style={{ display: "block" }}><span className="bar" style={{ width: Math.max(6, (h.score / maxK) * 60) }} />{h.doc.title} <span className="muted">bm25 {h.score.toFixed(2)}</span></span>
              )) : "no hits"}</span></div>
              <div className="trace-row"><span>concept</span><span>{trace.concept.length ? trace.concept.slice(0, 3).map((h) => (
                <span key={h.doc.id} style={{ display: "block" }}><span className="bar" style={{ width: Math.max(6, h.score * 60) }} />{h.doc.title} <span className="muted">cos {h.score.toFixed(2)}</span></span>
              )) : "no hits"}</span></div>
              <div className="trace-row g"><span>guardrail</span><span>{trace.blocked === "off-topic" ? "output · refused: no grounded source" : trace.blocked ? "output · skipped" : "output · answer taken from a source document"}</span></div>
            </details>
          )}
        </div>

        <div className="ask-foot">
          <span>Enter opens the best match</span>
          <span>BM25 + concept vectors + reciprocal rank fusion</span>
        </div>
      </div>
    </div>
  );
}
