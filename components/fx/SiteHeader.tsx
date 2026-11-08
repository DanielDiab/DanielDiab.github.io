"use client";

import { useEffect, useState } from "react";

// The guide for the scroll story: the chapters in order, the one you're in, and how far along you are.
// It steps aside inside the exhibition room, which has its own bar and dock.

export const CHAPTERS = [
  { id: "about", n: "01", label: "Intro" },
  { id: "skills", n: "02", label: "Skills" },
  { id: "chapter", n: "03", label: "Community" },
  { id: "path", n: "04", label: "Path" },
  { id: "selected-work", n: "05", label: "Work" },
  { id: "hello", n: "06", label: "Contact" },
];

export default function SiteHeader({ email }: { email: string }) {
  const [active, setActive] = useState("about");
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  // the phone's chapter menu; the desktop never shows it
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      setSolid(y > 40);
      const max = document.documentElement.scrollHeight - vh;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      let current = "about";
      for (const c of CHAPTERS) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top < vh * 0.45) current = c.id;
      }
      setActive(current);
      const room = document.getElementById("exhibition")?.getBoundingClientRect();
      setHidden(!!room && room.top < vh * 0.35 && room.bottom > vh * 0.5);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    if (!menu) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [menu]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    history.replaceState(null, "", id === "about" ? window.location.pathname : `#${id}`);
  };

  const idx = CHAPTERS.findIndex((c) => c.id === active);

  return (
    <header className={`sh${solid ? " solid" : ""}${hidden ? " away" : ""}`}>
      <a href="#about" className="wordmark sh-mark" onClick={(e) => go(e, "about")}>Daniel Diab</a>
      <nav className="sh-nav" aria-label="Chapters">
        {CHAPTERS.slice(1).map((c) => (
          <a key={c.id} href={`#${c.id}`} className={active === c.id ? "on" : ""} aria-current={active === c.id ? "true" : undefined} onClick={(e) => go(e, c.id)}>
            <span className="num">{c.n}</span>{c.label}
          </a>
        ))}
      </nav>
      <button type="button" className="sh-now num" aria-expanded={menu} aria-controls="sh-menu" onClick={() => setMenu((m) => !m)}>
        <span>{CHAPTERS[idx]?.n}</span> / 06 <b>{CHAPTERS[idx]?.label}</b>
        <i aria-hidden="true" className={menu ? "x" : ""} />
        <em className="sr">{menu ? "Close the chapter menu" : "Open the chapter menu"}</em>
      </button>
      <a className="sh-cta" href={`mailto:${email}?subject=Hello%20Daniel`}>Email me</a>
      <span className="sh-bar" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div id="sh-menu" className={`sh-menu${menu ? " open" : ""}`} inert={!menu}>
        <nav aria-label="Chapters">
          <ol>
            {CHAPTERS.map((c, i) => (
              <li key={c.id} style={{ "--i": i } as React.CSSProperties}>
                <a href={`#${c.id}`} className={active === c.id ? "on" : ""} aria-current={active === c.id ? "true" : undefined} onClick={(e) => go(e, c.id)}>
                  <span className="num">{c.n}</span><b className="display">{c.label}</b>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <a className="btn sh-menu-mail" href={`mailto:${email}?subject=Hello%20Daniel`}>{email}</a>
      </div>
    </header>
  );
}
