"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { heroFacts, profile } from "@/lib/content";

// First screen: the name and the claim on the left, a geometric panel of flat colour blocks on the
// right. Every block carries a real fact. Shapes drift a little toward the cursor; the agent graph
// pulses like a request moving through the runtime.
const NODES = Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 3) * i - Math.PI / 2;
  return { x: 110 + Math.cos(a) * 74, y: 92 + Math.sin(a) * 62 };
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    };
    const onLeave = () => { el.style.setProperty("--mx", "0"); el.style.setProperty("--my", "0"); };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); cancelAnimationFrame(raf); };
  }, []);

  const f = heroFacts;
  return (
    <section ref={ref} className="hero field-indigo" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-text">
          <p className="hero-where hero-load">Bogotá, Colombia. Open to full-time roles and projects.</p>
          <h1 id="hero-title" className="display hero-name">
            <span className="mask"><span className="hero-word" style={{ "--i": 1 } as React.CSSProperties}>Daniel</span></span>
            <span className="mask"><span className="hero-word" style={{ "--i": 2 } as React.CSSProperties}>Diab</span></span>
          </h1>
          <p className="hero-lead hero-load" style={{ "--i": 4 } as React.CSSProperties}>I build AI agents that know what they can&apos;t answer, and automations that pay for themselves.</p>
          <p className="hero-sub hero-load" style={{ "--i": 5 } as React.CSSProperties}>Full-stack developer and research assistant at Universidad de los Andes, working in LangChain, LangGraph and MCP.</p>
          <div className="actions hero-load" style={{ "--i": 6 } as React.CSSProperties}>
            <a className="btn" href={`mailto:${profile.email}?subject=Hello%20Daniel`}>Email me</a>
            <Link className="btn btn-light" href="/#work">See the work</Link>
          </div>
        </div>

        <div className="bento" aria-label="Highlights">
          <figure className="b b-photo wipe" style={{ "--i": 2 } as React.CSSProperties}>
            <img src="/img/teaching.jpg" width={880} height={1100} alt="Daniel teaching a workshop on building AI agents at Universidad de los Andes" fetchPriority="high" />
            <figcaption>Teaching a workshop on building AI agents</figcaption>
          </figure>

          <div className="b b-first field-gold wipe" style={{ "--i": 3 } as React.CSSProperties}>
            <div className="disc drift" style={{ "--d": 10 } as React.CSSProperties}>
              <svg className="ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" /></svg>
              <b className="display">{f.first.big}</b>
            </div>
            <p>{f.first.small}</p>
          </div>

          <div className="b b-graph field-ink wipe" style={{ "--i": 4 } as React.CSSProperties}>
            <svg viewBox="0 0 220 184" aria-hidden="true" className="drift" style={{ "--d": -8 } as React.CSSProperties}>
              {NODES.map((n, i) => <line key={`l${i}`} x1="110" y1="92" x2={n.x} y2={n.y} />)}
              {NODES.map((n, i) => <circle key={`n${i}`} className="node" cx={n.x} cy={n.y} r="11" style={{ "--k": i } as React.CSSProperties} />)}
              <rect x="92" y="74" width="36" height="36" className="core" />
            </svg>
            <p><b className="display">{f.agents.big}</b> {f.agents.small}</p>
          </div>

          <div className="b b-community field-brown wipe" style={{ "--i": 5 } as React.CSSProperties}>
            <svg viewBox="0 0 200 200" aria-hidden="true" className="waves drift" style={{ "--d": 12 } as React.CSSProperties}>
              <circle cx="200" cy="200" r="190" className="w1" />
              <circle cx="200" cy="200" r="132" className="w2" />
              <circle cx="200" cy="200" r="76" className="w3" />
            </svg>
            <p><b className="display">{f.community.big}</b>{f.community.small}</p>
          </div>

          <div className="b b-results field-bone wipe" style={{ "--i": 6 } as React.CSSProperties}>
            <span className="half drift" aria-hidden="true" style={{ "--d": -10 } as React.CSSProperties} />
            <p><b className="display num">{f.results[1].big}</b>client sales from AI lead automation, and {f.results[0].big.replace("−", "")} lower LLM cost</p>
            <span className="foot">Freelance, 2022–2024</span>
          </div>
        </div>
      </div>
    </section>
  );
}
