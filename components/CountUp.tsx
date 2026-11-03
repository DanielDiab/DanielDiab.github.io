"use client";

import { useEffect, useRef, useState } from "react";

// Counts a figure like "70+" or "~20" up from zero once it scrolls into view.
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  const [n, setN] = useState(m ? 0 : null);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!m) return;
    const target = parseInt(m[2], 10);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const run = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        setN(Math.round(target * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(run);
      };
      raf = requestAnimationFrame(run);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <b ref={ref} className={className} aria-label={value}>{m ? `${m[1]}${n}${m[3]}` : value}</b>;
}
