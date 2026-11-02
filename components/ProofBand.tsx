"use client";

import { useEffect, useRef } from "react";

// A line of names cropped by both edges. It moves only as you scroll, locked to the scrollbar.
export default function ProofBand({ names }: { names: string[] }) {
  const band = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const b = band.current, t = track.current;
      if (!b || !t) return;
      const r = b.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
      const travel = t.scrollWidth - window.innerWidth;
      t.style.transform = `translate3d(${-(0.08 + p * 0.84) * travel}px,0,0)`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  const all = [...names, ...names.slice(0, 3)];
  return (
    <div className="band" ref={band} aria-hidden="true">
      <div className="band-track display" ref={track}>
        {all.map((n, i) => <span key={i}>{n}{i < all.length - 1 && <i />}</span>)}
      </div>
    </div>
  );
}
