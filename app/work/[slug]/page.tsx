import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Pipeline from "@/components/Pipeline";
import PaletteDemo from "@/components/PaletteDemo";
import { STILLS, STILL_BG } from "@/components/Stills";
import { projects } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.summary } : {};
}

// Size a display title so it fits two lines: limited by total length and by its longest word.
const fit = (s: string) => {
  const longest = Math.max(...s.split(/\s+/).map((w) => w.length));
  const vw = Math.min(9, 150 / s.length, 88 / longest);
  return { fontSize: `min(var(--s-display), ${vw.toFixed(2)}vw)` } as React.CSSProperties;
};

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const Still = STILLS[p.slug];

  return (
    <article>
      <header className="case-hero field-red" data-reveal>
        <h1 className="display hero-load" style={fit(p.name)}>{p.name}</h1>
        <div className="case-sub">
          <p className="hero-load" style={{ "--i": 2 } as React.CSSProperties}>{p.summary}</p>
          <dl className="case-facts hero-load" style={{ "--i": 3 } as React.CSSProperties}>
            <div><dt>What</dt><dd>{p.kind}</dd></div>
            <div><dt>When</dt><dd className="num">{p.period}</dd></div>
            <div><dt>Where</dt><dd>{p.context}</dd></div>
            <div><dt>{p.link ? "Live site" : "Status"}</dt><dd>{p.link ? <a href={p.link.href}>{p.link.label}</a> : p.status}</dd></div>
          </dl>
        </div>
      </header>

      <div className={`case-still${p.image ? " has-img" : ""}`} style={{ "--bg": STILL_BG[p.slug] } as React.CSSProperties} data-reveal><div className="open" style={{ position: "absolute", inset: 0 }}>{p.image ? <img src={p.image.src} width={p.image.w} height={p.image.h} alt={p.image.alt} /> : <Still />}</div></div>

      <section className="block field-bone" data-reveal>
        <h2 className="display rise">The problem</h2>
        <p className="prose rise" style={{ "--i": 1 } as React.CSSProperties}>{p.problem}</p>
      </section>

      {p.slug === "senecareader" && (
        <section className="block field-bone" style={{ paddingTop: 0 }} data-reveal>
          <h2 className="display rise">Pipeline</h2>
          <div className="rise" style={{ "--i": 1 } as React.CSSProperties}><Pipeline /></div>
        </section>
      )}

      {p.slug === "chromatic" && (
        <section className="block field-bone" style={{ paddingTop: 0 }} data-reveal>
          <h2 className="display rise">Try the ramp</h2>
          <div className="rise" style={{ "--i": 1 } as React.CSSProperties}><PaletteDemo /></div>
        </section>
      )}

      {p.gallery && (
        <section className="block field-bone gallery" style={{ paddingTop: 0 }} data-reveal>
          <h2 className="display rise">Screens</h2>
          <div className="shots">
            {p.gallery.map((g, k) => (
              <figure key={g.src} className="rise" style={{ "--i": k + 1 } as React.CSSProperties}>
                <img src={g.src} width={g.w} height={g.h} alt={g.alt} loading="lazy" />
                <figcaption>{g.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="block field-bone" style={{ paddingTop: 0 }} data-reveal>
        <h2 className="display rise">What I built</h2>
        <ul className="built">
          {p.built.map((s, k) => (
            <li key={s.title} className="slide" style={{ "--i": k } as React.CSSProperties}><h3>{s.title}</h3><p>{s.body}</p></li>
          ))}
        </ul>
      </section>

      {(p.decision || p.lesson) && (
        <section className="block field-mustard decision" data-reveal>
          <h2 className="display rise">The call</h2>
          <div>
            {p.decision && <><h3 className="rise" style={{ "--i": 1 } as React.CSSProperties}>{p.decision.title}</h3><p className="rise" style={{ "--i": 2 } as React.CSSProperties}>{p.decision.body}</p></>}
            {p.lesson && <p className="lesson rise" style={{ "--i": 3 } as React.CSSProperties}><b>What I&apos;d change:</b> {p.lesson}</p>}
          </div>
        </section>
      )}

      <section className="block field-bone" data-reveal>
        <h2 className="display rise">Results</h2>
        <div>
          <ul className="results">{p.results.map((r, k) => <li key={r} className="slide" style={{ "--i": k } as React.CSSProperties}>{r}</li>)}</ul>
          <p className="stackline rise" style={{ "--i": 3 } as React.CSSProperties}>Built with {p.stack.join(", ")}.</p>
          {p.note && <p className="stackline rise" style={{ "--i": 4 } as React.CSSProperties}>{p.note}</p>}
        </div>
      </section>

      <Link href={`/work/${next.slug}/`} className="next-case field-ink">
        <span className="display" style={fit(next.name)}>{next.name}</span>
        <p>Next case study</p>
      </Link>
    </article>
  );
}
