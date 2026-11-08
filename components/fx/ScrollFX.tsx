"use client";

import { useEffect } from "react";

// Writes each [data-progress] element's scroll progress (0 to 1) into its --p variable, once per frame.
// "through" (default): 0 when its top meets the bottom of the screen, 1 when its bottom leaves the top.
// "exit": 0 while its top is at the top of the screen, 1 when it has scrolled fully out.
// "enter": 0 when its top meets the bottom of the screen, 1 when its top reaches the top.
// "pin": for tall sections with sticky content, 0 to 1 across the scroll the section is pinned for.
export default function ScrollFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let els: HTMLElement[] = [];
    let raf = 0;
    const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
    const collect = () => { els = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]")); };
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) continue;
        const mode = el.dataset.progress;
        const p = mode === "exit" ? clamp(-r.top / Math.max(1, r.height))
          : mode === "enter" ? clamp((vh - r.top) / vh)
          : mode === "pin" ? clamp(-r.top / Math.max(1, r.height - vh))
          : clamp((vh - r.top) / (vh + r.height));
        el.style.setProperty("--p", p.toFixed(4));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    collect();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const mo = new MutationObserver(() => { collect(); onScroll(); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); mo.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
