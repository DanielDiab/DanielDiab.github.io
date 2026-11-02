import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Pipeline from "@/components/Pipeline";
import PaletteDemo from "@/components/PaletteDemo";
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

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article>
      <header className="case-hero">
        <div className="hero-plane" aria-hidden="true" />
        <div className="wrap" style={{ position: "relative" }}>
          <Link href="/#work" className="back mono">← All work</Link>
          <h1>{p.name}</h1>
          <p className="case-kind">{p.kind}</p>
          <p className="case-summary">{p.summary}</p>
          <dl className="facts">
            <div><dt>Context</dt><dd>{p.context}</dd></div>
            <div><dt>When</dt><dd>{p.period}</dd></div>
            <div><dt>Status</dt><dd>{p.status}</dd></div>
            <div><dt>{p.link ? "Live" : "Stack"}</dt><dd>{p.link ? <a href={p.link.href}>{p.link.label} ↗</a> : p.stack.slice(0, 3).join(", ")}</dd></div>
          </dl>
        </div>
      </header>

      <div className="wrap case-body">
        <section className="case-block">
          <p className="label">The problem</p>
          <p className="prose">{p.problem}</p>
        </section>

        {p.slug === "senecareader" && (
          <section className="case-block">
            <p className="label">Architecture</p>
            <Pipeline />
          </section>
        )}

        {p.slug === "chromatic" && (
          <section className="case-block">
            <p className="label">Try the idea</p>
            <div>
              <p className="prose" style={{ marginBottom: 24 }}>This ramp is generated the way CHRO/MATIC does it: fixed lightness and chroma steps in OKLCH, one hue. It also drives every color on this site.</p>
              <PaletteDemo />
            </div>
          </section>
        )}

        <section className="case-block">
          <p className="label">What I built</p>
          <ol className="steps">
            {p.built.map((s) => (
              <li key={s.title}><h3>{s.title}</h3><p>{s.body}</p></li>
            ))}
          </ol>
        </section>

        {(p.decision || p.lesson) && (
          <section className="case-block">
            <p className="label">Decisions</p>
            <div>
              {p.decision && (
                <div className="callout"><h3>{p.decision.title}</h3><p>{p.decision.body}</p></div>
              )}
              {p.lesson && <p className="lesson"><b>What I&apos;d change:</b> {p.lesson}</p>}
            </div>
          </section>
        )}

        <section className="case-block">
          <p className="label">Results</p>
          <div>
            <ul className="results">{p.results.map((r) => <li key={r}>{r}</li>)}</ul>
            <div className="chips" style={{ marginTop: 28 }}>{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
            {p.note && <p className="muted" style={{ marginTop: 20 }}>{p.note}</p>}
          </div>
        </section>
      </div>

      <Link href={`/work/${next.slug}/`} className="next">
        <div className="wrap">
          <p className="label">Next case study</p>
          <span className="row-name" style={{ display: "block" }}>{next.name} →</span>
        </div>
      </Link>
    </article>
  );
}
