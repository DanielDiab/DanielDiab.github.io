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

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
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
      <p className="sh-now num" aria-hidden="true"><span>{CHAPTERS[idx]?.n}</span> / 06 <b>{CHAPTERS[idx]?.label}</b></p>
      <a className="sh-cta" href={`mailto:${email}?subject=Hello%20Daniel`}>Email me</a>
      <span className="sh-bar" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}
