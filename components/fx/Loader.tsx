"use client";

import { useEffect, useRef } from "react";

// The opening curtain, once per visit: a counter runs to 100, the name sets, the curtain lifts.
// The boot script in lib/theme.ts decides whether it plays (it adds "curtain" to <html>),
// and adds "loaded" as a fallback so the page never stays covered.
export default function Loader() {
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("curtain")) { html.classList.add("loaded"); return; }
    const t0 = performance.now();
    const DUR = 1300;
    let raf = 0;
    const run = (t: number) => {
      const k = Math.min(1, (t - t0) / DUR);
      const e = 1 - Math.pow(1 - k, 2.4);
      if (num.current) num.current.textContent = String(Math.round(e * 100)).padStart(3, "0");
      if (k < 1) { raf = requestAnimationFrame(run); return; }
      html.classList.add("loaded");
      try { sessionStorage.setItem("dd-intro", "1"); } catch {}
      setTimeout(() => html.classList.remove("curtain"), 1100);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-in">
        <p className="loader-top"><span>Daniel Diab</span><span>Portfolio 2026</span></p>
        <p className="loader-mid display"><span>AI</span><span>engineer</span></p>
        <p className="loader-bot"><span>Bogotá, Colombia</span><span ref={num} className="num loader-num">000</span></p>
      </div>
    </div>
  );
}
