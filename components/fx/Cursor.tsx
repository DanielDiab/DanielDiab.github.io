"use client";

import { useEffect, useRef } from "react";

// A ring that trails the pointer. It grows over anything clickable and shows a word
// when the element names one with data-cursor (the room's monitors say "Open").
// Mouse and trackpad only; the system cursor stays visible.
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ring.current;
    if (!fine || reduce || !el) return;
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0, shown = false;
    let target: Element | null = null;
    const onMove = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY; target = e.target as Element;
      if (!shown) { shown = true; cx = x; cy = y; el.classList.add("on"); }
    };
    // the page can move under a still pointer, so look again after a scroll
    const onScroll = () => { if (shown) target = document.elementFromPoint(x, y); };
    const onLeave = () => { shown = false; el.classList.remove("on"); };
    const onDown = () => el.classList.add("down");
    const onUp = () => el.classList.remove("down");
    const tick = () => {
      raf = requestAnimationFrame(tick);
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      const named = target?.closest?.("[data-cursor]") as HTMLElement | null;
      const word = named?.dataset.cursor ?? "";
      const hot = !!word || !!target?.closest?.("a, button, [role=option], input, label, summary");
      el.classList.toggle("hot", hot);
      el.classList.toggle("word", !!word);
      if (label.current && label.current.textContent !== word) label.current.textContent = word;
    };
    tick();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return <div ref={ring} className="cursor" aria-hidden="true"><span ref={label} /></div>;
}
