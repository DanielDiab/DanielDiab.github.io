"use client";

import { useEffect, useState } from "react";

// Cycles through short endings for one sentence. Screen readers get the whole list once.
export default function Rotator({ words, every = 2600 }: { words: string[]; every?: number }) {
  const [k, setK] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setK((x) => (x + 1) % words.length), every);
    return () => clearInterval(id);
  }, [words.length, every]);
  const prev = (k - 1 + words.length) % words.length;
  return (
    <span className="rot">
      <span className="sr">{words.join(", ")}</span>
      {words.map((w, i) => (
        <span key={w} aria-hidden="true" className={i === k ? "on" : i === prev ? "out" : ""}>{w}</span>
      ))}
    </span>
  );
}
