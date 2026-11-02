"use client";

import { useEffect, useRef } from "react";

// The name runs edge to edge at a constant 40px a second. A second copy, clipped to the
// square, turns mustard as the letters cross the scan, so every word reads whole.
const SPEED = 40;

function Track({ name }: { name: string }) {
  const unit = (k: number) => (
    <span key={k}>{name}<i /></span>
  );
  return <div className="track">{[0, 1, 2, 3].map(unit)}</div>;
}

export default function HeroLine({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const set = () => {
      const t = host.querySelector<HTMLElement>(".track");
      if (!t) return;
      const dur = t.scrollWidth / 2 / SPEED;
      host.querySelectorAll<HTMLElement>(".track").forEach((el) => {
        el.style.setProperty("--dur", `${dur}s`);
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "";
      });
    };
    set();
    document.fonts?.ready.then(set);
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  return (
    <div ref={ref}>
      <div className="hero-sq hero-load"><img src="/img/portrait.jpg" width={580} height={580} alt="Portrait of Daniel Diab on the Universidad de los Andes campus" fetchPriority="high" /></div>
      <h1 className="display">
        <span className="sr">{name}</span>
        <span className="line" aria-hidden="true"><Track name={name} /></span>
        <span className="line line-lit" aria-hidden="true"><Track name={name} /></span>
      </h1>
    </div>
  );
}
