"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Exhibition, { type Exhibit } from "./Exhibition";
import { STILLS, STILL_BG } from "./Stills";
import type { Project } from "@/lib/content";

// The home page as one screen: a top bar, the exhibition room, a dock of four sections at the
// bottom, and panels that slide in over the room. The hash names the open panel, so links like
// /#about or /#charter open straight to it.

type PanelId = "work" | "what-i-do" | "about" | "contact";
const DOCK: { id: PanelId; label: string }[] = [
  { id: "work", label: "Work" },
  { id: "what-i-do", label: "What I do" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function BogotaClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-GB", { timeZone: "America/Bogota", hour: "2-digit", minute: "2-digit" }));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return <time className="num" suppressHydrationWarning>{t || "--:--"}</time>;
}

function ProjectPanel({ p, i, total, go }: { p: Project; i: number; total: number; go: (d: number) => void }) {
  const Still = STILLS[p.slug];
  const shots = [...(p.image ? [p.image] : []), ...(p.gallery ?? [])];
  return (
    <article className="pp">
      <p className="pp-count num">{String(i + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}</p>
      <h2 className="display pp-name">{p.name}</h2>
      <p className="pp-kind">{p.kind}</p>
      <p className="pp-sum">{p.summary}</p>
      <dl className="pp-facts">
        <div><dt>Where</dt><dd>{p.context}</dd></div>
        <div><dt>When</dt><dd className="num">{p.period}</dd></div>
        <div><dt>Status</dt><dd>{p.status}</dd></div>
        {p.link && <div><dt>Link</dt><dd><a href={p.link.href}>{p.link.label}</a></dd></div>}
      </dl>
      <div className="pp-shots">
        {shots.length > 0
          ? shots.map((s) => (
              <figure key={s.src}>
                <img src={s.src} width={s.w} height={s.h} alt={s.alt} loading="lazy" />
                <figcaption>{s.alt}</figcaption>
              </figure>
            ))
          : Still && <figure className="pp-still" style={{ background: STILL_BG[p.slug] }}><Still /></figure>}
      </div>
      <h3 className="pp-h">The problem</h3>
      <p className="pp-text">{p.problem}</p>
      <h3 className="pp-h">What I built</h3>
      <ul className="pp-built">
        {p.built.map((b) => <li key={b.title}><b>{b.title}</b><span>{b.body}</span></li>)}
      </ul>
      {p.decision && (
        <div className="pp-call">
          <h3>{p.decision.title}</h3>
          <p>{p.decision.body}</p>
          {p.lesson && <p className="pp-lesson"><b>What I&apos;d change:</b> {p.lesson}</p>}
        </div>
      )}
      <h3 className="pp-h">Results</h3>
      <ul className="pp-results">{p.results.map((r) => <li key={r}>{r}</li>)}</ul>
      <p className="pp-stack">Built with {p.stack.join(", ")}.</p>
      <div className="pp-actions">
        <Link className="btn" href={`/work/${p.slug}/`}>Open the case study</Link>
        <button type="button" className="btn btn-quiet" onClick={() => go(-1)}>Previous</button>
        <button type="button" className="btn btn-quiet" onClick={() => go(1)}>Next project</button>
      </div>
    </article>
  );
}

export default function Shell({
  projects, exhibits, panels, intro,
}: {
  projects: Project[];
  exhibits: Exhibit[];
  panels: Record<PanelId, React.ReactNode>;
  intro: { title: string; lead: string; where: string };
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [narrow, setNarrow] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const valid = useCallback((id: string) => DOCK.some((d) => d.id === id) || projects.some((p) => p.slug === id), [projects]);

  const show = useCallback((id: string | null) => {
    if (id && !valid(id)) id = null;
    if (id) lastFocus.current = document.activeElement as HTMLElement;
    setOpen(id);
    const url = id ? `#${id}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [valid]);

  useEffect(() => {
    const fromHash = () => { const h = window.location.hash.slice(1); setOpen(h && valid(h) ? h : null); };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    const mq = window.matchMedia("(max-width: 900px)");
    const n = () => setNarrow(mq.matches);
    n(); mq.addEventListener("change", n);
    return () => { window.removeEventListener("hashchange", fromHash); mq.removeEventListener("change", n); };
  }, [valid]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) show(null);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); show("what-i-do"); setTimeout(() => document.getElementById("cmd-input")?.focus(), 350); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, show]);

  useEffect(() => {
    if (open) { panelRef.current?.scrollTo(0, 0); panelRef.current?.focus({ preventScroll: true }); }
    else lastFocus.current?.focus?.();
  }, [open]);

  const pi = projects.findIndex((p) => p.slug === open);
  const go = (d: number) => show(projects[(pi + d + projects.length) % projects.length].slug);
  const hovered = projects.find((p) => p.slug === hover);
  const hoveredIndex = projects.findIndex((p) => p.slug === hover);
  const dockActive = pi >= 0 ? "work" : open;

  return (
    <div className={`app${open ? " has-panel" : ""}`}>
      <header className="topbar">
        <Link href="/" className="wordmark" onClick={(e) => { e.preventDefault(); show(null); }}>Daniel Diab</Link>
        <p className="status"><span>{intro.where}</span><BogotaClock /></p>
      </header>

      <Exhibition key={narrow ? "portrait" : "landscape"} exhibits={exhibits} onSelect={show} onHover={setHover} paused={!!open && narrow} shifted={!!open && !narrow} />

      <div className="intro">
        <h1 className="display">{intro.title}</h1>
        <p>{intro.lead}</p>
      </div>

      <p className="hint" aria-live="polite">
        {hovered
          ? <><span className="num">{String(hoveredIndex + 1).padStart(2, "0")}</span> {hovered.name}, {hovered.kind.toLowerCase()}</>
          : <>Select a monitor to open a project</>}
      </p>

      <nav className="dock" aria-label="Sections">
        {DOCK.map((d, k) => (
          <button key={d.id} type="button" className={dockActive === d.id ? "on" : ""} aria-current={dockActive === d.id ? "true" : undefined} onClick={() => show(dockActive === d.id && open === d.id ? null : d.id)}>
            <span className="num">{String(k + 1).padStart(2, "0")}</span>{d.label}
          </button>
        ))}
      </nav>

      <aside ref={panelRef} className="panel" role="dialog" aria-modal="false" aria-label={open ?? "Panel"} tabIndex={-1} hidden={!open}>
        <button type="button" className="panel-close" onClick={() => show(null)}>Close</button>
        {pi >= 0 && <ProjectPanel p={projects[pi]} i={pi} total={projects.length} go={go} />}
        {open === "work" && (
          <div className="pp">
            <h2 className="display pp-name">Work</h2>
            <ol className="index">
              {projects.map((p, k) => (
                <li key={p.slug}>
                  <button type="button" onClick={() => show(p.slug)}>
                    <span className="num">{String(k + 1).padStart(2, "0")}</span>
                    <b>{p.name}</b>
                    <em>{p.kind}</em>
                    <span className="num">{p.period.replace(/^.*(\d{4}).*$/, "$1")}</span>
                  </button>
                </li>
              ))}
            </ol>
            {panels.work}
          </div>
        )}
        {open === "what-i-do" && <div className="pp">{panels["what-i-do"]}</div>}
        {open === "about" && <div className="pp">{panels.about}</div>}
        {open === "contact" && <div className="pp">{panels.contact}</div>}
      </aside>

      <noscript>
        <ul className="noscript-list">{projects.map((p) => <li key={p.slug}><a href={`/work/${p.slug}/`}>{p.name}</a></li>)}</ul>
      </noscript>
    </div>
  );
}
