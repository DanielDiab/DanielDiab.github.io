"use client";

import { useEffect, useRef } from "react";

// The name, set in TikTok Sans with its width and weight axes live: letters near the pointer
// condense and darken, like the type is breathing toward you. Without a pointer (or when it rests)
// a slow wave runs through the letters instead. Positions are measured once per layout,
// so the effect never chases its own reflow.

type Props = { first: string; last: string; photo: string };

export default function KineticName({ first, last, photo }: Props) {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const letters = Array.from(el.querySelectorAll<HTMLElement>(".kn-l"));
    let centers: { x: number; y: number }[] = [];
    let em = 100;
    const cur = letters.map(() => 0);
    const measure = () => {
      // measure at rest so the centres don't move with the effect
      letters.forEach((l) => { l.style.removeProperty("--s"); l.style.removeProperty("--w"); });
      em = parseFloat(getComputedStyle(el).fontSize) || 100;
      centers = letters.map((l) => { const r = l.getBoundingClientRect(); return { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY }; });
      cur.fill(0);
    };
    let px = -9999, py = -9999, lastMove = -1e9, visible = true, raf = 0;
    const onMove = (e: PointerEvent) => { if (e.pointerType === "touch") return; px = e.pageX; py = e.pageY; lastMove = performance.now(); };
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || !centers.length) return;
      const idle = t - lastMove > 2600;
      let tx = px, ty = py;
      if (idle) {
        // a wave that sweeps the name left to right, then back
        const a = centers[0], b = centers[centers.length - 1];
        const k = (Math.sin(t / 1900) + 1) / 2;
        tx = a.x - em + (b.x - a.x + 2 * em) * k;
        ty = (a.y + b.y) / 2;
      }
      for (let i = 0; i < letters.length; i++) {
        const c = centers[i];
        const dx = (c.x - tx) / em, dy = (c.y - ty) / (em * 1.6);
        const f = Math.exp(-(dx * dx + dy * dy) / (idle ? 0.9 : 1.3));
        cur[i] += (f - cur[i]) * 0.14;
        const v = cur[i];
        if (v < 0.002) { letters[i].style.removeProperty("--s"); letters[i].style.removeProperty("--w"); continue; }
        letters[i].style.setProperty("--s", `${(150 - 68 * v).toFixed(1)}%`);
        letters[i].style.setProperty("--w", `${Math.round(800 + 100 * v)}`);
      }
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    document.fonts?.ready.then(measure);
    // wait for the entrance to settle before measuring
    const t0 = setTimeout(measure, 2600);
    measure();
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); clearTimeout(t0); window.removeEventListener("pointermove", onMove); };
  }, []);

  let i = 0;
  const word = (w: string) => w.split("").map((ch) => {
    const k = i++;
    return <span key={k} className="kn-l" style={{ "--i": k } as React.CSSProperties}>{ch}</span>;
  });

  return (
    <h1 ref={root} className="kn display" aria-label={`${first} ${last}`}>
      <span className="kn-line kn-1" aria-hidden="true">{word(first)}</span>
      <span className="kn-line kn-2" aria-hidden="true">
        <span className="kn-face"><img src={photo} width={580} height={580} alt="" /></span>
        {word(last)}
      </span>
    </h1>
  );
}
