"use client";

import { useEffect, useRef, useState } from "react";
import { STILLS, STILL_BG } from "@/components/Stills";
import type { Project, Skill } from "@/lib/content";

// Skills on the left, the projects that prove them on the right. Point at a skill and the projects
// that use it light up; point at a project and its skills light up. Until someone touches it,
// it walks through a few skills by itself so the link between the two sides is obvious.

type Card = Pick<Project, "slug" | "name" | "kind" | "period"> & { image?: { src: string; w: number; h: number } };

const TOUR = ["MCP servers", "Python", "Evals and red-teaming", "TouchDesigner", "OKLCH color", "LangGraph"];

export default function SkillMap({ groups, cards }: { groups: { group: string; skills: Skill[] }[]; cards: Card[] }) {
  const all = groups.flatMap((g) => g.skills);
  const [skill, setSkill] = useState<string | null>(null);
  const [project, setProject] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // the guided tour: runs while the map is on screen and nobody has used it yet
  useEffect(() => {
    if (touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;
    let id: ReturnType<typeof setInterval> | undefined;
    let k = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (!e.isIntersecting) { setSkill(null); return; }
      setSkill(TOUR[k % TOUR.length]);
      id = setInterval(() => { k += 1; setSkill(TOUR[k % TOUR.length]); }, 2200);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { clearInterval(id); io.disconnect(); };
  }, [touched]);

  const take = () => { if (!touched) setTouched(true); };
  const activeSkill = all.find((s) => s.name === skill);
  const lit = new Set(project ? [project] : activeSkill ? activeSkill.projects : []);
  const litSkills = new Set(project ? all.filter((s) => s.projects.includes(project)).map((s) => s.name) : skill ? [skill] : []);
  const anything = lit.size > 0;
  const pname = cards.find((c) => c.slug === project)?.name;

  return (
    <div ref={root} className={`sm${anything ? " sm-active" : ""}`} onPointerEnter={take} onFocus={take}>
      <div className="sm-skills">
        {groups.map((g) => (
          <div key={g.group} className="sm-group">
            <h3>{g.group}</h3>
            <ul>
              {g.skills.map((s) => (
                <li key={s.name}>
                  <button
                    type="button"
                    className={`chip${litSkills.has(s.name) ? " lit" : ""}`}
                    aria-pressed={skill === s.name && touched}
                    onPointerEnter={() => { setTouched(true); setProject(null); setSkill(s.name); }}
                    onFocus={() => { setProject(null); setSkill(s.name); }}
                    onClick={() => { setTouched(true); setProject(null); setSkill(s.name); }}
                  >
                    {s.name}<span className="num">{s.projects.length}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="sm-side">
        <p className="sm-status" aria-live="polite">
          {project && pname
            ? <><b>{pname}</b> uses {litSkills.size} of these skills.</>
            : activeSkill
              ? <><b>{activeSkill.name}</b>: used in {activeSkill.projects.length} of {cards.length} projects{touched ? "" : ", pick any skill"}.</>
              : <>Point at a skill to see where I used it.</>}
        </p>
        <ul className="sm-cards">
          {cards.map((c, i) => {
            const Still = STILLS[c.slug];
            return (
              <li key={c.slug} className={lit.has(c.slug) ? "lit" : ""}>
                <a
                  href={`#${c.slug}`}
                  className="sm-card"
                  data-cursor="View"
                  onPointerEnter={() => { setTouched(true); setProject(c.slug); }}
                  onPointerLeave={() => setProject(null)}
                  onFocus={() => setProject(c.slug)}
                  onBlur={() => setProject(null)}
                >
                  <span className="sm-thumb" style={{ background: STILL_BG[c.slug] ?? "#1b1b1b" }}>
                    {c.image ? <img src={c.image.src} width={c.image.w} height={c.image.h} alt="" loading="lazy" /> : Still ? <Still /> : null}
                  </span>
                  <span className="sm-meta">
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <b>{c.name}</b>
                    <em>{c.kind}</em>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
