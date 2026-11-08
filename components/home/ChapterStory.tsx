"use client";

import { useEffect, useRef, useState } from "react";

// The chapter as a sequence: the steps scroll past a pinned frame, and each one wipes in its photo.
// Photos keep their natural aspect ratio inside the frame.

type Step = { when: string; title: string; body: string; photo: string };
type Photo = { src: string; w: number; h: number; alt: string; caption: string };

export default function ChapterStory({ steps, photos }: { steps: Step[]; photos: Photo[] }) {
  const [k, setK] = useState(0);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = Array.from(list.current?.querySelectorAll<HTMLElement>("[data-step]") ?? []);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setK(Number((e.target as HTMLElement).dataset.step)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const photo = (src: string) => photos.find((p) => p.src === src);

  return (
    <div className="cs">
      <div className="cs-pin">
        <figure className="cs-frame">
          {steps.map((s, i) => {
            const p = photo(s.photo);
            if (!p) return null;
            return (
              <img
                key={s.photo + i}
                src={p.src} width={p.w} height={p.h} alt={i === k ? p.alt : ""}
                loading={i < 2 ? "eager" : "lazy"}
                className={i === k ? "on" : i < k ? "past" : ""}
              />
            );
          })}
          <figcaption>
            <span className="num">{String(k + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
            {photo(steps[k].photo)?.caption}
          </figcaption>
        </figure>
        <ol className="cs-ticks" aria-hidden="true">
          {steps.map((s, i) => <li key={i} className={i <= k ? "on" : ""} />)}
        </ol>
      </div>
      <ol ref={list} className="cs-steps">
        {steps.map((s, i) => (
          <li key={s.title} data-step={i} className={i === k ? "on" : ""}>
            <time className="num">{s.when}</time>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
