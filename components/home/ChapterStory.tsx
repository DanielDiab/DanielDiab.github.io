"use client";

import { useEffect, useRef, useState } from "react";

// The chapter as a sequence: the steps scroll past a pinned frame, and each one wipes in its photo.
// Photos keep their natural aspect ratio inside the frame. On a phone the same steps become cards
// you swipe through, each with its own photo, and dots show where you are.

type Step = { when: string; title: string; body: string; photo: string };
type Photo = { src: string; w: number; h: number; alt: string; caption: string };

export default function ChapterStory({ steps, photos }: { steps: Step[]; photos: Photo[] }) {
  const [k, setK] = useState(0);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 900px)");
    const items = Array.from(list.current?.querySelectorAll<HTMLElement>("[data-step]") ?? []);
    const io = new IntersectionObserver((entries) => {
      if (phone.matches) return;
      entries.forEach((e) => { if (e.isIntersecting) setK(Number((e.target as HTMLElement).dataset.step)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  // the phone carousel: the card nearest the left edge is the current one
  const onSwipe = () => {
    const el = list.current;
    if (!el || !window.matchMedia("(max-width: 900px)").matches) return;
    const card = el.querySelector<HTMLElement>("[data-step]");
    if (!card) return;
    const step = card.offsetWidth + 12;
    setK(Math.max(0, Math.min(steps.length - 1, Math.round(el.scrollLeft / step))));
  };
  const goTo = (i: number) => {
    const card = list.current?.querySelectorAll<HTMLElement>("[data-step]")[i];
    if (card && list.current) list.current.scrollTo({ left: card.offsetLeft - list.current.offsetLeft - parseFloat(getComputedStyle(list.current).paddingLeft), behavior: "smooth" });
  };

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
      <ol ref={list} className="cs-steps" onScroll={onSwipe}>
        {steps.map((s, i) => (
          <li key={s.title} data-step={i} className={i === k ? "on" : ""}>
            {photo(s.photo) && <img className="cs-ph" src={s.photo} width={photo(s.photo)!.w} height={photo(s.photo)!.h} alt={photo(s.photo)!.alt} loading="lazy" />}
            <time className="num">{s.when}</time>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="cs-nav" aria-hidden="true">
        <ol className="cs-dots">
          {steps.map((s, i) => <li key={i}><button type="button" tabIndex={-1} className={i === k ? "on" : ""} onClick={() => goTo(i)} /></li>)}
        </ol>
        <span className="cs-swipe">{k < steps.length - 1 ? "Swipe" : "Swiped through"} <span className="num">{String(k + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span></span>
      </div>
    </div>
  );
}
